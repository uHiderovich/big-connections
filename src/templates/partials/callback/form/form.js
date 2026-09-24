import JustValidate from 'just-validate';
import IMask from 'imask';
import { defineComponent } from '@/js/helpers/defineComponent';
import { initCallbackSelects } from '@/templates/partials/select/select';

const validClass = 'callback-form__field--valid';
const invalidClass = 'callback-form__field--invalid';
const boxStateClasses = ['callback--success', 'callback--error'];

const phonePatterns = [
  /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
  /^8 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
];

function isValidPhonePattern(value) {
  return phonePatterns.some((pattern) => pattern.test(value));
}

function updateFieldWithoutRulesState(field) {
  field.classList.remove(invalidClass);

  if (field.value.trim()) {
    field.classList.add(validClass);
    return;
  }

  field.classList.remove(validClass);
}

function setBoxState(container, state) {
  container.classList.remove(...boxStateClasses);

  if (state) {
    container.classList.add(`callback--${state}`);
  }
}

function getSubmitUrl(form) {
  const customUrl = form.dataset.submitUrl;

  if (customUrl) {
    return customUrl;
  }

  const action = form.getAttribute('action');

  if (!action || action === '#') {
    return null;
  }

  return action;
}

async function sendForm(form, formData) {
  const submitUrl = getSubmitUrl(form);

  if (!submitUrl) {
    throw new Error('Submit URL is not configured');
  }

  const response = await fetch(submitUrl, {
    method: form.method || 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Submit failed');
  }
}

const showFormView = (container) => {
  setBoxState(container);
};

const showSuccessView = (container) => {
  setBoxState(container, 'success');
};

const showErrorView = (container) => {
  setBoxState(container, 'error');
};

function initForm(config) {
  const { container, successCallback, errorCallback } = config;

  const form = container.querySelector('.js-callback-form');

  if (!form) {
    return null;
  }

  const selects = initCallbackSelects(form);

  const masks = [...form.querySelectorAll('[data-validate="phone"]')].map((phone) =>
    IMask(phone, {
      mask: [
        '+{7} (000) 000-00-00',
        '8 (000) 000-00-00',
      ],
    }),
  );

  const validation = new JustValidate(form, {
    errorFieldCssClass: invalidClass,
    successFieldCssClass: validClass,
    errorLabelStyle: null,
    errorLabelCssClass: ['callback-form__error'],
    submitFormAutomatically: false,
  });

  form.querySelectorAll('[data-required]').forEach((field) => {
    const rules = [
      {
        rule: 'required',
        errorMessage: 'Поле обязательно для заполнения',
      },
    ];

    if (field.dataset.validate === 'phone') {
      rules.push({
        validator: isValidPhonePattern,
        errorMessage: 'Неправильный формат номера телефона',
      });
    }

    validation.addField(`[name="${field.name}"]`, rules);
  });

  form.querySelectorAll('input:not([type="hidden"]):not([data-required]):not([data-validate])').forEach((field) => {
    field.addEventListener('input', () => {
      updateFieldWithoutRulesState(field);
    });
  });

  const resetForm = () => {
    form.reset();
    masks.forEach((mask) => mask.updateValue());
    selects.reset();
    validation.clearErrors();
    form.querySelectorAll(`.${validClass}, .${invalidClass}`).forEach((field) => {
      field.classList.remove(validClass, invalidClass);
    });
  };

  validation.onSuccess(async () => {
    // lockForm() disables fields, and disabled fields are excluded from FormData
    const formData = new FormData(form);

    validation.lockForm();

    let isSent = false;

    try {
      await sendForm(form, formData);
      isSent = true;
    } catch {
      errorCallback();
    } finally {
      validation.unlockForm();
    }

    if (isSent) {
      successCallback();
      resetForm();
    }
  });

  return {
    resetView: showFormView,
    resetForm,
    setValues: selects.setValues,
    form,
    validation,
  };
}

defineComponent({
  selector: '.js-callback-box',
  setup(container) {
    initForm({
      container,
      successCallback: () => {
        showSuccessView(container);
      },
      errorCallback: () => {
        showErrorView(container);
      },
    });

    container.addEventListener('click', (event) => {
      if (!event.target.closest('.js-callback-close')) {
        return;
      }

      showFormView(container);
    });
  },
});

export { initForm, setBoxState };
