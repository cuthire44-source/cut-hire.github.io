(function(){
  var dataNode = document.getElementById('creator-review-data');
  var featured = document.getElementById('creator-featured-review');
  var board = document.querySelector('.creator-review-board');
  if(!dataNode || !featured || !board) return;

  var reviews;
  try{ reviews = JSON.parse(dataNode.textContent); }catch(error){ return; }
  if(!reviews || reviews.length < 2) return;

  var AUTO_SWITCH_MS = 5000;
  var avatar = document.getElementById('creator-featured-avatar');
  var name = document.getElementById('creator-featured-name');
  var stat = document.getElementById('creator-featured-stat');
  var quote = document.getElementById('creator-featured-quote');
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-creator-review-index]'));
  var selector = document.querySelector('.creator-selector-grid');
  var currentIndex = 0;
  var switchTimer = 0;
  var autoTimer = 0;
  var isBoardVisible = true;
  var isPaused = false;

  function keepActiveButtonVisible(button){
    if(!button || !selector || typeof button.scrollIntoView !== 'function') return;
    if(window.matchMedia('(max-width: 760px)').matches){
      button.scrollIntoView({behavior:'smooth', block:'nearest', inline:'center'});
    }
  }

  function scheduleNext(){
    window.clearTimeout(autoTimer);
    if(isPaused || !isBoardVisible || document.hidden) return;
    autoTimer = window.setTimeout(function(){
      showReview((currentIndex + 1) % reviews.length, true);
    }, AUTO_SWITCH_MS);
  }

  function showReview(index, fromAuto){
    index = ((Number(index) || 0) + reviews.length) % reviews.length;
    var item = reviews[index];
    if(!item) return;
    currentIndex = index;

    buttons.forEach(function(button, buttonIndex){
      var active = buttonIndex === index;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', active ? 'true' : 'false');
      if(active && fromAuto) keepActiveButtonVisible(button);
    });

    window.clearTimeout(switchTimer);
    featured.classList.add('is-switching');
    switchTimer = window.setTimeout(function(){
      avatar.src = item.avatar;
      avatar.alt = item.alt;
      name.textContent = item.name;
      stat.textContent = item.stat;
      quote.textContent = item.quote;
      featured.classList.remove('is-switching');
      scheduleNext();
    }, 145);
  }

  function pauseAuto(){
    isPaused = true;
    window.clearTimeout(autoTimer);
  }

  function resumeAuto(){
    isPaused = false;
    scheduleNext();
  }

  buttons.forEach(function(button){
    button.addEventListener('click', function(){
      showReview(Number(button.getAttribute('data-creator-review-index')) || 0, false);
    });
  });

  board.addEventListener('mouseenter', pauseAuto);
  board.addEventListener('mouseleave', resumeAuto);
  board.addEventListener('focusin', pauseAuto);
  board.addEventListener('focusout', function(event){
    if(!board.contains(event.relatedTarget)) resumeAuto();
  });

  document.addEventListener('visibilitychange', function(){
    if(document.hidden) window.clearTimeout(autoTimer);
    else scheduleNext();
  });

  if('IntersectionObserver' in window){
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.target !== board) return;
        isBoardVisible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
        scheduleNext();
      });
    }, {threshold:[0,0.25,0.5]});
    observer.observe(board);
  }

  scheduleNext();
})();
