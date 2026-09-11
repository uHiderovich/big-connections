import { privateInternetTariffs } from './private-internet-tariffs.js';

function toTariffOption(title, prefix) {
  const speed = title.match(/\d+/)?.[0] ?? title;

  return {
    value: `${prefix}-internet-${speed}`,
    label: title,
  };
}

export const callbackTariffOptionsByType = {
  apartments: [
    toTariffOption('Интернет 50', 'apartments'),
    toTariffOption('Интернет 100', 'apartments'),
    toTariffOption('Интернет 200', 'apartments'),
  ],
  'private-sector': privateInternetTariffs.map((tariff) =>
    toTariffOption(tariff.title, 'private'),
  ),
};

export const callbackSectionFormFields = [
  {
    type: 'text',
    name: 'name',
    placeholder: 'Ваше имя',
    autocomplete: 'name',
  },
  {
    type: 'tel',
    name: 'phone',
    placeholder: 'Ваш телефон *',
    autocomplete: 'tel',
    inputmode: 'tel',
    validate: 'phone',
    required: true,
  },
  {
    type: 'text',
    name: 'address',
    placeholder: 'Ваш адрес',
    autocomplete: 'street-address',
  },
];

export const callbackModalFormFields = [
  {
    type: 'text',
    name: 'name',
    placeholder: 'Ваше имя',
    autocomplete: 'name',
  },
  {
    type: 'tel',
    name: 'phone',
    placeholder: 'Ваш телефон *',
    autocomplete: 'tel',
    inputmode: 'tel',
    validate: 'phone',
    required: true,
  },
  {
    type: 'text',
    name: 'address',
    placeholder: 'Ваш адрес *',
    autocomplete: 'street-address',
    required: true,
  },
  {
    type: 'select',
    name: 'tariffType',
    placeholder: 'Выберите тип подключения',
    controls: 'tariff',
    options: [
      { value: 'apartments', label: 'Для квартир' },
      { value: 'private-sector', label: 'Для частного сектора' },
    ],
  },
  {
    type: 'select',
    name: 'tariff',
    placeholder: 'Выберите тариф',
    disabled: true,
    options: [],
  },
];
