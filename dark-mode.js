// ===== DARK-MODE.JS - Theme Management =====

const THEME_KEY = 'cm-tech-theme';
const DARK_MODE_CLASS = 'dark-mode';

// Initialize theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determine initial theme
    let isDarkMode = false;
    
    if (savedTheme) {
        isDarkMode = savedTheme === 'dark';
    } else if (prefersDark) {
        isDarkMode = true;
    }
    
    // Apply theme
    applyTheme(isDarkMode);
    updateThemeToggle(isDarkMode);
}

// Apply theme to document
function applyTheme(isDarkMode) {
    if (isDarkMode) {
        document.documentElement.classList.add(DARK_MODE_CLASS);
        document.body.classList.add(DARK_MODE_CLASS);
        localStorage.setItem(THEME_KEY, 'dark');
    } else {
        document.documentElement.classList.remove(DARK_MODE_CLASS);
        document.body.classList.remove(DARK_MODE_CLASS);
        localStorage.setItem(THEME_KEY, 'light');
    }
}

// Update toggle button appearance
function updateThemeToggle(isDarkMode) {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        const sunIcon = toggle.querySelector('.sun-icon');
        const moonIcon = toggle.querySelector('.moon-icon');
        
        if (isDarkMode) {
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'block';
        } else {
            if (sunIcon) sunIcon.style.display = 'block';
            if (moonIcon) moonIcon.style.display = 'none';
        }
    }
}

// Toggle theme
function toggleTheme() {
    const isDarkMode = document.body.classList.contains(DARK_MODE_CLASS);
    applyTheme(!isDarkMode);
    updateThemeToggle(!isDarkMode);
}

// Setup theme toggle button
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    
    // Add hover effect
    themeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'rotate(20deg)';
    });
    
    themeToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'rotate(0deg)';
    });
    
    themeToggle.style.transition = 'transform 0.3s ease-out';
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (!savedTheme) {
        applyTheme(e.matches);
        updateThemeToggle(e.matches);
    }
});

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTheme);
} else {
    initializeTheme();
}

console.log('Dark mode initialized');
