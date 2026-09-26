(function(){
  function modal(){return document.getElementById('creator-reviews-modal');}
  function openCreatorReviews(event){
    var target = event && event.target;
    if(!target || !target.closest('[data-open-creator-reviews]')) return;
    event.preventDefault();
    event.stopPropagation();
    var m = modal();
    if(!m) return;
    m.classList.remove('closing');
    m.classList.add('open');
    m.setAttribute('aria-hidden','false');
  }
  function closeCreatorReviews(){
    var m = modal();
    if(!m || !m.classList.contains('open')) return;
    m.classList.add('closing');
    m.classList.remove('open');
    m.setAttribute('aria-hidden','true');
    window.setTimeout(function(){ if(m) m.classList.remove('closing'); }, 280);
  }
  document.addEventListener('click', function(event){
    if(event.target.closest('[data-open-creator-reviews]')) return openCreatorReviews(event);
    if(event.target.closest('[data-close-creator-reviews]')){ event.preventDefault(); return closeCreatorReviews(); }
    var m = modal();
    if(m && m.classList.contains('open') && event.target === m) closeCreatorReviews();
  }, true);
  document.addEventListener('keydown', function(event){
    if((event.key === 'Enter' || event.key === ' ') && event.target.closest('[data-open-creator-reviews]')) return openCreatorReviews(event);
    if(event.key === 'Escape') closeCreatorReviews();
  }, true);
})();

(function(){
  document.addEventListener('keydown', function(event){
    if(event.key !== 'Enter' && event.key !== ' ') return;
    const target = event.target && event.target.closest
      ? event.target.closest('a.js-pricing-jump:not([href])')
      : null;
    if(!target) return;
    event.preventDefault();
    target.click();
  });
})();
