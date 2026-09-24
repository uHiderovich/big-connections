import { apartmentInternetTariffs } from './apartment-internet-tariffs.js';
import { privateInternetTariffs } from './private-internet-tariffs.js';

const callbackTariffOptionsByType = {
  apartments: apartmentInternetTariffs.map(({ value, title }) => ({
    value,
    label: title,
  })),
  'private-sector': privateInternetTariffs.map(({ value, title }) => ({
    value,
    label: title,
  })),
};

const callbackTariffOptions = Object.entries(callbackTariffOptionsByType).flatMap(([parent, options]) =>
  options.map((option) => ({ ...option, parent })),
);

const nameField = {
  type: 'text',
  name: 'name',
  label: 'Ваше имя',
  placeholder: 'Ваше имя',
  autocomplete: 'name',
};

const phoneField = {
  type: 'tel',
  name: 'phone',
  label: 'Ваш телефон',
  placeholder: 'Ваш телефон *',
  autocomplete: 'tel',
  inputmode: 'tel',
  validate: 'phone',
  required: true,
};

export const callbackSectionFormFields = [
  nameField,
  phoneField,
  {
    type: 'text',
    name: 'address',
    label: 'Ваш адрес',
    placeholder: 'Ваш адрес',
    autocomplete: 'street-address',
  },
];

export const callbackModalFormFields = [
  nameField,
  phoneField,
  {
    type: 'text',
    name: 'address',
    label: 'Ваш адрес',
    placeholder: 'Ваш адрес *',
    autocomplete: 'street-address',
    required: true,
  },
  {
    type: 'select',
    name: 'tariffType',
    label: 'Тип подключения',
    placeholder: 'Выберите тип подключения',
    options: [
      { value: 'apartments', label: 'Для квартир' },
      { value: 'private-sector', label: 'Для частного сектора' },
    ],
  },
  {
    type: 'select',
    name: 'tariff',
    label: 'Тариф',
    placeholder: 'Выберите тариф',
    disabled: true,
    dependsOn: 'tariffType',
    options: callbackTariffOptions,
  },
];
