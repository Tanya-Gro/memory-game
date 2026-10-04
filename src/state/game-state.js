const CARD_IMAGES = ['🦁', '🦊', '🦝', '🐱', '🐼', '🐨', '🐸', '🐙'];
const DOUBLE_CARDS = [...CARD_IMAGES, ...CARD_IMAGES];

export class GameState {
  constructor(onStateChange, onGameWin) {
    this.onStateChange = onStateChange;
    this.onGameWin = onGameWin;

    this.cards = [];
    this.moves = 0;
    this.matchedPairs = 0;
    this.selectedCards = [];
    this.isLocked = false;
    this.timeoutId = null;
  }

  // Алгоритм тасования Фишера — Йейта
  shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  initGame() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    this.moves = 0;
    this.matchedPairs = 0;
    this.selectedCards = [];
    this.isLocked = false;

    const shuffledValues = this.shuffle(DOUBLE_CARDS);

    this.cards = shuffledValues.map((value, index) => ({
      id: index,
      value: value,
      isFlipped: false,
      isMatched: false,
    }));

    this.onStateChange({ moves: this.moves, pairs: this.matchedPairs });
  }

  handleCardClick(cardId, updateCardUI) {
    const card = this.cards.find((c) => c.id === cardId);

    if (this.isLocked || card.isFlipped || card.isMatched) return;

    card.isFlipped = true;
    this.selectedCards.push(card);
    updateCardUI(cardId, 'flip');

    if (this.selectedCards.length === 1) return;

    this.moves++;
    this.onStateChange({ moves: this.moves, pairs: this.matchedPairs });

    this.checkMatch(updateCardUI);
  }

  checkMatch(updateCardUI) {
    const [card1, card2] = this.selectedCards;

    if (card1.value === card2.value) {
      card1.isMatched = true;
      card2.isMatched = true;
      this.matchedPairs++;

      this.selectedCards = [];
      this.onStateChange({ moves: this.moves, pairs: this.matchedPairs });

      updateCardUI(card1.id, 'match');
      updateCardUI(card2.id, 'match');

      if (this.matchedPairs === 8) {
        this.saveResult();
        this.onGameWin(this.moves);
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

    scores.push({ moves: this.moves, date: dateStr });

    scores.sort((a, b) => a.moves - b.moves);

    const topScores = scores.slice(0, 10);
    localStorage.setItem('memory-game-scores', JSON.stringify(topScores));
  }
}
