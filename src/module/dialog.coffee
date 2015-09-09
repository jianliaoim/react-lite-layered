cx = require 'classnames'
React = require 'react'
keycode = require 'keycode'

mixinLayered = require '../mixin/layered'

Transition = React.createFactory require '../util/transition'

a = React.createFactory 'a'
button = React.createFactory 'button'
div = React.createFactory 'div'
span = React.createFactory 'span'

T = React.PropTypes

module.exports = React.createClass
  displayName: 'lite-dialog'
  mixins: [mixinLayered]

  propTypes:
    # this components accepts children
    cancel:       T.string
    confirm:      T.string
    content:      T.string
    flexible:     T.bool
    show:         T.bool.isRequired
    onCloseClick: T.func.isRequired
    onConfirm:    T.func.isRequired

  bindWindowEvents: ->
    window.addEventListener 'keydown', @onWindowKeydown

  unbindWindowEvents: ->
    window.removeEventListener 'keydown', @onWindowKeydown

  onWindowKeydown: (event) ->
    if keycode(event.keyCode) is 'esc'
      @onCloseClick()

  onCloseClick: ->
    @props.onCloseClick()

  onConfirmClick: ->
    @props.onConfirm()
    @props.onCloseClick()

  onBackdropClick: (event) ->
    if event.target is event.currentTarget
      @onCloseClick()

  renderActions: ->
    div className: 'actions line',
      button className: 'button is-link', onClick: @onCloseClick,
        @props.cancel
      button className: 'button is-danger', onClick: @onConfirmClick,
        @props.confirm

  renderLayer: (afterTransition) ->
    className = "lite-dialog is-for-#{@props.name}"
    boxClassName = cx 'box', 'flex': @props.flexible
    Transition transitionName: 'fade', enterTimeout: 200, leaveTimeout: 350,
      if @props.show and afterTransition
        div className: className, onClick: @onBackdropClick,
          div className: 'wrapper', onClick: @onBackdropClick,
            div className: boxClassName,
              div className: 'content',
                div className: 'inner', @props.content
                @props.children
                @renderActions()

  render: ->
    div()
