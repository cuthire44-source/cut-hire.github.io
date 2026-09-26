window.addEventListener('load', () => {
  const section = document.getElementById('contact-stage');
  if(!section) return;

  const reveal = () => section.classList.add('in-view');

  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          reveal();
          obs.disconnect();
        }
      });
    }, { threshold: 0.28 });
    obs.observe(section);
  } else {
    reveal();
  }
});

(function(){
  const HOME_SCROLL_KEY = 'cnh_home_scroll_y';
  const backBtn = document.querySelector('.back-btn');
  if(!backBtn) return;

  backBtn.addEventListener('click', function(e){
    e.preventDefault();
    let hasSavedSpot = false;
    try{ hasSavedSpot = sessionStorage.getItem(HOME_SCROLL_KEY) !== null; }catch(err){}


    if(hasSavedSpot && document.referrer && new URL(document.referrer).origin === location.origin && history.length > 1){
      history.back();
      return;
    }


    window.location.href = '/';
  });
})();
