/*!
 *
 * @name:       eo-translatorjs
 * @version:    3.1.2
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/eo-translatorjs
 *
 * A simple javascript library for translating web content.
 *
 */

;(function () {
  /**
   * @description
   * The translator class — manages a multilingual dictionary and
   * provides methods to translate strings and DOM elements.
   */
  class EOTranslator {
    // #region Properties

    /**
     * @description
     * Sets the translation dictionary.
     *
     * The dictionary must be a plain object whose top-level keys are language
     * codes and whose values are plain objects mapping translation keys to
     * translated strings (or further nested objects for namespaced keys).
     *
     * @param {{ [lang: string]: { [key: string]: unknown } }} dict The new dictionary value
     * @throws {Error} When the value is not a valid plain object
     */
    set dictionary(dict) {
      if (!dict || typeof dict !== "object" || Array.isArray(dict)) {
        throw new Error("[EOTranslatorJS] Invalid dictionary object.");
      }

      this._dictionary = dict;
    }

    /**
     * @description
     * Gets the current translation dictionary.
     *
     * @returns {{ [lang: string]: { [key: string]: unknown } }} The current dictionary
     */
    get dictionary() {
      return this._dictionary;
    }

    /**
     * @description
     * Sets the active language.
     *
     * The language must be a string that exists as a top-level key in the
     * dictionary, unless the dictionary is empty or the string itself is empty.
     *
     * @param {string} lang The new language value
     * @throws {TypeError} When the value is not a string
     * @throws {Error} When the language key does not exist in the dictionary
     */
    set language(lang) {
      if (typeof lang !== "string") {
        throw new TypeError(`[EOTranslatorJS] Invalid language key, expected "string" but received "${typeof lang}".`);
      }

      if (
        !Object.prototype.hasOwnProperty.call(this.dictionary, lang)
        && Object.keys(this.dictionary).length > 0
        && lang.length > 0
      ) {
        throw new Error(`[EOTranslatorJS] Invalid language key, "${lang}" does not exist in the dictionary.`);
      }

      this._language = lang;
    }

    /**
     * @description
     * Gets the active language key.
     *
     * @returns {string} The current language
     */
    get language() {
      return this._language;
    }

    /**
     * @description
     * Gets the list of all language keys present in the dictionary.
     *
     * @returns {string[]} The list of available language keys
     */
    get languages() {
      return this._dictionary ? Object.keys(this._dictionary) : [];
    }

    // #endregion

    // #region Constructor

    /**
     * @description
     * Instantiates a translator object.
     *
     * @param {{ [lang: string]: { [key: string]: unknown } }} dict The translation dictionary
     * @param {string} [lang] The default language key. Defaults to the
     *   document's `lang` attribute when running in a browser, or `"en"`.
     *
     * @throws {Error} When the dictionary is not a valid plain object
     * @throws {TypeError} When the language is not a string
     * @throws {Error} When the language key does not exist in the dictionary
     */
    constructor(dict, lang = "") {
      if (!dict || typeof dict !== "object" || Array.isArray(dict)) {
        throw new Error("[EOTranslatorJS] Invalid dictionary object.");
      }

      if (typeof lang !== "string") {
        throw new TypeError(`[EOTranslatorJS] Invalid language key, expected "string" but received "${typeof lang}".`);
      }

      if (!Object.prototype.hasOwnProperty.call(dict, lang) && lang.length > 0) {
        throw new Error(`[EOTranslatorJS] Invalid language key, "${lang}" does not exist in the passed dictionary.`);
      }

      this.dictionary = dict;
      this.language = lang || (typeof document === "object" ? document.documentElement.lang : "") || "en";
    }

    // #endregion

    // #region Methods

    /**
     * @description
     * Translates a key against the active (or specified) language.
     *
     * Keys may be dot-separated to access nested translations
     * (e.g. `"section.title"`). When no matching translation is found the
     * fallback value is returned — which defaults to the key itself.
     *
     * @param {string} [input] The translation key (supports dot notation)
     * @param {{ lang?: string, fallback?: string, params?: Record<string, unknown> }} [options] Translation options
     * @param {string} [options.lang] Override the active language for this call
     * @param {string} [options.fallback] Value to return when the key is not found
     * @param {Record<string, unknown>} [options.params] Interpolation parameters (`{placeholder}` syntax)
     * @returns {string} The translated string, or the fallback value
     */
    translate(input = "", options = {}) {
      const language = options.lang || this.language;
      const fallback = options.fallback !== undefined ? options.fallback : input;
      const params = options.params || {};
      const frags = input.split(".").filter(frag => frag.length > 0);

      if (!this.isValidLanguage(language)) {
        return fallback;
      }

      let output;

      if (frags.length > 1) {
        output = extractValue(this.dictionary, language, frags);
      }
      else {
        output = Object.prototype.hasOwnProperty.call(this.dictionary[language], input)
          ? this.dictionary[language][input]
          : undefined;
      }

      return output != null && output !== false && output !== ""
        ? assignParams(String(output), params)
        : fallback;
    }

    /**
     * @description
     * Translates the content of a single DOM element.
     *
     * The element must carry the `eo-translator` attribute whose value is the
     * translation key. Optional companion attributes:
     *
     * | Attribute | Description |
     * |---|---|
     * | `eo-translator` | _(required)_ The translation key |
     * | `eo-translator-fallback` | Fallback text when the key is not found |
     * | `eo-translator-params` | JSON object of interpolation parameters |
     * | `eo-translator-html` | `"true"` to set `innerHTML` instead of `textContent` |
     *
     * @param {Element} DOMElement The DOM element to translate
     * @param {string} [lang] Language override for this call
     */
    translateElement(DOMElement, lang) {
      if (!DOMElement) {
        return;
      }

      const keyAttr = DOMElement.attributes["eo-translator"];

      if (!keyAttr) {
        return;
      }

      const language = lang || this.language;
      const input = keyAttr.value || DOMElement.textContent || DOMElement.innerHTML || "";
      const fallbackAttr = DOMElement.attributes["eo-translator-fallback"];
      const fallback = fallbackAttr ? fallbackAttr.value : input;
      const paramsAttr = DOMElement.attributes["eo-translator-params"];
      let params = {};

      if (paramsAttr) {
        try {
          params = JSON.parse(paramsAttr.value) || {};
        }
        catch {
          params = {};
        }
      }

      const htmlAttr = DOMElement.attributes["eo-translator-html"];
      const useHTML = htmlAttr && htmlAttr.value === "true";

      DOMElement[useHTML ? "innerHTML" : "textContent"] = this.translate(input, {
        lang: language,
        fallback,
        params,
      });
    }

    /**
     * @description
     * Translates all `[eo-translator]` elements inside a container.
     *
     * When no container is provided, the entire `document` is used (browser only).
     *
     * @param {Element|Document} [DOMContainer] The root container to search within
     * @param {string} [lang] Language override for this call
     */
    translateDOM(DOMContainer, lang) {
      const language = lang || this.language;
      const container = DOMContainer ?? (typeof document === "object" ? document : null);

      if (!container) {
        return;
      }

      const elements = container.querySelectorAll("[eo-translator]");

      elements.forEach(element => this.translateElement(element, language));
    }

    /**
     * @description
     * Adds or updates a translation entry in the dictionary.
     *
     * Supports dot-separated keys for nested entries
     * (e.g. `"section.title"` will create `{ section: { title: value } }`).
     * If the language does not yet exist in the dictionary it is created.
     *
     * @param {string} lang The language key to add the translation to
     * @param {string} key The translation key (supports dot notation)
     * @param {string} translation The translated string
     */
    add(lang, key, translation) {
      const frags = key.split(".").filter(frag => frag.length > 0);

      if (frags.length === 0) {
        return;
      }

      if (!Object.prototype.hasOwnProperty.call(this.dictionary, lang)) {
        this.dictionary[lang] = {};
      }

      let node = this.dictionary[lang];

      for (let i = 0; i < frags.length - 1; i++) {
        const frag = frags[i];

        if (!node[frag] || typeof node[frag] !== "object") {
          node[frag] = {};
        }

        node = node[frag];
      }

      node[frags[frags.length - 1]] = translation;
    }

    /**
     * @description
     * Removes a translation entry from the dictionary.
     *
     * Supports dot-separated keys for nested entries. Does nothing if the
     * language or key does not exist.
     *
     * @param {string} lang The language key to remove the translation from
     * @param {string} key The translation key to remove (supports dot notation)
     */
    remove(lang, key) {
      if (!Object.prototype.hasOwnProperty.call(this.dictionary, lang)) {
        return;
      }

      const frags = key.split(".").filter(frag => frag.length > 0);

      if (frags.length === 0) {
        return;
      }

      let node = this.dictionary[lang];

      for (let i = 0; i < frags.length - 1; i++) {
        node = node[frags[i]];

        if (!node || typeof node !== "object") {
          return;
        }
      }

      delete node[frags[frags.length - 1]];
    }

    /**
     * @description
     * Checks whether a language key is present in the dictionary.
     *
     * @param {string} lang The language key to check
     * @returns {boolean} `true` when the language exists in the dictionary
     */
    isValidLanguage(lang) {
      return Object.prototype.hasOwnProperty.call(this.dictionary, lang);
    }

    // #endregion
  }

  /**
   * @description
   * Replaces `{placeholder}` tokens in a string with values from a
   * parameters object. Placeholder names are escaped before being used in a
   * RegExp to avoid injection from special characters in key names.
   *
   * @param {string} raw The template string containing `{placeholder}` tokens
   * @param {Record<string, unknown>} params The interpolation values
   * @returns {string} The string with all matching tokens replaced
   */
  function assignParams(raw, params) {
    return Object.keys(params).reduce((result, key) => {
      const escapedKey = key.replace(/[$()*+.?[\\\]^{|}]/g, "\\$&");
      const pattern = new RegExp(`\\{${escapedKey}\\}`, "g");

      return result.replace(pattern, String(params[key]));
    }, raw);
  }

  /**
   * @description
   * Walks a nested dictionary object following a list of key
   * fragments, returning the value at the end of the path.
   *
   * Unlike a truthiness check, this uses an explicit `null`/`undefined` guard
   * so that falsy-but-valid values (`0`, `false`, `""`) are preserved.
   *
   * @param {{ [lang: string]: unknown }} dictionary The full dictionary object
   * @param {string} language The language key to look up
   * @param {string[]} frags The ordered list of nested key fragments
   * @returns {unknown} The value at the resolved path, or `undefined`
   */
  function extractValue(dictionary, language, frags) {
    let node = dictionary[language];

    for (const frag of frags) {
      if (node == null || typeof node !== "object") {
        return undefined;
      }

      node = node[frag];
    }

    return node;
  }

  /* global define */
  if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = EOTranslator;
  }
  else {
    if (typeof define === "function" && define.amd) {
      define([], () => EOTranslator);
    }
    else {
      window.EOTranslator = EOTranslator;
    }
  }
}());
