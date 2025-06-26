window.store = {
    servers: [],
    categories: [],
    filteredServers: [],
    selectedCategories: new Set(),
    searchQuery: '',
    sortBy: 'name',

    init() {
        this.servers = window.mcpServersData.servers;
        this.categories = window.mcpServersData.categories;
        this.filteredServers = [...this.servers];
    },

    getContributors() {
        return new Set(this.servers.map(s => s.author));
    },

    filterServers() {
        this.filteredServers = this.servers.filter(server => {
            if (this.selectedCategories.size > 0) {
                const categoryId = server.category.toLowerCase().replace(/[\s\/]/g, '-');
                if (!this.selectedCategories.has(categoryId)) {
                    return false;
                }
            }

            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                const searchableText = [
                    server.name,
                    server.description,
                    server.author,
                    server.category,
                    ...server.tags
                ].join(' ').toLowerCase();

                if (!searchableText.includes(query)) {
                    return false;
                }
            }

            return true;
        });
    },

    sortServers() {
        this.filteredServers.sort((a, b) => {
            switch (this.sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'date':
                    return new Date(b.dateAdded) - new Date(a.dateAdded);
                case 'category':
                    return a.category.localeCompare(b.category);
                default:
                    return 0;
            }
        });
    }
};