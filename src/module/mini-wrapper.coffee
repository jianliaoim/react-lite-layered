cx = require 'classnames'
React = require 'react'

a = React.createFactory 'a'
div = React.createFactory 'div'
span = React.createFactory 'span'

T = React.PropTypes

module.exports = React.createClass
  displayName: 'mini-wrapper'

  propTypes:
    name: T.string
    title: T.string

  render: ->
    className = cx
      'lite-mini-wrapper': true
      "is-for-#{ @props.name }": @props.name?
    div className: className
      div className: 'header', @props.title
      div className: 'content', @props.children
