// EDA MCP Servers Data
const mcpServers = [
    {
        id: "anysilicon-die-calculator",
        name: "AnySilicon Die Calculator",
        author: "AnySilicon",
        category: "Manufacturing",
        description: "Web scrapes the AnySilicon online calculator to compute dies per wafer. Provides accurate calculations through MCP interface using the latest AnySilicon calculation logic.",
        tags: ["die-per-wafer", "yield", "manufacturing", "wafer"],
        githubUrl: "https://github.com/ssql2014/mcp4eda/tree/main/anysilicon",
        installCommand: "git clone https://github.com/ssql2014/mcp4eda.git && cd mcp4eda/anysilicon && npm install && npm run build",
        config: {
            "anysilicon": {
                "command": "node",
                "args": ["/path/to/mcp4eda/anysilicon/dist/index.js"]
            }
        },
        features: [
            "Uses official AnySilicon online calculator via web scraping",
            "Always provides latest calculation logic from AnySilicon",
            "Supports 200mm and 300mm wafer sizes",
            "Returns total dies, wafer area, and utilization percentage",
            "No need to reverse-engineer calculation formulas"
        ],
        dateAdded: "2024-12-20"
    },
    {
        id: "verible-mcp",
        name: "Verible MCP Server",
        author: "mcp4eda",
        category: "Design Entry",
        description: "Comprehensive SystemVerilog/Verilog tools suite via Verible. Provides linting, formatting, syntax analysis, register analysis, project analysis, and more through a single MCP interface.",
        tags: ["verilog", "systemverilog", "verible", "lint", "format", "analysis", "rtl"],
        githubUrl: "https://github.com/ssql2014/mcp4eda/tree/main/verible-mcp",
        installCommand: "git clone https://github.com/ssql2014/mcp4eda.git && cd mcp4eda/verible-mcp && npm install && npm run build",
        config: {
            "verible": {
                "command": "node",
                "args": ["/path/to/mcp4eda/verible-mcp/dist/index.js"]
            }
        },
        features: [
            "Style linting with configurable rules and automatic fixing",
            "Code formatting with customizable indentation and line length",
            "Syntax parsing with AST visualization and JSON export",
            "Register and module analysis with flip-flop detection",
            "Project-level analysis with symbol tables and dependencies",
            "Syntax-aware file comparison and code obfuscation",
            "Natural language interface for all tools",
            "Intelligent caching for improved performance"
        ],
        dateAdded: "2024-12-24"
    }
];

// Categories definition
const categories = [
    { id: "design-entry", name: "Design Entry", count: 0 },
    { id: "simulation", name: "Simulation", count: 0 },
    { id: "synthesis", name: "Synthesis", count: 0 },
    { id: "physical-design", name: "Physical Design", count: 0 },
    { id: "timing-analysis", name: "Timing Analysis", count: 0 },
    { id: "power-analysis", name: "Power Analysis", count: 0 },
    { id: "verification", name: "Verification", count: 0 },
    { id: "manufacturing", name: "Manufacturing", count: 0 },
    { id: "pdk-technology", name: "PDK/Technology", count: 0 },
    { id: "test", name: "Test", count: 0 },
    { id: "ip-management", name: "IP Management", count: 0 },
    { id: "utilities", name: "Utilities", count: 0 }
];

// Calculate category counts
mcpServers.forEach(server => {
    const category = categories.find(c => 
        c.name.toLowerCase() === server.category.toLowerCase() ||
        c.id === server.category.toLowerCase().replace(/[\s\/]/g, '-')
    );
    if (category) {
        category.count++;
    }
});

// Export for use in main.js
window.mcpServersData = {
    servers: mcpServers,
    categories: categories.filter(c => c.count > 0)
};