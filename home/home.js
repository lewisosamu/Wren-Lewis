(function() {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ----- TYPEWRITER EFFECT -----
  const typewriter = document.getElementById('typewriter');
  if (typewriter) {
    const words = ['ANIMATION', 'USER EXPERIENCE', 'USER INTERFACE', 'SOCIAL MEDIA', 'PITCH DECKS'];

    async function typeWord(word) {
      for (const char of word) {
        typewriter.textContent += char;
        await new Promise(r => setTimeout(r, 120));
      }
    }

    async function deleteWord(word) {
      for (let i = word.length; i > 0; i--) {
        typewriter.textContent = typewriter.textContent.slice(0, -1);
        await new Promise(r => setTimeout(r, 60));
      }
    }

    async function run() {
      while (true) {
        for (const word of words) {
          await typeWord(word);
          await new Promise(r => setTimeout(r, 2000));
          await deleteWord(word);
          await new Promise(r => setTimeout(r, 400));
        }
      }
    }

    if (reduceMotion.matches) {
      typewriter.textContent = 'USER EXPERIENCE';
    } else {
      run();
    }
  }

  // ----- WORK PREVIEW VIDEO -----
  const previewVideo = document.getElementById('work-preview-video');
  if (previewVideo) {
    previewVideo.pause();
    previewVideo.addEventListener('mouseenter', function() { previewVideo.play(); });
    previewVideo.addEventListener('mouseleave', function() { previewVideo.pause(); });
  }

  // ----- SCROLL TO WORK -----
  const workLink = document.querySelector('a[data-scroll="work"]');
  if (workLink) {
    workLink.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.getElementById('work');
      if (target) {
        const offset = 70;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      }
    });
  }
})();