/**
 * 
 * @name:       translatejs
 * @version:    1.0.0
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/translatejs
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
    const Translator = new Translate(dictionary);

    // Translating.
    Translator.translate('br');
});
