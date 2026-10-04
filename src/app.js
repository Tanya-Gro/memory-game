import {
  getElementDiv,
  getElementButton,
  getElementHeader,
  getElementSpan,
  getElementH1,
  getElementH2,
  getElementP,
} from '@/utils/get-element.js';
import { GameState } from '@/state/game-state.js';
import { Modal } from '@/components/modal.js';

let gameState;

export function initApp() {
  const root = document.body;
  root.textContent = '';

  gameState = new GameState(updateCountersUI, showWinModal);

  getElementHeader({
    classes: 'header',
    parent: root,
    children: [
      getElementH1({ classes: 'logo', text: 'Memory Game' }),
      getElementDiv({
        classes: 'header-controls',
        children: [
          getElementButton({
            classes: 'btn btn-new-game',
            text: 'Новая игра',
            events: { click: () => startNewGame() },
          }),
          getElementButton({
            classes: 'btn btn-leaderboard',
            text: 'Таблица лидеров',
            events: { click: () => showLeaderboardModal() },
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

  getElementButton({
    classes: 'btn btn-leaderboard',
    text: 'Таблица лидеров',
    events: { click: () => showLeaderboardModal() },
  });
}

function startNewGame() {
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

function updateCountersUI({ moves, pairs }) {
  document.querySelector('.stat-count-moves').textContent = moves;
  document.querySelector('.stat-count-pairs').textContent = `${pairs} / 8`;
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

function showWinModal(finalMoves) {
  const winContent = getElementDiv({
    classes: 'modal-win-content',
    children: [
      getElementH2({ text: 'Поздравляем с победой!' }),
      getElementP({
        text: `Вы нашли все пары за следующее количество ходов: ${finalMoves}`,
      }),
      getElementButton({
        classes: 'btn btn-modal-new-game',
        text: 'Новая игра',
        events: {
          click: () => {
            currentModal.close();
            startNewGame();
          },
        },
      }),
    ],
  });

  const currentModal = new Modal(winContent);
  currentModal.open();
}

export function showLeaderboardModal() {
  const scores = JSON.parse(localStorage.getItem('memory-game-scores')) || [];

  let leaderboardBody;

  if (scores.length === 0) {
    leaderboardBody = getElementP({
      classes: 'leaderboard-empty',
      text: 'История игр пока пуста. Станьте первым лидером!',
    });
  } else {
    leaderboardBody = getElementDiv({
      classes: 'leaderboard-table',
      children: [
        getElementDiv({
          classes: 'leaderboard-row leaderboard-header',
          children: [
            getElementSpan({ text: 'Место' }),
            getElementSpan({ text: 'Количество ходов' }),
            getElementSpan({ text: 'Дата игры' }),
          ],
        }),
        ...scores.map((score, index) => {
          return getElementDiv({
            classes: 'leaderboard-row',
            children: [
              getElementSpan({
                classes: 'leaderboard-rank',
                text: `#${index + 1}`,
              }),
              getElementSpan({
                classes: 'leaderboard-moves',
                text: `${score.moves}`,
              }),
              getElementSpan({ classes: 'leaderboard-date', text: score.date }),
            ],
          });
        }),
      ],
    });
  }

  const leaderboardContent = getElementDiv({
    classes: 'modal-leaderboard-content',
    children: [getElementH2({ text: '🏆 Таблица лидеров' }), leaderboardBody],
  });

  const currentModal = new Modal(leaderboardContent);
  currentModal.open();
}
