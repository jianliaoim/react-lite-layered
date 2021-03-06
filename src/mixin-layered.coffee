
# Code mostly done at:
# http://stackoverflow.com/a/26789089/883571

React = require 'react'
ReactDOM = require 'react-dom'
# bowser = require 'bowser'

div = React.createFactory 'div'

module.exports =

  # needs to implement

  # renderLayer: (afterTransition) ->
  # use afterTransition to control initial animation

  # bindWindowEvents: ->

  componentWillUnmount: ->
    return unless @_target?
    @_unrenderLayer()
    document.body.removeChild @_target
    @unbindWindowEvents?()

  componentDidUpdate: ->
    @_renderLayer()

  _renderLayer: ->
    if @_target?
      @_renderChildren()
      return
    if (not @props.show) and (not @_target?)
      return
    # so show but found no target
    @_target = document.createElement 'div'
    document.body.appendChild @_target
    @bindWindowEvents?()
    tree = @renderLayer false
    ReactDOM.render tree, @_target

    # use delay to create transition
    # more delay to fix in safari
    setTimeout =>
      @_renderChildren()
    , 100

  _renderChildren: ->
    tree = @renderLayer true
    ReactDOM.render tree, @_target

  _unrenderLayer: ->
    ReactDOM.unmountComponentAtNode @_target
