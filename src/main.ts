import { el, setChildren } from 'redom';
import Inputmask from 'inputmask'; // Импортируем библиотеку для маски ввода
import * as cardValidator from 'card-validator'; // Импортируем библиотеку для валидации данных карты
import './style.css'; // Импортируем файл стилей
import visaImage from '/assets/visa-logo.svg'; // Импортируем изображение для Visa
import mastercardImage from '/assets/mastercard-logo.svg'; // Импортируем изображение для Mastercard
import mirImage from '/assets/mir-logo.svg'; // Импортируем изображение для МИР

// Создаем элементы img для логотипов карт
const visaImgElement = el('img', { src: visaImage, alt: 'Visa' });
const mastercardImgElement = el('img', { src: mastercardImage, alt: 'Mastercard' });
const mirImgElement = el('img', { src: mirImage, alt: 'МИР' });

// Создаем контейнер для логотипа карты
const cardImageContainer = el('div.flex.items-center.w-16.h-10');

// Функция для обновления логотипа карты в зависимости от типа карты
type CardType = 'visa' | 'mastercard' | 'mir' | '';

function updateCardLogo(cardType: CardType): void {
  // Очищаем контейнер
  setChildren(cardImageContainer, []);

  // В зависимости от типа карты обновляем логотип
  switch (cardType) {
    case 'visa':
      setChildren(cardImageContainer, [visaImgElement]);
      break;
    case 'mastercard':
      setChildren(cardImageContainer, [mastercardImgElement]);
      break;
    case 'mir':
      setChildren(cardImageContainer, [mirImgElement]);
      break;
    default:
      break;
  }
}

// Функция для получения значения ввода без нецифровых символов
function getInputValue(input: HTMLInputElement): string {
  return input.value.replace(/\D/g, '');
}

// Функция для валидации номера карты
export function validateCardNumber(cardNumber: string | number): boolean {
  // Преобразуем входное значение в строку
  const cardNumberStr = String(cardNumber);
  
  // Удаляем все нецифровые символы из строки
  const cleanedCardNumber = cardNumberStr.replace(/\D/g, '');
  
  // Выполняем валидацию очищенного номера карты
  const cardInfo = cardValidator.number(cleanedCardNumber);
  
  // Возвращаем результат валидации
  return cardInfo.isValid;
}

// Функция для валидации CVC/CVV кода
export function validateCvc(cvc: string | number): boolean {
  const cvcStr = String(cvc);
  const cvcInfo = cardValidator.cvv(cvcStr);
  return cvcInfo.isValid;
}

// Функция для валидации email
export function validateEmail(email: string | number): { isValid: boolean } {
  const emailStr = String(email);
  const emailRegex = /^[A-Z._%+-]+[A-Z0-9._%+-]*@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const isValid = emailRegex.test(emailStr);
  return { isValid };
}

// Функция для создания элементов формы
export function createFormElements() {
  const cardNumberInput = el(
    'input#card-number.input.w-full.p-2.border.rounded-md',
    {
      placeholder: 'Введите номер карты',
      required: true,
    }
  ) as HTMLInputElement;

  const expiryInput = el(
    'input#expiry.input.w-full.p-2.border.rounded-md',
    {
      placeholder: 'ММ/ГГ',
      required: true,
    }
  ) as HTMLInputElement;

  const cvcInput = el(
    'input#cvc.input.w-full.p-2.border.rounded-md',
    {
      placeholder: 'Введите CVC/CVV',
      required: true,
    }
  ) as HTMLInputElement;

  const emailInput = el(
    'input#email.input.w-full.p-2.border.rounded-md',
    {
      placeholder: 'Введите email',
      required: true,
      type: 'email',
    }
  ) as HTMLInputElement;

  return {
    cardNumberInput,
    expiryInput,
    cvcInput,
    emailInput,
  };
}

// Создаем элементы формы с помощью функции createFormElements
const {
  cardNumberInput, expiryInput, cvcInput, emailInput
} = createFormElements();

// Создаем кнопку "Оплатить"
export const payButton = el(
  'button.button.bg-blue-500.text-white.w-1/4.p-2.rounded-md.disabled:bg-gray-400.disabled:text-gray-600.disabled:cursor-not-allowed',
  {
    disabled: true,
  },
  'Оплатить'
) as HTMLButtonElement;

// Функция для обновления состояния кнопки "Оплатить"
export function updatePayButtonState() {
  const cardNumber = getInputValue(cardNumberInput);
  const isCardNumberValid = validateCardNumber(cardNumber);

  const expiryDate = getInputValue(expiryInput);
  const expiryInfo = cardValidator.expirationDate(expiryDate);

  const cvc = getInputValue(cvcInput);
  const isCvcValid = validateCvc(cvc);

  const email = emailInput.value;
  const emailInfo = validateEmail(email);

  payButton.disabled = !(
    isCardNumberValid &&
    expiryInfo.isValid &&
    isCvcValid &&
    emailInfo.isValid
  );
}

