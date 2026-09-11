import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.css';

import { callbackTariffOptionsByType } from '@/data/callback-form-fields';

const choicesConfig = {
  searchEnabled: false,
  itemSelectText: '',
  shouldSort: false,
  allowHTML: false,
  position: 'bottom',
};

function getPlaceholderChoice(select) {
  return {
    value: '',
    label: select.dataset.placeholder || 'Выберите тариф',
    selected: true,
    disabled: true,
    placeholder: true,
  };
}

function setTariffChoices(tariffChoices, select, type) {
  const options = callbackTariffOptionsByType[type] ?? [];

  tariffChoices.setChoices([getPlaceholderChoice(select), ...options], 'value', 'label', true);

  if (options.length) {
    tariffChoices.enable();
    return;
  }

  tariffChoices.disable();
}

export function initCallbackSelects(form) {
  const selects = [...form.querySelectorAll('.js-choices-select')];

  if (!selects.length) {
    return;
  }

  const instances = new Map();

  selects.forEach((select) => {
    const choices = new Choices(select, choicesConfig);

    instances.set(select.name, choices);

    if (select.disabled) {
      choices.disable();
    }
  });

  const typeSelect = form.querySelector('[data-controls="tariff"]');
  const tariffSelect = form.querySelector('[name="tariff"]');
  const tariffChoices = instances.get('tariff');

  if (!typeSelect || !tariffSelect || !tariffChoices) {
    return;
  }

  typeSelect.addEventListener('change', () => {
    setTariffChoices(tariffChoices, tariffSelect, typeSelect.value);
  });
}
