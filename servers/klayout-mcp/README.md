# KLayout MCP Server

A Model Context Protocol (MCP) server for KLayout - the open-source IC layout viewer and editor.

## Features

### Layout Analysis & Information
- **`klayout_layout_info`**: Get detailed information about layout files including cells, layers, bounding boxes, and statistics
- Support for multiple formats: GDS, OASIS, DXF, CIF, MAG, DEF/LEF

### Layout Conversion
- **`klayout_convert_layout`**: Convert between different layout formats with options for scaling, layer mapping, and hierarchy flattening
- Supports all major IC layout formats

### Design Rule Checking (DRC)
- **`klayout_run_drc`**: Execute DRC checks using KLayout's powerful DRC engine
- Support for both script-based and XML-based rule files
- Detailed violation reporting with location information

### Layer Operations
- **`klayout_extract_layers`**: Extract specific layers from layouts to create filtered views
- Options for hierarchy flattening and shape merging

### Script Execution
- **`klayout_execute_script`**: Run custom Python or Ruby scripts within KLayout environment
- Full access to KLayout's API for advanced layout manipulation

### Natural Language Processing
- **`klayout_natural_language`**: Process natural language queries for layout operations
- Automatically interprets commands and suggests appropriate tools
- Context-aware processing based on recent operations

## Installation

### Prerequisites

1. **KLayout Installation**
   - Download and install KLayout from [klayout.de](https://www.klayout.de/)
   - Ensure `klayout` is available in your system PATH
   - Or set `KLAYOUT_PATH` environment variable to point to the KLayout executable

2. **Node.js**
   - Node.js 18.0 or higher

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd klayout-mcp

# Install dependencies
npm install

# Build the TypeScript code
npm run build
```

## Configuration

Configure the server using environment variables:

```bash
# Path to KLayout executable (if not in PATH)
export KLAYOUT_PATH=/path/to/klayout

# Python path for KLayout (optional)
export KLAYOUT_PYTHON_PATH=/path/to/python

# Maximum file size for processing (default: 1GB)
export KLAYOUT_MAX_FILE_SIZE=1073741824

# Enable/disable caching (default: true)
export KLAYOUT_CACHE_ENABLED=true

# Cache TTL in seconds (default: 3600)
export KLAYOUT_CACHE_TTL=3600

# Log level (default: info)
export LOG_LEVEL=debug
```

## Usage

### With Claude Desktop

Add to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "klayout": {
      "command": "node",
      "args": ["/path/to/klayout-mcp/dist/index.js"],
      "env": {
        "KLAYOUT_PATH": "/usr/local/bin/klayout"
      }
    }
  }
}
```

### Direct Usage

```bash
# Run the server
node dist/index.js
```

## Resources

The KLayout MCP server provides access to various resources:

### Example Scripts
- **DRC Rules Examples**: Simple and complex DRC rule templates
- **Layer Density Calculator**: Calculate layer utilization
- **Format Converters**: Batch conversion scripts
- **Measurement Tools**: Dimension and area calculations

### Script Library
- **Fill Pattern Generator**: Create dummy fill for density requirements
- **Hierarchy Analyzer**: Analyze and visualize cell hierarchy
- **Custom Processing**: Templates for layout manipulation

Access resources using:
```json
{
  "tool": "list_resources"
}
```

Read specific resource:
```json
{
  "tool": "read_resource",
  "uri": "klayout://examples/simple_drc.rb"
}
```

## Available Tools

### 1. Layout Information

Get detailed information about a layout file:

```json
{
  "tool": "klayout_layout_info",
  "arguments": {
    "layoutFile": "/path/to/design.gds",
    "topCell": "TOP",
    "includeHierarchy": true
  }
}
```

### 2. Convert Layout

Convert between different layout formats:

```json
{
  "tool": "klayout_convert_layout",
  "arguments": {
    "inputFile": "/path/to/design.gds",
    "outputFile": "/path/to/design.oas",
    "scale": 1.0,
    "mergeReferences": false,
    "layerMap": {
      "1/0": "10/0",
      "2/0": "20/0"
    }
  }
}
```

### 3. Run DRC

Execute design rule checks:

```json
{
  "tool": "klayout_run_drc",
  "arguments": {
    "layoutFile": "/path/to/design.gds",
    "drcFile": "/path/to/rules.drc",
    "outputFile": "/path/to/violations.rdb",
    "topCell": "TOP",
    "reportLimit": 1000,
    "verbose": true
  }
}
```

### 4. Extract Layers

Extract specific layers from a layout:

```json
{
  "tool": "klayout_extract_layers",
  "arguments": {
    "inputFile": "/path/to/design.gds",
    "outputFile": "/path/to/filtered.gds",
    "layers": ["1/0", "2/0", "10/5"],
    "includeLabels": true,
    "flattenHierarchy": false,
    "mergeShapes": true
  }
}
```

### 5. Execute Script

Run custom Python or Ruby scripts:

```json
{
  "tool": "klayout_execute_script",
  "arguments": {
    "script": "import pya\nlayout = pya.Layout()\nprint(f'Cells: {layout.cells()}')",
    "language": "python",
    "inputFiles": ["/path/to/design.gds"],
    "parameters": {
      "scale_factor": 0.5,
      "output_layers": [1, 2, 3]
    }
  }
}
```

### 6. Natural Language Processing

Use natural language to perform layout operations:

```json
{
  "tool": "klayout_natural_language",
  "arguments": {
    "query": "Convert my design.gds file to OASIS format with 0.001 scaling",
    "context": {
      "currentFile": "design.gds"
    }
  }
}
```

Example queries:
- "Analyze the layers in chip.gds"
- "Run DRC on my layout using 45nm rules"
- "Extract metal layers 31, 32, 33 from the design"
- "Calculate layer density for my chip"

## Development

```bash
# Run in development mode
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## Examples

### Example 1: Analyze GDS File

```python
# Get layout information
result = await mcp.call_tool("klayout_layout_info", {
    "layoutFile": "inverter.gds",
    "includeHierarchy": True
})

# Output includes:
# - Format: gds
# - Top cells: ["INVERTER"]
# - Layers with shape counts
# - Bounding box coordinates
# - Statistics (polygons, paths, instances, etc.)
```

### Example 2: DRC Check with Custom Rules

```python
# Create DRC rule file
drc_rules = """
# Check minimum width
l1 = input(1, 0)
l1.width(0.5.um).output("Width < 0.5um", "W.1")

# Check minimum spacing
l1.space(0.3.um).output("Spacing < 0.3um", "S.1")
"""

# Run DRC
result = await mcp.call_tool("klayout_run_drc", {
    "layoutFile": "design.gds",
    "drcFile": "rules.drc",
    "verbose": True
})
```

### Example 3: Batch Processing

```python
# Convert multiple files
for gds_file in gds_files:
    await mcp.call_tool("klayout_convert_layout", {
        "inputFile": gds_file,
        "outputFile": gds_file.replace('.gds', '.oas'),
        "scale": 0.001  # Convert nm to um
    })
```

## Troubleshooting

### KLayout Not Found
- Ensure KLayout is installed and accessible
- Set `KLAYOUT_PATH` environment variable
- Check KLayout version compatibility (requires 0.28 or higher)

### Script Execution Errors
- Verify Python/Ruby syntax
- Check KLayout API compatibility
- Review error messages in stderr output

### Performance Issues
- Enable caching for repeated operations
- Adjust `KLAYOUT_MAX_FILE_SIZE` for large files
- Use `flattenHierarchy` option carefully on complex designs

## License

MIT License - see LICENSE file for details