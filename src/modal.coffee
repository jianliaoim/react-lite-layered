
React = require 'react'
keycode = require 'keycode'

mixinLayered = require './mixin-layered'

Transition = React.createFactory require './transition'

div  = React.createFactory 'div'
span = React.createFactory 'span'
a    = React.createFactory 'a'

T = React.PropTypes
cx = require 'classnames'

module.exports = React.createClass
  displayName: 'body-modal'
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

  onCloseClick: ->
    @props.onCloseClick()

  onBackdropClick: (event) ->
    unless @props.showCornerClose
      if event.target is event.currentTarget
        @onCloseClick()

  renderLayer: (afterTransition) ->
    className = "body-modal is-for-#{@props.name}"
    Transition transitionName: 'fade', enterTimeout: 200, leaveTimeout: 350,
      if @props.show and afterTransition
        div className: className, onClick: @onBackdropClick,
          if @props.showCornerClose
            a className: 'icon icon-remove', onClick: @onCloseClick
          div className: 'box',
            if @props.title?
              div className: 'title',
                span className: 'name', @props.title
                span className: 'icon icon-remove', onClick: @onCloseClick
            @props.children

  render: ->
    div()
