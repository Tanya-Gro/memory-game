export function updateCountersUI({ moves, pairs }) {
  document.querySelector('.stat-count-moves').textContent = moves;
  document.querySelector('.stat-count-pairs').textContent = `${pairs} / 8`;
}
