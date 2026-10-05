export const getElementDiv = (props) => createElement({ tag: 'div', ...props });

export const getElementButton = (props) =>
  createElement({ tag: 'button', ...props });

export const getElementP = (props) => createElement({ tag: 'p', ...props });

export const getElementH1 = (props) => createElement({ tag: 'h1', ...props });

export const getElementInput = (props) =>
  createElement({ tag: 'input', ...props });

export const getElementH2 = (props) => createElement({ tag: 'h2', ...props });

export const getElementOption = (props) =>
  createElement({ tag: 'option', ...props });

export const getElementA = (props) => createElement({ tag: 'a', ...props });

export const getElementLabel = (props) =>
  createElement({ tag: 'label', ...props });

export const getElementImg = (props) => createElement({ tag: 'img', ...props });

export const getElementHeader = (props) =>
  createElement({ tag: 'header', ...props });

export const getElementSpan = (props) =>
  createElement({ tag: 'span', ...props });

function createElement(options) {
  const {
    attributes = {},
    children = [],
    classes,
    events = {},
    parent,
    tag,
    text = '',
  } = options;

  const element = document.createElement(tag);

  if (text) {
    element.textContent = text;
  }

  if (classes) {
    element.classList.add(...classes.split(' '));
  }

  if (children.length) {
    element.append(...children);
  }

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  for (const [eventName, callback] of Object.entries(events)) {
    element.addEventListener(eventName, callback);
  }

  if (parent) {
    parent.append(element);
  }

  return element;
}
