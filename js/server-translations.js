// Server-specific translations
const serverTranslations = {
  zh: {
    // Server descriptions
    descriptions: {
      "anysilicon-die-calculator": "通过网页抓取 AnySilicon 在线计算器来计算每片晶圆的芯片数量。通过 MCP 接口使用最新的 AnySilicon 计算逻辑提供精确计算。",
      "verible-mcp": "通过 Verible 提供的综合 SystemVerilog/Verilog 工具套件。通过单一 MCP 接口提供代码检查、格式化、语法分析、寄存器分析、项目分析等功能。",
      "yosys-mcp": "通过 MCP 访问 Yosys 开源综合框架。支持 Verilog RTL 综合、优化、技术映射和形式验证。",
      "verilator-mcp": "最快的 Verilog/SystemVerilog 仿真器的 MCP 集成。支持仿真编译、代码检查、波形生成和覆盖率分析。",
      "kicad-cli-mcp": "适用于 Claude 等 AI 助手的 KiCAD EDA 套件集成。通过 MCP 支持 PCB 设计、原理图编辑和制造文件生成。"
    },
    // Feature translations
    features: {
      "anysilicon-die-calculator": [
        "通过网页抓取使用官方 AnySilicon 在线计算器",
        "始终提供 AnySilicon 最新的计算逻辑",
        "支持 200mm 和 300mm 晶圆尺寸",
        "返回总芯片数、晶圆面积和利用率百分比",
        "无需逆向工程计算公式"
      ],
      "verible-mcp": [
        "具有可配置规则和自动修复的样式检查",
        "具有可自定义缩进和行长度的代码格式化",
        "带有 AST 可视化和 JSON 导出的语法解析",
        "带有触发器检测的寄存器和模块分析",
        "带有符号表和依赖关系的项目级分析",
        "语法感知的文件比较和代码混淆",
        "所有工具的自然语言接口",
        "改进性能的智能缓存"
      ],
      "yosys-mcp": [
        "RTL 综合和优化",
        "技术映射到 FPGA 和 ASIC 库",
        "形式验证和等价性检查",
        "设计分析和可视化",
        "自定义综合脚本支持"
      ],
      "verilator-mcp": [
        "高性能 C++ 仿真模型生成",
        "综合代码检查和警告",
        "VCD 波形生成和分析",
        "代码覆盖率报告",
        "多线程仿真支持"
      ],
      "kicad-cli-mcp": [
        "PCB 布局和布线",
        "原理图捕获和编辑",
        "3D 可视化和检查",
        "Gerber 和钻孔文件生成",
        "BOM 和位置文件导出"
      ]
    }
  }
};

// Helper function to get translated server content
window.getServerTranslation = function(serverId, field, lang = 'zh') {
  if (lang === 'en') return null; // Use original English content
  
  const translations = serverTranslations[lang];
  if (!translations) return null;
  
  if (field === 'description') {
    return translations.descriptions[serverId] || null;
  } else if (field === 'features') {
    return translations.features[serverId] || null;
  }
  
  return null;
};