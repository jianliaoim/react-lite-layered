
React Lite Modal, Popover, Overlay
----

Modal, Popover, Overlay components from Talk by Teambition.

Demo http://ui.talk.ai/react-lite-layered/

Inspired by http://stackoverflow.com/a/26789089/883571

### Properties

This module contains 3 layered components. There are some **common properties**:

* `show`(`bool.isRequired`) controls visibility
* `name`(`string`, defaults to `default`), CSS hook `"is-for-#{name}"`

##### Modal

```coffee
T = React.PropTypes

propTypes:
  # this component accepts children
  name:             T.string
  title:            T.string
  onCloseClick:     T.func.isRequired
  showCornerClose:  T.bool
  show:             T.bool.isRequired
```

##### Popover

```coffee
propTypes:
  # this component accepts children
  title:              T.string
  name:               T.string
  onPopoverClose:     T.func
  positionAlgorithm:  T.func # could be customized
  baseArea:           T.object.isRequired # top, right, down, left
  showClose:          T.bool.isRequired
  show:               T.bool.isRequired
```

* `baseArea`(`object.isRequired`) positions get from `Element.getBoundingClientRect`

* `positionAlgorithm`(`func`, optional) if given, takes in `baseArea` and returns CSS styles


##### Overlay

```coffee
propTypes:
  # this component accepts children
  show: T.bool.isRequired
  name: T.string
```

> Notice: click content to close overlay, not the black area.

##### Transition

Transition component with timeout.
Read more at: https://github.com/facebook/react/issues/1326

### Supposition

These modules contains bussiness logics of Teambition.
I will suggest copy code and make create you own.

And the `layered` mixin is tricky. I hope it improved in the future.

### Usage

```bash
npm i --save react-lite-layered
```

Read [src/main.jsx](main)(compiles with Babel) for details:

[main]: https://github.com/teambition/react-lite-layered/blob/gh-pages/src/main.jsx

```jsx
import {default as React} from 'react';

import {Popover as Popover} from 'react-lite-layered';
import {Modal as Modal} from 'react-lite-layered';
import {Overlay as Overlay} from 'react-lite-layered';

import './modal.css';
import './popover.css';
import './overlay.css';
import './fade.css';
import './demo.css';

var App = React.createClass({
  displayName: 'page-app',

  getInitialState: function () {
    return {
      showModal: false,
      showPopover: false,
      showOverlay: false
    };
  },

  componentDidMount: function() {
    this._areaEl = this.refs.area.getDOMNode()
  },

  getTriggerArea: function() {
    if (this._areaEl) {
      return this._areaEl.getBoundingClientRect()
    } else {
      return {}
    }
  },

  onModalShow: function() {
    this.setState({showModal: true})
  },

  onModalHide: function() {
    this.setState({showModal: false})
  },

  onPopoverToggle: function(event){
    event.stopPropagation()
    this.setState({showPopover: !this.state.showPopover})
  },

  onPopoverClose: function() {
    this.setState({showPopover: false})
  },

  onOverlayToggle: function() {
    this.setState({showOverlay: !this.state.showOverlay})
  },

  onOverlayClose: function() {
    this.setState({showOverlay: false})
  },

  renderModal: function() {
    return <Modal
      name="page-app" title="demo of Modal"
      onCloseClick={this.onModalHide} showClose={true} show={this.state.showModal}>
      <div>{"Content of Modal, style this for yor self."}</div>
    </Modal>
  },

  renderPopover: function() {
    return <Popover
      onPopoverClose={this.onPopoverClose}
      baseArea={this.getTriggerArea()}
      showClose={true}
      title="title is optional"
      show={this.state.showPopover}>
      <div>Some content of popover</div>
    </Popover>
  },

  renderOverlay: function() {
    return <Overlay name="page-app" show={this.state.showOverlay}>
      <div className="content" onClick={this.onOverlayClose}>{"Content in Overlay"}</div>
    </Overlay>
  },

  render: function() {
    return <div className="page-app">
        <button onClick={this.onModalShow}>Show Modal</button>
        <button ref="area" onClick={this.onPopoverToggle}>Show Popover</button>
        <button onClick={this.onOverlayToggle}>Show Overlay</button>
        {this.renderModal()}
        {this.renderPopover()}
        {this.renderOverlay()}
    </div>
  }
});

var PageApp = React.createFactory(App);

var demo = document.querySelector('.demo');

React.render(PageApp(), demo);
```

### Develop

```text
npm i
```

You need a static file server for the HTML files. Personally I suggest using Nginx.

Develop:

```bash
gulp html # regenerate index.html
webpack-dev-server --hot # enable live-reloading
```

Build (Pack and optimize js, reivision js and add entry in `index.html`):

```bash
gulp build
```

### License

MIT
