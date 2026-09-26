window.addEventListener('load',()=>document.body.style.overflow='visible');


(function(){
  const visits = parseInt(localStorage.getItem('cnh_visits')||'0');

})();


window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    document.body.classList.add('intro-visible');
  });
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

(function(){
  const wrap=document.getElementById('vp-wrap');
  const screen=document.getElementById('vp-screen');
  const video=document.getElementById('vp-video');
  const closeBtn=document.getElementById('vp-close');
  const playBtn=document.getElementById('vp-play');
  const muteBtn=document.getElementById('vp-mute');
  const vol=document.getElementById('vp-vol');
  const timeline=document.getElementById('vp-timeline');
  const prog=document.getElementById('vp-tl-prog');
  const buf=document.getElementById('vp-tl-buf');
  const thumb=document.getElementById('vp-tl-thumb');
  const time=document.getElementById('vp-time');
  const full=document.getElementById('vp-full');
  const big=document.getElementById('vp-bigplay');
  const playImg=document.getElementById('vp-play-img');
  const volImg=document.getElementById('vp-vol-img');
  const fsImg=document.getElementById('vp-fs-img');
  if(!wrap||!video) return;

  const fmt=s=>{
    if(!Number.isFinite(s)) return '0:00';
    const m=Math.floor(s/60);
    const sec=Math.floor(s%60).toString().padStart(2,'0');
    return `${m}:${sec}`;
  };

  function isFS(){return !!(document.fullscreenElement||document.webkitFullscreenElement||document.msFullscreenElement)}

  function update(){
    const d=video.duration||0;
    const p=d?(video.currentTime/d)*100:0;
    prog.style.width=p+'%';
    thumb.style.left=p+'%';
    time.textContent=`${fmt(video.currentTime)} / ${fmt(d)}`;
    if(playImg) playImg.src=video.paused?'assets/images/play-buttton.png':'assets/images/pause.png';
    if(volImg) volImg.src=(video.muted||video.volume===0)?'assets/images/volume-mute.png':'assets/images/volume.png';
    if(fsImg) fsImg.src=isFS()?'assets/images/unfullscreen.png':'assets/images/fullscreen.png';

    try{
      if(video.buffered && video.buffered.length && d){
        const end=video.buffered.end(video.buffered.length-1);
        buf.style.width=Math.min(100,(end/d)*100)+'%';
      }
    }catch(e){}
  }

  function openVideo(src, poster, isPlaceholder, playerTheme){
    if(!isPlaceholder && !src) return;
    wrap.classList.remove('closing-neutral','placeholder-mode','placeholder-blue','placeholder-red','player-blue','player-red');
    wrap.classList.toggle('placeholder-mode', !!isPlaceholder);
    wrap.classList.toggle('placeholder-blue', !!isPlaceholder && playerTheme==='blue');
    wrap.classList.toggle('placeholder-red', !!isPlaceholder && playerTheme==='red');
    wrap.classList.toggle('player-blue', !isPlaceholder && playerTheme==='blue');
    wrap.classList.toggle('player-red', !isPlaceholder && playerTheme==='red');
    wrap.classList.add('open');
    wrap.setAttribute('aria-hidden','false');
    document.body.classList.add('video-modal-locked');
    video.volume=parseFloat(vol.value||'1');

    if(isPlaceholder){
      video.pause();
      video.removeAttribute('src');
      video.removeAttribute('poster');
      video.load();
      if(playImg) playImg.src='assets/images/play-buttton.png';
      if(volImg) volImg.src='assets/images/volume.png';
      if(fsImg) fsImg.src=isFS()?'assets/images/unfullscreen.png':'assets/images/fullscreen.png';
      prog.style.width='0%';
      thumb.style.left='0%';
      buf.style.width='0%';
      time.textContent='0:00 / 0:00';
      big.classList.add('show');
      return;
    }

    if(poster) video.setAttribute('poster', poster);
    else video.removeAttribute('poster');
    video.src=src;
    video.play().catch(()=>{});
    update();
  }

  function closeVideo(){
    if(isFS()){
      const exit=document.exitFullscreen||document.webkitExitFullscreen||document.msExitFullscreen;
      if(exit) exit.call(document);
    }


    wrap.classList.add('closing-neutral');
    wrap.classList.remove('placeholder-mode','placeholder-blue','placeholder-red','player-blue','player-red','is-fullscreen');

    video.pause();
    video.removeAttribute('src');
    video.removeAttribute('poster');
    video.load();
    wrap.classList.remove('open');
    wrap.setAttribute('aria-hidden','true');
    document.body.classList.remove('video-modal-locked');
    update();

    window.setTimeout(()=>{
      wrap.classList.remove('closing-neutral');
    }, 380);
  }

  function toggleFS(){
    if(!isFS()){
      const req=wrap.requestFullscreen||wrap.webkitRequestFullscreen||wrap.msRequestFullscreen;
      if(req){
        const result=req.call(wrap);
        wrap.classList.add('is-fullscreen');
        if(result&&result.catch) result.catch(()=>{
          wrap.classList.remove('is-fullscreen');
          if(video.webkitEnterFullscreen) video.webkitEnterFullscreen();
        });
      }else if(video.webkitEnterFullscreen){
        video.webkitEnterFullscreen();
      }
    }else{
      const exit=document.exitFullscreen||document.webkitExitFullscreen||document.msExitFullscreen;
      if(exit) exit.call(document);
      wrap.classList.remove('is-fullscreen');
    }
    update();
  }

  document.querySelectorAll('.join-video-card').forEach(card=>{
    const src=card.getAttribute('data-video-src');
    const poster=card.getAttribute('data-video-poster');
    const isPlaceholder=card.getAttribute('data-placeholder')==='true';
    const playerTheme=card.closest('.path-card.client')?'red':'blue';
    card.addEventListener('click',()=>openVideo(src, poster, isPlaceholder, playerTheme));
    card.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();openVideo(src, poster, isPlaceholder, playerTheme)}
    });
  });

  closeBtn.addEventListener('click',e=>{e.stopPropagation();closeVideo();});
  wrap.addEventListener('click',e=>{
    const inside=e.target.closest('.vp-screen')||e.target.closest('.vp-controls')||e.target.closest('.vp-close');
    if(!inside) closeVideo();
  });
  document.addEventListener('keydown',e=>{
    if(!wrap.classList.contains('open')) return;
    if(e.key==='Escape') closeVideo();
    if(e.key.toLowerCase()==='f') toggleFS();
    if(e.key===' ' && !wrap.classList.contains('placeholder-mode')) {e.preventDefault(); video.paused?video.play():video.pause();}
  });
  screen.addEventListener('click',e=>{ if(wrap.classList.contains('placeholder-mode')) return; if(!e.target.closest('.vp-btn')) video.paused?video.play():video.pause(); });
  playBtn.addEventListener('click',e=>{e.stopPropagation(); if(wrap.classList.contains('placeholder-mode')) return; video.paused?video.play():video.pause();});
  muteBtn.addEventListener('click',e=>{e.stopPropagation();video.muted=!video.muted;update();});
  vol.addEventListener('input',()=>{video.volume=parseFloat(vol.value);video.muted=video.volume===0;update();});
  timeline.addEventListener('click',e=>{
    const r=timeline.getBoundingClientRect();
    const pct=Math.min(1,Math.max(0,(e.clientX-r.left)/r.width));
    if(!wrap.classList.contains('placeholder-mode') && video.duration) video.currentTime=pct*video.duration;
  });
  full.addEventListener('click',e=>{e.stopPropagation();toggleFS();});
  ['timeupdate','loadedmetadata','progress','volumechange','play','pause','ended'].forEach(ev=>video.addEventListener(ev,update));
  video.addEventListener('play',()=>{big.classList.remove('show')});
  video.addEventListener('pause',()=>{big.classList.add('show')});
  ['fullscreenchange','webkitfullscreenchange','MSFullscreenChange'].forEach(ev=>document.addEventListener(ev,()=>{
    wrap.classList.toggle('is-fullscreen',isFS());
    update();
  }));
})();


 
(function(){
  function fixRequestedText(){
    var walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
    var node;
    while((node=walker.nextNode())){
      node.nodeValue=node.nodeValue
        .replace(/Ready to Get Real Clients\?/g,'Ready to land real clients?')
        .replace(/Ready to get Real Clients\?/g,'Ready to land real clients?')
        .replace(/Need an Editor\?/g,'Ready to land real clients?');
    }
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',fixRequestedText);
  }else{
    fixRequestedText();
  }
})();
