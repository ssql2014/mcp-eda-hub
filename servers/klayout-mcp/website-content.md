# KLayout MCP Server - IC Layout Analysis & Manipulation

## Overview

The KLayout MCP Server brings the power of KLayout - the industry-standard open-source IC layout viewer and editor - to the Model Context Protocol ecosystem. This integration enables AI assistants to perform advanced layout analysis, format conversion, design rule checking (DRC), and custom scripting operations on IC layout files.

## Key Features

### 🔍 Layout Analysis
- **Comprehensive Information Extraction**: Get detailed metadata about layout files including cell hierarchy, layer information, bounding boxes, and shape statistics
- **Multi-Format Support**: Works with GDS, OASIS, DXF, CIF, MAG, DEF/LEF, and other major IC layout formats
- **Hierarchical Analysis**: Analyze cell hierarchy and instance relationships

### 🔄 Format Conversion
- **Universal Converter**: Convert between any supported layout formats
- **Advanced Options**: Scale layouts, map layers, flatten hierarchy, merge references
- **Batch Processing**: Convert multiple files with consistent settings

### ✅ Design Rule Checking
- **Powerful DRC Engine**: Execute complex DRC rules using KLayout's industry-proven engine
- **Flexible Rule Formats**: Support for Ruby scripts, Python scripts, and XML rule files
- **Detailed Reporting**: Get violation locations, counts, and descriptions

### 🎯 Layer Operations
- **Layer Extraction**: Extract specific layers to create filtered views
- **Layer Mapping**: Remap layers during conversion or extraction
- **Shape Processing**: Merge overlapping shapes, flatten hierarchy

### 📝 Custom Scripting
- **Python & Ruby Support**: Execute custom scripts with full KLayout API access
- **Parameter Injection**: Pass parameters and files to scripts
- **Batch Operations**: Automate complex layout manipulations

### 🗣️ Natural Language Interface
- **Intuitive Commands**: Use natural language to perform layout operations
- **Context Awareness**: Understands current files and recent operations
- **Smart Interpretation**: Automatically selects appropriate tools and parameters

### 📚 Rich Resources
- **Example Scripts**: Ready-to-use DRC rules, density calculators, and converters
- **Script Library**: Fill generators, hierarchy analyzers, measurement tools
- **Templates**: Starting points for custom layout processing scripts

## Installation

### Prerequisites

1. **Install KLayout** (0.28 or higher):
   ```bash
   # macOS
   brew install --cask klayout
   
   # Ubuntu/Debian
   sudo apt-get install klayout
   
   # Or download from https://www.klayout.de/
   ```

2. **Set up the MCP server**:
   ```bash
   cd klayout-mcp
   npm install
   npm run build
   ```

3. **Configure Claude Desktop**:
   ```json
   {
     "mcpServers": {
       "klayout": {
         "command": "node",
         "args": ["/path/to/klayout-mcp/dist/index.js"],
         "env": {
           "KLAYOUT_PATH": "/usr/local/bin/klayout",
           "LOG_LEVEL": "info"
         }
       }
     }
   }
   ```

## Usage Examples

### Natural Language Commands

```text
"Analyze my design.gds file and tell me about the layers and cell hierarchy"

"Convert this GDS file to OASIS format with 0.001 scaling"

"Run DRC checks on my layout using the 45nm rules file"

"Extract only the metal layers (31, 32, 33) from my design"

"Calculate the density of each layer in my chip layout"
```

### Layout Analysis

```javascript
// Get comprehensive layout information
{
  "tool": "klayout_layout_info",
  "arguments": {
    "layoutFile": "/path/to/design.gds",
    "topCell": "TOP_CELL",
    "includeHierarchy": true
  }
}

// Response includes:
// - Format type (GDS, OASIS, etc.)
// - List of all top cells
// - Layer information with shape counts
// - Bounding box coordinates in microns
// - Cell count and hierarchy depth
// - Statistics (polygons, paths, boxes, texts, instances)
```

### Format Conversion

```javascript
// Convert GDS to OASIS with scaling
{
  "tool": "klayout_convert_layout",
  "arguments": {
    "inputFile": "design.gds",
    "outputFile": "design.oas",
    "scale": 0.001,  // Convert nm to um
    "layerMap": {
      "1/0": "10/0",   // Remap layer 1 to layer 10
      "2/0": "20/0"
    }
  }
}

// Convert with hierarchy flattening
{
  "tool": "klayout_convert_layout",
  "arguments": {
    "inputFile": "hierarchical.gds",
    "outputFile": "flat.gds",
    "mergeReferences": true
  }
}
```

### Design Rule Checking

