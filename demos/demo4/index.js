// Importing TranslatorJS 
var EOTranslator = require('./../assets/js/translator.min');

// Creating a dictionary
var dict = {
  'en': {
    'greet': 'Hello {name}!!',
    'tmp': 'tmp'
  },
  'fr': {
    'greet': 'Bonjour {name}!!'
  }
}

// Creating a translator
var translator = new EOTranslator(dict);

// Displaying the dictionary
console.log({ dictionary: dict });

// Translating the greeting in English...
var translation = translator.translate('greet', { params: { name: 'Oussama' } });

// Displaying the translation
console.log({ 'English greeting': translation });

// Translating the greeting in French...
translation = translator.translate('greet', { lang: 'fr', params: { name: 'Oussama' } });

// Displaying the translation
console.log({ 'French greeting': translation });

// Removing the `tmp` translation key
translator.remove('en', 'tmp');

// Displaying the dictionary
console.log({ dictionary: translator.dictionary });

// Updating the `greet` translation key in English
translator.add('en', 'greet', 'Hey, {name}! how are you?');

// Translating the greeting to French...
translation = translator.translate('greet', { params: { name: 'Oussama' } });

// Displaying the translation
console.log({ 'Updated English greeting': translation });

// Adding a new English translation, `home`
translator.add('en', 'home', 'My house is {width} {unit} wide.');

// Translating the `home` in English...
translation = translator.translate('home', { params: { width: 123, unit: 'meters' } });

// Displaying the translation
console.log({ 'Home': translation });

// Adding a nested Arabic translation
translator.add('ar', 'nested.translation.greet', 'مرحبا');

// Translating the Arabic greeting...
translation = translator.translate('greet', { lang: 'ar' });

// Displaying the translation
console.log({ 'Home': translation });

// Displaying the dictionary
console.log({ dictionary: translator.dictionary });
