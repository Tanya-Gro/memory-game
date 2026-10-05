import {
  getElementDiv,
  getElementButton,
  getElementH2,
  getElementSpan,
  getElementP,
} from '@/utils/get-element.js';
import { newGameButton } from './new-game-button';

class Modal {
  constructor() {
    this.overlay = null;
    this.escapeHandler = this.handleEscape.bind(this);
  }

  open(contentElement) {
    document.body.classList.add('modal-open');

    const closeCrossButton = getElementButton({
      classes: 'btn-close-cross',
      text: '×',
      attributes: { 'aria-label': 'Закрыть модальное окно' },
      events: { click: () => this.close() },
    });

    this.overlay = getElementDiv({
      classes: 'modal-overlay',
      children: [
        getElementDiv({
          classes: 'modal-window',
          children: [closeCrossButton, contentElement],
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
  }

  handleEscape(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }
}

export function showWinModal(finalMoves, time, onRestart) {
  const currentModal = new Modal();
  const winContent = getElementDiv({
    classes: 'modal-win-content',
    children: [
      getElementH2({ text: 'Поздравляем с победой!' }),
      getElementP({
        text: 'Вы нашли все пары!',
      }),
      getElementP({
        text: `Время: ${time}.`,
      }),
      getElementP({
        text: `Количество ходов: ${finalMoves}.`,
      }),
      newGameButton(() => {
        if (onRestart) onRestart();
        currentModal.close();
      }),
    ],
  });
  currentModal.open(winContent);
}

export function showLeaderboardModal() {
  const scores = JSON.parse(localStorage.getItem('memory-game-scores')) || [];

  const currentModal = new Modal();
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
            getElementSpan({ text: 'Время' }),
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
              getElementSpan({
                classes: 'leaderboard-moves',
                text: score.timeStr,
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

  currentModal.open(leaderboardContent);
}
