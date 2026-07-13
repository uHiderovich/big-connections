import MicroModal from 'micromodal'

MicroModal.init({
  awaitOpenAnimation: true,
  awaitCloseAnimation: true,
  openTrigger: 'data-bc-open',
  closeTrigger: 'data-bc-close',
  disableScroll: true,
})

export const Modal = {
  open(id) {
    MicroModal.show(id)
  },

  close(id) {
    MicroModal.close(id)
  }
}