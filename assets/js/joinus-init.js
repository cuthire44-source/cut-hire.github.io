(function(){
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  function topNow(){ window.scrollTo(0, 0); }
  topNow();
  window.addEventListener('DOMContentLoaded', topNow);
  window.addEventListener('load', function(){ topNow(); setTimeout(topNow, 50); });
  window.addEventListener('pageshow', function(){ topNow(); setTimeout(topNow, 50); });
  window.addEventListener('beforeunload', topNow);
})();
