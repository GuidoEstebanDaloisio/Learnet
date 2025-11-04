// Pequeño efecto en el navbar al hacer scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(0, 0, 0, 0.3)';
    nav.style.backdropFilter = 'blur(6px)';
  } else {
    nav.style.background = 'transparent';
  }
});
