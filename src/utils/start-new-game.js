import { getElementDiv } from '@/utils/get-element.js';

let localGameState = null;

export function initBoardController(gameStateInstance) {
  localGameState = gameStateInstance;
}

export function startNewGame() {
  if (!localGameState) return;
  localGameState.initGame();
  renderCards();
}

function renderCards() {
  const board = document.querySelector('.game-board');
  if (!board) return;
  board.textContent = '';

  localGameState.cards.forEach((cardData) => {
    getElementDiv({
      classes: 'card',
      parent: board,
      attributes: { 'data-id': cardData.id },
      events: {
        click: () => {
          localGameState.handleCardClick(cardData.id, updateCardAppearance);
        },
      },
      children: [
        getElementDiv({ classes: 'card-front', text: cardData.value }),
        getElementDiv({
          classes: 'card-back',
          text: '?',
          attributes: { 'aria-label': 'Скрытая карточка' },
        }),
      ],
    });
  });
}

function updateCardAppearance(cardId, action) {
  const cardElement = document.querySelector(`.card[data-id="${cardId}"]`);
  if (!cardElement) return;

  if (action === 'flip') {
    cardElement.classList.add('flipped');
  } else if (action === 'unflip') {
    cardElement.classList.remove('flipped');
  } else if (action === 'match') {
    cardElement.classList.add('matched');
  }
}
