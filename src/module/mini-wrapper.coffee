cx = require 'classnames'
React = require 'react'

a = React.createFactory 'a'
button = React.createFactory 'button'
div = React.createFactory 'div'
i = React.createFactory 'i'
span = React.createFactory 'span'

T = React.PropTypes

module.exports = React.createClass
  displayName: 'mini-wrapper'

  propTypes:
    name: T.string
    title: T.string
    showClose: T.bool

  getDefaultProps: ->
    showClose: false

  render: ->
    className = cx
      'lite-mini-wrapper': true
      "is-for-#{ @props.name }": @props.name?
    div className: className,
      div className: 'header', @props.title,
        if @props.showClose?
          i className: 'icon icon-remove button-close'
      div className: 'content', @props.children
