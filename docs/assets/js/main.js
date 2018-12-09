/**
 * 
 * @name:       translatorjs
 * @version:    2.0.1
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/translatorjs
 * 
 * A simple javascript library for translating web content.
 * 
 */

'use strict';

window.addEventListener('load', () => {

    // The dictionary.
    const dictionary = {
        "About": {
            'fr': 'A propos',
            'es': 'nos'
        },
        "Hello": {
            'fr': 'Bonjour',
            'es': 'Hola',
            'br': 'Jola'
        }
    };

    // The translator.
    const translator = new Translator(dictionary);

    // Translating.
    translator.translate('br');
});
