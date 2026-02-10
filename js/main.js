// NetVeggies — main.js
(function() {
  'use strict';

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Print recipe
  document.querySelectorAll('.print-btn').forEach(function(btn) {
    btn.addEventListener('click', function() { window.print(); });
  });

  // Newsletter form (placeholder)
  document.querySelectorAll('.newsletter-form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var email = form.querySelector('input[type="email"]');
      if (email && email.value) {
        form.innerHTML = '<p style="color:#fff;font-size:1.1rem;">🎉 Thanks! Check your inbox for your free meal plan.</p>';
      }
    });
  });

  // Contact form (placeholder)
  var contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      contactForm.innerHTML = '<p style="text-align:center;font-size:1.1rem;padding:40px 0;">✅ Message sent! We\'ll get back to you soon.</p>';
    });
  }

  // Serving size adjuster
  var adjuster = document.querySelector('.serving-adjuster');
  if (adjuster) {
    var baseServings = parseInt(adjuster.dataset.servings) || 4;
    var btns = adjuster.querySelectorAll('button');
    var display = adjuster.querySelector('.serving-count');
    var quantities = document.querySelectorAll('[data-qty]');
    btns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var current = parseInt(display.textContent);
        var next = btn.classList.contains('minus') ? Math.max(1, current - 1) : current + 1;
        display.textContent = next;
        quantities.forEach(function(el) {
          var base = parseFloat(el.dataset.qty);
          var val = (base / baseServings * next);
          el.textContent = val % 1 === 0 ? val : val.toFixed(1);
        });
      });
    });
  }
})();
