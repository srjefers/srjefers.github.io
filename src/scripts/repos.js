(function () {
  var list = document.getElementById('repo-list');
  if (!list) return;

  fetch('https://api.github.com/users/srjefers/repos?sort=updated&per_page=6')
    .then(function (r) { if (!r.ok) throw new Error('GitHub API ' + r.status); return r.json(); })
    .then(function (repos) {
      list.innerHTML = '';
      repos.filter(function (r) { return !r.fork; }).slice(0, 5).forEach(function (r) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = r.html_url;
        a.target = '_blank';
        a.rel = 'noopener';
        a.className = 'repo';
        a.innerHTML =
          '<div class="repo-name">' + escapeHtml(r.name) + '</div>' +
          (r.description ? '<div class="repo-desc">' + escapeHtml(r.description) + '</div>' : '') +
          '<div class="repo-meta">' +
          (r.language ? '<span>' + escapeHtml(r.language) + '</span>' : '') +
          '<span>★ ' + r.stargazers_count + '</span>' +
          '</div>';
        li.appendChild(a);
        list.appendChild(li);
      });
      if (!list.children.length) {
        list.innerHTML = '<li class="muted">No public repos found.</li>';
      }
    })
    .catch(function () {
      list.innerHTML = '<li class="muted">Could not load repositories right now.</li>';
    });

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
})();
