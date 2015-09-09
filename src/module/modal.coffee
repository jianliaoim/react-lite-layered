cx = require 'classnames'
React = require 'react'
keycode = require 'keycode'

mixinLayered = require '../mixin/layered'

Transition = React.createFactory require '../util/transition'

a = React.createFactory 'a'
div = React.createFactory 'div'
span = React.createFactory 'span'

T = React.PropTypes

module.exports = React.createClass
  displayName: 'lite-modal'
  mixins: [mixinLayered]

  propTypes:
    # this components accepts children
    name:             T.string
    title:            T.string
    onCloseClick:     T.func.isRequired
    showCornerClose:  T.bool
    show:             T.bool.isRequired

  bindWindowEvents: ->
    window.addEventListener 'keydown', @onWindowKeydown

  unbindWindowEvents: ->
    window.removeEventListener 'keydown', @onWindowKeydown

  onWindowKeydown: (event) ->
    if keycode(event.keyCode) is 'esc'
      @onCloseClick()

  onCloseClick: ()->
    @props.onCloseClick()

  onBackdropClick: (event) ->
    event.stopPropagation()
    #Object.keys(event).forEach (key) ->
    #  console.log key,event[key]
    if not @props.showCornerClose && event.target is event.currentTarget
      @onCloseClick()

  renderLayer: (afterTransition) ->
    className = "lite-modal is-for-#{@props.name}"

    Transition transitionName: 'fade', enterTimeout: 200, leaveTimeout: 350,
      if @props.show and afterTransition
        div className: className, onMouseDown: @onBackdropClick,
          div className: 'wrapper', onMouseDown: @onBackdropClick,
            div className: 'box',
              if @props.title?
                div className: 'title',
                  span className: 'name', @props.title
                  span className: 'icon icon-remove', onClick: @onCloseClick
              @props.children

  render: ->
    div()
