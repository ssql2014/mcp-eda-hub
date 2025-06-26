(function() {
    function init() {
        store.init();
        ui.updateStats(
            store.servers.length,
            store.categories.length,
            store.getContributors().size
        );
        ui.renderCategories(store.categories);
        ui.renderServers(store.filteredServers);
        events.init();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();