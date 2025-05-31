// Select all category containers
let categoryContainers = document.querySelectorAll('.category-container');

// Loop through each container to set up individual scrolling functionality
categoryContainers.forEach(container => {
    let scrollWrapper = container.querySelector('.scroll-wrapper'); // Find the scrollable wrapper inside the container
    let leftArrow = container.querySelector('.scroll-left'); // Find the left arrow inside the container
    let rightArrow = container.querySelector('.scroll-right'); // Find the right arrow inside the container

    // Define Functions for scrolling
    function scrollLeft() {
        scrollWrapper.scrollBy({ left: -200, behavior: 'smooth' });
    }

    function scrollRight() {
        scrollWrapper.scrollBy({ left: 200, behavior: 'smooth' });
    }

    // Add event listeners for the buttons in this container
    leftArrow.addEventListener('click', scrollLeft);
    rightArrow.addEventListener('click', scrollRight);

    // Optional: Add functionality for mousedown (if needed)
    scrollWrapper.addEventListener('mousedown', () => {
        // Add any custom functionality for mousedown here
        console.log('Scrolling started');
    });
});



