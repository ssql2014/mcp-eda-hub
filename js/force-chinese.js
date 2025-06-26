// Force Chinese language on first load
(function() {
    // Check if this is the first visit or if language is not set
    const currentLang = localStorage.getItem('language');
    const hasVisited = localStorage.getItem('hasVisited');
    
    // If first visit or no language set, force Chinese
    if (!hasVisited || !currentLang) {
        localStorage.setItem('language', 'zh');
        localStorage.setItem('hasVisited', 'true');
        
        // If langManager exists, update it
        if (window.langManager) {
            window.langManager.setLanguage('zh');
        }
    }
})();