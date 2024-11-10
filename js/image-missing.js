// Select all images on the page
document.querySelectorAll('img').forEach(img => {
    img.onerror = function() {
      this.onerror = null; // Prevents infinite loop if default image missing
      this.src = '../images/default_image.jpg';
      this.alt = ""
    };
  });
  