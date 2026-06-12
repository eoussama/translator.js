/**
 *
 * @name:       translatorjs
 * @version:    3.1.2
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/translatorjs
 *
 * A simple javascript library for translating web content.
 */

"use strict";

window.addEventListener("load", () => {
  // Creating a dictionary
  const dictionary = {
    en: {
      greeting: "Hello {name}!",
    },
    fr: {
      greeting: "Bonjour {name}!",
    },
    es: {
      greeting: "Hola {name}!",
    },
  };

  // Creating a translator instance
  const translator = new EOTranslator(dictionary);

  // Getting the DOM elements
  const globalTranslate = document.getElementById("globalTranslate");
  const translationButton = document.getElementById("translationButton");
  const greetedName = document.getElementById("greetedName");

  // Setting the default language
  globalTranslate.value = document.documentElement.lang || "en";

  // Translating the greeting input when the greet button is clicked
  translationButton.addEventListener("click", () => {
    const greeted = greetedName.value || "EOussama";
    const language = globalTranslate.value || "en";

    try {
      const translation = translator.translate("greeting", { lang: language, params: { name: greeted } });

      alert(translation);
    }
    catch (e) {
      alert(e);
    }
  });
});
