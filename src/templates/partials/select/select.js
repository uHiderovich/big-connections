import Choices from 'choices.js';
import 'choices.js/public/assets/styles/choices.css';

const choicesConfig = {
  searchEnabled: false,
  itemSelectText: '',
  shouldSort: false,
  allowHTML: false,
  position: 'bottom',
};

function getOptions(select) {
  return [...select.querySelectorAll('option:not([value=""])')].map((option) => ({
    value: option.value,
    label: option.textContent.trim(),
    parent: option.dataset.parent,
    selected: option.selected,
  }));
}

function renderChoices(control, { parentValue, selectedValue = '' }) {
  const { select, choices, options, parentName } = control;
  const availableOptions = parentName
    ? options.filter((option) => option.parent === parentValue)
    : options;
  const hasSelected = availableOptions.some((option) => option.value === selectedValue);

  choices.setChoices(
    [
      {
        value: '',
        label: select.dataset.placeholder,
        selected: !hasSelected,
        disabled: true,
        placeholder: true,
      },
      ...availableOptions.map(({ value, label }) => ({
        value,
        label,
        selected: value === selectedValue,
      })),
    ],
    'value',
    'label',
    true,
    true,
    true,
  );

  if (!parentName) {
    return;
  }

  if (availableOptions.length) {
    choices.enable();
    return;
  }

  choices.disable();
}

export function initCallbackSelects(form) {
  const controls = [...form.querySelectorAll('.js-choices-select')].map((select) => {
    const options = getOptions(select);
    const choices = new Choices(select, choicesConfig);

    if (select.disabled) {
      choices.disable();
    }

    return {
      select,
      choices,
      options,
      parentName: select.dataset.dependsOn,
    };
  });

  const getParentValue = (control) => form.querySelector(`[name="${control.parentName}"]`)?.value ?? '';

  controls
    .filter((control) => control.parentName)
    .forEach((control) => {
      const parentValue = getParentValue(control);

      if (parentValue) {
        renderChoices(control, {
          parentValue,
          selectedValue: control.options.find((option) => option.selected)?.value,
        });
      }

      form.querySelector(`[name="${control.parentName}"]`)?.addEventListener('change', () => {
        renderChoices(control, { parentValue: getParentValue(control) });
      });
    });

  const setValues = (values = {}) => {
    controls.forEach((control) => {
      renderChoices(control, {
        parentValue: control.parentName ? getParentValue(control) : undefined,
        selectedValue: values[control.select.name],
      });
    });
  };

  return {
    setValues,
    reset: () => setValues(),
  };
}
