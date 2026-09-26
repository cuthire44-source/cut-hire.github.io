(function(){
  const body=document.body;
  const portal=document.getElementById('cnh-policy-portal');
  const frame=document.getElementById('cnh-policy-frame');
  let open=false;
  let savedY=0;
  function policyUrl(){return new URL('policies.html',location.href)}
  function show(push){
    if(open)return;
    open=true;
    savedY=window.scrollY||window.pageYOffset||0;
    portal.setAttribute('aria-hidden','false');
    frame.setAttribute('tabindex','0');
    requestAnimationFrame(()=>requestAnimationFrame(()=>body.classList.add('cnh-policy-active')));
    if(push){
      try{history.pushState({cnhPolicy:true},'',policyUrl().href)}catch(e){
        body.classList.remove('cnh-policy-active');
        setTimeout(()=>{location.href='policies.html'},20);
      }
    }
  }
  function hide(){
    if(!open)return;
    open=false;
    body.classList.remove('cnh-policy-active');
    portal.setAttribute('aria-hidden','true');
    frame.setAttribute('tabindex','-1');
    requestAnimationFrame(()=>window.scrollTo(0,savedY));
  }
  document.addEventListener('click',function(e){
    const link=e.target.closest&&e.target.closest('a.cnh-policies-link[href]');
    if(!link||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    e.preventDefault();
    show(true);
  });
  window.addEventListener('message',function(e){
    if(e.source!==frame.contentWindow||!e.data||e.data.type!=='cnh-policy-close')return;
    if(history.state&&history.state.cnhPolicy)history.back();else hide();
  });
  window.addEventListener('popstate',function(e){
    if(e.state&&e.state.cnhPolicy)show(false);else hide();
  });
  window.addEventListener('pageshow',function(){
    if(!(history.state&&history.state.cnhPolicy))hide();
  });
})();
