import { createStore, createEvent } from 'effector';
import connectLocalStorage from 'effector-localstorage';
import { LanguageCodes } from '../../constants/languageCodes';

const getBrowserLanguage = () => {
  if (navigator.language.toUpperCase()) {
    if (navigator.language.includes('EN')) {
      return LanguageCodes.EN;
    }
    if (navigator.language.includes('UZ')) {
      return LanguageCodes.UZ;
    }
    if (navigator.language.includes('RU')) {
      return LanguageCodes.RU;
    }
  }
  return LanguageCodes.EN;
};
const languageLocalStorage = connectLocalStorage('language');
export const changeLanguage = createEvent<LanguageCodes>();
export const $language = createStore<LanguageCodes>(languageLocalStorage.init(getBrowserLanguage()), {
  name: 'language',
}).on(changeLanguage, (state, payload) => payload);
$language.watch(languageLocalStorage);