// Создаем элементы для отображения ошибок
const cardNumberError = el('div.text-red-600.hidden', 'Неверный номер карты') as HTMLDivElement;
const expiryError = el('div.text-red-600.hidden', 'Неверная дата окончания') as HTMLDivElement;
const cvcError = el('div.text-red-600.hidden', 'Неверный CVC/CVV') as HTMLDivElement;
const emailError = el('div.text-red-600.hidden', 'Неверный email') as HTMLDivElement;

cardNumberInput.addEventListener('input', () => {
  cardNumberError.classList.add('hidden');
  updatePayButtonState();
  const cardNumber = getInputValue(cardNumberInput);
  const cardInfo = cardValidator.number(cardNumber);

  if (cardInfo.card && cardInfo.card.type) {
    const cardType: CardType = (cardInfo.card.type.toLowerCase() as CardType) || '';
    updateCardLogo(cardType);
  } else {
    updateCardLogo('');
  }
});

cardNumberInput.addEventListener('blur', () => {
  const cardNumber = getInputValue(cardNumberInput);
  const cardInfo = cardValidator.number(cardNumber);
  if (!cardInfo.isValid) {
    cardNumberError.classList.remove('hidden');
  }
  updatePayButtonState();
});

expiryInput.addEventListener('input', () => {
  expiryError.classList.add('hidden');
  updatePayButtonState();
});

expiryInput.addEventListener('blur', () => {
  const expiryDate = getInputValue(expiryInput);
  const expiryInfo = cardValidator.expirationDate(expiryDate);
  if (!expiryInfo.isValid) {
    expiryError.classList.remove('hidden');
  }
  updatePayButtonState();
});

cvcInput.addEventListener('input', () => {
  cvcError.classList.add('hidden');
  updatePayButtonState();
});

cvcInput.addEventListener('blur', () => {
  const cvc = getInputValue(cvcInput);
  const cvcInfo = cardValidator.cvv(cvc);
  if (!cvcInfo.isValid) {
    cvcError.classList.remove('hidden');
  }
  updatePayButtonState();
});

emailInput.addEventListener('input', () => {
  emailError.classList.add('hidden');
  updatePayButtonState();
});

emailInput.addEventListener('blur', () => {
  const email = emailInput.value;
  const emailInfo = validateEmail(email);
  if (!emailInfo.isValid) {
    emailError.classList.remove('hidden');
  }
  updatePayButtonState();
});

// Создаем контейнер для ввода номера карты и логотипа карты
const cardNumberInputContainer = el('div.flex.items-center.gap-4', [
  cardNumberInput,
  cardImageContainer,
]);

// Создаем форму
const form = el('form#payment-form.flex.flex-col.items-center.w-1/4', [
  el('div.mb-4.w-full', [
    el('label.text-gray-600', 'Номер карты'),
    cardNumberInputContainer,
    cardNumberError,
  ]),
  el('div.mb-4.flex.w-full', [
    el('div.w-1/2.pr-2', [
      el('label.text-gray-600', 'Дата окончания'),
      expiryInput,
      expiryError,
    ]),
    el('div.w-1/2.pl-2', [
      el('label.text-gray-600', 'CVC/CVV'),
      cvcInput,
      cvcError,
    ]),
  ]),
  el('div.mb-4.w-full', [
    el('label.text-gray-600', 'Email'),
    emailInput,
    emailError,
  ]),
  payButton,
]);

// Создаем заголовок страницы
const pageTitle = el('h1.text-4xl.font-semibold.mb-3.mt-5', 'Форма оплаты');

// Добавляем заголовок и форму на страницу
setChildren(document.body, [pageTitle, form]);

// Применяем маски ввода к полям формы
const cardNumberMask = new Inputmask('9999 9999 9999 9999 [99]');
cardNumberMask.mask(cardNumberInput);

const expiryMask = new Inputmask('99/99');
expiryMask.mask(expiryInput);

const cvcMask = new Inputmask('999');
cvcMask.mask(cvcInput);

// Обрабатываем нажатие на кнопку "Оплатить"
payButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  const cardNumber = getInputValue(cardNumberInput);
  const expiryDate = getInputValue(expiryInput);
  const cvc = getInputValue(cvcInput);
  const email = emailInput.value;

  const paymentData = {
    cardNumber,
    expiryDate,
    cvc,
    email,
  };

  console.log(paymentData); // Выводим данные платежа в консоль
});