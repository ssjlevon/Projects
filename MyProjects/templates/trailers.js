


// Function to open the trailer modal
// Function to open the trailer modal with the specified movie trailer URL
function openTrailer(movieId, trailerUrl) {
    // Dynamically find the trailer modal and frame based on movie ID
    const modal = document.getElementById(movieId + "Modal");
    const frame = document.getElementById(movieId + "TrailerFrame");
    
    // Display the modal
    modal.style.display = "flex";
    
    // Set the trailer URL in the iframe
    frame.src = trailerUrl;
  }
  
  // Function to close the trailer modal and stop the video
  function closeTrailer(movieId) {
    // Dynamically find the trailer modal and frame based on movie ID
    const modal = document.getElementById(movieId + "Modal");
    const frame = document.getElementById(movieId + "TrailerFrame");
    
    // Hide the modal
    modal.style.display = "none";
    
    // Stop the video by clearing the iframe's src attribute
    frame.src = "";
  }