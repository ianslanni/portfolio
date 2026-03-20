/**
 * Shared i18n helper.
 *
 * Each page must define window.__translations = { pt: {...}, en: {...} }
 * BEFORE this script runs, or it can be defined after DOMContentLoaded.
 * Elements that need translation carry a data-i18n="key" attribute.
 */
(function () {
  var STORAGE_KEY = 'portfolio-lang';

  function getSavedLang() {
    try { return localStorage.getItem(STORAGE_KEY) || 'pt'; } catch (e) { return 'pt'; }
  }

  function saveLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function applyLang(lang) {
    var t = window.__translations && window.__translations[lang];
    if (!t) return;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    var btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = lang === 'pt' ? 'EN' : 'PT';
  }

  window.__i18nLang = getSavedLang();

  window.toggleLang = function () {
    var newLang = window.__i18nLang === 'pt' ? 'en' : 'pt';
    window.__i18nLang = newLang;
    saveLang(newLang);
    applyLang(newLang);
  };

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(window.__i18nLang);
  });
})();
