<p align="center">
    <img src="demos/assets/img/logo.svg" width="130" />
    <h1 align="center">EOTranslator.js</h1>
    <p align="center">
      <a href="#">
          <img align="center" src="https://img.shields.io/npm/dt/eo-translatorjs.svg" alt="NPM downloads.">
      </a>
      <a href="https://www.npmjs.com/package/eo-translatorjs/v/latest">
          <img align="center" src="https://img.shields.io/npm/v/eo-translatorjs.svg" alt="NPM package version.">
      </a>
      <a href="https://raw.githubusercontent.com/EOussama/eo-translatorjs/master/dist/eo-translator.min.js">
        <img align="center" src="https://img.shields.io/github/size/EOussama/eo-translatorjs/dist/eo-translator.min.js.svg" alt="EOTranslator.js' size.">
      </a>
      <a href="https://raw.githubusercontent.com/EOussama/eo-translatorjs/master/LICENSE">
        <img align="center" src="https://img.shields.io/github/license/EOussama/eo-translatorjs.svg" alt="EOTranslator.js' license.">
      </a>
    </p>
</p>

## What is this?

EOTranslator.js is a lightweight, zero-dependency JavaScript library that makes it easy to translate web page content. Define a dictionary, create a translator instance, and call a single method to translate a string or an entire DOM tree.

---

## Installation

### npm / pnpm / yarn

```bash
npm install eo-translatorjs
# or
pnpm add eo-translatorjs
# or
yarn add eo-translatorjs
```

### Browser (script tag)

```html
<script src="eo-translator.min.js"></script>
```

---

## Quick start

```js
// CommonJS (Node.js)
const EOTranslator = require("eo-translatorjs");

// ES module bundler
import EOTranslator from "eo-translatorjs";
```

```js
const dict = {
  en: { greeting: "Hello" },
  fr: { greeting: "Bonjour" },
  es: { greeting: "Hola" },
};

const translator = new EOTranslator(dict, "en");

translator.translate("greeting");           // → "Hello"
translator.translate("greeting", { lang: "fr" }); // → "Bonjour"
```

---

## Constructor

```js
new EOTranslator(dictionary, language?)
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `dictionary` | `object` | ✅ | Plain object with language keys at the top level |
| `language` | `string` | ✗ | Default language. Falls back to the document `lang` attribute, then `"en"` |

```js
const translator = new EOTranslator(dict);          // language defaults to "en"
const translator = new EOTranslator(dict, "fr");    // explicitly set to French
```

**Throws:**

- `Error` — when the dictionary is not a plain object
- `TypeError` — when the language argument is not a string
- `Error` — when the language key does not exist in the dictionary

---

## Properties

### `dictionary`

Get or replace the entire translation dictionary at runtime.

```js
translator.dictionary = {
  en: { home: "House" },
  fr: { home: "Maison" },
};
```

Throws if the assigned value is not a plain object.

### `language`

Get or set the active language at runtime.

```js
translator.language = "fr";
console.log(translator.language); // "fr"
```

Throws if the value is not a string or does not exist in the dictionary.

### `languages` _(read-only)_

Returns an array of all language keys currently present in the dictionary.

```js
const dict = { en: {}, fr: {}, es: {} };
const translator = new EOTranslator(dict, "en");

console.log(translator.languages); // ["en", "fr", "es"]
```

---

## Methods

### `translate(key, options?)`

Translates a key in the active (or specified) language.

| Parameter | Type | Description |
|---|---|---|
| `key` | `string` | Translation key. Supports dot notation for nested keys |
| `options.lang` | `string` | Override the active language for this call only |
| `options.fallback` | `string` | Value to return when the key is not found. Defaults to the key itself |
| `options.params` | `object` | Interpolation parameters replacing `{placeholder}` tokens |

```js
const dict = {
  en: {
    greeting: "Hello, {name}!",
    ui: {
      title: "Welcome",
    },
  },
  fr: {
    greeting: "Bonjour, {name}!",
  },
};

const translator = new EOTranslator(dict, "en");

// Basic translation
translator.translate("ui.title");                             // → "Welcome"

// With parameters
translator.translate("greeting", { params: { name: "Luffy" } }); // → "Hello, Luffy!"

// With a language override (does not change the default)
translator.translate("greeting", { lang: "fr", params: { name: "Luffy" } }); // → "Bonjour, Luffy!"

// Missing key — returns the key itself by default
translator.translate("missing.key");                         // → "missing.key"

