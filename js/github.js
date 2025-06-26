// GitHub API integration for fetching star counts
window.github = {
    // Cache for storing star counts with timestamp
    cache: new Map(),
    cacheTimeout: 3600000, // 1 hour in milliseconds
    
    // Extract owner and repo from GitHub URL
    parseGithubUrl(url) {
        const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) return null;
        
        let owner = match[1];
        let repo = match[2];
        
        // Remove .git extension if present
        repo = repo.replace(/\.git$/, '');
        
        // Handle URLs with /tree/main or similar paths
        const treeMatch = repo.match(/^([^\/]+)/);
        if (treeMatch) {
            repo = treeMatch[1];
        }
        
        return { owner, repo };
    },
    
    // Get star count from cache or fetch from API
    async getStarCount(githubUrl) {
        const parsed = this.parseGithubUrl(githubUrl);
        if (!parsed) return null;
        
        const cacheKey = `${parsed.owner}/${parsed.repo}`;
        const cached = this.cache.get(cacheKey);
        
        // Check if cache is still valid
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.stars;
        }
        
        try {
            // Fetch from GitHub API
            const response = await fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`);
            
            if (!response.ok) {
                console.error(`GitHub API error for ${cacheKey}:`, response.status);
                return null;
            }
            
            const data = await response.json();
            const stars = data.stargazers_count;
            
            // Update cache
            this.cache.set(cacheKey, {
                stars,
                timestamp: Date.now()
            });
            
            return stars;
        } catch (error) {
            console.error(`Error fetching stars for ${cacheKey}:`, error);
            return null;
        }
    },
    
    // Batch fetch star counts for multiple repos
    async getStarCounts(githubUrls) {
        const promises = githubUrls.map(url => this.getStarCount(url));
        return Promise.all(promises);
    },
    
    // Format star count for display
    formatStarCount(count) {
        if (count === null || count === undefined) return '';
        
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'k';
        }
        return count.toString();
    }
};