import {
  getElementDiv,
  getElementButton,
  getElementHeader,
  getElementSpan,
  getElementH1,
} from '@/utils/get-element.js';
import { showLeaderboardModal, showWinModal } from '@/components/modal.js';
import { createThemeToggle, initTheme } from '@/components/theme';
import { newGameButton } from '@/components/new-game-button';
import { initBoardController, startNewGame } from '@/utils/start-new-game';
import { GameState } from '@/state/game-state.js';
import { updateCountersUI } from '@/utils/updateUI.js';

const gameState = new GameState(updateCountersUI, (moves, time) =>
  showWinModal(moves, time, startNewGame)
);

export function initApp() {
  const root = document.body;
  root.textContent = '';
  initTheme();
  initBoardController(gameState);

  getElementHeader({
    classes: 'header',
    parent: root,
    children: [
      getElementH1({ classes: 'logo', text: 'Memory Game' }),
      getElementDiv({
        classes: 'header-controls',
        children: [
          newGameButton(startNewGame),
          getElementButton({
            classes: 'btn btn-leaderboard',
            text: 'Таблица лидеров',
            events: { click: showLeaderboardModal },
          }),
          createThemeToggle(),
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
          getElementDiv({
            classes: 'stat-item',
            children: [
              getElementSpan({ text: 'Время: ' }),
              getElementSpan({ classes: 'stat-count-time', text: '00:00' }),
            ],
          }),
        ],
      }),
      gameBoard,
    ],
  });

  startNewGame();
}
