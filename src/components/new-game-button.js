import { getElementButton } from '@/utils/get-element';
import { startNewGame } from '@/utils/start-new-game';

export const newGameButton = (onClick) =>
  getElementButton({
    classes: 'btn btn-new-game',
    text: 'Новая игра',
    events: { click: onClick },
  });
