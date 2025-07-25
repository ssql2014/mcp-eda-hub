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
      "klayout-mcp": "功能全面的 IC 版图查看和编辑器，具备 DRC、LVS 和脚本功能。支持多种格式，包括 GDS、OASIS、DXF 等。",
      "openlane-mcp": "完整的 RTL 到 GDSII 流程自动化，支持容器桌面。通过 OpenLane 提供综合、布局规划、布局、时钟树综合、布线和 GDSII 生成。",
      "arcas-onlineeda-mcp": "基于Web的EDA平台接口，通过Arcas OnlineEDA提供形式化验证、等价性检查、功耗分析、安全验证和FPGA设计。",
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
      "klayout-mcp": [
        "分析版图文件，包括单元层次结构和图层信息",
        "在 GDS、OASIS、DXF、CIF、MAG、DEF/LEF 格式之间转换",
        "使用 KLayout 强大的 DRC 引擎执行设计规则检查",
        "提取特定图层，支持形状合并和层次结构扁平化",
        "运行自定义 Python/Ruby 脚本，完全访问 KLayout API",
        "自然语言接口，实现直观的版图操作",
        "丰富的资源库，包含 DRC 模板和分析脚本",
        "智能缓存，提升性能表现"
      ],
      "openlane-mcp": [
        "单命令完成完整的 RTL 到 GDSII 流程",
        "独立阶段控制：综合、布局规划、布局、时钟树综合、布线",
        "基于容器的执行，支持 Docker、Podman 和容器桌面",
        "多 PDK 支持，包括 SkyWater、GF 和自定义 PDK",
        "复杂流程操作的自然语言接口",
        "设计配置验证和检查",
        "综合流程报告和统计信息生成",
        "包含流程文档和最佳实践的资源库"
      ],
      "arcas-onlineeda-mcp": [
        "形式化验证，支持属性检查和断言验证",
        "RTL和门级设计之间的等价性检查",
        "动态和静态功耗优化分析",
        "安全验证，检测漏洞和侧信道攻击",
        "针对Xilinx和Intel/Altera设计的FPGA专用验证",
        "自然语言界面，提供15+示例查询",
        "使用Puppeteer进行Web自动化，实现无缝平台交互",
        "通过MCP URI访问项目和结果资源"
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