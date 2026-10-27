/**
 * Form handling via Forminit (fetch POST).
 * - Patient form requires explicit consent checkbox (GDPR/PIPL).
 * - Success/error toast with aria-live feedback.
 */
(function () {
  "use strict";
  var cfg = window.FEILAN_CONFIG || {};

  function toast(msg, ok) {
    var t = document.getElementById("toast");
    var m = document.getElementById("toastMsg");
    if (!t || !m) return;
    m.textContent = msg;
    t.style.background = ok ? "#0E9F6E" : "#C0392B";
    t.classList.add("show");
    setTimeout(function () { t.classList.remove("show"); }, 4200);
  }

  function lang() { return (document.documentElement.lang || "en").slice(0, 2); }

  function bindForm(formId, endpoint, typeKey, messages) {
    var form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      /* Explicit consent gate (patient form only) */
      var consent = form.querySelector('input[name="medical_consent"]');
      if (consent && !consent.checked) {
        toast(messages.consentRequired, false);
        consent.focus();
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; }

      fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      }).then(function (res) {
        if (res.ok) {
          toast(messages.success, true);
          form.reset();
          if (window.FEILAN_TRACK) window.FEILAN_TRACK(typeKey);
        } else {
          toast(messages.error, false);
        }
      }).catch(function () {
        toast(messages.error, false);
      }).finally(function () {
        if (btn) { btn.disabled = false; }
      });
    });
  }

  bindForm("form-patient", cfg.FORM_PATIENT_ENDPOINT, "patient_form", {
    success: lang() === "zh" ? "咨询已提交！我们将在 24 小时内与您联系。" : "Inquiry submitted! We will contact you within 24 hours.",
    error:   lang() === "zh" ? "提交失败，请稍后重试或邮件联系我们。" : "Submission failed. Please try again later.",
    consentRequired: lang() === "zh" ? "请先勾选健康信息处理同意框。" : "Please tick the health-information consent box before submitting."
  });

  bindForm("form-partner", cfg.FORM_PARTNER_ENDPOINT, "partner_form", {
    success: lang() === "zh" ? "合作意向已提交！我们将尽快与您联系。" : "Inquiry submitted! We will reach out shortly.",
    error:   lang() === "zh" ? "提交失败，请稍后重试或邮件联系我们。" : "Submission failed. Please try again later.",
    consentRequired: ""
  });
})();