// Missing key — custom fallback
translator.translate("missing.key", { fallback: "N/A" });   // → "N/A"
```

---

### `translateElement(element, lang?)`

Translates the content of a single DOM element. The element must carry the `eo-translator` attribute.

**Supported attributes:**

| Attribute | Required | Description |
|---|---|---|
| `eo-translator` | ✅ | The translation key |
| `eo-translator-fallback` | ✗ | Fallback text when the key is not found |
| `eo-translator-params` | ✗ | JSON object of interpolation parameters |
| `eo-translator-html` | ✗ | Set to `"true"` to write `innerHTML` instead of `textContent` |

```html
<span
  id="hello"
  eo-translator="greeting"
  eo-translator-params='{ "name": "Luffy" }'
></span>
```

```js
const dict = { en: { greeting: "Hello, {name}!" } };
const translator = new EOTranslator(dict, "en");

translator.translateElement(document.getElementById("hello"));
// <span ...>Hello, Luffy!</span>
```

**HTML rendering:**

```html
<span
  id="hello"
  eo-translator="greeting"
  eo-translator-html="true"
></span>
```

```js
const dict = { en: { greeting: "Hello, <b>World</b>!" } };
const translator = new EOTranslator(dict, "en");

translator.translateElement(document.getElementById("hello"));
// <span ...>Hello, <b>World</b>!</span>
```

Passing `null` or an element without the `eo-translator` attribute is a safe no-op.

---

### `translateDOM(container?, lang?)`

Translates **all** `[eo-translator]` elements within a container in one call.

When called without arguments it scans the entire `document` (browser only).

```js
// Translate everything in the document using the active language
translator.translateDOM();

// Translate everything inside a specific container
translator.translateDOM(document.getElementById("app"));

// Translate a container using a language override
translator.translateDOM(document.getElementById("app"), "fr");
```

---

### `add(lang, key, translation)`

Adds a new translation entry or updates an existing one. Supports dot notation for nested keys. Creates the language group automatically if it does not yet exist.

```js
const dict = {
  en: { tr1: "Translation 1" },
  fr: { tr1: "Traduction 1" },
};
const translator = new EOTranslator(dict, "en");

// Add a new key
translator.add("en", "tr2", "Translation 2");

// Update an existing key
translator.add("en", "tr1", "Updated translation 1");

// Add a nested key — creates intermediate objects automatically
translator.add("fr", "menu.home", "Accueil");
translator.add("fr", "menu.about", "À propos");
```

---

### `remove(lang, key)`

Removes a translation entry from the dictionary. Supports dot notation. Does nothing if the language or key does not exist.

```js
// Remove a top-level key
translator.remove("fr", "tr1");

// Remove a nested key
translator.remove("fr", "menu.about");
```

---

### `isValidLanguage(lang)`

Returns `true` when the given string is a top-level key in the dictionary.

```js
const dict = { en: {}, fr: {} };
const translator = new EOTranslator(dict, "en");

translator.isValidLanguage("fr");  // → true
translator.isValidLanguage("ar");  // → false
```

---

## Nested keys

Dot-separated keys let you organise translations into namespaces without any extra configuration.

```js
const dict = {
  en: {
    nav: {
      home: "Home",
      about: "About us",
    },
    footer: {
      copyright: "© 2024 Example Inc.",
    },
  },
};

const translator = new EOTranslator(dict, "en");

translator.translate("nav.home");         // → "Home"
translator.translate("nav.about");        // → "About us"
translator.translate("footer.copyright"); // → "© 2024 Example Inc."
translator.translate("nav.missing");      // → "nav.missing" (fallback to key)
```

---

## Parameter interpolation

Use `{placeholder}` tokens inside translations and supply values via `options.params` (or the `eo-translator-params` attribute in HTML).

```js
const dict = {
  en: {
    greeting: "Hello, {first} {last}!",
    score: "You scored {points} points.",
  },
};

const translator = new EOTranslator(dict, "en");

translator.translate("greeting", { params: { first: "Monkey", last: "D. Luffy" } });
// → "Hello, Monkey D. Luffy!"

translator.translate("score", { params: { points: 42 } });
// → "You scored 42 points."
```

---

## Credits

Icon made by [Freepik](https://www.freepik.com/) from [Flaticon](https://www.flaticon.com/) and is licensed by [Creative Commons BY 3.0](http://creativecommons.org/licenses/by/3.0/).
