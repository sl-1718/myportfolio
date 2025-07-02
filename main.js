/*==========================toggle icon navbar========================= */
const menuIcon = document.querySelector('#menu-icon');
const navbar   = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('fa-xmark');
  navbar.classList.toggle('active');
};

/*==========================scroll section active link ========================= */
const sections  = document.querySelectorAll('section');
const navLinks  = document.querySelectorAll('header nav a');

window.onscroll = () => {
  // highlight current section link
  sections.forEach(sec => {
    const top     = window.scrollY;
    const offset  = sec.offsetTop - 150;
    const height  = sec.offsetHeight;
    const id      = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => link.classList.remove('active'));
      document
        .querySelector(`header nav a[href*="${id}"]`)
        .classList.add('active');
    }
  });

  // sticky header
  const header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);

  // close mobile menu on scroll
  menuIcon.classList.remove('fa-xmark');
  navbar.classList.remove('active');
};

/*==========================scroll reveal ========================= */
ScrollReveal({
  distance: '80px',
  duration: 2000,
  delay: 200,
});
ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/*==========================typed js ========================= */
new Typed('.multiple-text', {
  strings: ['CSE Student', 'Full-Stack Developer', 'Tech Enthusiast', 'Aspiring Software Engineer', 'Problem Solver'],
  typeSpeed: 70,
  backSpeed: 70,
  backDelay: 1000,
  loop: true,
});

/*==========================Contact form js=========================*/
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    try {
      const res = await fetch('http://localhost:4000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      alert(result.message || 'Submitted!');
      e.target.reset();
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Error sending message.');
    }
  });
}
