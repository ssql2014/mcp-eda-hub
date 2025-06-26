// Language Switcher Component
export function createLanguageSwitcher() {
  const switcher = document.createElement('div');
  switcher.className = 'language-switcher';
  switcher.innerHTML = `
    <button class="lang-btn" data-lang="en" title="English">
      <span class="lang-flag">🇬🇧</span>
      <span class="lang-text">EN</span>
    </button>
    <button class="lang-btn" data-lang="zh" title="中文">
      <span class="lang-flag">🇨🇳</span>
      <span class="lang-text">中文</span>
    </button>
  `;
  
  // Add event listeners
  switcher.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      window.langManager.setLanguage(lang);
      updateActiveLanguage();
    });
  });
  
  // Update active state
  function updateActiveLanguage() {
    const currentLang = window.langManager.getCurrentLang();
    switcher.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
  }
  
  updateActiveLanguage();
  
  return switcher;
}

// Insert language switcher into the page
export function initLanguageSwitcher() {
  const nav = document.querySelector('nav');
  if (nav) {
    const switcher = createLanguageSwitcher();
    nav.appendChild(switcher);
  }
}