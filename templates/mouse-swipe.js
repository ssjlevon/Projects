

let isDragging = false;
let startX;
let scrollLeft;

const scrollWrapper = document.querySelector('.scroll-wrapper');

scrollWrapper.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - scrollWrapper.offsetLeft;
  scrollLeft = scrollWrapper.scrollLeft;
});

scrollWrapper.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault(); // Prevent default drag behavior
  const x = e.pageX - scrollWrapper.offsetLeft;
  const walk = (x - startX) * 2; // Multiplier for scroll sensitivity
  scrollWrapper.scrollLeft = scrollLeft - walk;
});

scrollWrapper.addEventListener('mouseup', () => {
  isDragging = false;
});

scrollWrapper.addEventListener('mouseleave', () => {
  isDragging = false; // Handle mouse leaving the container
});