// Main app initialization with i18n support
(function() {
    window.app = {
        state: null,
        
        getCategories() {
            return store.categories;
        },
        
        getFilteredServers() {
            return store.filteredServers;
        }
    };
    
    function init() {
        // Initialize UI elements first
        ui.initElements();
        
        // Initialize language switcher
        const nav = document.querySelector('nav');
        if (nav) {
            const switcher = createLanguageSwitcher();
            nav.appendChild(switcher);
        }
        
        // Initialize store
        store.init();
        window.app.state = store;
        
        // Update UI with initial language
        ui.updateLanguage();
        
        // Update stats and render content
        ui.updateStats(
            store.servers.length,
            store.categories.length,
            store.getContributors().size
        );
        ui.renderCategories(store.categories);
        ui.renderServers(store.filteredServers);
        
        // Initialize events
        events.init();
        
        // Listen for language changes
        window.addEventListener('languageChanged', () => {
            ui.updateLanguage();
        });
    }
    
    // Language switcher component
    function createLanguageSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'language-switcher';
        switcher.innerHTML = `
            <button class="lang-btn" data-lang="en" title="English">
                <span class="lang-flag">🇬🇧</span>
                <span class="lang-text">EN</span>
            </button>
            <button class="lang-btn" data-lang="zh" title="中文">
                <span class="lang-flag">🇨🇳</span>
                <span class="lang-text">中文</span>
            </button>
        `;
        
        // Add event listeners
        switcher.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                window.langManager.setLanguage(lang);
                updateActiveLanguage();
            });
        });
        
        // Update active state
        function updateActiveLanguage() {
            const currentLang = window.langManager.getCurrentLang();
            switcher.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.lang === currentLang);
            });
        }
        
        updateActiveLanguage();
        
        return switcher;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();