```javascript
// Run DRC with rule file
{
  "tool": "klayout_run_drc",
  "arguments": {
    "layoutFile": "design.gds",
    "drcFile": "45nm_rules.drc",
    "outputFile": "violations.rdb",
    "topCell": "CHIP_TOP",
    "reportLimit": 1000,
    "verbose": true
  }
}

// Response includes:
// - List of rule violations by category
// - Violation counts and locations
// - Severity levels (error, warning, info)
// - Summary statistics
```

### Layer Extraction

```javascript
// Extract specific layers
{
  "tool": "klayout_extract_layers",
  "arguments": {
    "inputFile": "full_design.gds",
    "outputFile": "metal_only.gds",
    "layers": ["31/0", "32/0", "33/0", "34/0"],
    "mergeShapes": true,
    "includeLabels": true
  }
}

// Extract and flatten
{
  "tool": "klayout_extract_layers",
  "arguments": {
    "inputFile": "design.gds",
    "outputFile": "active_flat.gds",
    "layers": ["1/0", "2/0"],
    "flattenHierarchy": true
  }
}
```

### Custom Scripting

```javascript
// Execute Python script for layer density calculation
{
  "tool": "klayout_execute_script",
  "arguments": {
    "scriptFile": "calculate_density.py",
    "language": "python",
    "inputFiles": ["design.gds"],
    "parameters": {
      "exclude_layers": [0, 63],
      "output_format": "csv"
    }
  }
}

// Inline Ruby script for custom DRC
{
  "tool": "klayout_execute_script",
  "arguments": {
    "script": "
      # Custom DRC rule
      metal1 = input(1, 0)
      via1 = input(2, 0)
      
      # Check via coverage
      uncovered = via1.not_inside(metal1)
      uncovered.output('VIA.COV', 'Via not covered by metal')
    ",
    "language": "ruby",
    "inputFiles": ["test.gds"]
  }
}
```

## Advanced Workflows

### Complete DRC Flow

```javascript
// 1. Analyze layout structure
await mcp.call_tool("klayout_layout_info", {
  "layoutFile": "design.gds"
});

// 2. Extract layers of interest
await mcp.call_tool("klayout_extract_layers", {
  "inputFile": "design.gds",
  "outputFile": "check_layers.gds",
  "layers": ["1/0", "2/0", "3/0"]
});

// 3. Run DRC checks
await mcp.call_tool("klayout_run_drc", {
  "layoutFile": "check_layers.gds",
  "drcFile": "process_rules.drc"
});

// 4. Generate violation report
await mcp.call_tool("klayout_execute_script", {
  "script": "Generate HTML report from violations",
  "language": "python"
});
```

### Batch Format Conversion

```javascript
const files = ["chip1.gds", "chip2.gds", "chip3.gds"];

for (const file of files) {
  // Convert to OASIS
  await mcp.call_tool("klayout_convert_layout", {
    "inputFile": file,
    "outputFile": file.replace('.gds', '.oas'),
    "scale": 0.001
  });
  
  // Extract top metal for review
  await mcp.call_tool("klayout_extract_layers", {
    "inputFile": file,
    "outputFile": file.replace('.gds', '_metal.gds'),
    "layers": ["33/0", "34/0"]
  });
}
```

## Integration with Other EDA Tools

### With Yosys (Digital Synthesis)
```javascript
// After synthesis, convert DEF to GDS
await mcp.call_tool("klayout_convert_layout", {
  "inputFile": "synthesized.def",
  "outputFile": "placed.gds"
});
```

### With Verilator (Simulation)
```javascript
// Analyze layout parasitics for simulation
await mcp.call_tool("klayout_execute_script", {
  "script": "extract_rc_parasitics.py",
  "inputFiles": ["layout.gds"],
  "outputFile": "parasitics.spef"
});
```

## API Reference

### Tools

#### klayout_layout_info
Retrieves comprehensive information about a layout file.

**Arguments:**
- `layoutFile` (string, required): Path to the layout file
- `topCell` (string, optional): Specific top cell to analyze
- `includeHierarchy` (boolean, optional): Include cell hierarchy information

**Returns:**
- Format type, top cells, layers, bounding box, statistics

#### klayout_convert_layout
Converts layout files between different formats.

**Arguments:**
- `inputFile` (string, required): Source layout file
- `outputFile` (string, required): Destination file path
- `scale` (number, optional): Scaling factor
- `mergeReferences` (boolean, optional): Flatten hierarchy
- `layerMap` (object, optional): Layer remapping rules
- `dbuScale` (number, optional): Database unit scaling

**Returns:**
- Success status, output file path

#### klayout_run_drc
Executes design rule checks on layouts.

