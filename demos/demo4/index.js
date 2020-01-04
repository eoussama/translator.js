var EOTranslator = require('./../assets/js/eo-translator.min');

var dict = {
  'en': {
    'greet': 'Hello {name}!!'
  },
  'fr': {
    'greet': 'Bonjour {name}!!'
  }
}

var translator = new EOTranslator(dict);

translator.translateDOM();
translator.translateElement();

console.log(translator.translate('greet', { params: { name: 'Oussama' } }));
