import { gameState } from '@/state/game-state.js';
import { getElementDiv } from '@/utils/get-element.js';

export function startNewGame() {
  gameState.initGame();
  renderCards();
}

function renderCards() {
  const board = document.querySelector('.game-board');
  board.textContent = '';

  gameState.cards.forEach((cardData) => {
    getElementDiv({
      classes: 'card',
      parent: board,
      attributes: { 'data-id': cardData.id },
      events: {
        click: () => {
          gameState.handleCardClick(cardData.id, updateCardAppearance);
        },
      },
      children: [
        getElementDiv({ classes: 'card-front', text: cardData.value }),
        getElementDiv({ classes: 'card-back', text: '?' }),
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
