(function() {
  var EVENT_NAME_MAP, React, ReactTransitionGroup, TICK, TimeoutTransitionGroup, TimeoutTransitionGroupChild, addClass, animationSupported, detectEvents, endEvents, removeClass;

  React = require("react/addons");

  animationSupported = function() {
    return endEvents.length !== 0;
  };

  removeClass = function(node, x) {
    var classList;
    classList = node.className.split(' ');
    classList = classList.filter(function(name) {
      return name !== x;
    });
    return node.className = classList.join(' ');
  };

  addClass = function(node, x) {
    var classList;
    classList = node.className.split(' ');
    classList = classList.concat([x]);
    return node.className = classList.join(' ');
  };

  ReactTransitionGroup = React.addons.TransitionGroup;

  TICK = 17;

  EVENT_NAME_MAP = {
    transitionend: {
      transition: "transitionend",
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "mozTransitionEnd",
      OTransition: "oTransitionEnd",
      msTransition: "MSTransitionEnd"
    },
    animationend: {
      animation: "animationend",
      WebkitAnimation: "webkitAnimationEnd",
      MozAnimation: "mozAnimationEnd",
      OAnimation: "oAnimationEnd",
      msAnimation: "MSAnimationEnd"
    }
  };

  endEvents = [];

  (detectEvents = function() {
    var baseEventName, baseEvents, style, styleName, testEl;
    if (typeof window === "undefined") {
      return;
    }
    testEl = document.createElement("div");
    style = testEl.style;
    if (!("AnimationEvent" in window)) {
      delete EVENT_NAME_MAP.animationend.animation;
    }
    if (!("TransitionEvent" in window)) {
      delete EVENT_NAME_MAP.transitionend.transition;
    }
    for (baseEventName in EVENT_NAME_MAP) {
      if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
        baseEvents = EVENT_NAME_MAP[baseEventName];
        for (styleName in baseEvents) {
          if (styleName in style) {
            endEvents.push(baseEvents[styleName]);
            break;
          }
        }
      }
    }
  })();

  TimeoutTransitionGroupChild = React.createClass({
    displayName: "TimeoutTransitionGroupChild",
    transition: function(animationType, finishCallback) {
      var activeClassName, className, endListener, node;
      node = this.getDOMNode();
      className = this.props.name + "-" + animationType;
      activeClassName = className + "-active";
      endListener = function() {
        removeClass(node, className);
        removeClass(node, activeClassName);
        finishCallback && finishCallback();
      };
      if (!animationSupported()) {
        endListener();
      } else {
        if (animationType === "enter") {
          this.animationTimeout = setTimeout(endListener, this.props.enterTimeout);
        } else {
          if (animationType === "leave") {
            this.animationTimeout = setTimeout(endListener, this.props.leaveTimeout);
          }
        }
      }
      addClass(node, className);
      this.queueClass(activeClassName);
    },
    queueClass: function(className) {
      this.classNameQueue.push(className);
      if (!this.timeout) {
        this.timeout = setTimeout(this.flushClassNameQueue, TICK);
      }
    },
    flushClassNameQueue: function() {
      if (this.isMounted()) {
        addClass(this.getDOMNode(), this.classNameQueue.join(" "));
      }
      this.classNameQueue.length = 0;
      this.timeout = null;
    },
    componentWillMount: function() {
      this.classNameQueue = [];
    },
    componentWillUnmount: function() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      if (this.animationTimeout) {
        clearTimeout(this.animationTimeout);
      }
    },
    componentWillEnter: function(done) {
      if (this.props.enter) {
        this.transition("enter", done);
      } else {
        done();
      }
    },
    componentWillLeave: function(done) {
      if (this.props.leave) {
        this.transition("leave", done);
      } else {
        done();
      }
    },
    render: function() {
      return React.Children.only(this.props.children);
    }
  });

  TimeoutTransitionGroup = React.createClass({
    displayName: "TimeoutTransitionGroup",
    propTypes: {
      enterTimeout: React.PropTypes.number.isRequired,
      leaveTimeout: React.PropTypes.number.isRequired,
      transitionName: React.PropTypes.string.isRequired,
      transitionEnter: React.PropTypes.bool,
      transitionLeave: React.PropTypes.bool
    },
    getDefaultProps: function() {
      return {
        transitionEnter: true,
        transitionLeave: true
      };
    },
    _wrapChild: function(child) {
      return React.createElement(TimeoutTransitionGroupChild, {
        enterTimeout: this.props.enterTimeout,
        leaveTimeout: this.props.leaveTimeout,
        name: this.props.transitionName,
        enter: this.props.transitionEnter,
        leave: this.props.transitionLeave
      }, child);
    },
    render: function() {
      return React.createElement(ReactTransitionGroup, React.__spread({}, this.props, {
        childFactory: this._wrapChild
      }));
    }
  });

  module.exports = TimeoutTransitionGroup;

}).call(this);
