/* =========================================================
   PROJECT PULSE — Site script
   ========================================================= */
(function () {
  "use strict";

  var body = document.body;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Loading screen ---------- */
  var loader = document.getElementById("loader");
  var MIN_SHOW = reduceMotion ? 0 : 1600;   // show the heartbeat at least once
  var MAX_SHOW = 5000;                       // never block the page longer than this
  var start = Date.now();
  var seen = false;
  try { seen = sessionStorage.getItem("pulse-loaded") === "1"; } catch (e) {}
  if (seen) MIN_SHOW = 350;                  // shorter on repeat visits in the same session

  function hideLoader() {
    if (!loader || loader.classList.contains("is-done")) return;
    var wait = Math.max(0, MIN_SHOW - (Date.now() - start));
    setTimeout(function () {
      loader.classList.add("is-done");
      body.classList.remove("is-loading");
      try { sessionStorage.setItem("pulse-loaded", "1"); } catch (e) {}
      setTimeout(function () { loader.remove(); }, 700);
    }, wait);
  }
  if (document.readyState === "complete") hideLoader();
  else window.addEventListener("load", hideLoader);
  setTimeout(hideLoader, MAX_SHOW);

  /* ---------- Year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("menuToggle");
  var nav = document.getElementById("nav");
  function closeMenu() {
    if (!nav) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  }

  /* ---------- Header shadow + back to top ---------- */
  var header = document.querySelector(".site-header");
  var toTop = document.getElementById("toTop");
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 8);
    if (toTop) toTop.classList.toggle("is-visible", y > 900);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Active nav (Home / About) ---------- */
  var about = document.getElementById("about");
  var homeLink = document.querySelector('[data-nav="home"]');
  var aboutLink = document.querySelector('[data-nav="about"]');
  function setNav() {
    if (!about) return;
    var inAbout = about.getBoundingClientRect().top < window.innerHeight * 0.4;
    if (homeLink) homeLink.classList.toggle("is-active", !inAbout);
    if (aboutLink) aboutLink.classList.toggle("is-active", inAbout);
  }
  window.addEventListener("scroll", setNav, { passive: true });
  setNav();

  /* ---------- About table of contents highlight ---------- */
  var tocLinks = document.querySelectorAll(".about__toc a");
  if ("IntersectionObserver" in window && tocLinks.length) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && map[entry.target.id]) {
          tocLinks.forEach(function (a) { a.classList.remove("is-active"); });
          map[entry.target.id].classList.add("is-active");
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  /* ---------- Survey embeds (load only when opened) ---------- */
  function buildForm(panel) {
    if (panel.dataset.built) return;
    panel.dataset.built = "1";
    var src = (panel.dataset.src || "").trim();
    var title = panel.dataset.title || "Survey";

    var bar = document.createElement("div");
    bar.className = "pulse-form__bar";
    bar.innerHTML = "<span></span>";
    bar.firstChild.textContent = title;
    var close = document.createElement("button");
    close.type = "button";
    close.className = "pulse-form__close";
    close.textContent = "Close survey";
    close.addEventListener("click", function () { setOpen(panel, false, true); });
    bar.appendChild(close);
    panel.appendChild(bar);

    if (!src) {
      var empty = document.createElement("p");
      empty.className = "pulse-form__empty";
      empty.textContent = "The stakeholder survey will be available here shortly. In the meantime, you can share your views through the Tyler Nicholas Foundation contact page.";
      panel.appendChild(empty);
      return;
    }

    var iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.title = title;
    iframe.height = panel.dataset.height || "3000";
    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("marginheight", "0");
    iframe.setAttribute("marginwidth", "0");
    iframe.textContent = "Loading…";
    panel.appendChild(iframe);
  }

  function setOpen(panel, open, returnFocus) {
    var btn = document.querySelector('[data-form-toggle="' + panel.id + '"]');
    if (open) buildForm(panel);
    panel.hidden = !open;
    if (btn) {
      btn.setAttribute("aria-expanded", String(open));
      if (!btn.dataset.label) btn.dataset.label = btn.textContent;
      btn.textContent = open ? "Hide survey" : btn.dataset.label;
      if (!open && returnFocus) {
        btn.focus();
        btn.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      }
    }
    if (open) {
      panel.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  }

  document.querySelectorAll("[data-form-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var panel = document.getElementById(btn.dataset.formToggle);
      if (panel) setOpen(panel, panel.hidden, false);
    });
  });
})();
