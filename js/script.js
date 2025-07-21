// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('open-menu');
  const closeBtn = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobileMenu');

  const showMenu = () => {
    mobileMenu.classList.remove('translate-x-full', 'opacity-0', 'pointer-events-none');
    mobileMenu.classList.add('translate-x-0', 'opacity-100', 'pointer-events-auto');
    document.body.classList.add('overflow-hidden');
  };

  const hideMenu = () => {
    mobileMenu.classList.remove('translate-x-0', 'opacity-100', 'pointer-events-auto');
    mobileMenu.classList.add('translate-x-full', 'opacity-0', 'pointer-events-none');
    document.body.classList.remove('overflow-hidden');
  };

  openBtn?.addEventListener('click', showMenu);
  closeBtn?.addEventListener('click', hideMenu);

  const menuLinks = mobileMenu?.querySelectorAll('a, button');
  menuLinks?.forEach(link => {
    link.addEventListener('click', hideMenu);
  });
});


// Navbar visibility toggle based on HERO section
document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.getElementById("hero");
  const navStartBtn = document.getElementById("nav-start-btn");

  function setupObserver() {
    // Only proceed if desktop
    if (window.innerWidth >= 1024 && heroSection && navStartBtn) {
      const heroObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              navStartBtn.classList.add("opacity-0", "translate-y-3", "hidden");
            } else {
              navStartBtn.classList.remove("hidden");
              setTimeout(() => {
                navStartBtn.classList.remove("opacity-0", "translate-y-3");
              }, 50);
            }
          });
        },
        { threshold: 0.2 }
      );

      heroObserver.observe(heroSection);
    } else if (navStartBtn) {
      // Force hidden on non-desktop
      navStartBtn.classList.add("hidden");
    }
  }

  setupObserver();

  // Optional: re-setup on resize (for responsive behavior)
  window.addEventListener("resize", () => {
    // Refresh everything on resize
    location.reload();
  });
});


// Shared intersection reveal animation for fade-up
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('opacity-100', 'translate-y-0');
      entry.target.classList.remove('opacity-0', 'translate-y-5');
      fadeObserver.unobserve(entry.target); // Animate only once
    }
  });
}, { threshold: 0.2 });

// Add initial hidden state and observe elements with .fade-in-up or specific IDs
document.querySelectorAll('.fade-in-up, #scale-text, #scale-image, #how-it-works-title, #how-it-works-desc').forEach(el => {
  el.classList.add('opacity-0', 'translate-y-5', 'transition-all', 'duration-700', 'ease-out');
  fadeObserver.observe(el);
});

// Sticky glass navbar on scroll
window.addEventListener('scroll', () => {
  const header = document.getElementById('navbar');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('glass-nav');
    } else {
      header.classList.remove('glass-nav');
    }
  }
});


// Sections and nav links
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#navbar ul li a');

// Function to remove 'active' from all links
function clearActiveLinks() {
  navLinks.forEach(link => link.classList.remove('active'));
}

