(function() {
  var React, bowser;

  React = require('react');

  bowser = require('bowser');

  module.exports = {
    componentWillUnmount: function() {
      if (this._target == null) {
        return;
      }
      this._unrenderLayer();
      document.body.removeChild(this._target);
      return typeof this.unbindWindowEvents === "function" ? this.unbindWindowEvents() : void 0;
    },
    componentDidUpdate: function() {
      return this._renderLayer();
    },
    _renderLayer: function() {
      var tree;
      if (this._target != null) {
        this._renderChildren();
        return;
      }
      if ((!this.props.show) && (this._target == null)) {
        return;
      }
      this._target = document.createElement('div');
      document.body.appendChild(this._target);
      if (typeof this.bindWindowEvents === "function") {
        this.bindWindowEvents();
      }
      tree = this.renderLayer(false);
      React.render(tree, this._target);
      return setTimeout((function(_this) {
        return function() {
          return _this._renderChildren();
        };
      })(this), 100);
    },
    _renderChildren: function() {
      var tree;
      tree = this.renderLayer(true);
      return React.render(tree, this._target);
    },
    _unrenderLayer: function() {
      return React.unmountComponentAtNode(this._target);
    }
  };

}).call(this);
