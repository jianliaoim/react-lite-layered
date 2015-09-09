React = require 'react'

LiteDialog = React.createFactory require('../src/index').Dialog
LiteFileModal = React.createFactory require('../src/index').FileModal
LiteMiniWrapper = React.createFactory require('../src/index').MiniWrapper
LiteModal = React.createFactory require('../src/index').Modal
LiteOverlay = React.createFactory require('../src/index').Overlay
LitePopover = React.createFactory require('../src/index').Popover
LiteReaderModal = React.createFactory require('../src/index').ReaderModal

div = React.createFactory 'div'
p = React.createFactory 'p'

App = React.createFactory React.createClass
  displayName: 'app'

  getInitialState: ->
    showDialog: false
    showFileModal: false
    showModal: false
    showOverlay: false
    showPopover: false
    showReaderModal: false

  componentDidMount: ->
    @_areaEl = @refs.area.getDOMNode()

  getTriggerArea: ->
    if @_areaEl?
      @_areaEl.getBoundingClientRect()
    else
      {}

  onDialogShow: -> @setState showDialog: true
  onDialogClose: -> @setState showDialog: false
  onFileModalShow: -> @setState showFileModal: true
  onFileModalClose: -> @setState showFileModal: false
  onModalShow: -> @setState showModal: true
  onModalClose: -> @setState showModal: false
  onOverlayToggle: -> @setState showOverlay: !@state.showOverlay
  onOverlayClose: -> @setState showOverlay: false
  onPopoverToggle: ->
    event.stopPropagation()
    @setState showPopover: !@state.showPopover
  onPopoverClose: -> @setState showPopover: false
  onReaderModalShow: -> @setState showReaderModal: true
  onReaderModalClose: -> @setState showReaderModal: false

  renderDialog: ->
    LiteDialog
      show: @state.showDialog
      cancel: 'Cancel'
      confirm: 'Confirm'
      content: 'Dialog Demo'
      onCloseClick: @onDialogClose
      onConfirm: @onDialogClose,
        div null, 'Hello, world!'

  renderFileModal: ->
    LiteFileModal
      show: @state.showFileModal
      showClose: true
      onCloseClick: @onFileModalClose,
        div null,
          div className: 'header', 'File Modal Demo'
          div className: 'content',
            p style: height: '500px', 'This paragraph\'s height is 500px'
          div className: 'footer', 'Footer'

  renderMiniWrapper: ->
    LiteMiniWrapper
      title: 'Mini Wrapper Demo',
        div null, 'hey'

  renderModal: ->
    LiteModal
      show: @state.showModal
      title: 'Modal Demo'
      showClose: true
      onCloseClick: @onModalClose,
        div null, 'Content of Modal, style this for yor self.'
        div null, 'Better if you add some padding.'

  renderOverlay: ->
    LiteOverlay
      show: @state.showOverlay,
        div className: 'content', onClick: @onOverlayClose,
          'Content in Overlay. Click here to close.'

  renderPopover: ->
    LitePopover
      show: @state.showPopover
      title: 'Popover Demo'
      baseArea: @getTriggerArea()
      showClose: true
      onPopoverClose: @onPopoverClose,
        div null,
          p null, 'Some content of popover'
          p null, 'This can be a list'
          p null, 'Add padding as you want'

  renderReaderModal: ->
    LiteReaderModal
      show: @state.showReaderModal
      showClose: true
      onCloseClick: @onReaderModalClose,
        div null,
          div className: 'header', 'Reader Demo'
          div className: 'content',
            p style: height: '500px', 'This paragraph\'s height is 500px'
          div className: 'footer'

  render: ->
    div className: 'app',
      div className: 'button', onClick: @onDialogShow, 'Dialog'
      div className: 'button', onClick: @onFileModalShow, 'File Modal'
      div className: 'button', onClick: @onModalShow, 'Modal'
      div className: 'button', onClick: @onOverlayToggle, 'Overlay'
      div className: 'button', ref: 'area', onClick: @onPopoverToggle, 'Popover'
      div className: 'button', onClick: @onReaderModalShow, 'Reader Modal'
      div className: 'section',
        @renderMiniWrapper()

      @renderDialog()
      @renderFileModal()
      @renderModal()
      @renderOverlay()
      @renderPopover()
      @renderReaderModal()

React.render App(), document.getElementById 'example'
