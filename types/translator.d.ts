declare module 'eo-translatorjs' {

  /**
   * @author EOussama
   * @description The translator class
   * @default
   * @class
   */
  class EOTranslator {

    //#region Properties

    /**
     * @description The dictionary that the translator uses
     * @throws Invalid dictionary object
     */
    dictionary: { [x: string]: { [x: string]: any } };

    /**
     * @description The default language
     * @throws Invalid language key
     */
    language: string;

    /**
     * @description The list of available languages
     * @readonly
     */
    readonly languages: string[];

    //#endregion

    //#region Lifecycle

    /**
     * @description Instantiates a translator object
     *
     * @param {object} dict The translation dictionary
     * @param {string} lang The default language
     * 
     * @throws Invalid dictionary object
     * @throws Invalid language key
     */
    constructor(dict: object, lang: string)

    //#endregion

    //#region Methods

    /**
     * @description Translates an input value
     *
     * @param {string} input The input value to translate
     * @param {object} options The translation options
     * 
     * @returns {string} The respective translation
     */
    translate(input: string, options: object): string;

    /**
     * @description Translates the contents of a DOM elemnt
     * 
     * @param {HTMLElement} DOMElement The DOM element to translate the content of
     * @param {string} lang The language to translate to
     */
    translateElement(DOMElement: HTMLElement, lang: string): void;

    /**
     * @description Translates a DOM document/element
     *
     * @param {HTMLElement} DOMContainer The HTML container
     * @param {string} lang The language to translate to
     */
    translateDOM(DOMContainer: HTMLElement, lang: string): void;

    /**
     * @description Adds a new translation to a given language or updates an existing
     * one accordingly.
     *
     * @param {string} lang The language to add the translation to
     * @param {string} keys The key of the translation
     * @param {string} translation The translation to add
     */
    add(lang: string, key: string, translation: string): void;

    /**
     * @description Removes a translation from a given language
     *
     * @param {string} lang The language to remove the translation from
     * @param {string} keys The key of the translation to remove
     */
    remove(lang: string, key: string): void;

    /**
     * @description Checks if an input language is defined in the dictionary
     *
     * @param {string} lang The language to check
     * @returns {boolean} The availability of the corresponding language
     */
    isValidLanguage(lang: string): boolean;

    //#endregion
  }

  export = EOTranslator
}
