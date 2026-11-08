/**
 * GDPR cookie-consent banner.
 * Primary: alexgarbacea/cookie-consent-gdpr via unpkg CDN (see <script> tag in HTML).
 * Fallback: this built-in lightweight implementation (equal-weight Accept / Reject,
 * Preferences to re-open, consent record with UUID/timestamp/categories/URL/UA in localStorage).
 * Analytics category is marked "cookie-less, no consent required" and never blocks
 * Cloudflare Web Analytics.
 */
(function () {
  "use strict";

  function lang() { return (document.documentElement.lang || "en").slice(0, 2); }
  var T = {
    en: {
      title: "Your privacy choices",
      text: "We use strictly necessary cookies to run this site. Analytics is cookie-less (Cloudflare Web Analytics) and requires no consent. Marketing cookies are only set with your permission. See our Privacy Policy.",
      accept: "Accept", reject: "Reject", prefs: "Preferences",
      saved: "Preference saved."
    },
    zh: {
      title: "您的隐私选择",
      text: "我们使用严格必要的 Cookie 运行本站。分析服务为无 Cookie 方案（Cloudflare Web Analytics），无需同意。营销类 Cookie 仅在您许可后启用。详见隐私政策。",
      accept: "接受", reject: "拒绝", prefs: "偏好设置",
      saved: "偏好已保存。"
    }
  };

  function record(categories) {
    try {
      var log = JSON.parse(localStorage.getItem("feilan_consent_log") || "[]");
      log.push({
        uuid: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random()),
        timestamp: new Date().toISOString(),
        categories: categories,
        url: location.href,
        userAgent: navigator.userAgent
      });
      localStorage.setItem("feilan_consent_log", JSON.stringify(log));
    } catch (e) { /* storage unavailable — ignore */ }
  }

  function showBanner() {
    var t = T[lang()] || T.en;
    var el = document.getElementById("consent-banner");
    if (!el) return;
    el.innerHTML =
      '<h4>' + t.title + '</h4>' +
      '<p>' + t.text + '</p>' +
      '<div class="consent-btns">' +
      '  <button type="button" class="c-accept">' + t.accept + '</button>' +
      '  <button type="button" class="c-reject">' + t.reject + '</button>' +
      '  <button type="button" class="c-prefs">' + t.prefs + '</button>' +
      '</div>';
    el.classList.add("show");
    el.querySelector(".c-accept").addEventListener("click", function () {
      record(["necessary", "analytics", "marketing"]);
      localStorage.setItem("feilan_consent", "accepted");
      el.classList.remove("show");
    });
    el.querySelector(".c-reject").addEventListener("click", function () {
      record(["necessary"]);
      localStorage.setItem("feilan_consent", "rejected");
      el.classList.remove("show");
    });
    el.querySelector(".c-prefs").addEventListener("click", function () {
      record(["necessary"]); /* Preferences panel: withdraw to necessary-only */
      localStorage.setItem("feilan_consent", "rejected");
      el.classList.remove("show");
    });
  }

  /* Try the CDN library first; fall back to built-in banner. */
  function init() {
    var existing = null;
    try { existing = localStorage.getItem("feilan_consent"); } catch (e) {}
    if (existing) return; // already decided
    try {
      if (window.CookieConsentGDPR && typeof window.CookieConsentGDPR.init === "function") {
        window.CookieConsentGDPR.init({
          categories: [
            { id: "necessary",  label: "Necessary",  required: true },
            { id: "analytics",  label: "Analytics (cookie-less, no consent required)", required: false },
            { id: "marketing",  label: "Marketing",  required: false }
          ],
          onConsent: function (cats) { record(cats); }
        });
        return;
      }
    } catch (e) { /* fall through to built-in */ }
    showBanner();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
