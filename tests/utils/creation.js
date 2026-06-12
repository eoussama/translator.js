/**
 * @description
 * Tests for EOTranslator instantiation and property setters.
 *
 * @param {typeof import('../../dist/translator')} EOTranslator
 */
module.exports = function (EOTranslator) {
  const DICT = {
    en: { greeting: "Hello!" },
    fr: { greeting: "Bonjour!" },
    es: { greeting: "Hola!" },
    br: { greeting: "Jola!" },
  };

  // ---------------------------------------------------------------------------
  // Constructor — happy paths
  // ---------------------------------------------------------------------------

  test("creates a translator with a valid dictionary", () => {
    const translator = new EOTranslator(DICT);

    expect(translator.dictionary).toEqual(DICT);
  });

  test("sets the specified language as default", () => {
    const translator = new EOTranslator(DICT, "fr");

    expect(translator.language).toBe("fr");
  });

  test("\"en\" is the default language when none is specified", () => {
    const translator = new EOTranslator(DICT);

    expect(translator.language).toBe("en");
  });

  test("allows changing the active language at runtime via the setter", () => {
    const translator = new EOTranslator(DICT);

    translator.language = "br";
    expect(translator.language).toBe("br");
  });

  test("accepts an empty dictionary", () => {
    const translator = new EOTranslator({});

    expect(translator.dictionary).toEqual({});
  });

  // ---------------------------------------------------------------------------
  // Constructor — error paths
  // ---------------------------------------------------------------------------

  test("throws when the language key does not exist in the dictionary", () => {
    expect(() => new EOTranslator(DICT, "ar")).toThrow("[EOTranslatorJS]");
  });

  test("throws when a non-string is passed as the language", () => {
    expect(() => new EOTranslator(DICT, 42)).toThrow(TypeError);
  });

  test("throws when a boolean is passed as the dictionary", () => {
    expect(() => new EOTranslator(true)).toThrow("[EOTranslatorJS]");
  });

  test("throws when null is passed as the dictionary", () => {
    expect(() => new EOTranslator(null)).toThrow("[EOTranslatorJS]");
  });

  test("throws when an array is passed as the dictionary", () => {
    expect(() => new EOTranslator(["en"])).toThrow("[EOTranslatorJS]");
  });

  // ---------------------------------------------------------------------------
  // Setter — dictionary
  // ---------------------------------------------------------------------------

  test("allows replacing the dictionary at runtime via the setter", () => {
    const translator = new EOTranslator(DICT);
    const newDict = { de: { greeting: "Hallo!" } };

    translator.dictionary = newDict;
    expect(translator.dictionary).toEqual(newDict);
  });

  test("throws when an array is assigned to the dictionary setter", () => {
    const translator = new EOTranslator(DICT);

    expect(() => {
      translator.dictionary = [];
    }).toThrow("[EOTranslatorJS]");
  });

  test("throws when null is assigned to the dictionary setter", () => {
    const translator = new EOTranslator(DICT);

    expect(() => {
      translator.dictionary = null;
    }).toThrow("[EOTranslatorJS]");
  });

  // ---------------------------------------------------------------------------
  // Setter — language
  // ---------------------------------------------------------------------------

  test("throws when an invalid language is set at runtime", () => {
    const translator = new EOTranslator(DICT, "es");

    expect(() => {
      translator.language = "ar";
    }).toThrow("[EOTranslatorJS]");
  });

  test("throws when a non-string is assigned to the language setter", () => {
    const translator = new EOTranslator(DICT);

    expect(() => {
      translator.language = 99;
    }).toThrow(TypeError);
  });

  // ---------------------------------------------------------------------------
  // Getter — languages
  // ---------------------------------------------------------------------------

  test("languages getter returns all top-level language keys", () => {
    const translator = new EOTranslator(DICT);

    expect(translator.languages).toEqual(["en", "fr", "es", "br"]);
  });

  test("languages getter returns an empty array for an empty dictionary", () => {
    const translator = new EOTranslator({});

    expect(translator.languages).toEqual([]);
  });

  // ---------------------------------------------------------------------------
  // isValidLanguage
  // ---------------------------------------------------------------------------

  test("isValidLanguage returns true for an existing language", () => {
    const translator = new EOTranslator(DICT);

    expect(translator.isValidLanguage("fr")).toBe(true);
  });

  test("isValidLanguage returns false for a missing language", () => {
    const translator = new EOTranslator(DICT);

    expect(translator.isValidLanguage("ar")).toBe(false);
  });
};
