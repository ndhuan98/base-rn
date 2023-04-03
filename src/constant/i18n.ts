import I18n from 'react-native-i18n';
import en from './language/en';
import vi from './language/vi';

I18n.fallbacks = true;
I18n.translations = {en, vi};
I18n.locale = 'vi';

export default I18n;