**Arguments:**
- `layoutFile` (string, required): Layout to check
- `drcFile` (string, required): DRC rule file
- `outputFile` (string, optional): Results file path
- `topCell` (string, optional): Specific cell to check
- `reportLimit` (number, optional): Max violations to report
- `verbose` (boolean, optional): Detailed output

**Returns:**
- List of violations by rule, summary statistics

#### klayout_extract_layers
Extracts specific layers from a layout.

**Arguments:**
- `inputFile` (string, required): Source layout
- `outputFile` (string, required): Output file
- `layers` (array, required): Layer/datatype pairs to extract
- `includeLabels` (boolean, optional): Include text labels
- `flattenHierarchy` (boolean, optional): Flatten cells
- `mergeShapes` (boolean, optional): Merge overlapping shapes

**Returns:**
- Success status, layer count, shape statistics

#### klayout_execute_script
Runs custom Python or Ruby scripts in KLayout environment.

**Arguments:**
- `script` (string, optional): Script content
- `scriptFile` (string, optional): Script file path
- `language` (string, optional): "python" or "ruby"
- `inputFiles` (array, optional): Input files for script
- `outputFile` (string, optional): Output file path
- `parameters` (object, optional): Script parameters

**Returns:**
- Script output, execution time, errors (if any)

#### klayout_natural_language
Process natural language queries about layout operations.

**Arguments:**
- `query` (string, required): Natural language query
- `context` (object, optional): Context information
  - `currentFile` (string): Current layout file
  - `recentOperations` (array): Recent operations

**Returns:**
- Interpretation of the query
- Suggested tool and arguments
- Execution hints

## Best Practices

### 1. File Size Management
- Check file sizes before processing
- Use layer extraction for large files
- Enable caching for repeated operations

### 2. DRC Optimization
- Run DRC on specific cells when possible
- Use reportLimit to manage output size
- Create focused rule sets for specific checks

### 3. Scripting Guidelines
- Test scripts locally in KLayout first
- Use parameter injection for flexibility
- Handle errors gracefully in scripts

### 4. Performance Tips
- Enable caching with KLAYOUT_CACHE_ENABLED
- Process files in batches when possible
- Use appropriate output formats (OASIS for compression)

## Troubleshooting

### Common Issues

1. **KLayout not found**
   - Verify KLayout installation: `klayout -v`
   - Set KLAYOUT_PATH environment variable
   - Check PATH includes KLayout directory

2. **Large file handling**
   - Increase KLAYOUT_MAX_FILE_SIZE
   - Use layer extraction to reduce data
   - Consider hierarchy flattening

3. **DRC performance**
   - Limit check area with topCell parameter
   - Reduce reportLimit for faster results
   - Optimize rule files for efficiency

4. **Script errors**
   - Verify script syntax in KLayout GUI first
   - Check KLayout API version compatibility
   - Review error messages in stderr output

## Technology Support

### Supported Formats
- **GDS/GDSII**: Industry standard stream format
- **OASIS**: Compressed alternative to GDS
- **DXF**: AutoCAD interchange format
- **CIF**: Caltech Intermediate Format
- **MAG**: Magic layout format
- **DEF/LEF**: Design/Library Exchange Format

### Process Nodes
- Supports all process nodes from legacy to advanced
- Customizable DRC rules for any technology
- Layer mapping for process migration

### Integration Standards
- Compatible with OpenROAD flow
- Supports Calibre DRC rule syntax
- Works with standard PDKs (SkyWater, GF, etc.)

## Available Resources

The KLayout MCP server provides access to numerous resources:

### Example Scripts
- `klayout://examples/simple_drc.rb` - Basic DRC rules template
- `klayout://examples/layer_density.py` - Layer density calculator
- `klayout://examples/convert_formats.py` - Batch format converter
- `klayout://examples/extract_top_metal.rb` - Top metal layer extractor

### Script Library
- `klayout://scripts/measure_dimensions.py` - Dimension measurement tools
- `klayout://scripts/generate_fill.rb` - Fill pattern generator
- `klayout://scripts/hierarchy_analyzer.py` - Cell hierarchy analyzer

### Accessing Resources

List all available resources:
```javascript
await mcp.list_resources()
```

Read a specific resource:
```javascript
await mcp.read_resource("klayout://examples/simple_drc.rb")
```

## External Resources

- **KLayout Documentation**: https://www.klayout.de/doc.html
- **KLayout Scripting**: https://www.klayout.de/doc/code/index.html
- **DRC Examples**: https://github.com/KLayout/klayout-macros
- **MCP4EDA Community**: https://www.mcp4eda.cn/community