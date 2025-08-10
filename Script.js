let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelector('.gallery-slides');
    const totalSlides = slides.children.length;

// Loop around
if (index >= totalSlides) {
    currentIndex = 0;
} else if (index < 0) {
    currentIndex = totalSlides - 1;
} else {
    currentIndex = index;
}

const offset = -currentIndex * 100;
slides.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
showSlide(currentIndex + 1);
}

function prevSlide() {
showSlide(currentIndex - 1);
}

setInterval(() => nextSlide(), 10000);

// for the see more button functionality

document.addEventListener('DOMContentLoaded', ()=> {
    const btns = Array.from(document.querySelectorAll('.see-more-btn'));
    console.log('see-more init. buttons found:', btns.length);
  
    btns.forEach((btn, idx) => {
      // If button has data-target attribute we use it; else find nearest container
      let container = null;
      if (btn.dataset.target) {
        container = document.querySelector(btn.dataset.target);
        if (!container) console.warn('see-more: data-target not found:', btn.dataset.target);
      }
      if (!container) container = btn.closest('div, section, article, p') || btn.parentElement || document.body;
  
      // match numbered or unnumbered parts
      const parts = Array.from(container.querySelectorAll('.more-text-part, [class^="more-text-part"]'));
      btn.dataset.seeMoreState = '0'; // per-button state
  
      console.log(`see-more init [btn ${idx}] container:`, container, 'parts found:', parts.length);
  
      // hide all initially
      parts.forEach(p => p.classList.remove('show'));
  
      btn.addEventListener('click', () => {
        let state = parseInt(btn.dataset.seeMoreState || '0', 10);
  
        console.log(`see-more click [btn ${idx}] state=${state} parts=${parts.length}`);
  
        if (state < parts.length) {
          parts[state].classList.add('show');
          state++;
          btn.textContent = state < parts.length ? 'See More' : 'See Less';
        } else {
          parts.forEach(p => p.classList.remove('show'));
          state = 0;
          btn.textContent = 'See More';
        }
  
        btn.dataset.seeMoreState = String(state);
      });
    });
  });

// Removes the nav after clicking on it from the URL

document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, null, ' '); // removes #hash from URL
    });
  });
  
