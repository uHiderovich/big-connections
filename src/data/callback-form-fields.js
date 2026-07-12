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
    name: 'tariff',
    placeholder: 'Выберите тариф',
    options: [
      { value: 'internet-50', label: 'Интернет 50' },
      { value: 'internet-100', label: 'Интернет 100' },
      { value: 'internet-200', label: 'Интернет 200' },
    ],
  },
];
