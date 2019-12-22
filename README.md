<p align="center">
    <img src="docs/assets/img/logo.svg" width="130" />
    <h1 align="center">EO TranslatorJS</h1>
</p>

## What is this?

EO TranslatorJS is a lightweight, very simple-to-use Javascript library that facilitates the process of translating web pages.

## How does is work?

In most cases all you need is a dictionary object and a function call.

## Syntax

Something that scares people away from using most of the other libraries is their unnecessary complexity, after all, we use libraries to avoid that excessive pain. Translator JS operates on very minimalistic controllers. All you need to do is instanciate a Translator object and set it for work.

```ts
const translator = new EOTranslator(dictionary: Object, language: string);
```

| dictionary (_`required`_)                                                  | language (_`optional`_)                                                                                                                                                            |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| An object that contains all of the keys and their respective translations. | A string value that represents the default language. If none is provided, the document's `lang` attribute value is used, otherwise the string `en` is set as the default language. |

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

The above would simply return the translation that matches the key `greeting`, but wait, what language are we targeting here? We did not specify any default language so `EO TranslatorJS` does some improvasition and takes the document's language that resides in the `lang` attribute on the `html` element. If there was none, then `en` is set as the default translation language. In our case, we should be expecting `Hello` as a return value.

If we so wanted to target a specific language all we have to do is instruct EO TranslatorJS about it as follows;

```js
translator.translate("greeting", { lang: "ar" });
```

Simply that will return `مرحباً`.
Notice how we forced the translator object to ignore the default language and use another that we specified with the translation function call, meaning that the default language is still `en`, and so to change it, we could have simply passed the desired default language to the object when we first intstantiated it.

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

That still won't do anything, we are up for a last step, nothing major. We need to add the class `trnsjs` to the elements we want to translate.

```html
<header>
  <div class="inner">
    <h1 class="trnsjs">Hello, world!</h1>
    <h3 class="trnsjs">Quality serivces since 2003</h3>
  </div>
</header>
<nav>
  <ul>
    <li><a href="#" class="trnsjs">Home</a></li>
    <li><a href="#" class="trnsjs">Skills</a></li>
    <li><a href="#" class="trnsjs">Contact</a></li>
    <li><a href="#" class="trnsjs">About</a></li>
    <li style="float: right;">
      <select id="langSelect">
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>
    </li>
  </ul>
</nav>
```

By calling that function, we've translated all translatable elements to their respective frensh translations.

To target a specific part of the page, simply pass it as the first argument instead of the whole body.

To check if a language is supported by yourt dictionary, simply call the following function.

```js
const language = "fr";

translator.isValidLanguage(language);
```

## Credits

Icon made by [Freepik](https://www.freepik.com/) from [Flaticon](https://www.flaticon.com/) and is licensed by [Creative Commons BY 3.0](http://creativecommons.org/licenses/by/3.0/).
