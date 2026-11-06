// Gallery data: add, remove, or reorder entries here without changing the page structure.
const galleryItems = [
  { src: 'assets/images/gallery/activity-01.jpg', alt: 'Community activity 1' },
  { src: 'assets/images/gallery/activity-02.jpg', alt: 'Community activity 2' },
  { src: 'assets/images/gallery/activity-03.jpg', alt: 'Community activity 3' },
  { src: 'assets/images/gallery/activity-04.jpg', alt: 'Community activity 4' },
  { src: 'assets/images/gallery/activity-05.jpg', alt: 'Community activity 5' },
  { src: 'assets/images/gallery/activity-06.jpg', alt: 'Community activity 6' },
  { src: 'assets/images/gallery/activity-07.jpg', alt: 'Community activity 7' },
  { src: 'assets/images/gallery/activity-08.jpg', alt: 'Community activity 8' },
  { src: 'assets/images/gallery/activity-09.jpg', alt: 'Community activity 9' },
  { src: 'assets/images/gallery/activity-10.jpg', alt: 'Community activity 10' },
  { src: 'assets/images/gallery/activity-11.jpg', alt: 'Community activity 11' },
  { src: 'assets/images/gallery/activity-12.jpg', alt: 'Community activity 12' },
  { src: 'assets/images/gallery/activity-13.jpg', alt: 'Community activity 13' },
  { src: 'assets/images/gallery/activity-14.jpg', alt: 'Community activity 14' },
  { src: 'assets/images/gallery/activity-15.jpg', alt: 'Community activity 15' },
  { src: 'assets/images/gallery/activity-16.jpg', alt: 'Community activity 16' },
  { src: 'assets/images/gallery/activity-17.jpg', alt: 'Community activity 17' },
  { src: 'assets/images/gallery/activity-18.jpg', alt: 'Community activity 18' },
  { src: 'assets/images/gallery/activity-19.jpg', alt: 'Community activity 19' },
  { src: 'assets/images/gallery/activity-20.jpg', alt: 'Community activity 20' },
  { src: 'assets/images/gallery/activity-21.jpg', alt: 'Community activity 21' },
  { src: 'assets/images/gallery/activity-22.jpg', alt: 'Community activity 22' },
  { src: 'assets/images/gallery/activity-23.jpg', alt: 'Community activity 23' },
  { src: 'assets/images/gallery/activity-24.jpg', alt: 'Community activity 24' },
  { src: 'assets/images/gallery/activity-25.jpg', alt: 'Community activity 25' },
  { src: 'assets/images/gallery/IMG_1583.png', alt: 'Community activity 26' },
  { src: 'assets/images/gallery/IMG_1618.jpg', alt: 'Community activity 27' },
  { src: 'assets/images/gallery/IMG_1620.jpg', alt: 'Community activity 28' },
  { src: 'assets/images/gallery/IMG_1621.jpg', alt: 'Community activity 29' }
];

const galleryGrid = document.getElementById('galleryGrid');
const navLinks = document.getElementById('navLinks');
const menuToggle = document.querySelector('.menu-toggle');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeButton = document.querySelector('.lightbox-close');
const previousButton = document.querySelector('.lightbox-nav.prev');
const nextButton = document.querySelector('.lightbox-nav.next');
const communityImage = document.querySelector('.community-photo img');
const heroImage = document.querySelector('.portrait-frame img');

function setMissingImageState(img, container, fallbackLabel) {
  if (!img || !container) return;

  img.style.display = 'none';
  container.classList.add('missing');

  if (fallbackLabel) {
    const fallback = container.querySelector('.portrait-fallback');
    if (fallback) {
      fallback.textContent = fallbackLabel;
      fallback.style.display = 'grid';
    }
  }
}

function handleImageMissing(img, fallbackLabel) {
  const parent = img.closest('.portrait-frame');
  if (parent) {
    setMissingImageState(img, parent, fallbackLabel);
    return;
  }

  const galleryItem = img.closest('.gallery-item');
  if (galleryItem) {
    galleryItem.classList.add('empty');
    galleryItem.setAttribute('aria-label', 'Photo coming soon');
    galleryItem.disabled = true;
    img.remove();
  }

  const communityFigure = document.querySelector('.community-photo');
  if (communityFigure && img.closest('.community-photo')) {
    communityFigure.classList.add('missing');
  }
}

function buildGallery() {
  galleryGrid.innerHTML = '';
  const revealObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px 60px 0px', threshold: 0.1 })
    : null;

  galleryItems.forEach((item, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-item';
    button.setAttribute('aria-label', `Open gallery image ${index + 1}`);
    button.dataset.index = String(index);
    button.style.transitionDelay = `${(index % 6) * 45}ms`;

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => handleImageMissing(img));

    button.appendChild(img);
    button.addEventListener('click', () => openLightbox(index));
    galleryGrid.appendChild(button);

    if (revealObserver) {
      revealObserver.observe(button);
    } else {
      button.classList.add('is-visible');
    }
  });
}

let currentLightboxIndex = 0;

function openLightbox(index) {
  if (!galleryItems[index]) return;

  currentLightboxIndex = index;
  lightboxImage.src = galleryItems[index].src;
  lightboxImage.alt = galleryItems[index].alt;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showPreviousImage() {
  const nextIndex = (currentLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
  openLightbox(nextIndex);
}

function showNextImage() {
  const nextIndex = (currentLightboxIndex + 1) % galleryItems.length;
  openLightbox(nextIndex);
}

function initImageFallbacks() {
  if (heroImage) {
    heroImage.addEventListener('error', () => handleImageMissing(heroImage, 'St. Patrick'));
  }

  if (communityImage) {
    communityImage.addEventListener('error', () => handleImageMissing(communityImage, 'Community'));
  }
}

function bindLightboxEvents() {
  closeButton.addEventListener('click', closeLightbox);
  previousButton.addEventListener('click', showPreviousImage);
  nextButton.addEventListener('click', showNextImage);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showPreviousImage();
    if (event.key === 'ArrowRight') showNextImage();
  });

  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) showNextImage();
      else showPreviousImage();
    }
  }, { passive: true });
}

function setupMobileMenu() {
  if (!navLinks || !menuToggle) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function setCopyrightYear() {
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
}

function bindCommunityImageClick() {
  const communityFigure = document.querySelector('.community-photo');
  if (!communityFigure) return;

  const openCommunity = () => {
    const src = communityFigure.dataset.full || communityImage?.src;
    if (!src) return;
    openLightbox(0);
    lightboxImage.src = src;
    lightboxImage.alt = 'Community members in fellowship';
  };

  communityFigure.addEventListener('click', openCommunity);
  communityFigure.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openCommunity();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  buildGallery();
  initImageFallbacks();
  setupMobileMenu();
  bindLightboxEvents();
  bindCommunityImageClick();
  setCopyrightYear();
});
