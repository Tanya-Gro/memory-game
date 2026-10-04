import { getElementDiv, getElementButton } from '@/utils/get-element.js';

export class Modal {
  constructor(contentElement, onClose) {
    this.contentElement = contentElement;
    this.onCloseCb = onClose;
    this.overlay = null;
    this.escapeHandler = this.handleEscape.bind(this);
  }

  open() {
    document.body.classList.add('modal-open');

    this.overlay = getElementDiv({
      classes: 'modal-overlay',
      children: [
        getElementDiv({
          classes: 'modal-window',
          parent: this.overlay,
          children: [
            this.contentElement,
            getElementButton({
              classes: 'btn btn-close-modal',
              text: 'Закрыть',
              attributes: { 'aria-label': 'Закрыть модальное окно' },
              events: { click: () => this.close() },
            }),
          ],
        }),
      ],
      events: {
        click: (e) => {
          if (e.target === this.overlay) this.close();
        },
      },
    });

    document.body.append(this.overlay);

    document.addEventListener('keydown', this.escapeHandler);
  }

  close() {
    if (!this.overlay) return;

    document.removeEventListener('keydown', this.escapeHandler);

    this.overlay.remove();
    this.overlay = null;

    document.body.classList.remove('modal-open');

    if (this.onCloseCb) {
      this.onCloseCb();
    }
  }

  handleEscape(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }
}
