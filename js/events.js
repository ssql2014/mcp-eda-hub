window.events = {
    init() {
        ui.elements.searchInput.addEventListener('input', this.onSearch.bind(this));
        ui.elements.categoriesContainer.addEventListener('click', this.onCategoryClick.bind(this));
        ui.elements.clearFilters.addEventListener('click', this.onClearFilters.bind(this));
        ui.elements.sortSelect.addEventListener('change', this.onSort.bind(this));
        ui.elements.serversGrid.addEventListener('click', this.onServerClick.bind(this));
        ui.elements.serverModal.addEventListener('click', this.onModalClick.bind(this));
        document.addEventListener('keydown', this.onKeydown.bind(this));
    },

    onSearch(e) {
        store.searchQuery = e.target.value;
        store.filterServers();
        ui.renderServers(store.filteredServers);
    },

    onCategoryClick(e) {
        if (e.target.classList.contains('category-tag')) {
            const category = e.target.dataset.category;
            if (store.selectedCategories.has(category)) {
                store.selectedCategories.delete(category);
                e.target.classList.remove('active');
            } else {
                store.selectedCategories.add(category);
                e.target.classList.add('active');
            }
            store.filterServers();
            ui.renderServers(store.filteredServers);
        }
    },

    onClearFilters() {
        store.selectedCategories.clear();
        document.querySelectorAll('.category-tag').forEach(tag => {
            tag.classList.remove('active');
        });
        store.filterServers();
        ui.renderServers(store.filteredServers);
    },

    onSort(e) {
        store.sortBy = e.target.value;
        store.sortServers();
        ui.renderServers(store.filteredServers);
    },

    onServerClick(e) {
        const card = e.target.closest('.server-card');
        if (card) {
            const server = store.servers.find(s => s.id === card.dataset.serverId);
            if (server) {
                ui.showServerModal(server);
            }
        }
    },

    onModalClick(e) {
        if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal')) {
            ui.hideServerModal();
        }
    },

    onKeydown(e) {
        if (e.key === 'Escape' && ui.elements.serverModal.classList.contains('active')) {
            ui.hideServerModal();
        }
    }
};