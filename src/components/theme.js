import { getElementButton, getElementSpan } from '@/utils/get-element.js';

export function initTheme() {
  const savedTheme = localStorage.getItem('memory-game-theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }
}

export function createThemeToggle() {
  const currentTheme = localStorage.getItem('memory-game-theme') || 'light';
  const toggleClass =
    'advanced-theme-toggle' + (currentTheme === 'dark' ? ' is-dark' : '');

  const toggleBtn = getElementButton({
    classes: toggleClass,
    attributes: { 'aria-label': 'Переключить цветовую тему' },
    events: {
      click: () => {
        const isDark = document.body.classList.toggle('dark');
        const newTheme = isDark ? 'dark' : 'light';
        localStorage.setItem('memory-game-theme', newTheme);

        if (isDark) {
          toggleBtn.classList.add('is-dark');
        } else {
          toggleBtn.classList.remove('is-dark');
        }
      },
    },
  });

  getElementSpan({ classes: 'toggle-track', parent: toggleBtn });

  const sunIcon = getElementSpan({
    classes: 'toggle-icon icon-sun',
    parent: toggleBtn,
  });
  getElementSpan({ classes: 'sun-beams', parent: sunIcon });

  const moonIcon = getElementSpan({
    classes: 'toggle-icon icon-moon',
    parent: toggleBtn,
  });
  getElementSpan({ classes: 'moon-crater', parent: moonIcon });

  getElementSpan({ classes: 'toggle-thumb', parent: toggleBtn });

  return toggleBtn;
}
