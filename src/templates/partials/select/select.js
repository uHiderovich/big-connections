import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.css';

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

function getDependentOptions(select) {
  return [...select.querySelectorAll('option[data-parent]')].map((option) => ({
    value: option.value,
    label: option.textContent.trim(),
    parent: option.dataset.parent,
    selected: option.selected,
  }));
}

function setDependentChoices({ choices, select, options, parentValue, keepSelected = false }) {
  const filteredOptions = options
    .filter((option) => option.parent === parentValue)
    .map(({ value, label, selected }) => ({
      value,
      label,
      selected: keepSelected && selected,
    }));

  choices.setChoices([getPlaceholderChoice(select), ...filteredOptions], 'value', 'label', true, true, true);

  if (filteredOptions.length) {
    choices.enable();
    return;
  }

  choices.disable();
}

function initDependentSelect({ form, select, choices, options }) {
  const parentSelect = form.querySelector(`[name="${select.dataset.dependsOn}"]`);

  if (!parentSelect) {
    return;
  }

  if (parentSelect.value) {
    setDependentChoices({
      choices,
      select,
      options,
      parentValue: parentSelect.value,
      keepSelected: true,
    });
  }

  parentSelect.addEventListener('change', () => {
    setDependentChoices({
      choices,
      select,
      options,
      parentValue: parentSelect.value,
    });
  });
}

export function initCallbackSelects(form) {
  const selects = [...form.querySelectorAll('.js-choices-select')];

  if (!selects.length) {
    return;
  }

  const dependentSelects = selects.filter((select) => select.dataset.dependsOn);
  const dependentOptions = new Map(
    dependentSelects.map((select) => [select, getDependentOptions(select)]),
  );

  selects.forEach((select) => {
    const choices = new Choices(select, choicesConfig);

    if (select.disabled) {
      choices.disable();
    }

    if (dependentOptions.has(select)) {
      initDependentSelect({
        form,
        select,
        choices,
        options: dependentOptions.get(select),
      });
    }
  });
}
