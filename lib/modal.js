(function() {
  var React, T, Transition, a, cx, div, keycode, mixinLayered, span;

  React = require('react');

  keycode = require('keycode');

  mixinLayered = require('./mixin-layered');

  Transition = React.createFactory(require('./transition'));

  div = React.createFactory('div');

  span = React.createFactory('span');

  a = React.createFactory('a');

  T = React.PropTypes;

  cx = require('classnames');

  module.exports = React.createClass({
    displayName: 'body-modal',
    mixins: [mixinLayered],
    propTypes: {
      name: T.string,
      title: T.string,
      onCloseClick: T.func.isRequired,
      showCornerClose: T.bool,
      show: T.bool.isRequired
    },
    bindWindowEvents: function() {
      return window.addEventListener('keydown', this.onWindowKeydown);
    },
    unbindWindowEvents: function() {
      return window.removeEventListener('keydown', this.onWindowKeydown);
    },
    onWindowKeydown: function(event) {
      if (keycode(event.keyCode) === 'esc') {
        return this.onCloseClick();
      }
    },
    onCloseClick: function() {
      return this.props.onCloseClick();
    },
    onBackdropClick: function(event) {
      if (!this.props.showCornerClose) {
        if (event.target === event.currentTarget) {
          return this.onCloseClick();
        }
      }
    },
    renderLayer: function(afterTransition) {
      var className;
      className = "body-modal is-for-" + this.props.name;
      return Transition({
        transitionName: 'fade',
        enterTimeout: 200,
        leaveTimeout: 350
      }, this.props.show && afterTransition ? div({
        className: className,
        onClick: this.onBackdropClick
      }, this.props.showCornerClose ? a({
        className: 'icon icon-remove',
        onClick: this.onCloseClick
      }) : void 0, div({
        className: 'box'
      }, this.props.title != null ? div({
        className: 'title'
      }, span({
        className: 'name'
      }, this.props.title), span({
        className: 'icon icon-remove',
        onClick: this.onCloseClick
      })) : void 0, this.props.children)) : void 0);
    },
    render: function() {
      return div();
    }
  });

}).call(this);
