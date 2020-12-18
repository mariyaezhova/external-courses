import './footer.css';
import DomElement from '../dom-element/DomElement.js';

export const footer = new DomElement({
  type: 'footer',
  className: 'footer',
  html: `
  <div class="footer__right-part">
    <span class="footer__text">Active tasks: &lt;N&gt;</span>
    <span class="footer__text">Finished tasks: &lt;M&gt;</span>
  </div>
  <span class="footer__text">Kanban board by &lt;NAME&gt;, &lt;YEAR&gt;</span>
  `,
})
