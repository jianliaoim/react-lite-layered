(function() {
  var React, T, a, div, mixinLayered, span;

  React = require('react');

  mixinLayered = require('./mixin-layered');

  div = React.createFactory('div');

  span = React.createFactory('span');

  a = React.createFactory('a');

  T = React.PropTypes;

  module.exports = React.createClass({
    displayName: 'light-popover',
    mixins: [mixinLayered],
    propTypes: {
      title: T.string,
      name: T.string,
      onPopoverClose: T.func,
      positionAlgorithm: T.func,
      baseArea: T.object.isRequired,
      showClose: T.bool.isRequired,
      show: T.bool.isRequired
    },
    bindWindowEvents: function() {
      return window.addEventListener('click', this.onWindowClick);
    },
    unbindWindowEvents: function() {
      return window.removeEventListener('click', this.onWindowClick);
    },
    computePosition: function() {
      var half, left, maxTop, supposeHeight, top, width, xCenter;
      if (this.props.positionAlgorithm != null) {
        return this.props.positionAlgorithm(this.props.baseArea);
      }
      width = 240;
      supposeHeight = 200;
      half = width / 2;
      maxTop = innerHeight - supposeHeight;
      top = Math.min(this.props.baseArea.bottom, maxTop);
      xCenter = (this.props.baseArea.left + this.props.baseArea.right) / 2;
      left = xCenter - half;
      if (left < 20) {
        left = 20;
      }
      if ((left + width + 20) > innerWidth) {
        left = innerWidth - width - 20;
      }
      return {
        top: top + "px",
        left: left + "px"
      };
    },
    onPopoverClose: function() {
      return this.props.onPopoverClose();
    },
    onWindowClick: function() {
      if (this.props.show) {
        return this.onPopoverClose();
      }
    },
    onClick: function(event) {
      return event.stopPropagation();
    },
    renderLayer: function(afterTransition) {
      var decorator;
      decorator = "is-" + (this.props.name || 'default');
      return div(null, this.props.show && afterTransition ? div({
        className: "light-popover " + decorator,
        style: this.computePosition(),
        onClick: this.onClick
      }, this.props.title != null ? div({
        className: 'header'
      }, span({
        className: 'title'
      }, this.props.title)) : void 0, this.props.showClose ? a({
        className: 'icon icon-remove',
        onClick: this.onPopoverClose
      }) : void 0, div({
        className: "body " + decorator
      }, this.props.children)) : void 0);
    },
    render: function() {
      return div();
    }
  });

}).call(this);
