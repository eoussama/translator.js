<h1 align="center">translateJS</h1>

## What's this?
translateJS is a lightweight very simple-to-use Javascript library that facilitates the process of translating web pages. For more about how this works, read along.

## How does this work?
translateJS doesn't depend on any external APIs or resources to work, in fact, there is a crucial part of this magic that requires a little bit of work, but not the kind of work that made you look up a library for this need.
You should create your own dictionary, containing the words and/or sentences you want to translate with their respective translations, and then target the whole web page or just a specific section.
Not everything gets translated, only the elements that have the class  `trnsjs` toggeled.

## Syntax
Something that scares people away from using most of the other libraries is their unnecessary complexity, after all, we use libraries to avoid excessive pain. translateJS operates on one and only function that takes three parameters `translate(element, dictionary, language)`.

| element   |      dictionary      |  language |
|----------|:-------------:|------:|
| The element you want to translate, in the case of the whole page, target `body`. |  An object containing all of the terms and their respective translations. | The name of the language you want to translate the current content to. |
    
## Usage
In order to start using translateJS, you should first include it on your HTML file;
```html
<script src="translate.js"></script>
```
Now, we need to create a dictionary, an object that stores all of our translations.
```javascript
const dict = {
        "Hello, world!": {
            'en': "Hello, world!",
            'es': "Hola, el mundo!",
            'fr': "Bonjour, le monde!",
        },
        "Quality serivces since 2003": {
            'en': "Quality serivces since 2003",
            'es': "Servicios de calidad desde 2003",
            'fr': "Des services de qualité depuis 2003",
        },
        "Home": {
            'en': "Home",
            'es': "Inicio",
            'fr': "Accueil"
        },
        "Skills": {
            'en': "Skills",
            'es': "Capacidad",
            'fr': "Compétences"
        },
        "About": {
            'en': "About",
            'es': "Acerca de",
            'fr': "à propos"
        },
        "Contact": {
            'en': "Contact",
            'es': "Contacto",
            'fr': "Contact"
        }
    };
```
Now, we have an object with all the terms we want to translate, and their respective translations, the name you choose for languages is important, in our case, they are `en`, `es` and `fr` indicating English, Espagnol and Français respectively.

Then we call the big dog, passing the right arguments.
```javascript
translate(document.body, dict, 'fr');
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

By calling that function, we've targeted the body of the webpage and specified the dictionary we want to use, and the language that we want translate the content to, `fr`, meaning French.

To target a specific part of the page, simply pass it as the first argument instead of the whole body.
```javascript
translate(document.querySelector('nav'), dict, 'fr');
```
That will only translate the children of than `nav` tag that have the class `trnsjs`.

And that's literally it.