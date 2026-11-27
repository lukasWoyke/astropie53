(function () {
  const cfg = window.SITE_CONFIG || {};
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  $$("[data-cfg]").forEach((el) => { el.textContent = cfg[el.dataset.cfg] || ""; });

  // Buttons: a button without a target is greyed out and says "soon".
  $$("[data-link]").forEach((el) => {
    const key = el.dataset.link;
    const url = key === "app" ? (cfg.releaseUrl ? "download.html" : "") : cfg[key];
    if (url) {
      el.href = url;
    } else {
      el.classList.add("off");
      el.setAttribute("aria-disabled", "true");
      el.insertAdjacentHTML("beforeend", '<span class="soon">soon</span>');
    }
  });

  // Authors and contact list.
  const authors = cfg.authors || [];
  const authorsEl = $("#authors");
  if (authorsEl && authors.length) {
    authorsEl.innerHTML = authors.map((a) => {
      const name = esc(a.name).replace(/ /g, "&nbsp;") + (a.corresponding ? "<sup>*</sup>" : "");
      return a.url ? `<a href="${esc(a.url)}">${name}</a>` : `<span>${name}</span>`;
    }).join(", ");
    if (authors.some((a) => a.corresponding)) authorsEl.insertAdjacentHTML("afterend", '<p class="note"><sup>*</sup>Corresponding author</p>');
  }
  const contacts = $("#contacts");
  if (contacts) {
    contacts.innerHTML = authors.filter((a) => a.email).map((a) =>
      `<li><span>${esc(a.name)}${a.corresponding ? " (corresponding author)" : ""}</span><a href="mailto:${esc(a.email)}">${esc(a.email)}</a></li>`).join("");
  }

  // Copy BibTeX.
  const copy = $("#copy-bib");
  if (copy) {
    copy.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText($("#bib").textContent);
        copy.textContent = "Copied";
      } catch {
        const r = document.createRange(); r.selectNodeContents($("#bib"));
        const s = getSelection(); s.removeAllRanges(); s.addRange(r);
        copy.textContent = "Press Ctrl+C";
      }
      setTimeout(() => { copy.textContent = "Copy"; }, 2000);
    });
  }

  // Teaser video replaces the figure once it is configured.
  const teaser = $("#teaser");
  if (teaser && cfg.videoFile) {
    const video = document.createElement("video");
    video.controls = true;
    video.preload = "metadata";
    video.playsInline = true;
    video.src = cfg.videoFile;
    teaser.replaceChildren(video);
  }

  // Download page.
  const options = $("#dl-options");
  if (!options) return;
  const consent = $("#consent");
  const base = (cfg.releaseUrl || "").replace(/\/$/, "");
  const p = ((navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || "").toLowerCase();
  let os = p.includes("win") ? "windows" : p.includes("mac") ? "mac" : "linux";

  function render() {
    $$(".os-tabs button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.os === os)));
    const items = (cfg.downloads && cfg.downloads[os]) || [];
    const ready = consent.checked && base;
    options.innerHTML = items.map((d) => `
      <div class="dl-item">
        <div>
          <strong>${esc(d.label)}</strong>
          ${d.note ? `<div class="small muted">${esc(d.note)}</div>` : ""}
          ${d.sha256 ? `<div class="sha small muted">SHA-256 <code>${esc(d.sha256)}</code></div>` : ""}
        </div>
        ${!base
          ? `<span class="btn off">Coming soon</span>`
          : ready
            ? `<a class="btn" href="${esc(base + "/" + encodeURIComponent(d.file))}">Download</a>`
            : `<span class="btn off" title="Accept the Terms of Use below first">Download</span>`}
      </div>`).join("");
    $("#sums").innerHTML = !base
      ? ""
      : consent.checked
        ? `Check your download against <a href="${esc(base)}/SHA256SUMS.txt">SHA256SUMS.txt</a>.`
        : "To download, accept the Terms of Use below.";
  }

  $$(".os-tabs button").forEach((b) => b.addEventListener("click", () => { os = b.dataset.os; render(); }));
  consent.addEventListener("change", render);
  render();
})();
