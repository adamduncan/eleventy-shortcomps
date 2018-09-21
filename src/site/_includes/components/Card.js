const Button = require('./Button.js');

module.exports = (name, bio, url) => (`
  <article class="card">
    <h3>${ name }</h3>
    <p>${ bio }</p>
    
    ${ Button('Visit site', url) }
  </article>
`);