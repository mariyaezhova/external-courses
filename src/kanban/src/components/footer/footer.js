import './footer.css';
import DomElement from '../dom-element/DomElement.js';

export const footer = new DomElement({
  type: 'footer',
  className: 'footer',
  html: `
    <div class="footer__right-part">
      <span class="footer__text footer__text-active-tasks">Active tasks: &lt;N&gt;</span>
      <span class="footer__text footer__text-finished-tasks">Finished tasks: &lt;M&gt;</span>
    </div>
    <span class="footer__text">Kanban board by Mariya Sonina, 2020</span>
  `
})
