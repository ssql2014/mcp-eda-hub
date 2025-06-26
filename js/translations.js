// Translations for MCP-EDA Hub
const translations = {
  en: {
    // Navigation
    nav: {
      servers: 'Servers',
      categories: 'Categories',
      about: 'About'
    },
    // Hero Section
    hero: {
      title: 'MCP-EDA Hub',
      subtitle: 'Discover and share Model Context Protocol servers specifically designed for Electronic Design Automation (EDA) workflows',
      searchPlaceholder: 'Search servers by name, description, or category...'
    },
    // Stats
    stats: {
      servers: 'MCP Servers',
      categories: 'Categories',
      contributors: 'Contributors'
    },
    // Category Section
    categories: {
      title: 'Browse by Category',
      filter: 'Filter by Category',
      clearAll: 'Clear all',
      // Category names
      names: {
        'design-entry': 'Design Entry',
        'simulation': 'Simulation',
        'synthesis': 'Synthesis',
        'place-route': 'Place & Route',
        'verification': 'Verification',
        'manufacturing': 'Manufacturing',
        'testing': 'Testing',
        'project-management': 'Project Management',
        'documentation': 'Documentation',
        'analysis': 'Analysis',
        'ip-management': 'IP Management',
        'utilities': 'Utilities'
      }
    },
    // Server Card
    server: {
      by: 'by',
      install: 'Installation',
      config: 'Configuration',
      features: 'Features',
      viewOnGitHub: 'View on GitHub',
      stars: 'stars'
    },
    // About Section
    about: {
      title: 'About MCP-EDA Hub',
      mcpTitle: 'What is MCP?',
      mcpDesc: 'The Model Context Protocol (MCP) is an open standard that allows AI models to securely connect to local data sources and tools. It provides a standardized way for AI assistants to interact with your development environment.',
      edaTitle: 'EDA Focus',
      edaDesc: 'This hub specifically curates MCP servers designed for Electronic Design Automation workflows, from RTL design and simulation to physical design and verification.',
      contributeTitle: 'Contribute',
      contributeDesc: 'Help grow the EDA ecosystem by submitting your own MCP servers or improving existing ones. Visit our GitHub repository to get started.'
    },
    // Footer
    footer: {
      copyright: '© 2024 MCP-EDA Hub',
      builtWith: 'Built with ❤️ for the EDA community'
    }
  },
  zh: {
    // Navigation
    nav: {
      servers: '服务器',
      categories: '分类',
      about: '关于'
    },
    // Hero Section
    hero: {
      title: 'MCP-EDA 中心',
      subtitle: '发现和分享专为电子设计自动化（EDA）工作流程设计的模型上下文协议服务器',
      searchPlaceholder: '按名称、描述或类别搜索服务器...'
    },
    // Stats
    stats: {
      servers: 'MCP 服务器',
      categories: '分类',
      contributors: '贡献者'
    },
    // Category Section
    categories: {
      title: '按类别浏览',
      filter: '按类别筛选',
      clearAll: '清除所有',
      // Category names
      names: {
        'design-entry': '设计输入',
        'simulation': '仿真',
        'synthesis': '综合',
        'place-route': '布局布线',
        'verification': '验证',
        'manufacturing': '制造',
        'testing': '测试',
        'project-management': '项目管理',
        'documentation': '文档',
        'analysis': '分析',
        'ip-management': 'IP 管理',
        'utilities': '工具'
      }
    },
    // Server Card
    server: {
      by: '作者',
      install: '安装',
      config: '配置',
      features: '功能特性',
      viewOnGitHub: '在 GitHub 上查看',
      stars: '星标'
    },
    // About Section
    about: {
      title: '关于 MCP-EDA 中心',
      mcpTitle: '什么是 MCP？',
      mcpDesc: '模型上下文协议（MCP）是一个开放标准，允许 AI 模型安全地连接到本地数据源和工具。它为 AI 助手与您的开发环境交互提供了标准化的方式。',
      edaTitle: 'EDA 专注',
      edaDesc: '本中心专门收集为电子设计自动化工作流程设计的 MCP 服务器，涵盖从 RTL 设计和仿真到物理设计和验证的全流程。',
      contributeTitle: '贡献',
      contributeDesc: '通过提交您自己的 MCP 服务器或改进现有服务器来帮助发展 EDA 生态系统。访问我们的 GitHub 仓库开始贡献。'
    },
    // Footer
    footer: {
      copyright: '© 2024 MCP-EDA 中心',
      builtWith: '为 EDA 社区用 ❤️ 构建'
    }
  }
};

// Language manager
class LanguageManager {
  constructor() {
    // Check localStorage first, then default to Chinese
    const savedLang = localStorage.getItem('language');
    // Default to Chinese ('zh') instead of browser language
    this.currentLang = savedLang || 'zh';
    this.translations = translations;
  }

  getCurrentLang() {
    return this.currentLang;
  }

  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLang = lang;
      localStorage.setItem('language', lang);
      this.updatePageLanguage();
      return true;
    }
    return false;
  }

  t(key) {
    const keys = key.split('.');
    let result = this.translations[this.currentLang];
    
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        // Fallback to English
        result = this.translations.en;
        for (const k2 of keys) {
          if (result && result[k2]) {
            result = result[k2];
          } else {
            return key; // Return key if translation not found
          }
        }
        break;
      }
    }
    
    return result;
  }

  updatePageLanguage() {
    // Update HTML lang attribute
    document.documentElement.lang = this.currentLang;
    
    // Dispatch custom event for language change
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: this.currentLang } 
    }));
  }
}

// Create global instance
window.langManager = new LanguageManager();

// Export for ES6 modules
export { LanguageManager, translations };