// Function to add 'active' class to current nav link based on scroll position
function setActiveNav() {
  const scrollPos = window.scrollY + 90; // 90px to account for fixed header height + padding

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollPos >= top && scrollPos < top + height) {
      clearActiveLinks();
      const activeLink = document.querySelector(`#navbar ul li a[href="#${section.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}

// Run on scroll and on page load
window.addEventListener('scroll', setActiveNav);
window.addEventListener('load', setActiveNav);


document.querySelectorAll('#navbar ul li a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const headerOffset = 80; // taas ng fixed header mo
    const elementPosition = targetElement.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

document.querySelectorAll('#navbar ul li a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const headerOffset = 80; // taas ng fixed header mo
    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

  // --- Back to Top Button ---
  const backToTopButton = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.remove('opacity-0', 'invisible');
      backToTopButton.classList.add('opacity-100', 'visible');
    } else {
      backToTopButton.classList.remove('opacity-100', 'visible');
      backToTopButton.classList.add('opacity-0', 'invisible');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  AOS.init({
    once: true, // animate only once
    duration: 800, // animation duration
    offset: 120,   // trigger offset
  });



//Typing
const words = ["Content Creators", "Founders", "Marketing Teams"];
  let i = 0;
  let j = 0;
  let currentWord = "";
  let isDeleting = false;
  const speed = 60;
  const delay = 1000;

  function type() {
    const el = document.getElementById("typewriter");

    if (i < words.length) {
      if (!isDeleting && j <= words[i].length) {
        currentWord = words[i].substring(0, j++);
        el.textContent = currentWord;
        setTimeout(type, speed);
      } else if (isDeleting && j >= 0) {
        currentWord = words[i].substring(0, j--);
        el.textContent = currentWord;
        setTimeout(type, speed / 2);
      } else {
        if (!isDeleting) {
          isDeleting = true;
          setTimeout(type, delay);
        } else {
          isDeleting = false;
          i = (i + 1) % words.length;
          setTimeout(type, speed);
        }
      }
    }
  }

  document.addEventListener("DOMContentLoaded", type);


  document.addEventListener("DOMContentLoaded", () => {
    const options = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("feature-item")) {
            entry.target.classList.add("animate-slide-in-left");
            observer.unobserve(entry.target);
          }
          if (entry.target.id === "custom-quote") {
            entry.target.classList.add("animate-fade-in-up");
            observer.unobserve(entry.target);
          }
          if (entry.target.id === "price-section") {
            entry.target.classList.add("animate-fade-up");
            observer.unobserve(entry.target);
          }
        }
      });
    }, options);

    // Observe all feature items
    document.querySelectorAll(".feature-item").forEach(el => observer.observe(el));
    // Observe custom quote
    const customQuote = document.getElementById("custom-quote");
    if (customQuote) observer.observe(customQuote);
    // Observe price section
    const priceSection = document.getElementById("price-section");
    if (priceSection) observer.observe(priceSection);
  });
  

    const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-up-on-scroll').forEach((el) => observer.observe(el));


    document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-up-on-scroll').forEach(el => observer.observe(el));
  });


    document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('#get-started');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('visible');
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
  });

  
  document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('get-started');
  const leftText = section.querySelector('.animate-slide-in-left');
  const rightButtons = section.querySelector('.animate-fade-in');

  // Initially remove animation classes so no animation on page load
  leftText.classList.remove('animate-slide-in-left');
  rightButtons.classList.remove('animate-fade-in');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        leftText.classList.add('animate-slide-in-left');
        rightButtons.classList.add('animate-fade-in');
        observer.unobserve(section); // animate once
      }
    });
  }, {
    threshold: 0.2 // trigger when 20% visible
  });

  observer.observe(section);
});







document.addEventListener('DOMContentLoaded', () => {
  const videos = [
    { category: 'ads', src: 'Videos/Ads.mp4' },
    { category: 'coaching', src: 'Videos/Coaching.mp4' },
    { category: 'podcast', src: 'https://www.youtube.com/watch?v=RjIp23-awYo' },
    { category: 'podcast', src: 'https://www.youtube.com/watch?v=Gjx3DlO5NJ0' },
    { category: 'Real Estate', src: 'Videos/RealEstate1.mp4' },
    { category: 'Real Estate', src: 'Videos/RealEstate2.mp4' },
    { category: 'shorts', src: 'Videos/Shorts1.mp4' },
    { category: 'shorts', src: 'Videos/Shorts2.mp4' }
  ];

  const filterButtonsContainer = document.getElementById('filter-buttons');
  const videoContainer = document.getElementById('video-container');
  const nextBtn = document.getElementById('next-video-btn');
  const prevBtn = document.getElementById('prev-video-btn');

  const categories = {};
  videos.forEach(v => {
    if (!categories[v.category]) categories[v.category] = [];
    categories[v.category].push(v.src);
  });

  Object.entries(categories).forEach(([category, vids], i) => {
    const btn = document.createElement('button');
    btn.className = 'tag-btn bg-white/10 text-white rounded-full px-4 py-2 font-semibold transition';
    if (i === 0) btn.classList.add('bg-white/20', 'active');
    btn.setAttribute('data-filter', category);
    btn.innerHTML = `
      ${category.charAt(0).toUpperCase() + category.slice(1)} 
      <span class="count">${vids.length}</span>
    `;
    filterButtonsContainer.appendChild(btn);
  });

  let currentCategory = Object.keys(categories)[0];
  let currentIndex = 0;
  let observer = null; // Global observer

  // Track if user interacted with page (click or key) to allow unmuted play
  let userInteracted = false;

  function onUserInteraction() {
    userInteracted = true;
    window.removeEventListener('click', onUserInteraction);
    window.removeEventListener('keydown', onUserInteraction);
  }
  window.addEventListener('click', onUserInteraction);
  window.addEventListener('keydown', onUserInteraction);

  function loadVideo(category, index) {
    const src = categories[category][index];
    videoContainer.innerHTML = '';

    if (src.includes('youtube.com') || src.includes('youtu.be')) {
      // Extract YouTube video ID
      const videoIdMatch = src.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&]+)/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;
      if (!videoId) {
        videoContainer.innerText = 'Invalid YouTube URL';
        return;
      }

      const iframe = document.createElement('iframe');
      iframe.width = '100%';
      iframe.height = '450';
      iframe.src = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&version=3&playerapiid=ytplayer&autoplay=1&mute=1`;
      iframe.frameBorder = '0';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
      iframe.allowFullscreen = true;
      iframe.className = 'rounded-lg max-w-full max-h-[80vh]';

      videoContainer.appendChild(iframe);

      if (observer) observer.disconnect();

      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const playerWindow = iframe.contentWindow;
          if (!playerWindow) return;

          if (entry.isIntersecting) {
            if (userInteracted) {
              // Unmute and play
              playerWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
              playerWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            } else {
              // Play muted
              playerWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
              playerWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            }
          } else {
            // Pause video
            playerWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
          }
        });
      }, { threshold: 0.5 });

      observer.observe(iframe);

    } else {
      // Normal video file
      const videoEl = document.createElement('video');
      videoEl.src = src;
      videoEl.controls = true;
      videoEl.preload = 'metadata';
      videoEl.setAttribute('playsinline', '');
      videoEl.className = 'max-w-full max-h-[80vh] rounded-lg';

      videoEl.muted = false;       // Mute for autoplay policy
      videoEl.autoplay = true;

      videoEl.addEventListener('loadedmetadata', () => {
        const isPortrait = videoEl.videoHeight > videoEl.videoWidth;
        videoEl.classList.add(isPortrait ? 'object-contain' : 'object-cover', 'w-auto', 'h-auto');
      });

      videoContainer.appendChild(videoEl);
      videoEl.pause();
      videoEl.currentTime = 0;

      if (observer) observer.disconnect();

      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            videoEl.play().catch(err => console.warn('Autoplay failed', err));
          } else {
            videoEl.pause();
          }
        });
      }, { threshold: 0.5 });

      observer.observe(videoEl);
    }
  }

  function updateNavButtons() {
    const length = categories[currentCategory].length;
    if (length <= 1) {
      nextBtn.style.display = 'none';
      prevBtn.style.display = 'none';
      return;
    }

    if (currentIndex === 0) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'inline-flex';
      nextBtn.textContent = '>';
    } else {
      nextBtn.style.display = 'none';
      prevBtn.style.display = 'inline-flex';
      prevBtn.textContent = '<';
    }
  }

  loadVideo(currentCategory, currentIndex);
  updateNavButtons();

  filterButtonsContainer.addEventListener('click', e => {
    if (e.target.tagName !== 'BUTTON') return;

    const btn = e.target.closest('button.tag-btn');
    if (!btn) return;

    const filter = btn.getAttribute('data-filter');
    if (filter === currentCategory) return;

    filterButtonsContainer.querySelectorAll('button').forEach(b => {
      b.classList.remove('bg-white/20', 'active');
      b.classList.add('bg-white/10');
    });
    btn.classList.add('bg-white/20', 'active');
    btn.classList.remove('bg-white/10');

    currentCategory = filter;
    currentIndex = 0;
    loadVideo(currentCategory, currentIndex);
    updateNavButtons();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= categories[currentCategory].length) {
      currentIndex = categories[currentCategory].length - 1;
    }
    loadVideo(currentCategory, currentIndex);
    updateNavButtons();
  });

  prevBtn.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) currentIndex = 0;
    loadVideo(currentCategory, currentIndex);
    updateNavButtons();
  });
});






















  document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-now-btn');
    const formSection = document.getElementById('get-started');

    startBtn.addEventListener('click', () => {
      // Unhide the form
      formSection.classList.remove('hidden');

      // Trigger animation
      setTimeout(() => {
        formSection.classList.remove('opacity-0', 'scale-95');
        formSection.classList.add('opacity-100', 'scale-100');
      }, 10);

      // Optional: scroll into view smoothly
      setTimeout(() => {
        formSection.scrollIntoView({ behavior: 'smooth' });
      }, 200); // small delay after animation starts
    });
  });





    window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  });

