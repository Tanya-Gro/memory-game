import {
  getElementDiv,
  getElementButton,
  getElementHeader,
  getElementSpan,
  getElementH1,
} from '@/utils/get-element.js';

export function initApp() {
  const root = document.body;
  root.textContent = '';

  getElementHeader({
    classes: 'header',
    parent: root,
    children: [
      getElementH1({ classes: 'logo', text: 'Memory Game' }),
      getElementDiv({
        classes: 'header-controls',
        children: [
          getElementButton({
            classes: 'btn',
            text: 'Новая игра',
            events: { click: () => console.log('Новая игра') },
          }),
          getElementButton({
            classes: 'btn',
            text: 'Таблица лидеров',
            events: { click: () => console.log('Таблица лидеров') },
          }),
        ],
      }),
    ],
  });

  const gameBoard = getElementDiv({ classes: 'game-board' });

  getElementDiv({
    classes: 'game-container',
    parent: root,
    children: [
      getElementDiv({
        classes: 'stats-panel',
        children: [
          getElementDiv({
            classes: 'stat-item',
            children: [
              getElementSpan({ text: 'Ходы: ' }),
              getElementSpan({ classes: 'stat-count-moves', text: '0' }),
            ],
          }),
          getElementDiv({
            classes: 'stat-item',
            children: [
              getElementSpan({ text: 'Найденные пары: ' }),
              getElementSpan({ classes: 'stat-count-pairs', text: '0 / 8' }),
            ],
          }),
        ],
      }),
      gameBoard,
    ],
  });

  startNewGame();
}

function startNewGame() {
  renderCards();
}

const CARD_IMAGES = ['🦁', '🦊', '🦝', '🐱', '🐼', '🐨', '🐸', '🐙'];
const DOUBLE_CARDS = [...CARD_IMAGES, ...CARD_IMAGES];

function renderCards() {
  const board = document.querySelector('.game-board');
  board.textContent = '';

  DOUBLE_CARDS.forEach((card, i) => {
    getElementDiv({
      classes: 'card',
      parent: board,
      attributes: { 'data-id': i },
      events: {
        click: () => {
          console.log('Выбор карточки');
        },
      },
      children: [
        getElementDiv({ classes: 'card-front', text: card }),
        getElementDiv({ classes: 'card-back', text: '?' }),
      ],
    });
  });
}
