/* ── NAV scroll ─────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('solid', scrollY > 50);
}, { passive: true });

/* ── hamburger ──────────────────────────────────────────── */
const ham = document.getElementById('ham');
const drawer = document.getElementById('nav-drawer');
ham.addEventListener('click', () => drawer.classList.toggle('open'));
document.querySelectorAll('.drawer-link').forEach(a => {
  a.addEventListener('click', () => drawer.classList.remove('open'));
});

/* ── scroll reveal ──────────────────────────────────────── */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.09 });
document.querySelectorAll('.r').forEach(el => io.observe(el));

/* ── testimonials ───────────────────────────────────────── */
const testimonials = [
  {
    q: "Sujoy naturally leads by example — his leadership and ability to guide make a lasting impact on everyone around him. He not only delivers results but genuinely invests in the growth of his team and colleagues.",
    by: "— LinkedIn Recommendation"
  },
  {
    q: "Sujoy possesses a unique combination of kindness, enthusiasm, and passion that inspires his team to deliver their best. He is an incredible mentor committed to the growth and development of every person he works with.",
    by: "— LinkedIn Recommendation"
  }
];
let tIdx = 0;
const tq   = document.getElementById('tq');
const ta   = document.getElementById('ta');
const dots = document.querySelectorAll('.tdot');

tq.style.transition = ta.style.transition = 'opacity 0.28s ease';

function goT(i) {
  tIdx = i;
  tq.style.opacity = ta.style.opacity = '0';
  setTimeout(() => {
    tq.textContent = testimonials[i].q;
    ta.textContent = testimonials[i].by;
    tq.style.opacity = ta.style.opacity = '1';
  }, 280);
  dots.forEach((d, j) => d.classList.toggle('on', j === i));
}
dots.forEach(d => d.addEventListener('click', () => goT(+d.dataset.i)));
setInterval(() => goT((tIdx + 1) % testimonials.length), 5800);

/* speaking gallery drag + arrow buttons */
const sg = document.getElementById('sgallery');
let sgD = false, sgX = 0, sgL = 0;
sg.addEventListener('mousedown', e => { sgD = true; sgX = e.pageX; sgL = sg.scrollLeft; sg.style.cursor = 'grabbing'; });
window.addEventListener('mouseup', () => { sgD = false; if(sg) sg.style.cursor = 'grab'; });
window.addEventListener('mousemove', e => { if (!sgD) return; sg.scrollLeft = sgL - (e.pageX - sgX); });
sg.addEventListener('touchstart', e => { sgX = e.touches[0].pageX; sgL = sg.scrollLeft; }, { passive: true });
sg.addEventListener('touchmove', e => { sg.scrollLeft = sgL - (e.touches[0].pageX - sgX); }, { passive: true });
document.getElementById('sg-prev').addEventListener('click', () => sg.scrollBy({ left: -360, behavior: 'smooth' }));
document.getElementById('sg-next').addEventListener('click', () => sg.scrollBy({ left: 360, behavior: 'smooth' }));

/* photo strip arrows */
document.getElementById('ph-prev').addEventListener('click', () => strip.scrollBy({ left: -390, behavior: 'smooth' }));
document.getElementById('ph-next').addEventListener('click', () => strip.scrollBy({ left: 390, behavior: 'smooth' }));

/* lightbox */
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lb-img');
const lbClose  = document.getElementById('lb-close');
function openLightbox(src) {
  lbImg.src = src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { lbImg.src = ''; }, 320);
}
document.querySelectorAll('.pshot').forEach(shot => {
  shot.addEventListener('click', () => openLightbox(shot.querySelector('img').src));
});
lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ── photo strip — mouse drag ───────────────────────────── */
const strip = document.getElementById('pstrip');
let dragging = false, sx = 0, sl = 0;
strip.addEventListener('mousedown', e => {
  dragging = true; sx = e.pageX; sl = strip.scrollLeft;
  strip.style.cursor = 'grabbing';
});
window.addEventListener('mouseup', () => {
  dragging = false; strip.style.cursor = 'grab';
});
window.addEventListener('mousemove', e => {
  if (!dragging) return;
  strip.scrollLeft = sl - (e.pageX - sx);
});

/* touch drag */
strip.addEventListener('touchstart', e => {
  sx = e.touches[0].pageX; sl = strip.scrollLeft;
}, { passive: true });
strip.addEventListener('touchmove', e => {
  strip.scrollLeft = sl - (e.touches[0].pageX - sx);
}, { passive: true });
