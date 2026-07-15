import { defineComponent } from '@/js/helpers/defineComponent';
import { Modal } from '@/js/modal';
import { initForm } from '@/templates/partials/callback/form/form';

defineComponent({
  selector: '.js-callback-modal',
  setup(container) {
    initForm({
      container,
      successCallback: () => {
        Modal.closeAll();
        Modal.open('callback-modal-success');
      },
      errorCallback: () => {
        Modal.open('callback-modal-error');
      },
    });
  },
});