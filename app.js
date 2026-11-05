// Island Pickleball — prototype interactions
(function () {
  // Mobile nav toggle
  var burger = document.querySelector('.burger');
  var mobileNav = document.querySelector('.mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      mobileNav.setAttribute('data-open', String(!open));
    });
  }

  // Prototype forms: intercept submit, show confirmation.
  // In the real site these wire to booking / registration / email tools.
  document.querySelectorAll('form[data-proto]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var success = form.querySelector('.form__success');
      if (success) {
        success.setAttribute('data-show', 'true');
        success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        form.querySelectorAll('input, select, textarea').forEach(function (el) {
          el.value = '';
        });
      }
    });
  });
})();
