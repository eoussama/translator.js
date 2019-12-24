<p align="center">
    <img src="docs/assets/img/logo.svg" width="130" />
    <h1 align="center">EO TranslatorJS</h1>
    <p align="center">
      <a href="#">
          <img align="center" src="https://img.shields.io/npm/dt/eo-translatorjs.svg" alt="NPM downloads.">
      </a>
      <a href="https://www.npmjs.com/package/eo-translatorjs/v/latest">
          <img align="center" src="https://img.shields.io/npm/v/eo-translatorjs.svg" alt="NPM package version.">
      </a>
      <a href="https://raw.githubusercontent.com/EOussama/eo-translatorjs/master/dist/eo-translator.min.js">
        <img align="center" src="https://img.shields.io/github/size/EOussama/eo-translatorjs/dist/eo-translator.min.js.svg" alt="EO TranslatorJS' size.">
      </a>
      <a href="https://raw.githubusercontent.com/EOussama/eo-translatorjs/master/LICENSE">
        <img align="center" src="https://img.shields.io/github/license/EOussama/eo-translatorjs.svg" alt="EO TranslatorJS' license.">
      </a>
    </p>
</p>

## What is this?

EO TranslatorJS is a lightweight, very simple-to-use Javascript library that facilitates the process of translating web pages.

## How does it work?

In most cases, all you need is a dictionary object and a function call.

Something that scares people away from using most of the other libraries is their unnecessary complexity, after all, we use libraries to avoid that excessive pain. Translator JS operates on very minimalistic controllers. All you need to do is instantiate a Translator object and set it for work.

```ts
const translator = new EOTranslator(dictionary: Object, language: string);
```

| dictionary (_`required`_)                                                  | language (_`optional`_)                                                                                                                                                             |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| An object that contains all of the keys and their respective translations. | A string value that represents the default language. If none is provided, the document's `lang` attribute value is used, otherwise, the string `en` is set as the default language. |

## Usage

In order to start using Translator JS, you should first include it on your HTML file;

```html
<script src="eo-translator.js"></script>

<!-- or -->

<script src="eo-translator.min.js"></script>
```

Now, we need to create a dictionary, an object that stores all of our translations, grouped by language keys;

```js
var dict = {
  ar: { greeting: 'مرحباً' }
  en: { greeting: 'Hello' },
  es: { greeting: 'Hola' },
  fr: { greeting: 'Bonjour' }
};
```

The name you choose for languages is important, in our case, they are `ar`, `en`, `es`, and `fr` indicating _Arabic_ _English_, _Espagnol_ and _Français_ respectively. They could be called anything, however, for the sake of simplicity, we used those specific codes which can easily and universally be understood.

Then we instantiate a translator object;

```js
var translator = new EOTranslator(dict);
```

Now, translating something is as simple as stating the target translation's key;

```js
translator.translate("greeting");
```

The above would simply return the translation that matches the key `greeting`, but wait, what language are we targeting here? We did not specify any default language so `EO TranslatorJS` does some improvisation and takes the document's language that resides in the `lang` attribute on the `html` element. If there was none, then `en` is set as the default translation language. In our case, we should be expecting `Hello` as a return value.

If we so wanted to target a specific language all we have to do is instruct EO TranslatorJS about it as follows;

```js
translator.translate("greeting", { lang: "ar" });
```

Simply that will return `مرحباً`.
Notice how we forced the translator object to ignore the default language and use another that we specified with the translation function call, meaning that the default language is still `en`, and so to change it, we could have simply passed the desired default language to the object when we first instantiated it.

```js
// Setting the default language to Spanish.
var translator = new EOTranslator(dict, "es");
```

We can also change the default language on runtime by directly passing a valid string value to the `language` property of the translator object.

```js
// Setting the default language to Frensh on runtime.
translator.language = "fr";
```

The same goes for the dictionary if we so wanted:

