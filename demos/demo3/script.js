/**
 * 
 * @name:       eo-translatorjs
 * @version:    3.0.2
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
      'inform': 'At times, commas will also be integral in a complete sentence. \
      They punctuate clauses within a complete sentence. For example, \
      "Without her dog, {pet-name}, {owner-name} would be very sad." \
      Commas love to enter the scene whenever there\'s a natural pause, \
      or a clause, within a complete sentence.'
    },
    'fr': {
      'inform': 'Parfois, les virgules feront également partie intégrante \
      d\'une phrase complète. Ils ponctuent les clauses \
      d\'une phrase complète. Par exemple, "Sans son chien, {pet-name}, \
      {owner-name} serait très triste." \
      Les virgules adorent entrer en scène chaque fois \
      qu\'il y a une pause naturelle ou une clause dans une phrase complète.'
    },
    'es': {
      'inform': 'A veces, las comas también serán integrales en una oración completa. \
      Puntúan cláusulas dentro de una oración completa. Por ejemplo, "Sin su perro, \
      {pet-name}, {owner-name} estaría muy triste". A las comas les encanta entrar en escena \
      cada vez que hay una pausa natural, o una cláusula, dentro de una oración completa.'
    }
  };

  // Creating a translator instance
  var translator = new EOTranslator(dictionary);

  // Getting the DOM elements
  var globalTranslate = document.getElementById('globalTranslate');

  // Setting the default language
  globalTranslate.value = document.documentElement.lang || 'en';

  // Translating the greeting input when the greet button is clicked
  globalTranslate.addEventListener('change', function () {
    var language = globalTranslate.value;

    try {
      translator.translateDOM(document.body, language);
    } catch (e) {
      alert(e);
    }
  });

  // Invoking the change event
  globalTranslate.dispatchEvent(new Event('change'));
});
