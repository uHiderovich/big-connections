import JustValidate from 'just-validate';
import IMask from 'imask';

const validClass = 'callback__field--valid';
const invalidClass = 'callback__field--invalid';

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

const boxStateClasses = ['callback__box--success', 'callback__box--error'];

function setBoxState(box, state) {
  box.classList.remove(...boxStateClasses);

  if (state) {
    box.classList.add(`callback__box--${state}`);
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

async function sendForm(form) {
  const submitUrl = getSubmitUrl(form);

  if (!submitUrl) {
    throw new Error('Submit URL is not configured');
  }

  const response = await fetch(submitUrl, {
    method: form.method || 'POST',
    body: new FormData(form),
  });

  if (!response.ok) {
    throw new Error('Submit failed');
  }
}

export function init() {
  const formSelector = '.js-callback-form';

  const box = document.querySelector('.js-callback-box');
  const form = document.querySelector(formSelector);
  const phone = form?.querySelector('[data-validate="phone"]');

  if (!box || !form) {
    return;
  }

  const showFormView = () => {
    setBoxState(box);
  };

  const showSuccessView = () => {
    setBoxState(box, 'success');
  };

  const showErrorView = () => {
    setBoxState(box, 'error');
  };

  if (phone) {
    IMask(phone, {
      mask: [
        '+{7} (000) 000-00-00',
        '8 (000) 000-00-00',
      ],
    });
  }

  const validation = new JustValidate(formSelector, {
    errorFieldCssClass: invalidClass,
    successFieldCssClass: validClass,
    errorLabelStyle: null,
    errorLabelCssClass: ['callback__error'],
    submitFormAutomatically: false,
  });

  validation.addField('[name="phone"]', [
    {
      rule: 'required',
      errorMessage: 'Поле обязательно для заполнения',
    },
    {
      validator: isValidPhonePattern,
      errorMessage: 'Неправильный формат номера телефона',
    },
  ]);

  const fieldsWithoutRules = form.querySelectorAll(
    'input:not([data-required]):not([data-validate])',
  );

  fieldsWithoutRules.forEach((field) => {
    field.addEventListener('input', () => {
      updateFieldWithoutRulesState(field);
    });
  });

  box.addEventListener('click', (event) => {
    if (!event.target.closest('.js-callback-close')) {
      return;
    }

    showFormView();
  });

  validation.onSuccess(async () => {
    validation.lockForm();

    try {
      await sendForm(form);
      showSuccessView();
    } catch {
      showErrorView();
    } finally {
      validation.unlockForm();
    }
  });
}
