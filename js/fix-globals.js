// Fix for global variables to ensure compatibility
(function() {
    // Ensure window.createLanguageSwitcher is available globally
    if (typeof window.createLanguageSwitcher === 'undefined' && typeof createLanguageSwitcher === 'function') {
        window.createLanguageSwitcher = createLanguageSwitcher;
    }
    
    // Ensure mcpServersData is available
    if (typeof window.mcpServersData === 'undefined' && typeof mcpServersData !== 'undefined') {
        window.mcpServersData = mcpServersData;
    }
    
    // Log initialization status
    console.log('Fix globals loaded');
    console.log('langManager:', typeof window.langManager);
    console.log('mcpServersData:', typeof window.mcpServersData);
    console.log('store:', typeof window.store);
    console.log('ui:', typeof window.ui);
})();