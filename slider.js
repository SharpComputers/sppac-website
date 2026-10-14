(function () {
  var slider = document.getElementById('resultSlider');
  if (!slider) return;
  var track = slider.querySelector('.slides');
  var slides = track.children;
  var dots = slider.querySelector('.dots');
  var index = 0;
  var timer = null;

  for (var i = 0; i < slides.length; i++) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Slide ' + (i + 1));
    b.addEventListener('click', go.bind(null, i));
    dots.appendChild(b);
  }

  function go(i) {
    index = (i + slides.length) % slides.length;
    track.scrollTo({ left: slides[index].offsetLeft, behavior: 'smooth' });
    restart();
  }

  function mark() {
    var i = Math.round(track.scrollLeft / track.clientWidth);
    index = Math.max(0, Math.min(slides.length - 1, i));
    for (var j = 0; j < dots.children.length; j++) {
      dots.children[j].classList.toggle('on', j === index);
    }
  }

  function restart() {
    clearInterval(timer);
    timer = setInterval(function () { go(index + 1); }, 4000);
  }

  slider.querySelector('.prev').addEventListener('click', function () { go(index - 1); });
  slider.querySelector('.next').addEventListener('click', function () { go(index + 1); });
  track.addEventListener('scroll', function () { window.requestAnimationFrame(mark); });
  slider.addEventListener('mouseenter', function () { clearInterval(timer); });
  slider.addEventListener('mouseleave', restart);
  track.addEventListener('touchstart', function () { clearInterval(timer); }, { passive: true });
  track.addEventListener('touchend', restart, { passive: true });

  mark();
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) restart();
})();
