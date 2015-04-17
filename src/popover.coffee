
React = require 'react'

mixinLayered = require './mixin-layered'

div  = React.createFactory 'div'
span = React.createFactory 'span'
a    = React.createFactory 'a'

T = React.PropTypes

module.exports = React.createClass
  displayName: 'light-popover'
  mixins: [mixinLayered]

  propTypes:
    # this component accepts children
    title:              T.string
    name:               T.string
    onPopoverClose:     T.func
    positionAlgorithm:  T.func # could be customized
    baseArea:           T.object.isRequired # top, right, down, left
    showClose:          T.bool.isRequired
    show:               T.bool.isRequired

  bindWindowEvents: ->
    window.addEventListener 'click', @onWindowClick

  unbindWindowEvents: ->
    window.removeEventListener 'click', @onWindowClick

  computePosition: ->
    if @props.positionAlgorithm?
      return @props.positionAlgorithm @props.baseArea
    width = 240 # card default width
    supposeHeight = 200
    half = width / 2
    maxTop = innerHeight - supposeHeight
    top = Math.min @props.baseArea.bottom, maxTop
    xCenter = (@props.baseArea.left + @props.baseArea.right) / 2
    left = xCenter - half
    if left < 20 then left = 20 # mind the left edge
    if (left + width + 20) > innerWidth
      left = innerWidth - width - 20
    # return as style
    top: "#{top}px"
    left: "#{left}px"

  onPopoverClose: ->
    @props.onPopoverClose()

  onWindowClick: ->
    # components are prerendered for handling animations
    # but they should not trigger the event
    if @props.show
      @onPopoverClose()

  onClick: (event) ->
    event.stopPropagation()

  renderLayer: (afterTransition) ->
    decorator = "is-#{@props.name or 'default'}"
    div null,
      if @props.show and afterTransition
        div className: "light-popover #{decorator}", style: @computePosition(), onClick: @onClick,
          if @props.title?
            div className: 'header',
              span className: 'title', @props.title
          if @props.showClose
            a className: 'icon icon-remove', onClick: @onPopoverClose
          div className: "body #{decorator}",
            @props.children

  render: ->
    div()

