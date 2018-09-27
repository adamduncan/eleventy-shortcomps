module.exports = ({ src, altText = '', caption = '' } = {}) => (`
  <figure class="media">
    <img src="${ src }" alt="${ altText }">
    ${ caption && `
      <figcaption>${ caption }</figcaption>
    `}
  </figure>
`);