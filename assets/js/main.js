// ===================================================================
// EDITAR AQUI: número de WhatsApp da Ana Beatriz (formato 55+DDD+número)
// ===================================================================
const WHATSAPP_NUMBER = "5581998138202"; // <-- SUBSTITUIR
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOpen = document.getElementById('mobile-menu-open');
const mobileMenuClose = document.getElementById('mobile-menu-close');

function closeMobileMenu(){
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  mobileMenuOpen.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

mobileMenuOpen.addEventListener('click', function(){
  mobileMenu.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  mobileMenuOpen.setAttribute('aria-expanded', 'true');
  document.body.classList.add('menu-open');
  mobileMenuClose.focus();
});

mobileMenuClose.addEventListener('click', closeMobileMenu);
mobileMenu.querySelectorAll('a').forEach(function(link){
  link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('keydown', function(event){
  if(event.key === 'Escape' && mobileMenu.classList.contains('open')){
    closeMobileMenu();
    mobileMenuOpen.focus();
  }
});

document.querySelectorAll('[data-wa-msg]').forEach(function(el){
  const msg = el.getAttribute('data-wa-msg');
  el.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
  el.target = '_blank';
  el.rel = 'noopener';
});

// header on scroll
const header = document.getElementById('site-header');
window.addEventListener('scroll', function(){
  header.classList.toggle('scrolled', window.scrollY > 12);
}, {passive:true});

// ano automático no rodapé
document.getElementById('year').textContent = new Date().getFullYear();

// reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold:.12});
  revealEls.forEach(function(el){ obs.observe(el); });
} else {
  revealEls.forEach(function(el){ el.classList.add('in'); });
}

// fecha menu mobile ao redimensionar para desktop
window.addEventListener('resize', function(){
  if(window.innerWidth > 760){
    closeMobileMenu();
  }
});
