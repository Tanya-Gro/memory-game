export function updateCountersUI({ moves, pairs, time }) {
  document.querySelector('.stat-count-moves').textContent = moves;
  document.querySelector('.stat-count-pairs').textContent = `${pairs} / 8`;
  document.querySelector('.stat-count-time').textContent = time;
}
