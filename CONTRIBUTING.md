# Contributing to MCP-EDA Hub

We welcome contributions to the MCP-EDA Hub! This document provides guidelines for contributing to the project.

## How to Add a New MCP Server

To add your EDA MCP server to the directory, please follow these steps:

1.  **Fork the repository.**
2.  **Edit `js/data.js`:** Add your server to the `mcpServers` array. Please ensure your server object has the following structure:

    ```javascript
    {
        id: "your-server-id", // A unique identifier for your server
        name: "Your Server Name",
        author: "Your Name",
        category: "Category Name", // e.g., "Simulation", "Verification", etc.
        description: "A brief description of what your server does.",
        tags: ["tag1", "tag2", "tag3"], // Relevant tags for your server
        githubUrl: "https://github.com/yourusername/your-repo", // A link to the server's GitHub repository
        installCommand: "npm install your-server", // The command to install your server
        config: {
            "your-server": {
                "command": "node",
                "args": ["/path/to/your-server/index.js"]
            }
        }, // The Claude Desktop configuration for your server
        features: [
            "Feature 1",
            "Feature 2",
            "Feature 3"
        ], // A list of your server's features
        dateAdded: "YYYY-MM-DD" // The date you are adding the server
    }
    ```

3.  **Test locally:** Open `index.html` in your browser to ensure that your server is displayed correctly.
4.  **Submit a pull request:** Create a pull request with your changes. Please provide a clear title and description for your pull request.

## Guidelines

*   Ensure your MCP server is EDA-related.
*   Provide accurate installation instructions.
*   Include a working Claude Desktop configuration.
*   Add relevant tags and choose the appropriate category.

Thank you for contributing to the MCP-EDA Hub!