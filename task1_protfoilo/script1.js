// Select the theme toggle button from the HTML using its ID
const themeToggleButton = document.getElementById('theme-toggle');

// Listen for a 'click' event on the button
themeToggleButton.addEventListener('click', function() {
    
    // Toggle the 'dark-theme' class on the <body> element
    document.body.classList.toggle('dark-theme');
    
    // Change the button icon depending on whether dark mode is active
    if (document.body.classList.contains('dark-theme')) {
        themeToggleButton.textContent = '☀️'; // Switch icon to sun for light mode
    } else {
        themeToggleButton.textContent = '🌙'; // Switch icon to moon for dark mode
    }
});