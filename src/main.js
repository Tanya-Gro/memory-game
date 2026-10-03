import './style.css';

const app = document.querySelector('#app');

if (!app) {
  console.log('There is no any app container');
} else {
  app.textContent = 'App in progress...';
}
