(function(){
  function goMain(e){
    if(window.parent!==window){
      e.preventDefault();
      window.parent.postMessage({type:'cnh-policy-close'},'*');
      return;
    }
    if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    e.preventDefault();
    document.body.classList.add('cnh-direct-leave');
    try{sessionStorage.setItem('cnhReturningFromPolicies','1')}catch(_){}
    setTimeout(()=>{location.href='index.html'},430);
  }
  document.querySelectorAll('a[href="index.html"]').forEach(a=>a.addEventListener('click',goMain));
})();
