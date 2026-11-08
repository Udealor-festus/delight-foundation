/* =========================================================
   De_Light Foundation — shared site script
   ========================================================= */

/* ---------------------------------------------------------
   EDIT THESE TWO LINES when you have the real links.
   Every "Apply Now" button and every "Give" button on the
   site reads from here, so you only need to paste once.
   --------------------------------------------------------- */
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScN00yNEdpZWoFmqSXpVG2CdOJf6AhnCvRphRbngXKFfxa0cw/viewform?usp=publish-editor";
const PAYPAL_EMAIL = "udealorfestus@gmail.com";

/* ---------------------------------------------------------
   ROLLING PICTURE STRIP — shown under the banner on every
   page, leaving out the page you are already on. Edit this
   list to change a picture, title or link on all pages.
   --------------------------------------------------------- */
const ROLLING_TABS = [
  { page: 'home',        href: 'index.html',       img: 'assets/img/tab_home.jpg',        title: 'Home',         text: 'Brightening the younger generation' },
  { page: 'about',       href: 'about.html',       img: 'assets/img/tab_about.jpg',       title: 'About Us',     text: 'Our story, founder and team' },
  { page: 'programs',    href: 'programs.html',    img: 'assets/img/tab_programs.jpg',    title: 'Our Programs', text: 'Faith, education and skills' },
  { page: 'scholarship', href: 'scholarship.html', img: 'assets/img/tab_scholarship.jpg', title: 'Scholarship',  text: 'Who qualifies and how to apply' },
  { page: 'contact',     href: 'contact.html',     img: 'assets/img/tab_contact.jpg',     title: 'Contact',      text: 'Talk to us or partner with us' },
  { page: 'give',        href: 'give.html',        img: 'assets/img/tab_give.jpg',        title: 'Give',         text: 'Support a student from $25' }
];

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Highlight the current page in the nav + footer ---- */
  var current = document.body.getAttribute('data-page');
  if (current) {
    document.querySelectorAll('[data-nav="' + current + '"]').forEach(function (el) {
      el.classList.add('active');
    });
  }

  /* ---- Rolling picture strip ---- */
  var hero = document.querySelector('.hero');
  if (hero) {
    var strip = document.createElement('nav');
    strip.className = 'rolling';
    strip.setAttribute('aria-label', 'Explore our pages');
    var track = document.createElement('div');
    track.className = 'rolling-track';
    var tabs = ROLLING_TABS.filter(function (t) { return t.page !== current; });
    /* Four identical sets, moved by exactly one set, make a seamless loop on any screen width */
    for (var set = 0; set < 4; set++) {
      tabs.forEach(function (t) {
        var card = document.createElement('a');
        card.className = 'roll-card';
        card.href = t.href;
        if (set > 0) { card.setAttribute('aria-hidden', 'true'); card.tabIndex = -1; }
        var pic = document.createElement('img');
        pic.src = t.img;
        pic.alt = '';
        var label = document.createElement('span');
        label.className = 'roll-txt';
        var name = document.createElement('b');
        name.textContent = t.title;
        var desc = document.createElement('small');
        desc.textContent = t.text;
        label.appendChild(name);
        label.appendChild(desc);
        card.appendChild(pic);
        card.appendChild(label);
        track.appendChild(card);
      });
    }
    strip.appendChild(track);
    hero.insertAdjacentElement('afterend', strip);
  }

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector('.navtoggle');
  var links = document.querySelector('.navlinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  /* ---- Founder "read more" toggle (About page) ---- */
  document.querySelectorAll('.readmore-toggle').forEach(function (readmore) {
    var closedLabel = readmore.getAttribute('data-closed') || 'Read more';
    var openLabel = readmore.getAttribute('data-open') || 'Read less';
    readmore.addEventListener('click', function () {
      var story = readmore.nextElementSibling;
      readmore.classList.toggle('open');
      story.classList.toggle('open');
      var open = story.classList.contains('open');
      readmore.setAttribute('aria-expanded', open ? 'true' : 'false');
      readmore.innerHTML = (open ? openLabel : closedLabel) + ' <span class="chev">&#9660;</span>';
    });
  });

  /* ---- Copy-to-clipboard chip (Give page) ---- */
  document.querySelectorAll('.copy-chip button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.previousElementSibling.textContent.trim();
      var done = function () { var old = btn.textContent; btn.textContent = 'Copied!'; setTimeout(function () { btn.textContent = old; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(done);
      } else {
        done();
      }
    });
  });

  /* ---- Give page: tier selection + PayPal links ---- */
  var tierCards = document.querySelectorAll('.tier-card');
  var mainGiveBtn = document.getElementById('give-paypal-btn');
  if (tierCards.length) {
    tierCards.forEach(function (card) {
      card.addEventListener('click', function () {
        tierCards.forEach(function (c) { c.classList.remove('selected'); });
        card.classList.add('selected');
        var amt = card.getAttribute('data-paypal-amount');
        var students = card.getAttribute('data-students');
        if (mainGiveBtn && amt) {
          mainGiveBtn.href = paypalLink(amt);
          mainGiveBtn.textContent = 'Give $' + amt + ' with PayPal';
        }
        var fillEl = document.querySelector('.progress-fill');
        var lblEl = document.querySelector('.progress-wrap .lbl2');
        if (fillEl && students) {
          var count = parseFloat(students);
          var pct = Math.min(100, Math.round((count / 10) * 100));
          fillEl.style.width = pct + '%';
          if (lblEl) lblEl.textContent = count < 1
            ? 'Your gift goes towards 1 of our 10-student goal'
            : 'Your gift covers ' + students + ' of our 10-student goal';
        }
      });
    });
  }

  /* Wire up every element that wants a live PayPal / Google Form link */
  document.querySelectorAll('[data-paypal-amount]').forEach(function (el) {
    el.href = paypalLink(el.getAttribute('data-paypal-amount'));
  });
  document.querySelectorAll('[data-apply-link]').forEach(function (el) {
    el.href = GOOGLE_FORM_URL;
    el.target = '_blank';
    el.rel = 'noopener';
  });

});

function paypalLink(amount) {
  var params = new URLSearchParams({
    cmd: '_xclick',
    business: PAYPAL_EMAIL,
    amount: amount,
    currency_code: 'USD',
    item_name: 'De_Light Foundation — Student Sponsorship'
  });
  return 'https://www.paypal.com/cgi-bin/webscr?' + params.toString();
}