```js
var // Creating a dictionary object
  dict1 = {
    en: { home: "Home" },
    fr: { home: "Maison" }
  },
  // Creating another dictionary object
  dict2 = {
    en: { home: "House" },
    fr: { home: "Bâtiment" }
  };

// Creating a translator object with `dict1` as a dictionary
// and `en` (English) as a default language
var translator = new EOTranslator(dict1, "en");

// Returns `Home`
translator.translate("home");

// Changing the dictionary
translator.dictionary = dict2;

// Returns `House`
translator.translate("home");

// Changing the default language
translator.language = "fr";

// Returns `Bâtiment`
translator.translate("home");

// Returns `House`
translator.translate("home", { lang: "en" });
```

Translating an invalid key outputs the input key, unless a fallback value has been specified.

```js
// Creating a dictionary object
var dict = {
  en: { home: "Home" },
  fr: { home: "Maison" }
};

// Creating a translator object
var translator = new EOTranslator(dict, "en");

// Returns `not-home` as no matching key in the dictionary was found
translator.translate("not-home");

// Returns `Fallback value`
translator.translate("not-home", { fallback: "Fallback value" });
```

Nested keys are a big part of what makes EO TranslatorJS fun to use without sacrificing its simple usability.

```js
// Creating a dictionary object
var dict = {
  en: {
    home: "Home",
    a: {
      b: {
        c: {
          d: "Nested value 1",
          e: "Nested value 2",
          f: {
            g: "Nested value 3"
          }
        }
      }
    }
  }
};

// Creating a translator object
var translator = new EOTranslator(dict);

// Returns `Nested value 1`
translator.translate("a.b.c.d");

// Returns `Nested value 3`
translator.translate("a.b.c.f.g");

// Returns `a.b.c.f.g.h` as ho matching key(s) was found
translator.translate("a.b.c.f.g.h");
```

Another powerful feature that comes with EO TranslatorJS is embedding parameters.

```js
// Creating a dictionary object
var dict = {
  en: { greeting: "Hello, {name}!" }
};

// Creating a translator object
var translator = new EOTranslator(dict);

// Returns `Hello, Jeff!`
translator.translate("greeting", { params: { name: "Jeff" } });
```

Using EO TranslatorJS on a DOM element is just as simple. Mark the target element or elements that you want to translate the contents of, and then leave the rest for EO TranslatorJS.

```html
<!-- The eo-translator attribute is the marker that tells EO TranslatorJS to translate the element, the value that's passed to it is the translation key -->

<!-- eo-translator-params holds the parameters. It must be valid JSON object. -->
<span
  id="target"
  eo-translator="greeting"
  eo-translator-params='{ "name": "Luffy" }'
></span>

<script>
  // Creating a dictionary object
  var dict = {
    en: { greeting: "Hello, {name}!" }
  };

  // Creating a translator object
  var translator = new EOTranslator(dict);

  // Getting the HTML element
  var target = document.getElementById("target");

  // Translating the element
  translator.translateElement(target);
</script>
```

Or you can simply translate the entire document;

```js
translator.translateDOM();
```

EO TranslatorJS also allows for dictionary manipulation, such as adding, removing and updating translations at runtime;

```js
// Creating a dictionary object
var dict = {
  en: { tr1: "Translation 1" },
  fr: {
    tr1: "Traduction 1",
    nested: { tr: "Traduction imbriqué" }
  }
};

// Creating a translator object
var translator = new EOTranslator(dict);

// Adding an English translation with the key “tr2”
translator.add("en", "tr2", "Translation 2");

// Updating the English translation that matches the key “tr1”
translator.add("en", "tr1", "Updated translation 1");

// Adding a nested French translation
translator.add("fr", "a.b.c", "Nouveau Traduction imbriqué!");

// Removing a translation from the French language group
translator.remove("fr", "nested.tr");
```

The dictionary object after all of the previous alterations:

```json
{
  "en": {
    "tr1": "Updated translation 1",
    "tr2": "Translation 2"
  },
  "fr": {
    "tr1": "Traduction 1",
    "nested": {},
    "a": { "b": { "c": "Nouveau Traduction imbriqué!" } }
  }
}
```

## Credits

Icon made by [Freepik](https://www.freepik.com/) from [Flaticon](https://www.flaticon.com/) and is licensed by [Creative Commons BY 3.0](http://creativecommons.org/licenses/by/3.0/).
