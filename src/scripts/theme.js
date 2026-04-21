(function () {
  var root = document.documentElement;
  var THEMES = ['light', 'dark', 'sepia'];

  var themeBtn = document.getElementById('theme-toggle');
  var fontSwitch = document.getElementById('font-switch');
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Theme cycle: light → dark → sepia → light */
  themeBtn.addEventListener('click', function () {
    var current = root.dataset.theme || 'light';
    var next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
    root.dataset.theme = next;
    localStorage.setItem('theme', next);
  });

  /* Follow OS preference if user hasn't chosen */
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      root.dataset.theme = e.matches ? 'dark' : 'light';
    }
  });

  /* Font switch */
  function syncFontButtons() {
    var active = root.dataset.font || 'sans';
    fontSwitch.querySelectorAll('button').forEach(function (b) {
      b.setAttribute('aria-checked', b.dataset.font === active ? 'true' : 'false');
    });
  }
  fontSwitch.addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-font]');
    if (!btn) return;
    var font = btn.dataset.font;
    root.dataset.font = font;
    localStorage.setItem('font', font);
    syncFontButtons();
  });
  syncFontButtons();
})();
