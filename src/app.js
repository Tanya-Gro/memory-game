import {
  getElementDiv,
  getElementButton,
  getElementHeader,
  getElementSpan,
  getElementH1,
} from '@/utils/get-element.js';
import { showLeaderboardModal } from '@/components/modal.js';
import { newGameButton } from '@/components/new-game-button';
import { startNewGame } from '@/utils/start-new-game';

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
          newGameButton(startNewGame),
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
}
