/** Shared UI: sticky nav, mobile menu, scroll reveal. */
(function () {
  "use strict";

  /* Sticky nav */
  var nav = document.getElementById("nav");
  if (nav) {
    window.addEventListener("scroll", function () {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    }, { passive: true });
  }

  /* Mobile menu */
  var burger = document.getElementById("burger");
  var navLinks = document.getElementById("navLinks");
  if (burger && navLinks) {
    burger.addEventListener("click", function () {
      burger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        burger.classList.remove("open");
        navLinks.classList.remove("open");
      });
    });
  }

  /* Scroll reveal */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: .12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }
})();

/* Back to top */
(function () {
  var toTop = document.getElementById("toTop");
  if (!toTop) return;
  window.addEventListener("scroll", function () {
    toTop.classList.toggle("show", window.scrollY > 600);
  }, { passive: true });
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

/* ===== Corporate Film modal · 企业宣传片弹窗 ===== */
(function () {
  "use strict";
  var modal = document.getElementById("filmModal");
  var video = document.getElementById("filmVideo");
  if (!modal || !video) return;
  var lastTrigger = null;
  function openModal(trigger) {
    lastTrigger = trigger || null;
    modal.hidden = false;
    document.body.classList.add("film-open");
    var btn = modal.querySelector(".film-modal-close");
    if (btn) btn.focus();
    var p = video.play();
    if (p && p.catch) p.catch(function () {});
  }
  function closeModal() {
    video.pause();
    modal.hidden = true;
    document.body.classList.remove("film-open");
    if (lastTrigger && lastTrigger.focus) lastTrigger.focus();
  }
  document.querySelectorAll("[data-film-open]").forEach(function (btn) {
    btn.addEventListener("click", function () { openModal(btn); });
  });
  modal.querySelectorAll("[data-film-close]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });
})();
