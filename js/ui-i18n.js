// UI module with internationalization support
window.ui = {
    elements: {},
    
    // Initialize elements after DOM is ready
    initElements() {
        this.elements = {
            searchInput: document.getElementById('searchInput'),
            categoriesContainer: document.getElementById('categoriesContainer'),
            serversGrid: document.getElementById('serversGrid'),
            noResults: document.getElementById('noResults'),
            serverModal: document.getElementById('serverModal'),
            serverCount: document.getElementById('serverCount'),
            categoryCount: document.getElementById('categoryCount'),
            contributorCount: document.getElementById('contributorCount'),
            serverCardTemplate: document.getElementById('serverCardTemplate'),
            serverModalTemplate: document.getElementById('serverModalTemplate'),
            clearFilters: document.getElementById('clearFilters'),
            sortSelect: document.getElementById('sortSelect'),
        };
    },

    // Update all text content based on current language
    updateLanguage() {
        const t = window.langManager.t.bind(window.langManager);
        
        // Update navigation
        document.querySelectorAll('nav a').forEach((link, index) => {
            const keys = ['servers', 'categories', 'about'];
            if (keys[index]) {
                link.textContent = t(`nav.${keys[index]}`);
            }
        });
        
        // Update hero section
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) heroTitle.textContent = t('hero.title');
        
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) heroSubtitle.textContent = t('hero.subtitle');
        
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.placeholder = t('hero.searchPlaceholder');
        
        // Update stats labels
        const statLabels = document.querySelectorAll('.stat-label');
        const statKeys = ['servers', 'categories', 'contributors'];
        statLabels.forEach((label, index) => {
            if (statKeys[index]) {
                label.textContent = t(`stats.${statKeys[index]}`);
            }
        });
        
        // Update category section
        const categoryTitle = document.querySelector('.categories-section h3');
        if (categoryTitle) categoryTitle.textContent = t('categories.filter');
        
        const clearFilters = document.getElementById('clearFilters');
        if (clearFilters) clearFilters.textContent = t('categories.clearAll');
        
        // Update about section
        const aboutTitle = document.querySelector('.about-section h2');
        if (aboutTitle) aboutTitle.textContent = t('about.title');
        
        const aboutCards = document.querySelectorAll('.about-card');
        const aboutKeys = ['mcp', 'eda', 'contribute'];
        aboutCards.forEach((card, index) => {
            if (aboutKeys[index]) {
                const h4 = card.querySelector('h4');
                const p = card.querySelector('p');
                if (h4) h4.textContent = t(`about.${aboutKeys[index]}Title`);
                if (p) p.textContent = t(`about.${aboutKeys[index]}Desc`);
            }
        });
        
        // Update footer
        const footerTexts = document.querySelectorAll('.footer p');
        if (footerTexts[0]) footerTexts[0].textContent = t('footer.copyright');
        if (footerTexts[1]) footerTexts[1].textContent = t('footer.builtWith');
        
        // Re-render categories and servers with new language
        if (window.app && window.app.state) {
            this.renderCategories(window.app.getCategories());
            this.renderServers(window.app.getFilteredServers());
        }
    },

    updateStats(serverCount, categoryCount, contributorCount) {
        this.elements.serverCount.textContent = serverCount;
        this.elements.categoryCount.textContent = categoryCount;
        this.elements.contributorCount.textContent = contributorCount;
    },

    renderCategories(categories) {
        const t = window.langManager.t.bind(window.langManager);
        this.elements.categoriesContainer.innerHTML = categories
            .map(category => {
                const translatedName = t(`categories.names.${category.id}`) || category.name;
                return `
                    <button class="category-tag" data-category="${category.id}">
                        ${translatedName} (${category.count})
                    </button>
                `;
            })
            .join('');
    },

    renderServers(servers) {
        if (servers.length === 0) {
            this.elements.serversGrid.style.display = 'none';
            this.elements.noResults.style.display = 'block';
            return;
        }

        this.elements.serversGrid.style.display = 'grid';
        this.elements.noResults.style.display = 'none';

        const t = window.langManager.t.bind(window.langManager);
        this.elements.serversGrid.innerHTML = '';
        servers.forEach(server => {
            const card = this.elements.serverCardTemplate.content.cloneNode(true);
            card.querySelector('.server-card').dataset.serverId = server.id;
            card.querySelector('.server-title').textContent = server.name;
            card.querySelector('.server-author').textContent = `${t('server.by')} ${server.author}`;
            
            const categoryTranslated = t(`categories.names.${server.category}`) || server.category;
            card.querySelector('.server-category').textContent = categoryTranslated;
            
            // Use translated description if available
            const currentLang = window.langManager.getCurrentLang();
            const translatedDesc = window.getServerTranslation && window.getServerTranslation(server.id, 'description', currentLang);
            card.querySelector('.server-description').textContent = translatedDesc || server.description;
            card.querySelector('.server-tags').innerHTML = server.tags.map(tag => `<span class="server-tag">${tag}</span>`).join('');
            
            // Store GitHub URL in the star count element for later fetching
            const starElement = card.querySelector('.server-stars');
            if (starElement && server.githubUrl) {
                starElement.dataset.githubUrl = server.githubUrl;
            }
            
            this.elements.serversGrid.appendChild(card);
        });
        
        // Fetch star counts after rendering
        this.fetchStarCounts();
    },
    
    async fetchStarCounts() {
        const starElements = document.querySelectorAll('.server-stars[data-github-url]');
        
        for (const element of starElements) {
            const githubUrl = element.dataset.githubUrl;
            if (githubUrl) {
                try {
                    const starCount = await window.github.getStarCount(githubUrl);
                    if (starCount !== null) {
                        const countElement = element.querySelector('.star-count');
                        if (countElement) {
                            countElement.textContent = window.github.formatStarCount(starCount);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching star count:', error);
                }
            }
        }
    },

    showServerModal(server) {
        const t = window.langManager.t.bind(window.langManager);
        const modal = this.elements.serverModalTemplate.content.cloneNode(true);
        modal.querySelector('h2').textContent = server.name;
        modal.querySelector('.server-author').textContent = `Created by ${server.author}`;
        
        const categoryTranslated = t(`categories.names.${server.category}`) || server.category;
        modal.querySelector('.server-category').textContent = categoryTranslated;
        
        // Use translated description and features if available
        const currentLang = window.langManager.getCurrentLang();
        const translatedDesc = window.getServerTranslation && window.getServerTranslation(server.id, 'description', currentLang);
        modal.querySelector('.server-description').textContent = translatedDesc || server.description;
        
        const translatedFeatures = window.getServerTranslation && window.getServerTranslation(server.id, 'features', currentLang);
        const features = translatedFeatures || server.features;
        modal.querySelector('ul').innerHTML = features.map(feature => `<li>${feature}</li>`).join('');
        
        // Update section titles
        const sections = modal.querySelectorAll('h3');
        sections[0].textContent = t('server.features');
        sections[1].textContent = t('server.install');
        sections[2].textContent = t('server.config');
        
        const [installCode, configCode] = modal.querySelectorAll('pre code');
        installCode.textContent = server.installCommand;
        configCode.textContent = JSON.stringify(server.config, null, 2);

        const [installCopy, configCopy] = modal.querySelectorAll('.copy-button');
        installCopy.addEventListener('click', () => this.copyToClipboard(server.installCommand, installCopy));
        configCopy.addEventListener('click', () => this.copyToClipboard(JSON.stringify(server.config, null, 2), configCopy));

        const githubLink = modal.querySelector('a');
        githubLink.href = server.githubUrl;
        githubLink.textContent = t('server.viewOnGitHub');
        
        modal.querySelector('.server-tags').innerHTML = server.tags.map(tag => `<span class="server-tag">${tag}</span>`).join('');

        this.elements.serverModal.innerHTML = '';
        this.elements.serverModal.appendChild(modal);
        this.elements.serverModal.classList.add('active');
        
        // Fetch and display star count for modal
        if (server.githubUrl && window.github) {
            window.github.getStarCount(server.githubUrl).then(starCount => {
                if (starCount !== null) {
                    const titleElement = this.elements.serverModal.querySelector('h2');
                    if (titleElement && !titleElement.querySelector('.modal-stars')) {
                        const starSpan = document.createElement('span');
                        starSpan.className = 'modal-stars';
                        starSpan.innerHTML = `
                            <svg class="star-icon" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
                            </svg>
                            ${window.github.formatStarCount(starCount)}
                        `;
                        titleElement.appendChild(starSpan);
                    }
                }
            });
        }
    },

    hideServerModal() {
        this.elements.serverModal.classList.remove('active');
    },

    copyToClipboard(text, button) {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.style.backgroundColor = 'var(--secondary-color)';
            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    }
};