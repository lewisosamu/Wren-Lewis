(function() {
  'use strict';

  // ----- HERO PHONE RECORDINGS -----
  // Each phone has its own short clip, so nothing has to seek. Three videos
  // still decode at once, so pause whichever phones are off screen and stop
  // decoding entirely when the tab is hidden.
  var videos = Array.prototype.slice.call(document.querySelectorAll('.phone-video'));
  if (!videos.length) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function play(video) {
    if (reduceMotion.matches) return;
    video.dataset.wanted = 'true';
    var attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(function() {});
    }
  }

  function pause(video) {
    video.dataset.wanted = 'false';
    video.pause();
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        play(entry.target);
      } else {
        pause(entry.target);
      }
    });
  }, { threshold: 0.15 });

  videos.forEach(function(video) {
    if (reduceMotion.matches) {
      video.removeAttribute('autoplay');
      video.pause();
    }
    observer.observe(video);
  });

  document.addEventListener('visibilitychange', function() {
    videos.forEach(function(video) {
      if (document.hidden) {
        video.pause();
      } else if (video.dataset.wanted === 'true') {
        play(video);
      }
    });
  });

  if (typeof reduceMotion.addEventListener === 'function') {
    reduceMotion.addEventListener('change', function() {
      videos.forEach(function(video) {
        if (reduceMotion.matches) {
          video.pause();
        } else if (video.dataset.wanted === 'true') {
          play(video);
        }
      });
    });
  }
})();
