
import {default as React} from 'react';

import {Dialog as Dialog} from '../index';
import {Popover as Popover} from '../index';
import {Modal as Modal} from '../index';
import {Overlay as Overlay} from '../index';

import './theme.css';
import '../style.less';

var App = React.createClass({
  displayName: 'page-app',

  getInitialState: function () {
    return {
      showDialog: false,
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

  onDialogShow: function() {
    this.setState({showDialog: true});
  },

  onDialogClose: function() {
    this.setState({showDialog: false});
  },

  onModalShow: function() {
    this.setState({showModal: true});
  },

  onModalHide: function() {
    this.setState({showModal: false});
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

  renderDialog: function() {
    return <Dialog
      name="page-app" title="demo of Dialog"
      cancel="cancel" confirm="confirm"
      onCloseClick={this.onDialogClose} onConfirm={this.onDialogClose} show={this.state.showDialog}>
    </Dialog>
  },

  renderModal: function() {
    return <Modal
      name="page-app" title="demo of Modal"
      onCloseClick={this.onModalHide} showClose={true} show={this.state.showModal}>
      <div>{"Content of Modal, style this for yor self."}</div>
      <div>{"Better if you add some padding~"}</div>
    </Modal>
  },

  renderPopover: function() {
    return <Popover
      onPopoverClose={this.onPopoverClose}
      baseArea={this.getTriggerArea()}
      showClose={true}
      title="Title is Optional"
      show={this.state.showPopover}>
      <div>
        {'Some content of popover'}
        <br/>
        {'This can be a list'}
        <br/>
        {'Add padding as you want'}
      </div>
    </Popover>
  },

  renderOverlay: function() {
    return <Overlay name="page-app" show={this.state.showOverlay}>
      <div className="content" onClick={this.onOverlayClose}>
        {"Content in Overlay. Click here to close."}
      </div>
    </Overlay>
  },

  render: function() {
    return <div className="page-app">
        <div className="button" onClick={this.onDialogShow}>Show Dialog</div>
        <div className="button" onClick={this.onModalShow}>Show Modal</div>
        <div className="button" ref="area" onClick={this.onPopoverToggle}>Show Popover</div>
        <div className="button" onClick={this.onOverlayToggle}>Show Overlay</div>
        {this.renderDialog()}
        {this.renderModal()}
        {this.renderPopover()}
        {this.renderOverlay()}
    </div>
  }
});

var PageApp = React.createFactory(App);

var demo = document.querySelector('.demo');

React.render(PageApp(), demo);
