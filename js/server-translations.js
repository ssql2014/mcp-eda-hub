// Server-specific translations
const serverTranslations = {
  zh: {
    // Server descriptions
    descriptions: {
      "anysilicon-die-calculator": "通过网页抓取 AnySilicon 在线计算器来计算每片晶圆的芯片数量。通过 MCP 接口使用最新的 AnySilicon 计算逻辑提供精确计算。",
      "verible-mcp": "通过 Verible 提供的综合 SystemVerilog/Verilog 工具套件。通过单一 MCP 接口提供代码检查、格式化、语法分析、寄存器分析、项目分析等功能。",
      "semiconductor-supply-chain": "半导体供应链智能代理。为 IP 核和 ASIC 服务采购提供结构化访问，帮助查找供应商、比较服务和获取价格估算。",
      "yosys-mcp": "通过 MCP 访问 Yosys 开源综合框架。支持 Verilog RTL 综合、优化、技术映射和形式验证。",
      "verilator-mcp": "最快的 Verilog/SystemVerilog 仿真器的 MCP 集成。支持仿真编译、代码检查、波形生成和覆盖率分析。",
      "gtkwave-mcp": "对 GTKWave 波形查看和分析功能的程序化访问，用于自动化 EDA 工作流程。支持多种格式和时序分析。",
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
      "semiconductor-supply-chain": [
        "搜索和发现 IP 核和 ASIC 服务提供商",
        "比较不同供应商的服务和能力",
        "获取定制 IP 核和 ASIC 服务的价格估算",
        "访问详细的供应商信息和联系方式",
        "支持 Design House Partner 网络和 ASIC 设计公司",
        "提供结构化的供应商数据和比较",
        "通过自然语言查询简化采购流程"
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
      "gtkwave-mcp": [
        "打开并显示多种波形格式 (VCD, FST, LXT2)",
        "在波形格式之间转换，支持压缩",
        "使用模式匹配提取信号层次",
        "执行时序测量和分析",
        "生成用于自动化工作流的 TCL 脚本",
        "捕获高质量的波形截图",
        "支持后台模式操作，便于 CI/CD 集成",
        "支持 GTKWave 保存文件 (.gtkw)"
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