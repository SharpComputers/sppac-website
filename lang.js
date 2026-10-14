(function () {
  var html = document.documentElement;
  var btn = document.getElementById('langBtn');

  function setLang(lang) {
    html.lang = lang;
    btn.textContent = lang === 'mr' ? 'English' : 'मराठी';
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }

  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  setLang(saved === 'en' ? 'en' : 'mr');

  btn.addEventListener('click', function () {
    setLang(html.lang === 'mr' ? 'en' : 'mr');
  });
})();
