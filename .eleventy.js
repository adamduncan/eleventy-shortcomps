const inputDir = "src/site";
const componentsDir = `${inputDir}/_includes/components`;

// Components
const Wrapper = require(`./${componentsDir}/Wrapper.js`);
const Image = require(`./${componentsDir}/Image.js`);
const Button = require(`./${componentsDir}/Button.js`);
const Card = require(`./${componentsDir}/Card.js`);

module.exports = function(config) {
  // Paired shortcodes
  config.addPairedShortcode("Wrapper", Wrapper);

  // Shortcodes
  config.addShortcode("Image", Image);
  config.addShortcode("Button", Button);
  config.addShortcode("Card", Card);

  return {
    dir: {
      input: inputDir,
      output: "docs"
    }
  };
};
