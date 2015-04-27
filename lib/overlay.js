(function() {
  var React, T, Transition, div, mixinLayered;

  React = require('react');

  div = React.createFactory('div');

  mixinLayered = require('./mixin-layered');

  Transition = React.createFactory(require('./transition'));

  T = React.PropTypes;

  module.exports = React.createClass({
    displayName: 'lite-overlay',
    mixins: [mixinLayered],
    propTypes: {
      show: T.bool.isRequired,
      name: T.string
    },
    getDefaultProps: function() {
      return {
        name: 'default'
      };
    },
    renderLayer: function(afterTransition) {
      return Transition({
        transitionName: 'fade',
        enterTimeout: 200,
        leaveTimeout: 350
      }, this.props.show && afterTransition ? div({
        className: "light-overlay is-for-" + this.props.name
      }, this.props.children) : void 0);
    },
    render: function() {
      return div();
    }
  });

}).call(this);
