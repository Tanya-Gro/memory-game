import { getElementButton } from '@/utils/get-element';

export const newGameButton = (onClick) =>
  getElementButton({
    classes: 'btn btn-new-game',
    text: 'Новая игра',
    events: { click: onClick },
  });
