// ============================================================
// Island Pickleball — site behavior
// 1. Mobile navigation
// 2. Form engine — submits to Formspree (see README "Forms setup")
// ============================================================

// ------------------------------------------------------------
// FORM CONFIGURATION — the only file you need to edit.
// Create your forms at https://formspree.io (one per service),
// then paste each form's ID below (the part after /f/ in the
// form's endpoint URL, e.g. "xqkrgzzz").
// Leave a value as REPLACE_ME and that form will show a friendly
// "not yet live" message instead of silently failing.
// ------------------------------------------------------------
var FORM_ENDPOINTS = {
  contact:    'https://formspree.io/f/REPLACE_ME',
  court:      'https://formspree.io/f/REPLACE_ME',
  coaching:   'https://formspree.io/f/REPLACE_ME',
  academy:    'https://formspree.io/f/REPLACE_ME',
  tournament: 'https://formspree.io/f/REPLACE_ME',
  escapes:    'https://formspree.io/f/REPLACE_ME'
};

// Payment links for Academy registration (shown AFTER a successful
// registration submit, so families register first, pay second).
// Create these in Stripe (Dashboard > Payment Links), PayPal, or use
// your Venmo/PayPal.me profile URL. Leave blank to show the
// "we'll email you a payment link" fallback instead.
var PAYMENT_LINKS = {
  standard: '',  // e.g. 'https://buy.stripe.com/xxxx' — $179 Standard Entry
  pro: ''        // e.g. 'https://buy.stripe.com/yyyy' — $269 Academy Pro Tier
};

(function () {
  // ============ Mobile nav ============
  var burger = document.querySelector('.burger');
  var mobileNav = document.querySelector('.mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      mobileNav.setAttribute('data-open', String(!open));
    });
  }

  // ============ Form engine ============
  function showState(form, state) {
    var success = form.querySelector('.form__success');
    var error = form.querySelector('.form__error');
    var pending = form.querySelector('.form__pending');
    if (success) success.setAttribute('data-show', state === 'success' ? 'true' : 'false');
    if (error) error.setAttribute('data-show', state === 'error' ? 'true' : 'false');
    if (pending) pending.setAttribute('data-show', state === 'pending' ? 'true' : 'false');
  }

  document.querySelectorAll('form[data-service]').forEach(function (form) {
    var service = form.getAttribute('data-service');
    var endpoint = FORM_ENDPOINTS[service];

    // Stamp the code-of-conduct signature date, if present
    var dateField = form.querySelector('input[name="conduct-date"]');
    if (dateField && !dateField.value) {
      dateField.value = new Date().toISOString().slice(0, 10);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Not configured yet — fail gracefully with a human explanation
      if (!endpoint || endpoint.indexOf('REPLACE_ME') !== -1) {
        var unconfigured = form.querySelector('.form__unconfigured');
        if (unconfigured) {
          unconfigured.setAttribute('data-show', 'true');
          unconfigured.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      var data = new FormData(form);
      var submitBtn = form.querySelector('button[type="submit"]');
      var original = submitBtn ? submitBtn.textContent : '';

      showState(form, 'pending');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            showState(form, 'success');
            form.reset();
            // Academy: reveal payment step after successful registration
            if (service === 'academy') {
              var tier = data.get('tier');
              revealAcademyPayment(tier);
            }
          } else {
            showState(form, 'error');
          }
        })
        .catch(function () {
          showState(form, 'error');
        })
        .then(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = original;
          }
        });
    });
  });

  // Academy payment step: shows the right payment link for the
  // chosen tier once the registration itself has been received.
  function revealAcademyPayment(tier) {
    var section = document.getElementById('academy-payment');
    if (!section) return;
    section.setAttribute('data-show', 'true');
    var link = tier === 'pro' ? PAYMENT_LINKS.pro : PAYMENT_LINKS.standard;
    var label = tier === 'pro' ? 'Academy Pro Tier — $269' : 'Standard Entry — $179';
    var btn = section.querySelector('.payment__btn');
    var fallback = section.querySelector('.payment__fallback');
    if (btn && link) {
      btn.href = link;
      btn.textContent = 'Pay now — ' + label;
      btn.setAttribute('data-show', 'true');
      fallback.setAttribute('data-show', 'false');
    } else {
      btn.setAttribute('data-show', 'false');
      fallback.setAttribute('data-show', 'true');
    }
    section.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
})();
