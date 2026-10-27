/**
 * Cloudflare Web Analytics (cookie-less; never blocked by consent banner)
 * + lightweight conversion beacon (type/lang/timestamp only — no personal data).
 */
(function () {
  "use strict";
  var cfg = window.FEILAN_CONFIG || {};

  /* 1) Cloudflare Web Analytics */
  if (cfg.ANALYTICS_TOKEN && cfg.ANALYTICS_TOKEN.indexOf("YOUR_") !== 0) {
    var s = document.createElement("script");
    s.src = "https://static.cloudflareinsights.com/beacon.min.js";
    s.async = true;
    s.setAttribute("data-cf-beacon", JSON.stringify({ token: cfg.ANALYTICS_TOKEN }));
    document.body.appendChild(s);
  }

  /* 2) Conversion tracking — fire-and-forget, silently fails without a backend */
  window.FEILAN_TRACK = function (type) {
    try {
      var payload = JSON.stringify({
        type: type,                                   // "patient_form" | "partner_form"
        lang: (document.documentElement.lang || "en").slice(0, 2),
        timestamp: new Date().toISOString()
      });
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/collect", new Blob([payload], { type: "application/json" }));
      }
    } catch (e) { /* silent by design */ }
  };
})();
