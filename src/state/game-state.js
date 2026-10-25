import { EventEmitter } from '@/utils/event-emitter';
import { getFormattedTime } from '@/utils/format-time';
import { shuffle } from '@/utils/shuffie-array';

const CARD_IMAGES = ['🦁', '🦊', '🦝', '🐱', '🐼', '🐨', '🐸', '🐙'];
const DOUBLE_CARDS = [...CARD_IMAGES, ...CARD_IMAGES];

export class GameState extends EventEmitter {
  constructor(timerInstance) {
    super();

    this.timer = timerInstance;

    this.cards = [];
    this.moves = 0;
    this.matchedPairs = 0;
    this.selectedCards = [];
    this.isLocked = false;
    this.timeoutId = null;
  }

  emitStateChange() {
    this.emit('change', {
      moves: this.moves,
      pairs: this.matchedPairs,
    });
  }

  initGame() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    this.timer.pause();
    this.timer.reset();

    this.moves = 0;
    this.matchedPairs = 0;
    this.selectedCards = [];
    this.isLocked = false;

    const shuffledValues = shuffle(DOUBLE_CARDS);
    this.cards = shuffledValues.map((val, ind) => ({
      id: ind,
      value: val,
      isFlipped: false,
      isMatched: false,
    }));

    this.emitStateChange();
  }

  handleCardClick(cardId, updateCardUI) {
    const card = this.cards.find((c) => c.id === cardId);

    if (this.isLocked || card.isFlipped || card.isMatched) return;

    if (!this.timer.isRunning) {
      this.timer.start();
    }

    card.isFlipped = true;
    this.selectedCards.push(card);
    updateCardUI(cardId, 'flip');

    if (this.selectedCards.length === 1) return;

    this.moves++;
    this.emitStateChange();

    this.checkMatch(updateCardUI);
  }

  checkMatch(updateCardUI) {
    const [card1, card2] = this.selectedCards;

    if (card1.value === card2.value) {
      card1.isMatched = true;
      card2.isMatched = true;
      this.matchedPairs++;

      this.selectedCards = [];
      this.emitStateChange();

      updateCardUI(card1.id, 'match');
      updateCardUI(card2.id, 'match');

      if (this.matchedPairs === 8) {
        this.timer.pause();
        this.saveResult();
        this.emit('win', {
          moves: this.moves,
          time: getFormattedTime(this.timer.seconds),
        });
      }
    } else {
      this.isLocked = true;

      this.timeoutId = setTimeout(() => {
        card1.isFlipped = false;
        card2.isFlipped = false;

        updateCardUI(card1.id, 'unflip');
        updateCardUI(card2.id, 'unflip');

        this.selectedCards = [];
        this.isLocked = false;
        this.timeoutId = null;
      }, 700);
    }
  }

  saveResult() {
    const scores = JSON.parse(localStorage.getItem('memory-game-scores')) || [];

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    const dateStr = `${day}.${month}.${year}`;

    scores.push({
      moves: this.moves,
      timeStr: getFormattedTime(this.timer.seconds),
      rawSeconds: this.timer.seconds,
      date: dateStr,
    });

    scores.sort((a, b) => {
      if (a.moves !== b.moves) return a.moves - b.moves;
      return a.rawSeconds - b.rawSeconds;
    });

    const topScores = scores.slice(0, 10);
    localStorage.setItem('memory-game-scores', JSON.stringify(topScores));
  }
}
