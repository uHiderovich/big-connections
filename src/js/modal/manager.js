import MicroModal from 'micromodal'

export const Modal = {
  init() {
    MicroModal.init({
      awaitOpenAnimation: true,
      awaitCloseAnimation: true,
      openTrigger: 'data-bc-open',
      closeTrigger: 'data-bc-close',
      disableScroll: true,
    })
  },

  open(id) {
    MicroModal.show(id)
  },

  close(id) {
    MicroModal.close(id)
  },

  closeAll() {
    MicroModal.closeAll()
  }
}