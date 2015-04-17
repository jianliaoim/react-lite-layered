
import {default as React} from 'react';

import {Popover as Popover} from './index';
import {Modal as Modal} from './index';

import './modal.css';
import './popover.css';

var App = React.createClass({
  displayName: 'page-app',

  getInitialState: function () {
    return {
      showModal: false,
      showPopover: false
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

  renderModal: function() {
    return <Modal
      name="page-app" title="demo of Modal"
      onCloseClick={this.onModalHide} showClose={true} show={this.state.showModal}>
      <div>Content of Modal, style this for yor self.</div>
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

  render: function() {
    return <div className="page-app">
        <button onClick={this.onModalShow}>Show Modal</button>
        <button ref="area" onClick={this.onPopoverToggle}>Show Popover</button>
        {this.renderModal()}
        {this.renderPopover()}
    </div>
  }
});

var PageApp = React.createFactory(App);

var demo = document.querySelector('.demo');

React.render(PageApp(), demo);
