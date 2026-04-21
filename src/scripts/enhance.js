(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Scroll progress + header auto-hide ---------- */
  var progress = document.getElementById('scroll-progress');
  var header = document.querySelector('.site-header');
  var lastY = window.scrollY;
  var HIDE_THRESHOLD = 80;
  var SCROLL_DELTA = 4;

  function onScroll() {
    var y = window.scrollY;
    var h = document.documentElement;
    var scrollable = h.scrollHeight - h.clientHeight;
    progress.style.width = (scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0) + '%';

    if (Math.abs(y - lastY) < SCROLL_DELTA) return;
    if (y < HIDE_THRESHOLD) {
      header.classList.remove('is-hidden');
    } else if (y > lastY) {
      header.classList.add('is-hidden');
    } else {
      header.classList.remove('is-hidden');
    }
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Section reveal + active nav (IntersectionObserver) ---------- */
  var sections = document.querySelectorAll('main .section, main .hero');
  var navLinks = document.querySelectorAll('.site-header nav a');
  var navMap = {};
  navLinks.forEach(function (a) {
    var id = a.getAttribute('href').replace('#', '');
    navMap[id] = a;
  });

  if (!reduceMotion) {
    document.querySelectorAll('main .section').forEach(function (s) { s.classList.add('reveal'); });
  }

  if ('IntersectionObserver' in window) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          revealIO.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    document.querySelectorAll('main .section.reveal').forEach(function (s) { revealIO.observe(s); });

    var activeIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var id = e.target.id;
        if (!navMap[id]) return;
        if (e.isIntersecting) {
          Object.values(navMap).forEach(function (a) { a.classList.remove('is-active'); });
          navMap[id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(function (s) { if (s.id && navMap[s.id]) activeIO.observe(s); });
  }

  /* ---------- Copy email + toast ---------- */
  var toast = document.getElementById('toast');
  var toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('visible'); }, 1800);
  }

  var copyBtn = document.getElementById('copy-email');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var email = copyBtn.dataset.email;
      var done = function () {
        copyBtn.classList.add('copied');
        showToast('Email copied to clipboard');
        setTimeout(function () { copyBtn.classList.remove('copied'); }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done).catch(function () { fallbackCopy(email); done(); });
      } else {
        fallbackCopy(email); done();
      }
    });
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (_) {}
    document.body.removeChild(ta);
  }

  /* ---------- Back to top ---------- */
  var topBtn = document.getElementById('back-to-top');
  function syncTopBtn() {
    if (window.scrollY > 400) topBtn.classList.add('visible');
    else topBtn.classList.remove('visible');
  }
  window.addEventListener('scroll', syncTopBtn, { passive: true });
  topBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
  syncTopBtn();

  /* ---------- Keyboard shortcuts ---------- */
  var FONTS = ['roboto', 'mono', 'times'];
  var THEMES = ['light', 'dark', 'sepia'];
  var dialog = document.getElementById('shortcuts-dialog');
  var dialogClose = document.getElementById('shortcuts-close');
  var gPressed = false, gTimer;

  document.addEventListener('keydown', function (e) {
    if (e.target.matches('input, textarea, [contenteditable="true"]')) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    var k = e.key.toLowerCase();

    if (k === 't' && !gPressed) {
      e.preventDefault();
      var curT = root.dataset.theme || 'light';
      var nextT = THEMES[(THEMES.indexOf(curT) + 1) % THEMES.length];
      root.dataset.theme = nextT;
      localStorage.setItem('theme', nextT);
      showToast('Theme: ' + nextT);
    } else if (k === 'f') {
      e.preventDefault();
      var curF = root.dataset.font || 'roboto';
      var nextF = FONTS[(FONTS.indexOf(curF) + 1) % FONTS.length];
      root.dataset.font = nextF;
      localStorage.setItem('font', nextF);
      document.querySelectorAll('#font-switch button').forEach(function (b) {
        b.setAttribute('aria-checked', b.dataset.font === nextF ? 'true' : 'false');
      });
      showToast('Font: ' + nextF);
    } else if (k === 'g') {
      gPressed = true;
      clearTimeout(gTimer);
      gTimer = setTimeout(function () { gPressed = false; }, 800);
    } else if (k === 't' && gPressed) {
      e.preventDefault();
      gPressed = false;
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    } else if (e.key === '?' || (e.shiftKey && e.key === '/')) {
      e.preventDefault();
      if (dialog.open) dialog.close();
      else dialog.showModal();
    } else if (k === 'escape' && dialog.open) {
      dialog.close();
    }
  });

  if (dialogClose) dialogClose.addEventListener('click', function () { dialog.close(); });
})();
