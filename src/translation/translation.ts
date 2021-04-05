/* eslint-disable max-len */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  EN: {
    translation: {},
  },
  UZ: {
    translation: {},
  },
  RU: {
    translation: {
      'Publish date': 'Дата публикации',
      'International name': 'Международное название',
      Name: 'Наименование',
      Cost: 'Цена',
      'Cost ': 'Цена ',
      negotiable: 'договорная',
      expected: 'ожидается',
      Distributor: 'Поставщик',
      Manufacturer: 'Производитель',
      Country: 'Страна',
      Group: 'Группа',
      'Manage price lists': 'Управление прайс листами',
      'Product list': 'Список торговых наименований',
      'Distributor list': 'Каталог дистрибьютеров',
      Statistic: 'Статистика',
      Dashboard: 'Рабочий стол маркетолога',
      'Last summary price list': 'Сводный прайс',
      Users: 'Пользователи',
      'Add new': 'Добавить новый прайс',
      'Dollar rate': 'Курс доллара',
      'Euro rate': 'Курс евро',
      Status: 'Статус',
      new: 'глвый',
      active: 'активный',
      empty: 'пустой',
      'error processing': 'ошибка обработки',
      processing: 'на обработке',
      unknown: 'не известный',
      Document: 'Документ',
      'Value To': 'Значение "До"',
      'Value from': 'Значение "С"',
      'Condition filter': 'Фильтр по условию',
      'Value filter': 'Фильтр по значению',
      'Select options': 'Выберите значения',
      Clear: 'Сбросить',
      Accept: 'Применить',
      Contains: 'Содержит',
      'Enter value': 'Введите значение',
      'Date is invalid': 'Не верная дата',
      'Date to': 'Дата до',
      'change date': 'изменить дату',
      'Date from': 'Дата С',
      'Enter euro rate': 'Введите курс евро',
      'Enter dollar rate': 'Введите курс доллара',
      'Enter Publish date': 'Введите дату публикации',
      'Enter document': 'Загрузите документ',
      'Upload document': 'Загрузите документ',
      'Add new price': 'Добавить прайс лист',
      'Save changes': 'Сохранить изменения',
      Authorization: 'Авторизация',
      login: 'Логин',
      Login: 'Логин',
      'Please enter login': 'Введите логин',
      'Please enter password': 'Введите пароль',
      Password: 'Пароль',
      'Sign In': 'Войти',
      'Sign Up': 'Регистрация',
      'Remember me': 'Запомнить меня',
      RU: 'РУ',
      'Already Authorized?': 'Уже зарегистрированы?',
      'Confirm Password': 'Подтвердить пароль',
      Phone: 'Телефон',
      Email: 'Email',
      'Middle Name': 'Отчество',
      'First Name': 'Имя',
      Surname: 'Фамилия',
      'Export to Excel': 'Экспорт в Excel',
      'You can export no more than 1000': 'Вы можете экспортировать не более 1000 записей',
      'Excel export is available only for the number of records no more than 1000':
        'Вы можете экспортировать в Excel не более 1000 записей',
      Fullname: 'Ф.И.О.',
      Role: 'Роль',
      'Registered at': 'Дата регистрации',
      Administrator: 'Администратор',
      Client: 'Клиент',
      Guest: 'Гость',
      Markerter: 'Маркетолог',
      Actions: 'Действия',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'EN',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
