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

## Props variation

Developers coming from (or possibly heading towards) a framework-based component model might be used to passing and receiving their component parameters in a single `props` object.

It’s an elegant way of saying, “Hey, component, here’s everything you’ll need in one tasty little package.”

This commonly results in a functional component that looks more like:

```JavaScript
// Image.js
module.exports = ({ src, altText = '', caption = '' }) => (`
  <figure class="media">
    <img src="${ src }" alt="${ altText }">
    ${ caption
      ? `<figcaption>${ caption }</figcaption>`
      : ''
    }
  </figure>
`);
```

(See React’s [Functional and class components](https://reactjs.org/docs/components-and-props.html#functional-and-class-components) documentation)

This single `props` argument can also be [destructured](https://davidwalsh.name/destructuring-function-arguments) and assigned [default parameter values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters). Awesome.

With this approach, we still declare our shortcodes in `.eleventy.js` as we did previously. But instead of passing multiple parameters to them in our templates, we pass a single object containing all of the properties. In a templating language like Nunjucks, that might look like:

```HTML
{% Image {
  src: '/path/to/image.jpg',
  altText: 'The Beatles on stage at Shea Stadium',
  caption: 'Where’s Ringo?'
} %}
```

Or, if you’re using a functional component inside another component, that could start to look a whole lot like those React’y components:

```JavaScript
// SomeComponent.js
const Image = require('./Image');

module.exports = props => {
  const { image } = props;

  return `
    <div class="some-component">
      ${ Image({
        src: image.src,
        altText: image.altText,
        caption: image.caption
      }) }
    </div>
  `;

};
```

It seems advantageous to use this `props` approach in favour of the multiple parameter approach outlined first. Our components will benefit from having the same functional signatures as their React (and to some degree, Vue) counterparts, should you need to take them there in the future.

## Demo

This repo contains just enough to demonstrate how one _could_ utilise this pattern (config, functional stateless components, props, shortcodes, paired shortcodes, layouts).

Site can be viewed at: [eleventy-shortcomps.netlify.com](https://eleventy-shortcomps.netlify.com)

Feedback welcome 🙌