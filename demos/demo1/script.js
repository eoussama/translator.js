/**
 * 
 * @name:       eo-translatorjs
 * @version:    3.0.1
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/eo-translatorjs
 * 
 * A simple javascript library for translating web content.
 * 
 */

'use strict';

window.addEventListener('load', () => {

  // Creating a dictionary
  var dictionary = {
    'en': {
      'greeting': 'Hello {name}!'
    },
    'fr': {
      'greeting': 'Bonjour {name}!'
    },
    'es': {
      'greeting': 'Hola {name}!'
    }
  };

  // Creating a translator instance
  var translator = new EOTranslator(dictionary);

  // Getting the DOM elements
  var globalTranslate = document.getElementById('globalTranslate');
  var translationButton = document.getElementById('translationButton');
  var greetedName = document.getElementById('greetedName');

  // Setting the default language
  globalTranslate.value = document.documentElement.lang || 'en';

  // Translating the greeting input when the greet button is clicked
  translationButton.addEventListener('click', function () {
    var greeted = greetedName.value || 'EOussama';
    var language = globalTranslate.value || 'en';

    try {
      var translation = translator.translate('greeting', { lang: language, params: { name: greeted } });
      alert(translation);
    } catch (e) {
      alert(e);
    }
  });
});
