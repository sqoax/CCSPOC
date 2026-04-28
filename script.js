// ===== NAVIGATION =====
const navToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const nav = document.querySelector('.nav');

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Nav scroll behavior — shadow + reveal-on-scroll-up
let lastScrollY = window.scrollY;
let scrollTicking = false;

function handleNavScroll() {
  if (!nav) {
    scrollTicking = false;
    return;
  }
  const currentY = window.scrollY;
  const delta = currentY - lastScrollY;

  nav.classList.toggle('scrolled', currentY > 20);

  const menuOpen = mobileMenu && mobileMenu.classList.contains('open');
  if (currentY < 80 || menuOpen) {
    nav.classList.remove('nav-hidden');
  } else if (delta > 4) {
    nav.classList.add('nav-hidden');
  } else if (delta < -4) {
    nav.classList.remove('nav-hidden');
  }

  lastScrollY = currentY;
  scrollTicking = false;
}

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(handleNavScroll);
    scrollTicking = true;
  }
}, { passive: true });

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -30px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== SPOC CIRCLE OF SERVICES =====
const spocSteps = [
  {
    title: 'Discovery + Planning',
    body: 'We align project scope, facility requirements, timelines, and deployment priorities before installation begins.',
    bullets: ['Scope alignment', 'Facility requirements', 'Deployment timeline']
  },
  {
    title: 'Product Specification',
    body: 'We help standardize the right technology packages for each environment, room type, and clinical workflow.',
    bullets: ['Room standards', 'Device packages', 'Clinical workflow fit']
  },
  {
    title: 'Procurement + Coordination',
    body: 'We coordinate equipment, vendors, delivery timing, and project logistics to keep deployments moving.',
    bullets: ['Vendor coordination', 'Delivery timing', 'Project logistics']
  },
  {
    title: 'Installation + Testing',
    body: 'Professional crews install, configure, and test technology in live healthcare environments with minimal disruption.',
    bullets: ['Professional install crews', 'Device configuration', 'System readiness checks']
  },
  {
    title: 'Training + Go-Live',
    body: 'We support staff readiness and go-live execution so teams can transition confidently.',
    bullets: ['Staff readiness', 'Go-live support', 'Transition coordination']
  },
  {
    title: 'Service + Support',
    body: 'After deployment, we provide ongoing support to keep systems reliable and operational.',
    bullets: ['Ongoing support', 'Issue resolution', 'Long-term reliability']
  }
];

const spocNodes = Array.from(document.querySelectorAll('.spoc-step-node'));
const spocDetailPanel = document.querySelector('.spoc-detail-panel');
const spocDetailStep = document.querySelector('.spoc-detail-step');
const spocDetailTitle = document.querySelector('.spoc-detail-title');
const spocDetailBody = document.querySelector('.spoc-detail-body');
const spocDetailBullets = document.querySelector('.spoc-detail-bullets');
const spocConnectorLines = Array.from(document.querySelectorAll('.spoc-map-lines line'));

function setSpocActiveStep(index) {
  const step = spocSteps[index];

  if (!step || !spocDetailPanel || !spocDetailStep || !spocDetailTitle || !spocDetailBody || !spocDetailBullets) {
    return;
  }

  spocNodes.forEach((node, nodeIndex) => {
    node.classList.toggle('is-active', nodeIndex === index);
    node.setAttribute('aria-pressed', nodeIndex === index ? 'true' : 'false');
  });

  spocConnectorLines.forEach((line, lineIndex) => {
    line.classList.toggle('is-active', lineIndex === index);
  });

  spocDetailPanel.classList.remove('is-changing');
  void spocDetailPanel.offsetWidth;
  spocDetailStep.textContent = `Step ${String(index + 1).padStart(2, '0')}`;
  spocDetailTitle.textContent = step.title;
  spocDetailBody.textContent = step.body;
  spocDetailBullets.replaceChildren(...step.bullets.map((bullet) => {
    const item = document.createElement('li');
    item.textContent = bullet;
    return item;
  }));
  spocDetailPanel.classList.add('is-changing');
}

if (spocNodes.length) {
  spocNodes.forEach((node, index) => {
    node.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
    node.addEventListener('click', () => setSpocActiveStep(index));
    node.addEventListener('mouseenter', () => setSpocActiveStep(index));
    node.addEventListener('focus', () => setSpocActiveStep(index));
  });
}

// Contact form handling is in contact.html (page-specific EmailJS script)
