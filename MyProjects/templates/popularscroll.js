export function setupPopularScroll() {
    let popularContainers = document.querySelectorAll('.popular-container');
    
    popularContainers.forEach(container => {
      let scrollWrapper = container.querySelector('.popular-wrapper');
      let leftArrow = container.querySelector('.pop-left');
      let rightArrow = container.querySelector('.pop-right');
  
      if (!scrollWrapper || !leftArrow || !rightArrow) return; // Prevent errors if missing
  
      function scrollLeft() {
        scrollWrapper.scrollBy({ left: -200, behavior: 'smooth' });
      }
  
      function scrollRight() {
        scrollWrapper.scrollBy({ left: 200, behavior: 'smooth' });
      }
  
      leftArrow.addEventListener('click', scrollLeft);
      rightArrow.addEventListener('click', scrollRight);
    });
  }
