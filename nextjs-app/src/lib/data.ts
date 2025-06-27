// EDA MCP Servers Data

export interface MCPServer {
  id: string;
  name: string;
  author: string;
  category: string;
  description: string;
  tags: string[];
  githubUrl: string;
  installCommand: string;
  config: Record<string, any>;
  features: string[];
  dateAdded: string;
}

export const mcpServers: MCPServer[] = [
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
    },
    {
        id: "semiconductor-supply-chain",
        name: "Semiconductor Supply Chain MCP",
        author: "ssql2014",
        category: "IP Management",
        description: "An intelligent agent for IP core and ASIC service procurement. Provides structured access to semiconductor industry B2B platforms for finding vendors, comparing services, and getting price estimations.",
        tags: ["ip-core", "asic", "procurement", "b2b", "supply-chain", "vendor-comparison"],
        githubUrl: "https://github.com/ssql2014/mcp4eda/tree/main/semiconductor-supply-chain-mcp",
        installCommand: "git clone https://github.com/ssql2014/mcp4eda.git && cd mcp4eda/semiconductor-supply-chain-mcp && npm install && npm run build",
        config: {
            "semiconductor-supply-chain": {
                "command": "node",
                "args": ["/path/to/mcp4eda/semiconductor-supply-chain-mcp/dist/index.js"]
            }
        },
        features: [
            "Find IP vendors by category, technology, and requirements",
            "Locate ASIC design and manufacturing services",
            "Get price estimations for semiconductor services",
            "Compare multiple vendors with customizable criteria",
            "Natural language queries for complex search requirements",
            "Support for various technology nodes and foundries",
            "Filter by power requirements and process nodes"
        ],
        dateAdded: "2025-01-24"
    },
    {
        id: "yosys-mcp",
        name: "Yosys MCP Server",
        author: "mcp4eda",
        category: "Synthesis",
        description: "A Model Context Protocol server providing Yosys synthesis and analysis capabilities for Verilog/SystemVerilog designs. Supports multiple FPGA/ASIC targets with visualization capabilities.",
        tags: ["yosys", "synthesis", "verilog", "systemverilog", "fpga", "asic", "rtl", "netlist"],
        githubUrl: "https://github.com/ssql2014/mcp4eda/tree/main/yosys-mcp",
        installCommand: "git clone https://github.com/ssql2014/mcp4eda.git && cd mcp4eda/yosys-mcp && npm install && npm run build",
        config: {
            "yosys": {
                "command": "node",
                "args": ["/path/to/mcp4eda/yosys-mcp/dist/index.js"],
                "env": {
                    "YOSYS_PATH": "/usr/local/bin/yosys",
                    "YOSYS_DEFAULT_TARGET": "generic",
                    "YOSYS_OPT_LEVEL": "2"
                }
            }
        },
        features: [
            "Synthesis to gate-level netlists for various targets (Xilinx, Intel/Altera, Lattice iCE40/ECP5)",
            "Design statistics, hierarchy analysis, and resource estimation",
            "Visual circuit diagrams generation using Graphviz",
            "Intelligent result caching for improved performance",
            "Support for optimization levels and custom synthesis flows",
            "Multiple output formats: Verilog, JSON, BLIF, EDIF",
            "Configurable technology mapping and optimization"
        ],
        dateAdded: "2025-01-24"
    },
    {
        id: "verilator-mcp",
        name: "Verilator MCP Server",
        author: "mcp4eda",
        category: "Simulation",
        description: "An intelligent hardware verification tool that provides automatic testbench generation, smart simulation with dependency management, and natural language queries about simulations.",
        tags: ["verilator", "simulation", "verification", "testbench", "verilog", "systemverilog", "coverage", "waveform"],
        githubUrl: "https://github.com/ssql2014/mcp4eda/tree/main/verilator-mcp",
        installCommand: "git clone https://github.com/ssql2014/mcp4eda.git && cd mcp4eda/verilator-mcp && npm install && npm run build",
        config: {
            "verilator": {
                "command": "node",
                "args": ["/path/to/mcp4eda/verilator-mcp/dist/index.js"],
                "env": {
                    "VERILATOR_PATH": "/usr/local/bin/verilator",
                    "LOG_LEVEL": "info"
                }
            }
        },
        features: [
            "Automatic testbench generation with intelligent test scenarios",
            "Smart simulation with dependency management and optimization",
            "Natural language queries about simulation results and debugging",
            "Waveform analysis and visualization support",
            "Code coverage collection and analysis",
            "Protocol-aware testing templates (AXI, APB, etc.)",
            "AI-powered hardware design understanding and debugging assistance"
        ],
        dateAdded: "2025-01-24"
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

