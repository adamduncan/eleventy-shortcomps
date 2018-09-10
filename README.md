# eleventy-shortcomps

Starter project for static site, using Eleventy and shortcode components (AKA _shortcomps_) pattern.

## Goal

The ability to create and maintain reusable, framework-agnostic [functional stateless components](https://javascriptplayground.com/functional-stateless-components-react/).

These can be used throughout static sites and/or in environments already utilising frameworks (e.g. React, Vue). They are composable, and serve as the single source of truth across all applications.

Benefit from the advantages of the component model, without needing to reach for a framework right away.

## Concept

As in many frameworks, components can be written as functions that return JavaScript Template Literals. These receive and interpolate any values passed as arguments, and can contain rendering logic:

```JavaScript
// Button.js
module.exports = (text, href, primary) => {

  // rendering logic, classnames etc.?
  const primaryClass = primary ? 'button--primary' : '';

  return `
    <a class="button ${ primaryClass }" href="${ href }">
      ${ text }
    </a>
  `;
};
```

Import and define components using Eleventy’s `addShortcode` and `addPairedShortcode` config methods, as needed:

```JavaScript
// .eleventy.js
const componentsDir = `./_includes/components`;

const Wrapper = require(`${ componentsDir }/Wrapper.js`);
const Card = require(`${ componentsDir }/Card.js`);
const Button = require(`${ componentsDir }/Button.js`);

module.exports = function (config) {

  config.addPairedShortcode('Wrapper', Wrapper);
  config.addShortcode('Card', Card);
  config.addShortcode('Button', Button);

};
```

They’ll then be available throughout templates, using the include syntax (i.e. Nunjucks):

```HTML
{% Button 'This is a link to Eleventy', 'http://11ty.io' %}
```

And can be nested within other components:

```JavaScript
// Card.js
const Button = require('./Button.js');

module.exports = (name, bio, url) => (`
  <article class="card">
    <h3>${ name }</h3>
    <p>${ bio }</p>
    
    ${ Button('Visit site', url) }
  </article>
`);
```

## Demo

This repo contains just enough to demonstrate how one _could_ utilise this pattern (config, functional stateless  components, shortcodes, paired shortcodes, layouts).

Site can be viewed at: [eleventy-shortcomps.netlify.com](https://eleventy-shortcomps.netlify.com)

Feedback welcome 🙌