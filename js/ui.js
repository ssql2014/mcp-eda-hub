window.ui = {
    elements: {
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
    },

    updateStats(serverCount, categoryCount, contributorCount) {
        this.elements.serverCount.textContent = serverCount;
        this.elements.categoryCount.textContent = categoryCount;
        this.elements.contributorCount.textContent = contributorCount;
    },

    renderCategories(categories) {
        this.elements.categoriesContainer.innerHTML = categories
            .map(category => `
                <button class="category-tag" data-category="${category.id}">
                    ${category.name} (${category.count})
                </button>
            `)
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

        this.elements.serversGrid.innerHTML = '';
        servers.forEach(server => {
            const card = this.elements.serverCardTemplate.content.cloneNode(true);
            card.querySelector('.server-card').dataset.serverId = server.id;
            card.querySelector('.server-title').textContent = server.name;
            card.querySelector('.server-author').textContent = `by ${server.author}`;
            card.querySelector('.server-category').textContent = server.category;
            card.querySelector('.server-description').textContent = server.description;
            card.querySelector('.server-tags').innerHTML = server.tags.map(tag => `<span class="server-tag">${tag}</span>`).join('');
            this.elements.serversGrid.appendChild(card);
        });
    },

    showServerModal(server) {
        const modal = this.elements.serverModalTemplate.content.cloneNode(true);
        modal.querySelector('h2').textContent = server.name;
        modal.querySelector('.server-author').textContent = `Created by ${server.author}`;
        modal.querySelector('.server-category').textContent = server.category;
        modal.querySelector('.server-description').textContent = server.description;
        modal.querySelector('ul').innerHTML = server.features.map(feature => `<li>${feature}</li>`).join('');
        
        const [installCode, configCode] = modal.querySelectorAll('pre code');
        installCode.textContent = server.installCommand;
        configCode.textContent = JSON.stringify(server.config, null, 2);

        const [installCopy, configCopy] = modal.querySelectorAll('.copy-button');
        installCopy.addEventListener('click', () => this.copyToClipboard(server.installCommand, installCopy));
        configCopy.addEventListener('click', () => this.copyToClipboard(JSON.stringify(server.config, null, 2), configCopy));

        modal.querySelector('a').href = server.githubUrl;
        modal.querySelector('.server-tags').innerHTML = server.tags.map(tag => `<span class="server-tag">${tag}</span>`).join('');

        this.elements.serverModal.innerHTML = '';
        this.elements.serverModal.appendChild(modal);
        this.elements.serverModal.classList.add('active');
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