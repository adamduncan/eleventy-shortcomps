module.exports = (text, href, primary) => {

  // rendering logic, classnames etc.?
  const primaryClass = primary ? 'button--primary' : '';

  if (href) {
    return `
      <a class="button ${primaryClass}" href="${href}">
        ${text}
      </a>
    `;
  }

  return `
    <button class="button ${primaryClass}">
      ${text}
    </button>
  `;
};