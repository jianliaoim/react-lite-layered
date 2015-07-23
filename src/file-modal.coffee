
React = require 'react/addons'
keycode = require 'keycode'

mixinLayered = require './mixin-layered'

Transition = React.createFactory require './transition'

div  = React.createFactory 'div'
span = React.createFactory 'span'
a    = React.createFactory 'a'

T = React.PropTypes
cx = require 'classnames'

module.exports = React.createClass
  displayName: 'file-modal'
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
    className = "lite-file-modal is-for-#{@props.name}"
    Transition transitionName: 'fade', enterTimeout: 200, leaveTimeout: 350,
      if @props.show and afterTransition
        div className: className, onClick: @onBackdropClick,
          div className: 'wrapper', onClick: @onBackdropClick,
            div className: 'box', onClick: @onBackdropClick,
              @props.children


  render: ->
    div()
