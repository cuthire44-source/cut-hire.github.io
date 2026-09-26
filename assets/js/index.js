var THUMB_CACHE_VERSION = 'v=20260525d';

 
const reviewModal=document.getElementById('review-modal');
const reviewModalName=document.getElementById('review-modal-name');
const reviewModalMeta=document.getElementById('review-modal-meta');
const reviewModalText=document.getElementById('review-modal-text');
const reviewProofContent=document.getElementById('review-proof-content');
const reviewProofTitle=document.getElementById('review-proof-title');



document.querySelectorAll('#reviews .review-card[data-full]').forEach(card=>{
  const quote=card.querySelector('.review-quote');
  if(quote) quote.textContent=card.getAttribute('data-full')||'';
});

function escapeHtmlReview(value){
  return String(value).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
}
function openReviewModal(card){
  if(!reviewModal||!card)return;
  const name=card.dataset.name||'Client';
  const tag=card.dataset.tag||'Verified Review';
  const full=card.dataset.full||'Full review text goes here.';
  const proof=card.dataset.proof||'Add the real Discord screenshot path to data-proof-img for this review.';
  const proofImg=(card.dataset.proofImg||'').trim();
  reviewModalName.textContent=name;
  reviewModalMeta.textContent=`Verified on Discord · ${tag}`;
  reviewModalText.textContent=full;
  reviewProofTitle.textContent=`Discord message proof · ${name}`;
  reviewProofContent.innerHTML='';
  if(proofImg){
    const img=document.createElement('img');
    img.className='review-proof-img';
    const proofSize=(card.dataset.proofSize||'').trim();
    if(proofSize==='700x80') img.classList.add('proof-700x80');
    if(proofSize==='mdm-full') img.classList.add('proof-mdm-full');
    if(proofSize==='review4-full') img.classList.add('proof-review4-full');
    if(proofSize==='discord-wide') img.classList.add('proof-discord-wide');
    if(proofSize==='discord-wide-small') img.classList.add('proof-discord-wide-small');
    if(proofSize==='discord-compact') img.classList.add('proof-discord-compact');
    if(proofSize==='new-review-wide') img.classList.add('proof-new-review-wide');
    img.src=proofImg;
    img.alt=`Discord screenshot proof from ${name}`;
    img.onerror=()=>{
      reviewProofContent.innerHTML=`<div class="review-discord-shot"><div class="review-discord-channel"><span>#</span> client-reviews</div><div class="review-discord-message"><div class="review-discord-avatar"></div><div class="review-discord-body"><div class="review-discord-user">${escapeHtmlReview(name)} <span class="review-discord-time">screenshot path not found</span></div><div class="review-discord-text">${escapeHtmlReview(full)}</div><div class="review-discord-attachment">${escapeHtmlReview(proof)}</div></div></div></div>`;
    };
    reviewProofContent.appendChild(img);
  }else{
    reviewProofContent.innerHTML=`<div class="review-discord-shot"><div class="review-discord-channel"><span>#</span> client-reviews</div><div class="review-discord-message"><div class="review-discord-avatar"></div><div class="review-discord-body"><div class="review-discord-user">${escapeHtmlReview(name)} <span class="review-discord-time">placeholder proof</span></div><div class="review-discord-text">${escapeHtmlReview(full)}</div><div class="review-discord-attachment">${escapeHtmlReview(proof)}</div></div></div></div>`;
  }
  reviewModal.classList.add('open');
  reviewModal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeReviewModal(){
  if(!reviewModal)return;
  reviewModal.classList.remove('open');
  reviewModal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
document.querySelectorAll('.review-card').forEach(card=>card.addEventListener('click',()=>openReviewModal(card)));
if(reviewModal){reviewModal.addEventListener('click',e=>{if(e.target===reviewModal)closeReviewModal()})}
window.addEventListener('keydown',e=>{if(e.code==='Escape'&&reviewModal&&reviewModal.classList.contains('open'))closeReviewModal()});


 
const resultsModal=document.getElementById('results-modal');
const resultsModalImg=document.getElementById('results-modal-img');
const resultsModalTitle=document.getElementById('results-modal-title');
const resultsTrack=document.querySelector('[data-results-track]');
function openResultsModal(card){
  if(!resultsModal||!resultsModalImg||!card)return;
  const src=(card.dataset.resultImg||'').trim();
  const title=(card.dataset.resultTitle||'YouTube Analytics proof').trim();
  if(!src)return;
  resultsModalImg.src=src;
  resultsModalImg.alt=title;
  if(resultsModalTitle)resultsModalTitle.textContent=title;
  resultsModal.classList.add('open');
  resultsModal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}
function closeResultsModal(){
  if(!resultsModal)return;
  resultsModal.classList.remove('open');
  resultsModal.setAttribute('aria-hidden','true');
  setTimeout(()=>{if(resultsModalImg&&!resultsModal.classList.contains('open'))resultsModalImg.src='';},240);
  document.body.style.overflow='';
}
document.querySelectorAll('.result-card').forEach(card=>card.addEventListener('click',()=>openResultsModal(card)));
if(resultsModal){resultsModal.addEventListener('click',e=>{if(e.target===resultsModal)closeResultsModal()})}
window.addEventListener('keydown',e=>{if(e.code==='Escape'&&resultsModal&&resultsModal.classList.contains('open'))closeResultsModal()});
function scrollResultsTrack(dir){
  if(!resultsTrack)return;
  const first=resultsTrack.querySelector('.result-card');
  const step=(first?first.getBoundingClientRect().width:380)+18;
  resultsTrack.scrollBy({left:dir*step,behavior:'smooth'});
}
document.querySelector('[data-results-prev]')?.addEventListener('click',()=>scrollResultsTrack(-1));
document.querySelector('[data-results-next]')?.addEventListener('click',()=>scrollResultsTrack(1));




 
(function(){
   
  const HERO_CACHE_VERSION='v=20260526hero8';
  const FILES=[
    'assets/images/8.webp',
    'assets/images/f6b5a56b-c6cc-476f-8bed-5920429ccc70.webp',
    'assets/images/9cb0f7f2-b98d-4f8c-9802-ff93a7ecb8e3.webp',
    'assets/images/e837326a-3c9d-4142-a663-1d32cff2edef.webp',
    'assets/images/5.webp',
    'assets/images/image.webp',
    'assets/images/bvcvcbvcbvcb43541.webp',
    'assets/images/I_tested_10_Spy_Gadgets_Thumbnail.webp',
    'assets/images/Illustrator_vid.webp',
    'assets/images/thumbnail_by_lokesh_4.webp',
    'assets/images/thumbnail_by_lokesh_7.png.webp',
    'assets/images/thumnbail_by_lokesh_2.webp',
    'assets/images/thumbnail_by_lokesh_1_.webp',
    'assets/images/thumbnail_by_lokesh_5.png.webp',
    'assets/images/thumbnail_by_lokesh_3.png.webp',
    'assets/images/descarga_1.webp',
    'assets/images/descarga_2.webp',
    'assets/images/IMG-20251116-WA0014.webp',
    'assets/images/20260312_052641.webp',
    'assets/images/20260314_051758.webp',
    'assets/images/image (1).webp',
    'assets/images/4_1.webp',
    'assets/images/3_2.webp',
    'assets/images/4_2.webp',
    'assets/images/1_1.webp',
    'assets/images/3.webp',
    'assets/images/1.webp',
    'assets/images/5 (1).webp',
    'assets/images/6_1.webp',
    'assets/images/7.webp'
  ];

  const grid=document.getElementById('hero-grid-bg');
  if(!grid||grid.dataset.ready)return;
  grid.dataset.ready='1';

  function cache(src){
    if(!src || src.startsWith('data:') || src.includes('?'))return src;
    return src + '?' + HERO_CACHE_VERSION;
  }

  function candidates(file){


    return [file, 'hero-thumbnails/' + file];
  }

  function addPreload(src){
    const href=cache(src);
    if(document.querySelector('link[rel="preload"][as="image"][href="'+CSS.escape(href)+'"]'))return;
    const link=document.createElement('link');
    link.rel='preload';
    link.as='image';
    link.href=href;
    link.fetchPriority='high';
    document.head.appendChild(link);
  }



  FILES.forEach(file=>{
    const c=candidates(file);
    addPreload(c[0]);
  });

  const HERO_EAGER_LIMIT=12;
  let heroThumbIndex=0;

  function makeThumb(file){
    const thumb=document.createElement('div');
    thumb.className='hero-grid-thumb';
    thumb.dataset.file=file;

    const img=document.createElement('img');
    img.alt='';
    img.width=480;
    img.height=260;
    const isPriorityHeroThumb = heroThumbIndex++ < HERO_EAGER_LIMIT;
    img.loading = isPriorityHeroThumb ? 'eager' : 'lazy';
    img.decoding = 'async';
    img.fetchPriority = isPriorityHeroThumb ? 'high' : 'low';
    img.style.opacity='1';
    img.style.visibility='visible';

    const tries=candidates(file);
    let attempt=0;

    img.onerror=function(){
      attempt++;
      if(attempt<tries.length){
        img.src=cache(tries[attempt]);
        return;
      }
      thumb.remove();
      console.warn('Missing hero thumbnail:', file, 'Tried:', tries);
    };

    img.onload=function(){
      thumb.style.display='block';
      img.style.opacity='1';
      img.style.visibility='visible';
    };

    img.src=cache(tries[0]);
    thumb.appendChild(img);
    return thumb;
  }

  function buildRow(cls,items){
    const row=document.createElement('div');
    row.className='hero-grid-row ' + cls;


    for(let cycle=0; cycle<2; cycle++){
      items.forEach(file=>row.appendChild(makeThumb(file)));
    }
    return row;
  }

  const rows=[
    FILES.slice(0,8),
    FILES.slice(8,16),
    FILES.slice(16,23),
    FILES.slice(23,30)
  ];

  grid.innerHTML='';
  rows.forEach((rowFiles,i)=>grid.appendChild(buildRow('hero-grid-row-' + (i+1), rowFiles)));
  grid.classList.add('hero-thumbnails-rendered');

  grid.addEventListener('mouseenter',e=>{
    const thumb=e.target.closest('.hero-grid-thumb');
    if(!thumb)return;
    thumb.classList.remove('fading');
    thumb.classList.add('lit');
  },true);

  grid.addEventListener('mouseleave',e=>{
    const thumb=e.target.closest('.hero-grid-thumb');
    if(!thumb)return;
    thumb.classList.remove('lit');
    thumb.classList.add('fading');
    setTimeout(()=>thumb.classList.remove('fading'),2000);
  },true);
})();

 
(function(){
  document.addEventListener('contextmenu',e=>e.preventDefault());
  document.addEventListener('dragstart',e=>{if(e.target&&e.target.closest&&e.target.closest('img,video,svg,canvas,.wc,.logo,.hero-logo-wrap'))e.preventDefault()});
  document.addEventListener('copy',e=>{const t=e.target;if(!t||!t.closest||!t.closest('input,textarea'))e.preventDefault()});
  document.addEventListener('keydown',e=>{const k=(e.key||'').toLowerCase();if((e.ctrlKey||e.metaKey)&&['s','u','p','c'].includes(k)){const t=e.target;if(!t||!t.closest||!t.closest('input,textarea'))e.preventDefault()}});
  window.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('img,video').forEach(el=>{
      el.setAttribute('draggable','false');
      if(el.tagName.toLowerCase()==='video'){el.setAttribute('controlsList','nodownload noplaybackrate');el.setAttribute('disablepictureinpicture','')}
    });
  });
})();

 
(function(){
  const orig=document.title;
  const away=["Still need an editor? 👀","Your video is waiting 🎬","Don't leave the cut unfinished ✂️","Need clean edits? 🔥","Come back to Cut & Hire 💼"];
  const back=["Welcome back 🔥","Good to see you again 👋","Back to creating 🎬","Let's finish the cut ✂️"];
  let t=null,i=0;
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){clearInterval(t);document.title=away[i%away.length];i++;t=setInterval(()=>{document.title=away[i%away.length];i++},2200)}
    else{clearInterval(t);document.title=back[Math.floor(Math.random()*back.length)];setTimeout(()=>document.title=orig,1800)}
  });
})();

 
const scrollHints=[document.getElementById('scroll-left'),document.getElementById('scroll-right')].filter(Boolean);
scrollHints.forEach(h=>{
  h.addEventListener('click',()=>{
    const c=h.querySelector('.scroll-hint-circle');
    if(c){c.style.transition='transform .2s cubic-bezier(.34,1.56,.64,1)';c.style.transform='scale(1.25)';setTimeout(()=>c.style.transform='scale(1)',200)}
    setTimeout(()=>document.getElementById('work')?.scrollIntoView({behavior:'smooth'}),150);
  },{passive:true});
});
let hintsEnabled=false,hintsVisible=false;
function showHints(){if(hintsVisible)return;hintsVisible=true;scrollHints.forEach(h=>{h.classList.add('visible');h.classList.remove('hidden')})}
function hideHints(){if(!hintsVisible)return;hintsVisible=false;scrollHints.forEach(h=>{h.classList.remove('visible');h.classList.add('hidden')})}
let scrollTicking=false;
function updateScrollUI(){
  scrollTicking=false;
  const y=window.scrollY||document.documentElement.scrollTop||0;
  if(hintsEnabled)y>80?hideHints():showHints();
  const navAnchors=Array.from(document.querySelectorAll('.nav-links a'));
  let cur='';
  ['work','services','process','reviews'].forEach(id=>{const s=document.getElementById(id);if(s&&y>=s.offsetTop-220)cur=id});
  navAnchors.forEach(a=>{const h=a.getAttribute('href');if(h&&h.startsWith('#'))a.style.color=h==='#'+cur?'var(--w)':''});
}
function requestScrollUI(){if(scrollTicking)return;scrollTicking=true;requestAnimationFrame(updateScrollUI)}





setTimeout(()=>{
  hintsEnabled=true;
  if((window.scrollY||0)<80)showHints();
  requestScrollUI();
},6000);
window.addEventListener('scroll',requestScrollUI,{passive:true});
window.addEventListener('resize',requestScrollUI,{passive:true});
requestScrollUI();

 
function initDecorations(){
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const pc=document.getElementById('particles');
  if(pc&&!pc.dataset.ready){pc.dataset.ready='1';for(let i=0;i<14;i++){const p=document.createElement('div');p.className='particle';const size=Math.random()*3.5+1.5;p.style.cssText=`width:${size}px;height:${size}px;background:rgba(224,32,32,${.18+Math.random()*.22});left:${Math.random()*100}%;animation-duration:${9+Math.random()*13}s;animation-delay:-${Math.random()*12}s;`;pc.appendChild(p)}}
  const scBg=document.getElementById('sc-bg');
  if(scBg&&!scBg.dataset.ready){scBg.dataset.ready='1';for(let i=0;i<12;i++){const el=document.createElement('div');el.className='sc-item';const sz=Math.random()*52+18,op=Math.random()*.05+.022,dur=Math.random()*15+12,del=Math.random()*13,rot=(Math.random()-.5)*360;el.style.cssText=`width:${sz}px;height:${sz}px;left:${Math.random()*100}%;--op:${op};--rot:${rot}deg;animation-duration:${dur}s;animation-delay:-${del}s;filter:brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(330deg) brightness(.5);`;scBg.appendChild(el)}}
}
(window.requestIdleCallback||function(cb){return setTimeout(cb,450)})(initDecorations);
document.addEventListener('visibilitychange',()=>{document.querySelectorAll('.particle,.sc-item,.cut-line').forEach(el=>{el.style.animationPlayState=document.hidden?'paused':''})});

 
fetch('https://discord.com/api/v9/invites/dXemseJsDV?with_counts=true')
  .then(r=>r.json())
  .then(d=>{
    if(d.approximate_member_count)document.getElementById('disc-members').textContent=d.approximate_member_count.toLocaleString();
    if(d.approximate_presence_count)document.getElementById('disc-online').textContent=d.approximate_presence_count.toLocaleString();
  }).catch(()=>{});

 
(function(){
  let statsGo=false,startAllowed=false;
  function renderStat(el,value,suffix,done){
    const safeValue=Math.max(0,value);
    const suffixText=String(suffix||'');
    if(suffixText.toLowerCase()==='m+'){
      const target=Number(el.dataset.target)||0;
      el.innerHTML=(done||safeValue>=target-.08)?Math.round(target)+'M<span class="stat-suffix">+</span>':safeValue.toFixed(1)+'M<span class="stat-suffix">+</span>';return;
    }
    if(suffixText.toLowerCase()==='b+' || suffixText.toLowerCase().includes('billion+')){
      const target=Number(el.dataset.target)||0;
      const shown=(done||safeValue>=target-.01)?target.toFixed(1):safeValue.toFixed(1);
      el.innerHTML=shown+'<span class="stat-suffix">B+</span>';return;
    }
    if(suffixText==='+'){
      const target=Number(el.dataset.target)||0;
      const shown=done?target:Math.min(target,Math.round(safeValue));
      el.innerHTML=shown.toLocaleString('en-US')+'<span class="stat-suffix">+</span>';return;
    }
    el.textContent=(done?Math.round(value):Math.round(safeValue))+suffixText;
  }
  function runStats(){
    if(statsGo||!startAllowed)return;
    const strip=document.querySelector('#hero-stats');if(!strip)return;
    const rect=strip.getBoundingClientRect();if(rect.top>=window.innerHeight*.95)return;
    statsGo=true;
    document.querySelectorAll('#hero-stats .stat-number').forEach(el=>{
      const target=Number(el.dataset.target)||0,suffix=el.dataset.suffix||'',duration=1700,start=performance.now();
      function step(now){const p=Math.min((now-start)/duration,1),eased=1-Math.pow(1-p,2.45),current=target*eased;renderStat(el,current,suffix,p>=1);if(p<1)requestAnimationFrame(step)}
      requestAnimationFrame(step);
    });
  }
  setTimeout(()=>{startAllowed=true;runStats()},650);
  window.addEventListener('scroll',runStats,{passive:true});
})();

 

THUMB_CACHE_VERSION='v=20260611c';
function cacheBustAsset(src){
  if(!src)return src;
  const clean=String(src).trim();
  if(clean==='assets/images/Sequence 075.png')return 'assets/images/Sequence 075.png?v=20260611c';
  if(clean.startsWith('data:')||clean.startsWith('blob:')||clean.includes('?'))return clean;
  if(/\.(png|jpg|jpeg|webp|gif)$/i.test(clean))return `${clean}?${THUMB_CACHE_VERSION}`;
  return clean;
}




function imageCandidates(src){
  if(!src)return [];
  const clean=String(src).trim();
  if(clean.startsWith('data:')||clean.startsWith('blob:'))return [clean];

  const noQuery=clean.split('?')[0].replace(/^\.\//,'');
  const file=noQuery.split('/').pop();
  const list=[];
  const add=value=>{
    if(!value)return;
    const v=String(value).trim();
    if(!v||list.includes(v))return;
    list.push(v);
  };
  const addPath=path=>{
    if(!path)return;
    add(path);
    add('./'+String(path).replace(/^\.\//,''));
    try{add(new URL(path,document.baseURI).href)}catch(e){}
    try{add(new URL('/'+String(path).replace(/^\/?/,''),location.origin).href)}catch(e){}
  };


  add(clean);
  addPath(noQuery);



  const folders=[
    '',
    'portfolio-thumbnails/',
    'Portfolio-Thumbnails/',
    'portfolio_thumbnails/',
    'portfolio thumbnails/',
    'thumbnails/',
    'hero-thumbnails/'
  ];
  folders.forEach(folder=>addPath(folder+file));



  [...list].forEach(value=>{
    try{add(encodeURI(value))}catch(e){}
  });

  return list;
}
function nextImageFallback(img){
  if(!img)return;
  let list=[];
  try{list=JSON.parse(img.dataset.candidates||'[]')}catch(e){}
  const nextIndex=Number(img.dataset.candidateIndex||0)+1;
  if(nextIndex<list.length){
    img.dataset.candidateIndex=String(nextIndex);
    img.src=cacheBustAsset(list[nextIndex]);
    return;
  }
  img.classList.add('img-missing');
  const card=img.closest('.wc');
  if(card)card.classList.add('image-load-failed');
}
function primeImageFallback(img,src){
  if(!img)return;
  const list=imageCandidates(src);
  img.dataset.candidates=JSON.stringify(list);
  img.dataset.candidateIndex='0';
  img.onerror=function(){nextImageFallback(this)};
  img.onload=function(){
    this.classList.remove('img-missing');
    const card=this.closest('.wc');
    if(card){
      card.classList.remove('image-load-failed');
      card.classList.add('has-thumb');
    }
  };
  img.src=cacheBustAsset(list[0]||src||'');
}
const works=[
{cat:['motion'],title:'Video 42',src:'assets/videos/Video 42.mp4',thumb:'assets/images/Video42.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/Tx42kp-Dqu8?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['motion'],title:'Video 43',src:'assets/videos/Video 43.mp4',thumb:'assets/images/Video43.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/4R2KBE1s58g?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['motion'],title:'Video 44',src:'assets/videos/Video 44.mp4',thumb:'assets/images/formula21speed.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/uP8zul2FVsE?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['motion'],title:'Motion Graphics 1',size:'wide',src:'assets/videos/Video 18.mp4',thumb:'assets/images/motion-graphics-1.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/MeaRUSkXNCw?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['motion'],title:'Long Form 1',size:'tall',src:'assets/videos/VIdeo 16.mp4',thumb:'assets/images/supreme.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/zqXGLIl0XFE?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['motion'],title:'Motion Graphics 92',src:'assets/videos/Video 3.mp4',thumb:'assets/images/motion graphics92.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/_oEtS2dwbXw?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['motion'],title:'Short 2',src:'assets/videos/Video 39.mp4',thumb:'assets/images/short2.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/BMhTnsWHNKg?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['motion'],title:'Short 44',src:'assets/videos/Video 35.mp4',thumb:'assets/images/short44.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/QMFui_OUjVQ?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['motion'],title:'Short 7',src:'assets/videos/Video 31.mp4',thumb:'assets/images/short7.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/bEn6rmsAkIA?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['youtube','vlogs'],title:'Sequence 01 (2)',src:'assets/videos/Video 19.mp4',thumb:'assets/images/Sequence 01(2).png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/TlzMIK30Yok?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['youtube','vlogs'],title:'Sequence 01 1 (1)',src:'assets/videos/Video 22.mp4',thumb:'assets/images/Sequence 01 1(1).png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/J31L1G4av2E?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['youtube','vlogs'],title:'Longform 37 (1)',src:'assets/videos/Video 21.mp4',thumb:'assets/images/Longform37(1).png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/3AuPJd4jNYU?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['youtube','vlogs'],title:'Vlog 583',src:'assets/videos/Video 14.mp4',thumb:'assets/images/vlog583.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/j5hNlIsf1Uk?autoplay=1&rel=0&playsinline=1&modestbranding=1',cleanTopIcon:true},
{cat:['youtube','vlogs'],title:'Cinematic Edit 433',src:'assets/videos/Video 5.mp4',thumb:'assets/images/Cinematic Edit433.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/H9K8FMVV9Jw?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['youtube','explainer'],title:'Sequence 075',src:'assets/videos/Video 6.mp4',thumb:'assets/images/Sequence 075.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/wKNpTszi-fc?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['youtube','explainer'],title:'Explanitory 484',src:'assets/videos/Video 8.mp4',thumb:'assets/images/explanitory484.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/s669PGbeb4k?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['youtube','explainer'],title:'Sequence 01 2',src:'assets/videos/Video 27.mp4',thumb:'assets/images/Sequence 01 2.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/vq8-QPIXH90?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['explainer','youtube'],title:'Long Form 3',size:'',src:'assets/videos/Video 28.mp4',thumb:'assets/images/longform3.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/kCodkI7Pyzg?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['youtube','gaming'],title:'Lily Sample',src:'assets/videos/Video 10.mp4',thumb:'assets/images/Lily Sample.Mp4.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/AFtN7s0ECxg?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['youtube','gaming'],title:'7xLgtMa0Xb5M3IAu',src:'assets/videos/Video 11.mp4',thumb:'assets/images/7xLgtMa0Xb5M3IAu.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/WFWDhwUFjIU?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['youtube','gaming'],title:'ZR-sJOwRe2iWBSUF',src:'assets/videos/Video 9.mp4',thumb:'assets/images/ZR-sJOwRe2iWBSUF.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/VsWTvf-oyyA?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['youtube','gaming'],title:'Sequence 01 7 (1)',src:'assets/videos/Video 25.mp4',thumb:'assets/images/Sequence 01 7(1).png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/41zH3gOWeJw?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['youtube','gaming'],title:'Minecraft LongForm',src:'assets/videos/Video 17.mp4',thumb:'assets/images/MInecraft LongForm.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/SeYpdqFks40?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['youtube','gaming'],title:'Minecraft LongForm 2',src:'assets/videos/Video 13.mp4',thumb:'assets/images/MInecraft LongForm2.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/2qlcSZeE7Y0?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['youtube','documentary'],title:'Sequence 01 4 (1)',src:'assets/videos/Video 7.mp4',thumb:'assets/images/Sequence 01 4(1).png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/E2i0kueWQJM?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['youtube','documentary'],title:'Sequence 01 5',src:'assets/videos/Video 2.mp4',thumb:'assets/images/Sequence 01 5.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/Gn9WePyu1rU?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['youtube','documentary'],title:'Sequence 01 6',src:'assets/videos/Video 29.mp4',thumb:'assets/images/Sequence 01 6.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/xsSBnoaRS4Q?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['documentary','youtube'],title:'Long Form 13',size:'',src:'assets/videos/Video 4.mp4',thumb:'assets/images/longform13.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/i_b1kG59y4A?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['documentary','youtube'],title:'Documentary 3983',src:'assets/videos/Video 15.mp4',thumb:'assets/images/documentary3983.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/8xrxi2kDvGI?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['documentary','youtube'],title:'Documetary 6383',src:'assets/videos/Video 12.mp4',thumb:'assets/images/documetary6383.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/-TsYumZBUfg?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:[],title:'Short 6',src:'short6.mp4',isPhoto:false},
{cat:['documentary'],title:'Short 8',src:'assets/videos/Video 30.mp4',thumb:'assets/images/short8.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/LdZHDHsLaj4?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:[],title:'Short 9',src:'short9.mp4',isPhoto:false},
{cat:['explainer'],title:'Short 10',src:'assets/videos/Video 34.mp4',thumb:'assets/images/short10.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/rok-pcThmjs?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['shorts'],title:'Short 488',src:'assets/videos/Video 37.mp4',thumb:'assets/images/short488.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/YAiMD58FPbo?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['shorts'],title:'Short 82',src:'assets/videos/Video 40.mp4',thumb:'assets/images/short82.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/txZZYitchUY?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['shorts'],title:'Short 849',src:'assets/videos/Video 38.mp4',thumb:'assets/images/short849.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/HhB8bHgFRHA?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['shorts'],title:'Short 45',src:'assets/videos/Video 33.mp4',thumb:'assets/images/short45.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/Q5HkVgNNj9M?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['shorts'],title:'Video 99',src:'assets/videos/video99.mp4',thumb:'assets/images/short 99.png',isPhoto:false,youtubeUrl:'https://youtube.com/shorts/xO1rCs3HHpc?feature=share',youtubeEmbed:'https://www.youtube.com/embed/xO1rCs3HHpc?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['shorts'],title:'Video 98',src:'assets/videos/video98.mp4',thumb:'assets/images/short 98.png',isPhoto:false,youtubeUrl:'https://youtube.com/shorts/vWRVHY6PDko?feature=share',youtubeEmbed:'https://www.youtube.com/embed/vWRVHY6PDko?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['shorts'],title:'Video 67',src:'assets/videos/video67.mp4',thumb:'assets/images/video67.png',isPhoto:false,youtubeUrl:'https://youtube.com/shorts/MsVSxAKHBEw?feature=share',youtubeEmbed:'https://www.youtube.com/embed/MsVSxAKHBEw?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['shorts'],title:'Video 71',src:'assets/videos/video71.mp4',thumb:'assets/images/video71.png',isPhoto:false,youtubeUrl:'https://youtube.com/shorts/nrLJBSUYBkE?feature=share',youtubeEmbed:'https://www.youtube.com/embed/nrLJBSUYBkE?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['shorts'],title:'Video 70',src:'assets/videos/video70.mp4',thumb:'assets/images/video70.png',isPhoto:false,youtubeUrl:'https://youtube.com/shorts/jjhK1UVCE3c?feature=share',youtubeEmbed:'https://www.youtube.com/embed/jjhK1UVCE3c?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['shorts'],title:'Video 73',src:'assets/videos/video73.mp4',thumb:'assets/images/video73.png',isPhoto:false,youtubeUrl:'https://youtube.com/shorts/iik3jC2q6gI?feature=share',youtubeEmbed:'https://www.youtube.com/embed/iik3jC2q6gI?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['shorts'],title:'Video 69',src:'assets/videos/video69.mp4',thumb:'assets/images/video69.png',isPhoto:false,youtubeUrl:'https://youtube.com/shorts/xBHdv6woCBk?feature=share',youtubeEmbed:'https://www.youtube.com/embed/xBHdv6woCBk?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['shorts'],title:'Short 2732903902190',src:'assets/videos/short2732903902190.mp4',thumb:'assets/images/short13328932988932.png',isPhoto:false,youtubeUrl:'https://youtube.com/shorts/-M_lW14v43s?feature=share',youtubeEmbed:'https://www.youtube.com/embed/-M_lW14v43s?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['shorts'],title:'Short 11',src:'assets/videos/Video 36.mp4',thumb:'assets/images/short11.png',isPhoto:false,youtubeUrl:'https://youtube.com/shorts/LPjW9Ta9g6E?feature=share',youtubeEmbed:'https://www.youtube.com/embed/LPjW9Ta9g6E?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['shorts'],title:'Video 72',src:'assets/videos/video72.mp4',thumb:'assets/images/video72.png',isPhoto:false,youtubeUrl:'https://youtube.com/shorts/XjHRDJr1Apg?feature=share',youtubeEmbed:'https://www.youtube.com/embed/XjHRDJr1Apg?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['shorts'],title:'Short 2741313123329039446702190',src:'assets/videos/short2741313123329039446702190.mp4',thumb:'assets/images/short6493729.png',isPhoto:false,youtubeUrl:'https://youtube.com/shorts/NX0p7WbXkyY?feature=share',youtubeEmbed:'https://www.youtube.com/embed/NX0p7WbXkyY?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['shorts'],title:'Video 68',src:'assets/videos/video68.mp4',thumb:'assets/images/video68.png',isPhoto:false,youtubeUrl:'https://youtube.com/shorts/OXazo3KDe8s?feature=share',youtubeEmbed:'https://www.youtube.com/embed/OXazo3KDe8s?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['vlogs'],title:'Football Edit 443',src:'assets/videos/Video 41.mp4',thumb:'assets/images/Football Edit443.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/_skf6972O2I?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['explainer'],title:'Infromative 44',src:'assets/videos/Video 32.mp4',thumb:'assets/images/infromative44.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/5sv3G6elUP4?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:[],title:'Long Form 2',size:'',src:'longform2.mp4',isPhoto:false},
{cat:[],title:'Long Form 5',size:'wide',src:'longform5.mp4',isPhoto:false},
{cat:['documentary'],title:'Long Form 6',size:'',src:'assets/videos/Video 26.mp4',thumb:'assets/images/longform6.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/WCCoity0cDM?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:['documentary'],title:'Long Form 7',size:'',src:'assets/videos/VIdeo 1.mp4',thumb:'assets/images/longform7.png',isPhoto:false,youtubeEmbed:'https://www.youtube.com/embed/XubR3-IenM8?autoplay=1&rel=0&playsinline=1&modestbranding=1'},
{cat:[],title:'Long Form 8',size:'tall',src:'longform8.mp4',isPhoto:false},
{cat:[],title:'Long Form 9',size:'',src:'longform9.mp4',isPhoto:false},
{cat:[],title:'Long Form 10',size:'',src:'longform10.mp4',isPhoto:false},
{cat:[],title:'Long Form 11',size:'',src:'longform11.mp4',isPhoto:false},
{cat:[],title:'Long Form 12',size:'wide',src:'longform12.mp4',isPhoto:false},
{cat:['thumbnail'],title:'Thumbnail 1',src:'',isPhoto:true,img:'assets/images/8.webp'},
{cat:['thumbnail'],title:'Thumbnail 2',src:'',isPhoto:true,img:'assets/images/f6b5a56b-c6cc-476f-8bed-5920429ccc70.webp'},
{cat:['thumbnail'],title:'Thumbnail 3',src:'',isPhoto:true,img:'assets/images/9cb0f7f2-b98d-4f8c-9802-ff93a7ecb8e3.webp'},
{cat:['thumbnail'],title:'Thumbnail 4',src:'',isPhoto:true,img:'assets/images/e837326a-3c9d-4142-a663-1d32cff2edef.webp'},
{cat:['thumbnail'],title:'Thumbnail 5',src:'',isPhoto:true,img:'assets/images/5.webp'},
{cat:['thumbnail'],title:'Thumbnail 6',src:'',isPhoto:true,img:'assets/images/image.webp'},
{cat:['thumbnail'],title:'Thumbnail 7',src:'',isPhoto:true,img:'assets/images/bvcvcbvcbvcb43541.webp'},
{cat:['thumbnail'],title:'Thumbnail 8',src:'',isPhoto:true,img:'assets/images/I_tested_10_Spy_Gadgets_Thumbnail.webp'},
{cat:['thumbnail'],title:'Thumbnail 9',src:'',isPhoto:true,img:'assets/images/Illustrator_vid.webp'},
{cat:['thumbnail'],title:'Thumbnail 10',src:'',isPhoto:true,img:'assets/images/thumbnail_by_lokesh_4.webp'},
{cat:['thumbnail'],title:'Thumbnail 11',src:'',isPhoto:true,img:'assets/images/thumbnail_by_lokesh_7.png.webp'},
{cat:['thumbnail'],title:'Thumbnail 12',src:'',isPhoto:true,img:'assets/images/thumnbail_by_lokesh_2.webp'},
{cat:['thumbnail'],title:'Thumbnail 13',src:'',isPhoto:true,img:'assets/images/thumbnail_by_lokesh_1_.webp'},
{cat:['thumbnail'],title:'Thumbnail 14',src:'',isPhoto:true,img:'assets/images/3(3).webp'},
{cat:['thumbnail'],title:'Thumbnail 15',src:'',isPhoto:true,img:'assets/images/thumbnail_by_lokesh_3.png.webp'}
];



 
(function preloadMappedVideoThumbs(){
  const thumbs = works
    .map(w => w && w.thumb)
    .filter(Boolean)
    .filter((v, i, a) => a.indexOf(v) === i);

  thumbs.forEach((src, i) => {
    const img = new Image();
    img.decoding = 'async';
    img.loading = 'eager';
    img.fetchPriority = i < 16 ? 'high' : 'auto';
    img.src = cacheBustAsset(src);
  });
})();


 
(function preloadExactVideoThumbs(){
  const thumbs=[...new Set(works.map(w=>w&&w.thumb).filter(Boolean))];
  thumbs.forEach((src,i)=>{
    const img=new Image();
    img.decoding='async';
    img.loading='eager';
    img.fetchPriority=i<18?'high':'auto';
    img.src=cacheBustAsset(src);
  });
})();





let portfolioThumbsPrimed=false;
function preloadPortfolioThumbnailsNow(){
  if(portfolioThumbsPrimed)return;
  portfolioThumbsPrimed=true;
  const portfolioThumbs=[...new Set(works.filter(w=>w.isPhoto&&w.img).map(w=>w.img))];
  portfolioThumbs.forEach((src,i)=>{
    window.setTimeout(()=>{
      const img=new Image();
      img.decoding='async';
      img.loading='eager';
      img.fetchPriority=i<6?'high':'auto';
      primeImageFallback(img,src);
    }, i*35);
  });
}

const playSVG=`<svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,.95)"><polygon points="6,3 20,12 6,21"/></svg>`;
const camSVG=`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.5"/><path d="M9 6l1.5-2h3L15 6"/></svg>`;
function getCats(w){return Array.isArray(w.cat)?w.cat:[w.cat]}
function isShortVideo(w){
  const src=String(w&&w.src||'');
  const title=String(w&&w.title||'');
  const thumb=String(w&&w.thumb||'');
  const cats=getCats(w||{});
  const portraitThumbs=new Set([
    'assets/images/supreme.png','assets/images/formula21speed.png',
    'assets/images/short8.png','assets/images/short7.png','assets/images/infromative44.png','assets/images/short45.png','assets/images/short10.png','assets/images/short44.png',
    'assets/images/short11.png','assets/images/short 98.png','assets/images/short 99.png','assets/images/short488.png','assets/images/short849.png','assets/images/short2.png','assets/images/short82.png','assets/images/Football Edit443.png'
  ]);
  return /^short\d+\.mp4$/i.test(src)
    || /^Video\s*(16|3[0-9]|40|41|44)\.mp4$/i.test(src)
    || cats.includes('shorts')
    || /short/i.test(title)
    || portraitThumbs.has(thumb);
}
function videoThumbFromSrc(src){if(!src)return '';const clean=src.split('/').pop().replace(/\.[^/.]+$/,'');return `${clean}.jpg`}
function getVideoThumb(w){return w.thumb||videoThumbFromSrc(w.src||'')}


const YOUTUBE_FIXED_RANDOM_ORDER=[
      'assets/videos/Video 5.mp4',
      'assets/videos/Video 21.mp4',
      'assets/videos/Video 11.mp4',
      'assets/videos/Video 25.mp4',
      'assets/videos/Video 4.mp4',
      'assets/videos/Video 7.mp4',
      'assets/videos/Video 15.mp4',
      'assets/videos/Video 17.mp4',
      'assets/videos/Video 13.mp4',
      'assets/videos/Video 27.mp4',
      'assets/videos/Video 19.mp4',
      'assets/videos/Video 29.mp4',
      'assets/videos/Video 9.mp4',
      'assets/videos/Video 2.mp4',
      'assets/videos/Video 10.mp4',
      'assets/videos/Video 22.mp4',
      'assets/videos/Video 28.mp4',
      'assets/videos/Video 8.mp4',
      'assets/videos/Video 6.mp4',
      'assets/videos/Video 12.mp4',
      'assets/videos/Video 14.mp4'
];

function orderWorkList(list, activeCat){
  const arr=[...(list||[])];

  // One randomized YouTube Long Form order, hardcoded so EVERY visitor sees the same order.
  // Reloading, reopening, or using a different device will not reshuffle it.
  if(activeCat==='youtube'){
    const rank=new Map(YOUTUBE_FIXED_RANDOM_ORDER.map((src,index)=>[src,index]));
    return arr.sort((a,b)=>(rank.get(a.src)??9999)-(rank.get(b.src)??9999));
  }

  const CATEGORY_ORDER={
    documentary:[
      'assets/videos/Video 30.mp4','assets/videos/Video 7.mp4','assets/videos/Video 2.mp4','assets/videos/Video 29.mp4','assets/videos/Video 26.mp4',
      'assets/videos/VIdeo 1.mp4','assets/videos/Video 4.mp4','assets/videos/Video 15.mp4','assets/videos/Video 12.mp4'
    ],
    explainer:[
      'assets/videos/Video 34.mp4','assets/videos/Video 6.mp4','assets/videos/Video 32.mp4','assets/videos/Video 8.mp4','assets/videos/Video 27.mp4','assets/videos/Video 28.mp4'
    ],
    motion:[
      'assets/videos/Video 42.mp4','assets/videos/Video 43.mp4','assets/videos/Video 44.mp4','assets/videos/Video 18.mp4','assets/videos/VIdeo 16.mp4',
      'assets/videos/Video 3.mp4','assets/videos/Video 39.mp4','assets/videos/Video 35.mp4','assets/videos/Video 31.mp4'
    ]
  };

  const order=CATEGORY_ORDER[activeCat];
  if(!order)return arr;

  const rank=new Map(order.map((src,i)=>[src,i]));
  return arr.sort((a,b)=>{
    const aIndex=rank.has(a.src)?rank.get(a.src):9999;
    const bIndex=rank.has(b.src)?rank.get(b.src):9999;
    return aIndex-bIndex;
  });
}
function getVideoCandidates(src){
  if(!src)return [];
  const clean=String(src).trim();
  const file=clean.split('/').pop();
  const encodedClean=encodeURI(clean);
  const encodedFile=encodeURI(file);






  const candidates=[
    clean,
    encodedClean,
    file,
    encodedFile,
    './'+file,
    './'+encodedFile
  ];

  const extMatch=file.match(/\.mp4$/i);
  if(extMatch){
    const base=file.replace(/\.mp4$/i,'');
    candidates.push(base+'.mp4',base+'.MP4',base+'.Mp4');
    candidates.push('./'+base+'.mp4','./'+base+'.MP4','./'+base+'.Mp4');
    candidates.push(encodeURI(base+'.mp4'),encodeURI(base+'.MP4'),encodeURI(base+'.Mp4'));
  }


  if(file.toLowerCase()==='sequence 075.mp4'){
    candidates.push(
      'Sequence 075.mp4',
      'Sequence%20075.mp4',
      './Sequence 075.mp4',
      './Sequence%20075.mp4'
    );
  }


  if(/^Video\s*16\.mp4$/i.test(file)){
    candidates.push(
      'assets/videos/VIdeo 16.mp4','Video16.mp4','assets/videos/VIdeo 16.mp4','VIdeo16.mp4','assets/videos/VIdeo 16.mp4','video16.mp4',
      'assets/videos/VIdeo 16.mp4','./Video16.mp4','assets/videos/VIdeo 16.mp4','./VIdeo16.mp4',
      'assets/videos/VIdeo 16.mp4','assets/videos/VIdeo 16.mp4'
    );
  }
  if(/^Video\s*18\.mp4$/i.test(file)){
    candidates.push(
      'assets/videos/Video 18.mp4','Video18.mp4','assets/videos/Video 18.mp4','VIdeo18.mp4','assets/videos/Video 18.mp4','video18.mp4',
      'assets/videos/Video 18.mp4','./Video18.mp4','assets/videos/Video 18.mp4','./VIdeo18.mp4',
      'assets/videos/Video 18.mp4','assets/videos/Video 18.mp4'
    );
  }

  return [...new Set(candidates.filter(Boolean))];
}
function isMobilePortfolioView(){
  return window.matchMedia && window.matchMedia('(max-width:700px)').matches;
}
function mobilePortfolioLimit(activeCat){
   
  const cat = activeCat || DEFAULT_WORK_CATEGORY || 'youtube';
  if(!isMobilePortfolioView()) return Infinity;
  if(cat === 'youtube') return 7;
  if(cat === 'all') return 8;
  if(cat === 'thumbnail') return 8;
  if(cat === 'shorts') return 14;
  return 6;
}
function renderWork(list, activeCat){
  list=orderWorkList(list||[], activeCat).slice(0, mobilePortfolioLimit(activeCat));
  const g=document.getElementById('work-grid');
  if(g) g.dataset.cat = activeCat || g.dataset.cat || DEFAULT_WORK_CATEGORY;
  g.innerHTML=list.map((w,i)=>{
    const cats=getCats(w),isShort=isShortVideo(w),isThumb=cats.includes('thumbnail');




    const sizeClass=w.isPhoto?(w.size||''):(isShort?'shortform-card':'longform-card');
    const featuredClass=(w.featured&&w.isPhoto)?' motion-featured-card':'';
    const autoplayClass=w.autoplayPreview?' autoplay-preview':'';
    const cleanTopIconClass=w.cleanTopIcon?' clean-top-source-icon':'';
    const badge='';
    const phClass=isShort?'shortform-ph':isThumb?'thumbnail-ph':'';
    const dataCats=cats.join(' ');

    if(w.isPhoto&&w.img){
      const photoCandidates=imageCandidates(w.img);
      const firstPhoto=cacheBustAsset(photoCandidates[0]||w.img);
      return `<div class="wc ${sizeClass}${featuredClass}${autoplayClass}${cleanTopIconClass} is-photo rv" data-idx="${i}" data-cat="${dataCats}" style="transition-delay:${i*.04}s">
        <img class="wc-thumb" src="${firstPhoto}" data-candidates='${JSON.stringify(photoCandidates).replace(/'/g,"&#39;")}' data-candidate-index="0" alt="${w.title}" loading="eager" decoding="async" fetchpriority="${i<6?'high':'auto'}" width="480" height="260" onload="this.classList.remove('img-missing');this.closest('.wc')?.classList.add('has-thumb')" onerror="nextImageFallback(this)">
        ${badge}<div class="wc-overlay"><div class="wc-icon-circle">${camSVG}</div></div>
      </div>`;
    }

    const ps=w.previewStart??2,pe=w.previewEnd??5;
    const eager=i<6?'eager':'lazy';
    const priority=i<6?' fetchpriority="high"':'';

    const explicitThumb=cacheBustAsset((w.thumb||'').trim());
    const explicitThumbAttr=explicitThumb ? ` src="${explicitThumb}" data-explicit-thumb="1"` : ` src=""`;
    const explicitThumbClass=explicitThumb ? ' has-thumb placeholder-hidden' : '';

    return `<div class="wc ${sizeClass}${featuredClass}${autoplayClass}${cleanTopIconClass}${explicitThumbClass} is-video rv" data-idx="${i}" data-src="${w.src}" data-cat="${dataCats}" style="transition-delay:${Math.min(i*.025,.25)}s">
      <div class="wc-placeholder ${phClass}"><div class="wc-placeholder-spinner"></div></div>
      <img class="wc-video-thumb"${explicitThumbAttr} data-video-src="${w.src}" data-thumb-time-min="2" data-thumb-time-max="5" alt="${w.title} thumbnail" loading="${eager}" decoding="async"${priority} onload="if(this.dataset.explicitThumb==='1'){const c=this.closest('.wc');if(c){c.classList.add('has-thumb');const p=c.querySelector('.wc-placeholder');if(p)p.classList.add('loaded');}}" onerror="if(this.dataset.explicitThumb==='1'&&!this.dataset.fallbackTried&&this.getAttribute('src').includes('/')){this.dataset.fallbackTried='1';this.src=this.getAttribute('src').split('/').pop();}">
      <video class="wc-preview-video" data-src="${w.src}" data-start="${ps}" data-end="${pe}" muted loop playsinline preload="none" disablepictureinpicture controlsList="nodownload noplaybackrate"></video>
      ${badge}<div class="wc-overlay"><div class="wc-icon-circle">${playSVG}</div></div>
    </div>`;
  }).join('');

  g.querySelectorAll('.wc').forEach(card=>{
    card.addEventListener('click',()=>{
      const w=list[parseInt(card.dataset.idx)];
      if(w.isPhoto) photoOpen(w.img||'',w.title);
      else if(w.youtubeUrl || w.youtubeEmbed) vpOpenYouTube(w.youtubeUrl || w.youtubeEmbed,w.title,isShortVideo(w),!!w.cleanTopIcon);
      else vpOpen(w.src||'',w.title,isShortVideo(w),card.querySelector('.wc-video-thumb')?.src||'',!!w.cleanTopIcon);
    });
  });

  generateVideoThumbnails(g);
  initMovingPreviews(g);
  setTimeout(()=>document.querySelectorAll('.wc.rv:not(.vis)').forEach(el=>obs.observe(el)),40);
}

const DEFAULT_WORK_CATEGORY='youtube';
function preloadCategoryAssets(cat){



  if(cat==='thumbnail'){
    preloadPortfolioThumbnailsNow();
    return;
  }
  const categoryItems=(cat==='all'?works:works.filter(w=>getCats(w).includes(cat)));
  const items=orderWorkList(categoryItems,cat).slice(0, isMobilePortfolioView()?mobilePortfolioLimit(cat):24);
  items.forEach((w,i)=>{
    const src=w.isPhoto?(w.img||''):(w.thumb||'');
    if(!src)return;
    const candidates=w.isPhoto?imageCandidates(src):[src];
    const img=new Image();
    img.decoding='async';
    img.loading=i<6?'eager':'lazy';
    img.fetchPriority=i<6?'high':'auto';
    img.src=cacheBustAsset(candidates[0]||src);
  });
}
function filterWork(cat,el){
  document.querySelectorAll('.cat-tab').forEach(c=>c.classList.remove('on'));
  if(el)el.classList.add('on');
  document.querySelectorAll('.wc').forEach(c=>{c.style.opacity='0';c.style.transform='scale(.95)'});
  preloadCategoryAssets(cat);
  const filtered=cat==='all'?works:works.filter(w=>getCats(w).includes(cat));
  setTimeout(()=>renderWork(filtered,cat),cat==='thumbnail'?20:120);
}
preloadCategoryAssets('vlogs');
setTimeout(()=>renderWork(works.filter(w=>getCats(w).includes(DEFAULT_WORK_CATEGORY)),DEFAULT_WORK_CATEGORY),60);
window.addEventListener('resize',(()=>{let t;return()=>{clearTimeout(t);t=setTimeout(()=>{const g=document.getElementById('work-grid');const cat=(g&&g.dataset.cat)||DEFAULT_WORK_CATEGORY;renderWork(cat==='all'?works:works.filter(w=>getCats(w).includes(cat)),cat);},180)}})());

 
let thumbObserver=null;
const thumbQueue=[];
let thumbsWorking=0;
const THUMB_MAX_WORKERS=2;

function generateVideoThumbnails(root){
  if(thumbObserver)thumbObserver.disconnect();
  thumbQueue.length=0;
  thumbsWorking=0;

  const imgs=Array.from((root||document).querySelectorAll('.wc-video-thumb[data-video-src]:not([data-explicit-thumb="1"])'));
  if(!imgs.length)return;

  thumbObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        queueVideoThumbnail(entry.target);
        thumbObserver.unobserve(entry.target);
      }
    });
  },{root:null,rootMargin:'700px 0px',threshold:.01});

  imgs.forEach(img=>thumbObserver.observe(img));
}

function queueVideoThumbnail(img){
  if(!img||img.dataset.thumbDone==='1'||thumbQueue.includes(img))return;
  thumbQueue.push(img);
  runThumbQueue();
}

function runThumbQueue(){
  while(thumbsWorking<THUMB_MAX_WORKERS&&thumbQueue.length){
    const img=thumbQueue.shift();
    if(img&&img.isConnected)captureVideoThumbnail(img);
  }
}

function captureVideoThumbnail(img){
  const src=img.dataset.videoSrc;
  const card=img.closest('.wc');
  if(!src){runThumbQueue();return;}

  thumbsWorking++;
  img.dataset.thumbDone='1';
  if(card)card.classList.add('thumb-loading');

  const v=document.createElement('video');
  const candidates=getVideoCandidates(src);
  let candidateIndex=0;
  v.muted=true;
  v.playsInline=true;
  v.preload='metadata';
  function loadCandidate(){
    v.src=candidates[candidateIndex]||src;
    try{v.load()}catch(e){}
  }
  loadCandidate();

  const min=Number(img.dataset.thumbTimeMin||2);
  const max=Number(img.dataset.thumbTimeMax||5);
  const wanted=min+Math.random()*(max-min);
  let finished=false;

  function finish(ok){
    if(finished)return;
    finished=true;
    v.pause();
    v.removeAttribute('src');
    try{v.load()}catch(e){}
    thumbsWorking=Math.max(0,thumbsWorking-1);
    if(card){
      card.classList.remove('thumb-loading');
      if(ok){
        card.classList.add('has-thumb');
        const ph=card.querySelector('.wc-placeholder');
        if(ph)ph.classList.add('loaded');
      }
    }
    runThumbQueue();
  }

  v.addEventListener('loadedmetadata',()=>{
    const dur=Number.isFinite(v.duration)?v.duration:0;
    const safeTime=dur?Math.min(Math.max(.15,wanted),Math.max(.2,dur-.25)):wanted;
    try{v.currentTime=safeTime}catch(e){finish(false)}
  },{once:true});

  v.addEventListener('seeked',()=>{
    try{
      const canvas=document.createElement('canvas');
      const vw=v.videoWidth||1280;
      const vh=v.videoHeight||720;
      canvas.width=vw;
      canvas.height=vh;
      const ctx=canvas.getContext('2d');
      ctx.drawImage(v,0,0,vw,vh);
      img.src=canvas.toDataURL('image/jpeg',.72);
      finish(true);
    }catch(e){
      finish(false);
    }
  },{once:true});

  v.addEventListener('error',()=>{
    if(candidateIndex<candidates.length-1){
      candidateIndex++;
      loadCandidate();
    }else{
      finish(false);
    }
  });
  setTimeout(()=>finish(false),8000);
}

 
let movingPreviewActive=new Set();
const MOVING_PREVIEW_MAX_ACTIVE=2;

function initMovingPreviews(root){
  movingPreviewActive.forEach(v=>stopMovingPreview(v,true));
  movingPreviewActive.clear();

  const cards=Array.from((root||document).querySelectorAll('.wc.is-video'));
  cards.forEach(card=>{
    const v=card.querySelector('.wc-preview-video');
    if(!v)return;
    card.addEventListener('mouseenter',()=>startMovingPreview(v),{passive:true});
    if(!card.classList.contains('autoplay-preview')){
      card.addEventListener('mouseleave',()=>stopMovingPreview(v,true),{passive:true});
    }
    card.addEventListener('touchstart',()=>startMovingPreview(v),{passive:true});

    if(card.classList.contains('autoplay-preview')){
      startMovingPreview(v);
    }
  });
}

function queueMovingPreview(v){
  if(v)startMovingPreview(v);
}

function startMovingPreview(videoEl){
  const card=videoEl.closest('.wc'),src=videoEl.dataset.src;
  const candidates=getVideoCandidates(src);
  let candidateIndex=Number(videoEl.dataset.candidateIndex||0);
  if(!src||movingPreviewActive.has(videoEl))return;

  while(movingPreviewActive.size>=MOVING_PREVIEW_MAX_ACTIVE){
    const old=movingPreviewActive.values().next().value;
    stopMovingPreview(old,true);
  }

  movingPreviewActive.add(videoEl);
  if(card)card.classList.add('preview-loading');

  const startAt=Number(videoEl.dataset.start||2),endAt=Number(videoEl.dataset.end||5);
  let shown=false;
  let playAttempted=false;

  videoEl.muted=true;
  videoEl.loop=true;
  videoEl.playsInline=true;
  videoEl.preload='metadata';

  function showMoving(){
    if(shown)return;
    shown=true;
    if(card){
      card.classList.add('has-moving-thumb');
      card.classList.remove('preview-loading');
    }
  }
  function seekToStart(){
    try{
      const dur=Number.isFinite(videoEl.duration)?videoEl.duration:0;
      const safeStart=dur?Math.min(startAt,Math.max(0,dur-.4)):startAt;
      if(Math.abs(videoEl.currentTime-safeStart)>.25)videoEl.currentTime=safeStart;
    }catch(e){}
  }
  function playPreview(){
    if(playAttempted)return;
    playAttempted=true;
    seekToStart();
    const p=videoEl.play();
    if(p&&p.then)p.then(showMoving).catch(()=>{playAttempted=false; if(card)card.classList.remove('preview-loading')});
    else showMoving();
  }

  videoEl.onloadedmetadata=()=>seekToStart();
  videoEl.onloadeddata=playPreview;
  videoEl.oncanplay=null;
  videoEl.ontimeupdate=()=>{
    if(!videoEl.duration)return;
    const safeEnd=Math.min(endAt,Math.max(.6,videoEl.duration-.15));
    if(videoEl.currentTime>=safeEnd){
      try{videoEl.currentTime=Math.min(startAt,safeEnd-.1)}catch(e){}
    }
  };
  videoEl.onerror=()=>{
    playAttempted=false;
    if(candidateIndex<candidates.length-1){
      candidateIndex++;
      videoEl.dataset.candidateIndex=String(candidateIndex);
      videoEl.src=candidates[candidateIndex];
      try{videoEl.load()}catch(e){}
    }else if(card){
      card.classList.remove('preview-loading');
      card.classList.remove('has-moving-thumb');
    }
  };

  if(!videoEl.getAttribute('src')){
    videoEl.src=candidates[candidateIndex]||src;
    videoEl.load();
  } else if(videoEl.readyState >= 2) {
    playPreview();
  }
}

function stopMovingPreview(videoEl,unload){
  if(!videoEl)return;
  if(movingPreviewActive.has(videoEl))movingPreviewActive.delete(videoEl);
  const card=videoEl.closest('.wc');
  videoEl.pause();
  if(card){card.classList.remove('has-moving-thumb');card.classList.remove('preview-loading')}
  if(unload){videoEl.removeAttribute('src');try{videoEl.load()}catch(e){}}
}

document.addEventListener('visibilitychange',()=>{
  if(document.hidden)document.querySelectorAll('.wc-preview-video').forEach(v=>stopMovingPreview(v,true));
});

 
const vpEl=document.getElementById('vp-wrap'),video=document.getElementById('vp-video');
const vpScreen=document.getElementById('vp-screen'),vpControls=document.getElementById('vp-controls');
const vpPlayImg=document.getElementById('vp-play-img'),vpVolImg=document.getElementById('vp-vol-img'),vpFsImg=document.getElementById('vp-fs-img');
const vpBigplay=document.getElementById('vp-bigplay'),vpBigplayImg=document.getElementById('vp-bigplay-img');
const vpProg=document.getElementById('vp-prog'),vpThumb=document.getElementById('vp-thumb'),vpBuf=document.getElementById('vp-buf'),vpTime=document.getElementById('vp-time');

function hardStopVideoPlayer(){
  try{
    if(window.__cnhHls){
      window.__cnhHls.destroy();
      window.__cnhHls = null;
    }
  }catch(e){}
  try{
    const embedFrame=document.getElementById('vp-embed-iframe');
    if(embedFrame){
      embedFrame.removeAttribute('src');
      embedFrame.style.display='none';
    }
    if(vpEl)vpEl.classList.remove('youtube-active','embed-active');
  }catch(e){}
  try{
    if(video){
      video.pause();
      video.removeAttribute('src');
      video.removeAttribute('poster');
      video.removeAttribute('data-is-hls');
      video.load();
      video.currentTime = 0;
      if(vpScreen) vpScreen.classList.remove('clean-top-source-icon');
    }
  }catch(e){}
  try{
    document.querySelectorAll('.wc-preview-video').forEach(v=>{
      v.pause();
      v.removeAttribute('src');
      v.load();
      const c=v.closest('.wc');
      if(c)c.classList.remove('has-moving-thumb','preview-loading');
    });
  }catch(e){}
}
let vpIsFS=false;

 
let __vpLockedScrollY = 0;

function lockPageForVideo(){
  window.__videoSavedScrollY = window.scrollY || document.documentElement.scrollTop || 0;
  document.documentElement.classList.add('video-modal-locked');
  document.body.classList.add('video-modal-locked');
  document.body.style.overflow='hidden';
}

function unlockPageForVideo(){
  document.documentElement.classList.remove('video-modal-locked');
  document.body.classList.remove('video-modal-locked');
  document.body.style.overflow='';
  requestAnimationFrame(function(){ window.scrollTo(0, window.__videoSavedScrollY || 0); });
}


function cnhNormalizeYouTubeEmbedSrc(input){
  const raw = String(input || '').trim().replace(/&amp;/g, '&');
  if(!raw) return '';

  function withEmbedParams(base){
    try{
      const u = new URL(base, window.location.href);
      if(!u.searchParams.has('autoplay')) u.searchParams.set('autoplay','1');
      if(!u.searchParams.has('rel')) u.searchParams.set('rel','0');
      if(!u.searchParams.has('playsinline')) u.searchParams.set('playsinline','1');
      if(!u.searchParams.has('modestbranding')) u.searchParams.set('modestbranding','1');
      return u.toString();
    }catch(e){
      return base;
    }
  }

  try{
    const u = new URL(raw, window.location.href);
    const host = u.hostname.replace(/^www\./,'').toLowerCase();
    const parts = u.pathname.split('/').filter(Boolean);
    let id = '';

    if(host === 'youtu.be'){
      id = parts[0] || '';
    }else if(host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')){
      if(parts[0] === 'embed') return withEmbedParams(raw);
      if(parts[0] === 'shorts') id = parts[1] || '';
      if(!id) id = u.searchParams.get('v') || '';
    }

    if(id){
      return 'https://www.youtube.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0&playsinline=1&modestbranding=1';
    }
  }catch(err){
    const match = raw.match(/(?:youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/embed\/|[?&]v=)([A-Za-z0-9_-]{6,})/i);
    if(match && match[1]){
      return 'https://www.youtube.com/embed/' + encodeURIComponent(match[1]) + '?autoplay=1&rel=0&playsinline=1&modestbranding=1';
    }
  }

  return raw;
}

function vpOpenYouTube(embedSrc,title,isPortrait,cleanTopIcon){
  lockPageForVideo(); hardStopVideoPlayer();
  document.querySelectorAll('.wc-preview-video').forEach(v=>v.pause());
  if(isPortrait){vpScreen.className='vp-screen portrait';vpControls.className='vp-controls portrait'}
  else{vpScreen.className='vp-screen landscape';vpControls.className='vp-controls landscape'}
  vpScreen.classList.toggle('clean-top-source-icon', !!cleanTopIcon);

  const frame=document.getElementById('vp-embed-iframe');
  const cleanSrc=cnhNormalizeYouTubeEmbedSrc(embedSrc);
  document.getElementById('vp-placeholder').style.display=cleanSrc?'none':'flex';
  video.style.display='none';
  if(frame){
    frame.title=title || 'YouTube video';
    frame.src=cleanSrc;
    frame.style.display=cleanSrc?'block':'none';
  }

  vpEl.classList.add('open','youtube-active');
  vpUpdatePlay(false);
}

window.cnhNormalizeYouTubeEmbedSrc = cnhNormalizeYouTubeEmbedSrc;
window.vpOpenYouTube = vpOpenYouTube;

function vpOpen(src,title,isPortrait,poster,cleanTopIcon){
  lockPageForVideo(); hardStopVideoPlayer();
  document.querySelectorAll('.wc-preview-video').forEach(v=>v.pause());
  if(isPortrait){vpScreen.className='vp-screen portrait';vpControls.className='vp-controls portrait'}
  else{vpScreen.className='vp-screen landscape';vpControls.className='vp-controls landscape'}
  vpScreen.classList.toggle('clean-top-source-icon', !!cleanTopIcon);
  const cleanSrc=String(src||'').trim();
  const isHls=/\.m3u8(\?|$)/i.test(cleanSrc);
  video.poster=poster||'';
  video.dataset.isHls=isHls?'1':'0';
  document.getElementById('vp-placeholder').style.display=cleanSrc?'none':'flex';
  video.style.display=cleanSrc?'block':'none';

  if(cleanSrc){
    if(isHls){
      video.dataset.candidates='[]';
      video.dataset.candidateIndex='0';
      if(video.canPlayType('application/vnd.apple.mpegurl')){
        video.src=cleanSrc;
        video.load();
        video.play().catch(()=>{});
      }else if(window.Hls && Hls.isSupported()){
        window.__cnhHls = new Hls({
          enableWorker:true,
          lowLatencyMode:false,
          startLevel:-1,
          capLevelToPlayerSize:true,
          maxBufferLength:20,
          maxMaxBufferLength:40,
          backBufferLength:20,
          abrEwmaDefaultEstimate:2500000
        });
        window.__cnhHls.loadSource(cleanSrc);
        window.__cnhHls.attachMedia(video);
        window.__cnhHls.on(Hls.Events.MANIFEST_PARSED,()=>video.play().catch(()=>{}));
        window.__cnhHls.on(Hls.Events.ERROR,(event,data)=>{
          if(data && data.fatal){
            try{window.__cnhHls.destroy();window.__cnhHls=null;}catch(e){}
            video.src=cleanSrc;
            video.load();
            video.play().catch(()=>{});
          }
        });
      }else{
        video.src=cleanSrc;
        video.load();
        video.play().catch(()=>{});
      }
    }else{
      const candidates=getVideoCandidates(cleanSrc);
      video.src=candidates[0]||'';
      video.dataset.candidates=JSON.stringify(candidates);
      video.dataset.candidateIndex='0';
      video.load();
      video.play().catch(()=>{});
    }
  }
  vpEl.classList.add('open');
  vpUpdatePlay(cleanSrc?!video.paused:false);
}
function vpClose(){
  hardStopVideoPlayer();
  if(vpEl)vpEl.classList.remove('open','is-fullscreen');
  document.body.style.overflow='';
  unlockPageForVideo();
}
function vpTogglePlay(){if(!video.src)return;if(video.paused){video.play();vpShowBig('assets/images/play-buttton.png')}else{video.pause();vpShowBig('assets/images/pause.png')}}
function vpUpdatePlay(p){vpPlayImg.src=p?'assets/images/pause.png':'assets/images/play-buttton.png'}
function vpShowBig(s){vpBigplayImg.src=s;vpBigplay.classList.add('show');clearTimeout(vpBigplay._t);vpBigplay._t=setTimeout(()=>vpBigplay.classList.remove('show'),700)}
video.addEventListener('play',()=>vpUpdatePlay(true));
video.addEventListener('pause',()=>vpUpdatePlay(false));
video.addEventListener('timeupdate',()=>{
  if(!video.duration)return;
  const p=(video.currentTime/video.duration)*100;
  vpProg.style.width=p+'%';vpThumb.style.left=p+'%';
  vpTime.textContent=fmt(video.currentTime)+' / '+fmt(video.duration);
  if(video.buffered.length)vpBuf.style.width=(video.buffered.end(video.buffered.length-1)/video.duration*100)+'%';
});
video.addEventListener('ended',()=>vpUpdatePlay(false));
video.addEventListener('error',()=>{
  if(video.dataset.isHls==='1') return;
  let candidates=[];
  try{candidates=JSON.parse(video.dataset.candidates||'[]')}catch(e){}
  let idx=Number(video.dataset.candidateIndex||0);
  if(idx<candidates.length-1){
    idx++;
    video.dataset.candidateIndex=String(idx);
    video.src=candidates[idx];
    video.load();
    video.play().catch(()=>{});
  }
});
function vpToggleMute(){video.muted=!video.muted;vpVolImg.src=video.muted?'assets/images/volume-mute.png':'assets/images/volume.png';document.getElementById('vp-vol').value=video.muted?0:video.volume}
function vpSetVol(v){video.volume=v;video.muted=v==0;vpVolImg.src=v==0?'assets/images/volume-mute.png':'assets/images/volume.png'}
function requestFullscreenSafe(target){
  if(!target)return Promise.reject(new Error('No fullscreen target'));
  const req=target.requestFullscreen||target.webkitRequestFullscreen||target.mozRequestFullScreen||target.msRequestFullscreen;
  if(req){
    try{
      const result=req.call(target);
      return result&&typeof result.then==='function'?result:Promise.resolve();
    }catch(e){return Promise.reject(e)}
  }
  return Promise.reject(new Error('Fullscreen API unavailable'));
}
function exitFullscreenSafe(){
  const exit=document.exitFullscreen||document.webkitExitFullscreen||document.mozCancelFullScreen||document.msExitFullscreen;
  if(exit){try{return exit.call(document)}catch(e){}}
}
function vpToggleFS(){
  if(!vpEl || !vpEl.classList.contains('open')) return;

  const fsEl=document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement;
  if(!fsEl){
    requestFullscreenSafe(vpEl).then(()=>{
      vpEl.classList.add('is-fullscreen');
      if(vpFsImg)vpFsImg.src='assets/images/unfullscreen.png';
      vpIsFS=true;
    }).catch(()=>{

      if(video && video.webkitEnterFullscreen){
        try{video.webkitEnterFullscreen();vpIsFS=true;if(vpFsImg)vpFsImg.src='assets/images/unfullscreen.png';}catch(e){}
      }else{
        vpEl.classList.add('is-fullscreen');
        if(vpFsImg)vpFsImg.src='assets/images/unfullscreen.png';
        vpIsFS=true;
      }
    });
  }else{
    exitFullscreenSafe();
    vpEl.classList.remove('is-fullscreen');
    if(vpFsImg)vpFsImg.src='assets/images/fullscreen.png';
    vpIsFS=false;
  }
}
['fullscreenchange','webkitfullscreenchange','MSFullscreenChange'].forEach(ev=>document.addEventListener(ev,()=>{
  const fsTarget=document.fullscreenElement||document.webkitFullscreenElement||document.msFullscreenElement;
  const fs=!!fsTarget;



  if(fsTarget===vpEl && (!vpEl || !vpEl.classList.contains('open'))){
    const exit=document.exitFullscreen||document.webkitExitFullscreen||document.msExitFullscreen;
    if(exit)exit.call(document);
    return;
  }

  if(vpEl){
    vpEl.classList.toggle('is-fullscreen',fs && fsTarget===vpEl);
  }
  if(vpFsImg)vpFsImg.src=(fs && fsTarget===vpEl)?'assets/images/unfullscreen.png':'assets/images/fullscreen.png';
  vpIsFS=fs && fsTarget===vpEl;
}));
vpScreen.addEventListener('click',e=>{if(e.target.closest('.vp-btn'))return;vpTogglePlay()});
const tl=document.getElementById('vp-tl');let scrubbing=false;
function scrubTo(e){if(!video.duration)return;const r=tl.getBoundingClientRect(),p=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));video.currentTime=p*video.duration;vpProg.style.width=(p*100)+'%';vpThumb.style.left=(p*100)+'%'}
tl.addEventListener('mousedown',e=>{scrubbing=true;scrubTo(e)});
window.addEventListener('mousemove',e=>{if(scrubbing)scrubTo(e)});
window.addEventListener('mouseup',()=>scrubbing=false);
vpEl.addEventListener('click',e=>{if(e.target===vpEl)vpClose()});
window.addEventListener('keydown',e=>{
  if(vpEl.classList.contains('open')){
    if(e.code==='Space'){e.preventDefault();vpTogglePlay()}
    if(e.code==='Escape')vpClose();
    if(e.code==='KeyM')vpToggleMute();
    if(e.code==='KeyF')vpToggleFS();
    if(e.code==='ArrowRight'&&video.src)video.currentTime=Math.min(video.duration,video.currentTime+5);
    if(e.code==='ArrowLeft'&&video.src)video.currentTime=Math.max(0,video.currentTime-5);
  }
});
function fmt(s){return Math.floor(s/60)+':'+(Math.floor(s%60)+'').padStart(2,'0')}

 
let photoLoadRequestId=0;
let photoCloseTimer=0;

function photoSetLoading(isLoading){
  const wrap=document.getElementById('photo-lb-wrap');
  const img=document.getElementById('photo-lb-img');
  if(wrap)wrap.classList.toggle('is-loading',!!isLoading);
  if(img)img.classList.toggle('is-loading',!!isLoading);
}

function photoOpen(src,title){
  const img=document.getElementById('photo-lb-img');
  const lb=document.getElementById('photo-lb');
  const wrap=document.getElementById('photo-lb-wrap');
  if(!img||!lb||!wrap)return;

  clearTimeout(photoCloseTimer);
  const requestId=++photoLoadRequestId;
  const candidates=imageCandidates(src).map(cacheBustAsset).filter(Boolean);



  lb.classList.remove('photo-visual-fullscreen');
  img.alt=title||'Thumbnail preview';
  img.onload=null;
  img.onerror=null;
  img.removeAttribute('src');
  img.dataset.candidates=JSON.stringify(candidates);
  img.dataset.candidateIndex='0';
  photoSetLoading(true);
  lb.classList.add('open');
  document.body.style.overflow='hidden';

  let candidateIndex=0;
  const tryCandidate=()=>{
    if(requestId!==photoLoadRequestId||!lb.classList.contains('open'))return;

    const candidate=candidates[candidateIndex];
    if(!candidate){
      photoSetLoading(false);
      wrap.classList.add('load-failed');
      return;
    }

    wrap.classList.remove('load-failed');
    img.dataset.candidateIndex=String(candidateIndex);
    img.onload=async()=>{
      if(requestId!==photoLoadRequestId)return;
      try{if(img.decode)await img.decode()}catch(e){}
      if(requestId!==photoLoadRequestId)return;
      requestAnimationFrame(()=>{
        if(requestId!==photoLoadRequestId)return;
        photoSetLoading(false);
      });
    };
    img.onerror=()=>{
      if(requestId!==photoLoadRequestId)return;
      candidateIndex+=1;
      tryCandidate();
    };
    img.src=candidate;
  };

  tryCandidate();
}

function photoClose(){
  const lb=document.getElementById('photo-lb');
  const img=document.getElementById('photo-lb-img');
  const wrap=document.getElementById('photo-lb-wrap');
  photoLoadRequestId+=1;
  if(lb)lb.classList.remove('open','photo-visual-fullscreen');
  document.body.style.overflow='';

  clearTimeout(photoCloseTimer);
  photoCloseTimer=setTimeout(()=>{
    if(lb&&lb.classList.contains('open'))return;
    if(img){
      img.onload=null;
      img.onerror=null;
      img.removeAttribute('src');
      img.classList.remove('is-loading');
    }
    if(wrap)wrap.classList.remove('is-loading','load-failed');
  },380);
}

function photoFullscreen(){
  const lb=document.getElementById('photo-lb');
  if(!lb||!lb.classList.contains('open'))return;
  const target=document.getElementById('photo-lb-wrap')||lb;
  requestFullscreenSafe(target).catch(()=>{

    lb.classList.add('photo-visual-fullscreen');
  });
}

document.getElementById('photo-lb').addEventListener('click',e=>{
  if(e.target===document.getElementById('photo-lb'))photoClose();
});
window.addEventListener('keydown',e=>{
  const lb=document.getElementById('photo-lb');
  if(lb&&lb.classList.contains('open')){
    if(e.code==='Escape')photoClose();
    if(e.code==='KeyF')photoFullscreen();
  }
});

 
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}}),{threshold:.07});
document.querySelectorAll('.rv,.rv-scale').forEach(el=>obs.observe(el));
const workGridEl=document.getElementById('work-grid');
if(workGridEl)new MutationObserver(()=>document.querySelectorAll('.rv:not(.vis)').forEach(el=>obs.observe(el))).observe(workGridEl,{childList:true});

window.addEventListener('load',()=>document.body.style.overflow='visible');

 
(function(){
  function spinOrbit(){
    const ring = document.querySelector('.orbit-ring');
    if(!ring) return;
    let angle = 0;
    function frame(){
      angle = (angle + 0.08) % 360;
      ring.style.transform = 'rotate(' + angle + 'deg)';
ring.style.display = 'block';
ring.style.opacity = '1';
ring.style.visibility = 'visible';
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', spinOrbit);
  } else {
    spinOrbit();
  }
})();

(function(){
  function releaseIntro(){
    if(document.body){
      document.body.style.opacity='1';
      document.body.style.visibility='visible';
      document.body.style.overflowX='hidden';
    }
    document.querySelectorAll('.site-fade-cover').forEach(function(el){
      el.classList.add('site-cover-hide');
      setTimeout(function(){ if(el && el.parentNode){ el.parentNode.removeChild(el); } }, 650);
    });
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ setTimeout(releaseIntro, 450); });
  } else {
    setTimeout(releaseIntro, 450);
  }
  window.addEventListener('load', function(){ setTimeout(releaseIntro, 350); });
  setTimeout(releaseIntro, 1800);
})();

(function(){
  const HOME_SCROLL_KEY = 'cnh_home_scroll_y';
  const HOME_TIME_KEY = 'cnh_home_scroll_time';

  function saveHomeSpot(){
    try{
      sessionStorage.setItem(HOME_SCROLL_KEY, String(window.scrollY || document.documentElement.scrollTop || 0));
      sessionStorage.setItem(HOME_TIME_KEY, String(Date.now()));
    }catch(e){}
  }


  document.addEventListener('click', function(e){
    const link = e.target.closest('a[href]');
    if(!link) return;
    const href = link.getAttribute('href') || '';
    if(href === '/contact' || href === 'contact' || href === './contact' || href.includes('/contact') ||
       href === '/joinus' || href === 'joinus' || href === './joinus' || href.includes('/joinus')){
      saveHomeSpot();
    }
  }, true);


  let ticking = false;
  window.addEventListener('scroll', function(){
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(function(){
      saveHomeSpot();
      ticking = false;
    });
  }, {passive:true});


  window.addEventListener('pageshow', function(){
    let y = 0;
    let age = 999999999;
    try{
      y = parseInt(sessionStorage.getItem(HOME_SCROLL_KEY) || '0', 10);
      age = Date.now() - parseInt(sessionStorage.getItem(HOME_TIME_KEY) || '0', 10);
    }catch(e){}
    if(y > 20 && age < 1000 * 60 * 60){
      if('scrollRestoration' in history) history.scrollRestoration = 'manual';
      requestAnimationFrame(function(){
        window.scrollTo(0, y);
        setTimeout(function(){ window.scrollTo(0, y); }, 80);
        setTimeout(function(){ window.scrollTo(0, y); }, 350);
      });
    }
  });
})();

(function installVideoCloseHandlers(){
  function ready(){
    const wrap = document.getElementById('vp-wrap');
    const closeBtn = document.getElementById('vp-close') || document.querySelector('.vp-close');
    if(!wrap)return;

    if(closeBtn && !closeBtn.dataset.closeBound){
      closeBtn.dataset.closeBound='1';
      closeBtn.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        vpClose();
      });
    }

    if(!wrap.dataset.outsideCloseBound){
      wrap.dataset.outsideCloseBound='1';
      wrap.addEventListener('click', function(e){
        const clickedInsidePlayer = e.target.closest('.vp-screen') || e.target.closest('.vp-controls');
        const clickedClose = e.target.closest('.vp-close');
        if(clickedClose)return;
        if(!clickedInsidePlayer){
          vpClose();
        }
      });
    }

    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && wrap.classList.contains('open')){
        vpClose();
      }
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();

(function installUniversalOutsideVideoClose(){
  function isVideoOpen(){
    const wrap = document.getElementById('vp-wrap');
    return wrap && wrap.classList.contains('open');
  }

  function clickedInsideVideoUI(target){
    return !!(
      target.closest('.vp-screen') ||
      target.closest('.vp-controls') ||
      target.closest('.vp-close')
    );
  }

  function handleOutsideVideoPointer(e){
    if(!isVideoOpen())return;
    if(clickedInsideVideoUI(e.target))return;

    e.preventDefault();
    e.stopPropagation();
    if(typeof vpClose === 'function') vpClose();
  }


  document.addEventListener('pointerdown', handleOutsideVideoPointer, true);
  document.addEventListener('mousedown', handleOutsideVideoPointer, true);
  document.addEventListener('touchstart', handleOutsideVideoPointer, true);
  document.addEventListener('click', handleOutsideVideoPointer, true);
})();

(function(){
  let lockedY = 0;

  function getVideoEls(){
    return {
      wrap: document.getElementById('vp-wrap'),
      video: document.getElementById('vp-video'),
      close: document.getElementById('vp-close') || document.querySelector('.vp-close')
    };
  }

  window.lockPageForVideo = function(){
    try{
      lockedY = window.scrollY || document.documentElement.scrollTop || 0;
      document.documentElement.classList.add('video-modal-locked');
      document.body.classList.add('video-modal-locked');
      document.body.style.overflow = 'hidden';
    }catch(e){}
  };

  window.unlockPageForVideo = function(){
    try{
      document.documentElement.classList.remove('video-modal-locked');
      document.body.classList.remove('video-modal-locked');
      document.body.style.overflow = '';
      window.scrollTo(0, lockedY || 0);
    }catch(e){}
  };

  window.hardStopVideoPlayer = function(){
    const els = getVideoEls();
    try{
      const frame=document.getElementById('vp-embed-iframe');
      if(frame){
        frame.removeAttribute('src');
        frame.style.display='none';
      }
      if(els.wrap) els.wrap.classList.remove('youtube-active','embed-active');
    }catch(e){}
    try{
      if(els.video){
        els.video.pause();
        els.video.removeAttribute('src');
        els.video.load();
      }
    }catch(e){}
    try{
      document.querySelectorAll('.wc-preview-video').forEach(function(v){
        v.pause();
        v.removeAttribute('src');
        v.load();
        const card = v.closest('.wc');
        if(card) card.classList.remove('has-moving-thumb','preview-loading');
      });
    }catch(e){}
  };

  window.vpClose = function(e){
    if(e){
      e.preventDefault();
      e.stopPropagation();
    }
    const els = getVideoEls();
    hardStopVideoPlayer();
    if(els.wrap){
      els.wrap.classList.remove('open','is-fullscreen');
    }
    unlockPageForVideo();
  };

  function isOpen(){
    const wrap = document.getElementById('vp-wrap');
    return wrap && wrap.classList.contains('open');
  }

  function isInsideVideoUI(target){
    return !!(
      target.closest('.vp-screen') ||
      target.closest('.vp-controls') ||
      target.closest('.vp-close')
    );
  }

  function closeFromOutside(e){
    if(!isOpen()) return;
    if(isInsideVideoUI(e.target)) return;
    e.preventDefault();
    e.stopPropagation();
    window.vpClose(e);
  }

  function bindFinalVideoClose(){
    const els = getVideoEls();
    if(els.close && !els.close.dataset.finalCloseBound){
      els.close.dataset.finalCloseBound = '1';
      els.close.addEventListener('click', window.vpClose, true);
      els.close.addEventListener('pointerdown', function(e){ e.stopPropagation(); }, true);
      els.close.addEventListener('touchstart', function(e){ e.stopPropagation(); }, true);
    }

    if(!document.documentElement.dataset.finalOutsideCloseBound){
      document.documentElement.dataset.finalOutsideCloseBound = '1';
      document.addEventListener('pointerdown', closeFromOutside, true);
      document.addEventListener('mousedown', closeFromOutside, true);
      document.addEventListener('touchstart', closeFromOutside, true);
      document.addEventListener('click', closeFromOutside, true);
      document.addEventListener('keydown', function(e){
        if(e.key === 'Escape' && isOpen()) window.vpClose(e);
      }, true);
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bindFinalVideoClose);
  }else{
    bindFinalVideoClose();
  }
})();

(function(){
  let savedScrollY = 0;

  window.lockPageForVideo = function(){
    savedScrollY = window.scrollY || document.documentElement.scrollTop || 0;
    document.documentElement.classList.add('video-modal-locked');
    document.body.classList.add('video-modal-locked');
    document.body.style.overflow = 'hidden';
  };

  window.unlockPageForVideo = function(){
    document.documentElement.classList.remove('video-modal-locked');
    document.body.classList.remove('video-modal-locked');
    document.body.style.overflow = '';
    requestAnimationFrame(function(){
      window.scrollTo(0, savedScrollY || 0);
    });
  };
})();

(function(){
  let savedY = 0;

  function wrap(){ return document.getElementById('vp-wrap'); }
  function vid(){ return document.getElementById('vp-video'); }
  function isOpen(){ const w = wrap(); return !!(w && w.classList.contains('open')); }
  function insideVideoUI(target){
    return !!(target.closest('.vp-screen') || target.closest('.vp-controls') || target.closest('.vp-close'));
  }

  window.lockPageForVideo = function(){
    savedY = window.scrollY || document.documentElement.scrollTop || 0;
    document.documentElement.classList.add('video-modal-locked');
    document.body.classList.add('video-modal-locked');
  };

  window.unlockPageForVideo = function(){
    document.documentElement.classList.remove('video-modal-locked');
    document.body.classList.remove('video-modal-locked');
    requestAnimationFrame(function(){
      window.scrollTo(0, savedY || 0);
    });
  };

  window.hardStopVideoPlayer = function(){
    try{
      const frame=document.getElementById('vp-embed-iframe');
      if(frame){
        frame.removeAttribute('src');
        frame.style.display='none';
      }
      const w = wrap();
      if(w) w.classList.remove('youtube-active','embed-active');
    }catch(e){}
    try{
      const v = vid();
      if(v){
        v.pause();
        v.removeAttribute('src');
        v.load();
      }
    }catch(e){}
    try{
      document.querySelectorAll('.wc-preview-video').forEach(function(v){
        v.pause();
        v.removeAttribute('src');
        v.load();
        const card = v.closest('.wc');
        if(card) card.classList.remove('has-moving-thumb','preview-loading');
      });
    }catch(e){}
  };

  window.vpClose = function(e){
    if(e){
      e.preventDefault();
      e.stopPropagation();
    }
    hardStopVideoPlayer();
    const w = wrap();
    if(w) w.classList.remove('open','is-fullscreen');
    unlockPageForVideo();
  };

  function blockScrollWhileVideoOpen(e){
    if(!isOpen()) return;
    if(e.target.closest('.vp-controls')) return;
    e.preventDefault();
  }

  function closeWhenOutside(e){
    if(!isOpen()) return;
    if(insideVideoUI(e.target)) return;
    e.preventDefault();
    e.stopPropagation();
    window.vpClose(e);
  }

  function bind(){
    const closeBtn = document.getElementById('vp-close') || document.querySelector('.vp-close');
    if(closeBtn && !closeBtn.dataset.finalNoJumpBound){
      closeBtn.dataset.finalNoJumpBound = '1';
      closeBtn.addEventListener('click', window.vpClose, true);
      closeBtn.addEventListener('pointerdown', function(e){ e.stopPropagation(); }, true);
      closeBtn.addEventListener('touchstart', function(e){ e.stopPropagation(); }, true);
    }

    if(!document.documentElement.dataset.finalNoJumpVideoBound){
      document.documentElement.dataset.finalNoJumpVideoBound = '1';
      document.addEventListener('wheel', blockScrollWhileVideoOpen, {capture:true, passive:false});
      document.addEventListener('touchmove', blockScrollWhileVideoOpen, {capture:true, passive:false});
      document.addEventListener('keydown', function(e){
        if(!isOpen()) return;
        const blocked = ['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '];
        if(blocked.includes(e.key)) e.preventDefault();
        if(e.key === 'Escape') window.vpClose(e);
      }, true);

      document.addEventListener('pointerdown', closeWhenOutside, true);
      document.addEventListener('mousedown', closeWhenOutside, true);
      document.addEventListener('touchstart', closeWhenOutside, true);
      document.addEventListener('click', closeWhenOutside, true);
    }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})();

(function(){
  const ROW_SETTINGS = [
    { direction: -1, duration: 315, offset: 0.00 },
    { direction:  1, duration: 392, offset: 0.22 },
    { direction:  1, duration: 459, offset: 0.47 },
    { direction: -1, duration: 600, offset: 0.71 }
  ];

  const START_BOOST = 1.08;
  const FAST_MS = 3000;
  const SLOWDOWN_MS = 3000;

  function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

  function speedMultiplier(elapsed){
    if(elapsed <= FAST_MS) return START_BOOST;
    const t = clamp((elapsed - FAST_MS) / SLOWDOWN_MS, 0, 1);
    const eased = t * t * (3 - 2 * t);
    return START_BOOST + (1 - START_BOOST) * eased;
  }

  function prepareRows(){
    const rows = Array.from(document.querySelectorAll('.hero-grid-row'));
    if(!rows.length){
      requestAnimationFrame(prepareRows);
      return;
    }

    rows.forEach(function(row){
      const original = Array.from(row.children);
      if(!original.length) return;

      const targetCopies = 8;
      const originalCount = original.length;

      while(row.children.length < originalCount * targetCopies){
        original.forEach(function(node){
          const clone = node.cloneNode(true);
          const img = clone.querySelector && clone.querySelector('img');
          if(img){
            img.loading = 'eager';
            img.decoding = 'async';
            img.style.opacity = '1';
            img.style.visibility = 'visible';
          }
          row.appendChild(clone);
        });
      }
    });

    startMovement(rows);
  }

  function startMovement(rows){
    let startTime = null;
    let lastTime = null;

    const offsets = rows.map((row, i) => {
      const cfg = ROW_SETTINGS[i] || ROW_SETTINGS[0];
      const loopWidth = row.scrollWidth / 8 || 1;
      return loopWidth * cfg.offset;
    });

    function frame(now){
      if(startTime === null){
        startTime = now;
        lastTime = now;
      }

      const dt = Math.min(50, now - lastTime) / 1000;
      lastTime = now;

      const elapsed = now - startTime;
      const mult = speedMultiplier(elapsed);

      rows.forEach(function(row, i){
        const cfg = ROW_SETTINGS[i] || ROW_SETTINGS[0];
        const loopWidth = row.scrollWidth / 8;
        if(!loopWidth || loopWidth < 10) return;

        const pxPerSecond = loopWidth / cfg.duration;
        offsets[i] = (offsets[i] + (pxPerSecond * mult * dt)) % loopWidth;

        let x;
        if(cfg.direction < 0){
          x = -offsets[i];
        }else{
          x = -loopWidth + offsets[i];
        }

        row.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
      });

      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', prepareRows);
  }else{
    prepareRows();
  }
})();

(function(){
  const warmCache = new Map();
  const warming = new Map();
  const MAX_METADATA_WARMED = 10;
  const MAX_AUTO_WARMED = 4;

  function normalizeSrc(src){ return String(src || '').trim(); }
  function candidatesFor(src){
    if(typeof window.getVideoCandidates === 'function') return window.getVideoCandidates(src);
    return [src].filter(Boolean);
  }
  function countMode(mode){
    let n = 0;
    warmCache.forEach(item => { if(item && item.mode === mode) n++; });
    return n;
  }
  function trimWarmCache(){
    const items = Array.from(warmCache.entries());
    const autoItems = items.filter(([,v]) => v.mode === 'auto');
    const metaItems = items.filter(([,v]) => v.mode !== 'auto');
    while(autoItems.length > MAX_AUTO_WARMED){
      const [key,item] = autoItems.shift();
      try{ item.video.pause(); item.video.removeAttribute('src'); item.video.load(); item.video.remove(); }catch(e){}
      warmCache.delete(key);
    }
    while(metaItems.length > MAX_METADATA_WARMED){
      const [key,item] = metaItems.shift();
      try{ item.video.pause(); item.video.removeAttribute('src'); item.video.load(); item.video.remove(); }catch(e){}
      warmCache.delete(key);
    }
  }

  function warmVideo(src, mode){
    src = normalizeSrc(src);
    mode = mode === 'auto' ? 'auto' : 'metadata';
    if(!src) return;

    const existing = warmCache.get(src);
    if(existing){
      if(existing.mode === 'auto' || mode === 'metadata') return existing.video;

      existing.mode = 'auto';
      existing.video.preload = 'auto';
      try{ existing.video.fetchPriority = 'high'; }catch(e){}
      try{ existing.video.load(); }catch(e){}
      trimWarmCache();
      return existing.video;
    }
    if(warming.has(src)) return warming.get(src);
    if(mode === 'metadata' && countMode('metadata') >= MAX_METADATA_WARMED) return;
    if(mode === 'auto' && countMode('auto') >= MAX_AUTO_WARMED) trimWarmCache();

    const cands = candidatesFor(src);
    const v = document.createElement('video');
    v.muted = true;
    v.playsInline = true;
    v.preload = mode;
    v.controls = false;
    v.disablePictureInPicture = true;
    v.setAttribute('webkit-playsinline','');
    v.style.cssText = 'position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;left:-9999px;top:-9999px;';
    try{ v.fetchPriority = mode === 'auto' ? 'high' : 'low'; }catch(e){}

    let idx = 0;
    function setCandidate(){
      v.src = cands[idx] || src;
      try{ v.load(); }catch(e){}
    }
    function remember(){
      warming.delete(src);
      warmCache.set(src, { video:v, mode:mode, source:v.currentSrc || v.src, time:Date.now() });
      trimWarmCache();
    }
    function failNext(){
      idx++;
      if(idx < cands.length) setCandidate();
      else{
        warming.delete(src);
        try{ v.remove(); }catch(e){}
      }
    }

    v.addEventListener('loadedmetadata', remember, {once:true});
    v.addEventListener('canplay', remember, {once:true});
    v.addEventListener('error', failNext);
    document.body.appendChild(v);
    warming.set(src, v);
    setCandidate();
    return v;
  }

  function observeVideoCards(root){
    const cards = Array.from((root || document).querySelectorAll('#work-grid .wc.is-video[data-src]'));
    if(!cards.length) return;

    if(window.__cutHireVideoObserver) window.__cutHireVideoObserver.disconnect();
    window.__cutHireVideoObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          const card = entry.target;

          warmVideo(card.dataset.src, 'metadata');
        }
      });
    }, { root:null, rootMargin:'900px 0px', threshold:.01 });

    cards.forEach(function(card){ window.__cutHireVideoObserver.observe(card); });
  }

  const grid = document.getElementById('work-grid');
  if(grid){

    new MutationObserver(function(){ setTimeout(function(){ observeVideoCards(grid); }, 120); }).observe(grid, {childList:true});
    setTimeout(function(){ observeVideoCards(grid); }, 700);


    ['pointerenter','mouseover','touchstart','mousedown','focusin'].forEach(function(ev){
      grid.addEventListener(ev, function(e){
        const card = e.target.closest && e.target.closest('.wc.is-video[data-src]');
        if(card) warmVideo(card.dataset.src, 'auto');
      }, true);
    });
  }

  window.__cutHireWarmVideo = warmVideo;


  window.vpOpen = function(src,title,isPortrait,poster){
    src = normalizeSrc(src);
    if(typeof lockPageForVideo === 'function') lockPageForVideo();
    if(typeof hardStopVideoPlayer === 'function') hardStopVideoPlayer();
    document.querySelectorAll('.wc-preview-video').forEach(function(v){ try{ v.pause(); }catch(e){} });

    if(isPortrait){ vpScreen.className='vp-screen portrait'; vpControls.className='vp-controls portrait'; }
    else{ vpScreen.className='vp-screen landscape'; vpControls.className='vp-controls landscape'; }

    const cands = candidatesFor(src);
    const warm = warmCache.get(src);
    let best = (warm && (warm.video.currentSrc || warm.video.src)) || cands[0] || src;
    const finalCands = [best].concat(cands.filter(function(x){ return x && x !== best; }));

    video.poster = poster || '';
    video.preload = 'auto';
    video.setAttribute('playsinline','');
    video.setAttribute('webkit-playsinline','');
    try{ video.fetchPriority = 'high'; }catch(e){}
    video.dataset.candidates = JSON.stringify(finalCands);
    video.dataset.candidateIndex = '0';
    video.src = finalCands[0] || '';

    const ph = document.getElementById('vp-placeholder');
    if(ph) ph.style.display = src ? 'none' : 'flex';
    video.style.display = src ? 'block' : 'none';
    if(vpEl) vpEl.classList.add('open');

    if(src){
      try{ video.load(); }catch(e){}
      const p = video.play();
      if(p && p.catch) p.catch(function(){});

      warmVideo(src, 'auto');
    }
    if(typeof vpUpdatePlay === 'function') vpUpdatePlay(src ? !video.paused : false);
  };
})();

(function(){
  function setupMobileCategoryArrows(){
    const shell = document.getElementById('mobile-cat-shell');
    const tabs = document.getElementById('cat-tabs');
    const grid = document.getElementById('work-grid');
    const count = document.getElementById('mobile-work-count');
    if(!shell || !tabs) return;

    const left = shell.querySelector('[data-cat-scroll="left"]');
    const right = shell.querySelector('[data-cat-scroll="right"]');

    function updateArrows(){
      const max = Math.max(0, tabs.scrollWidth - tabs.clientWidth - 2);
      const x = tabs.scrollLeft;
      shell.classList.toggle('at-start', x <= 2);
      shell.classList.toggle('at-end', x >= max);
      if(left) left.classList.toggle('is-disabled', x <= 2);
      if(right) right.classList.toggle('is-disabled', x >= max || max <= 2);
    }

    function scrollTabs(dir){
      const amount = Math.max(150, Math.floor(tabs.clientWidth * .72));
      tabs.scrollBy({ left: dir === 'left' ? -amount : amount, behavior:'smooth' });
      setTimeout(updateArrows, 260);
    }

    if(left) left.addEventListener('click', function(){ scrollTabs('left'); });
    if(right) right.addEventListener('click', function(){ scrollTabs('right'); });
    tabs.addEventListener('scroll', updateArrows, {passive:true});
    window.addEventListener('resize', updateArrows);


    function catFromButton(btn){
      const onclick = btn ? String(btn.getAttribute('onclick')||'') : '';
      const match = onclick.match(/filterWork\('([^']+)'/);
      return match ? match[1] : '';
    }
    tabs.addEventListener('touchstart', function(e){
      const btn = e.target.closest('.cat-tab');
      const cat = catFromButton(btn);
      if(cat && typeof preloadCategoryAssets === 'function') preloadCategoryAssets(cat);
    }, {passive:true});
    tabs.addEventListener('click', function(e){
      const btn = e.target.closest('.cat-tab');
      if(!btn) return;
      const cat = catFromButton(btn);
      if(cat && typeof preloadCategoryAssets === 'function') preloadCategoryAssets(cat);
      setTimeout(function(){
        



        if(window.matchMedia && window.matchMedia('(max-width:820px)').matches){
          btn.scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
        }else{
          tabs.scrollLeft = 0;
          const y = window.scrollY || document.documentElement.scrollTop || 0;
          if(window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft){
            window.scrollTo(0, y);
            document.documentElement.scrollLeft = 0;
            document.body.scrollLeft = 0;
          }
        }
        updateMobileWorkCount();
        updateArrows();
      }, 40);
    });

    function updateMobileWorkCount(){
      if(!count || !grid) return;
      if(!window.matchMedia('(max-width:820px)').matches){
        count.textContent = '';
        return;
      }
      const active = tabs.querySelector('.cat-tab.on span');
      const activeBtn = tabs.querySelector('.cat-tab.on');
      const shown = grid.querySelectorAll('.wc').length;
      const label = active ? active.textContent.trim() : '';
      const isThumb = label.toLowerCase().includes('thumbnail');
      const itemWord = isThumb ? 'thumbnails' : 'videos';
      if(active && shown){
        count.textContent = label + ' • ' + shown + ' ' + itemWord;
      }else if(active){
        count.textContent = label;
      }
    }


    window.__cutHireUpdateMobileWorkCount = updateMobileWorkCount;

    if(grid){
      new MutationObserver(function(){
        setTimeout(updateMobileWorkCount, 60);
      }).observe(grid,{childList:true});
    }

    setTimeout(function(){ updateArrows(); updateMobileWorkCount(); }, 120);
    setTimeout(function(){ updateArrows(); updateMobileWorkCount(); }, 700);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', setupMobileCategoryArrows);
  }else{
    setupMobileCategoryArrows();
  }
})();

(function(){
  const root = document.querySelector('[data-pricing-carousel]');
  if(!root) return;

  const section = root.closest('.pricing-showcase-section') || root;
  const viewport = root.querySelector('.pricing-viewport');
  const track = root.querySelector('.pricing-track');
  const prev = root.querySelector('[data-pricing-prev]');
  const next = root.querySelector('[data-pricing-next]');
  const dotsWrap = document.querySelector('[data-pricing-dots]');
  const realCards = Array.from(track.querySelectorAll(':scope > [data-pricing-card]'));

  let realIndex = 0;
  let physicalIndex = 0;
  let cloneCount = 0;
  let startX = 0;
  let startY = 0;
  let dragging = false;
  let resizeTimer = 0;
  let animTimer = 0;
  let isAnimating = false;
  let pendingDir = 0;
  let lastTranslate = 0;
  let didPreloadPricing = false;

  if(!realCards.length) return;

  function mod(n, m){ return ((n % m) + m) % m; }

  function visibleCount(){
    if(window.matchMedia('(max-width: 680px)').matches) return 1;
    if(window.matchMedia('(max-width: 980px)').matches) return 2;
    return 3;
  }

  function gapSize(){
    const styles = getComputedStyle(track);
    return parseFloat(styles.columnGap || styles.gap || 0) || 0;
  }

  function allCards(){
    return Array.from(track.children).filter(el => el.matches('[data-pricing-card]'));
  }

  function cardStep(){
    const cards = allCards();
    if(!cards[0]) return 0;
    return cards[0].getBoundingClientRect().width + gapSize();
  }

  function translateForPhysical(pos){
    return Math.max(0, pos * cardStep());
  }

  function cloneCard(card){
    const clone = card.cloneNode(true);
    clone.setAttribute('data-pricing-clone','true');
    clone.setAttribute('aria-hidden','true');
    clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    clone.querySelectorAll('[tabindex]').forEach(el => el.setAttribute('tabindex','-1'));
    clone.querySelectorAll('[data-pricing-wired]').forEach(el => el.removeAttribute('data-pricing-wired'));
    clone.querySelectorAll('video').forEach(video => {
      try{
        video.pause();
        video.removeAttribute('src');
        video.load();
      }catch(e){}
    });
    clone.querySelectorAll('img').forEach(img => {
      img.loading = 'eager';
      img.decoding = 'async';
    });
    return clone;
  }

  function removeClones(){
    track.querySelectorAll('[data-pricing-clone="true"]').forEach(clone => clone.remove());
  }

  function setPosition(animate){
    const x = translateForPhysical(physicalIndex);
    lastTranslate = x;
    track.style.transition = animate ? 'transform .65s cubic-bezier(.16,1,.3,1)' : 'none';
    track.style.transform = 'translate3d(' + (-x) + 'px,0,0)';
    updateDots();

    if(!animate){

      track.getBoundingClientRect();
      track.style.transition = 'transform .65s cubic-bezier(.16,1,.3,1)';
    }
  }

  function normalizeLoopPosition(){
    const total = realCards.length;
    let changed = false;

    if(physicalIndex < cloneCount){
      physicalIndex += total;
      changed = true;
    }else if(physicalIndex >= cloneCount + total){
      physicalIndex -= total;
      changed = true;
    }

    if(changed) setPosition(false);
  }

  function resetAnimationState(){
    clearTimeout(animTimer);
    isAnimating = false;
    normalizeLoopPosition();

    if(pendingDir){
      const dir = pendingDir;
      pendingDir = 0;
      requestAnimationFrame(() => go(dir));
    }
  }

  function startAnimationGuard(){
    clearTimeout(animTimer);
    isAnimating = true;
    animTimer = setTimeout(resetAnimationState, 760);
  }

  function setupClones(){
    clearTimeout(animTimer);
    isAnimating = false;
    pendingDir = 0;
    removeClones();

    cloneCount = Math.min(visibleCount(), realCards.length);
    const before = realCards.slice(realCards.length - cloneCount).map(cloneCard);
    const after = realCards.slice(0, cloneCount).map(cloneCard);

    before.forEach(clone => track.insertBefore(clone, realCards[0]));
    after.forEach(clone => track.appendChild(clone));

    physicalIndex = realIndex + cloneCount;
    setPosition(false);
    wirePricingVideos();
    if(didPreloadPricing) preloadPricingMedia();
  }

  function buildDots(){
    if(!dotsWrap) return;
    dotsWrap.innerHTML = '';
    realCards.forEach((card, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'pricing-dot';
      const title = (card.querySelector('h3') || {}).textContent || ('pricing category ' + (i + 1));
      dot.setAttribute('aria-label', 'Go to ' + title.trim());
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  }

  function updateDots(){
    if(!dotsWrap) return;
    Array.from(dotsWrap.children).forEach((dot, i) => {
      dot.classList.toggle('on', i === realIndex);
      dot.setAttribute('aria-selected', i === realIndex ? 'true' : 'false');
    });
  }

  function go(dir){
    if(realCards.length <= 1){ setPosition(false); return; }
    preloadPricingMedia();


    if(isAnimating){
      pendingDir = dir;
      return;
    }

    normalizeLoopPosition();
    physicalIndex += dir;
    realIndex = mod(realIndex + dir, realCards.length);
    setPosition(true);
    startAnimationGuard();
  }

  function goTo(target){
    target = mod(target, realCards.length);
    preloadPricingMedia();

    if(isAnimating){
      const total = realCards.length;
      const forward = mod(target - realIndex, total);
      const backward = mod(realIndex - target, total);
      pendingDir = forward <= backward ? 1 : -1;
      return;
    }

    if(target === realIndex){
      track.animate([
        { transform:'translate3d(' + (-lastTranslate) + 'px,0,0) scale(1)' },
        { transform:'translate3d(' + (-lastTranslate) + 'px,0,0) scale(.992)' },
        { transform:'translate3d(' + (-lastTranslate) + 'px,0,0) scale(1)' }
      ], { duration:260, easing:'cubic-bezier(.22,1,.36,1)' });
      updateDots();
      return;
    }

    normalizeLoopPosition();
    const total = realCards.length;
    const forward = mod(target - realIndex, total);
    const backward = mod(realIndex - target, total);

    if(forward <= backward){
      physicalIndex += forward;
    }else{
      physicalIndex -= backward;
    }

    realIndex = target;
    setPosition(true);
    startAnimationGuard();
  }

  function preloadPricingMedia(){
    didPreloadPricing = true;

    root.querySelectorAll('img').forEach(img => {
      const src = img.currentSrc || img.getAttribute('src');
      img.loading = 'eager';
      img.decoding = 'async';
      try{ img.fetchPriority = 'high'; }catch(e){}
      if(src){
        const pre = new Image();
        pre.decoding = 'async';
        pre.src = src;
      }
    });

    root.querySelectorAll('video.pricing-preview-video').forEach(video => {
      const shell = video.closest('[data-pricing-src]');
      const src = shell ? shell.getAttribute('data-pricing-src') : '';
      const poster = shell ? shell.getAttribute('data-pricing-poster') : '';
      if(poster) video.setAttribute('poster', poster);
      if(src && !video.getAttribute('src')){
        video.preload = 'metadata';
        video.setAttribute('src', src);
        try{ video.load(); }catch(e){}
      }
    });
  }

  function setupPreloadObserver(){
    if('IntersectionObserver' in window){
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            preloadPricingMedia();
            observer.disconnect();
          }
        });
      }, { root:null, rootMargin:'900px 0px 900px 0px', threshold:0.01 });
      observer.observe(section);
    }else{
      setTimeout(preloadPricingMedia, 700);
    }


    window.addEventListener('load', () => setTimeout(preloadPricingMedia, 450), { once:true });
  }

  function wirePricingVideos(){
    root.querySelectorAll('[data-pricing-src],[data-pricing-youtube]').forEach(shell => {
      if(shell.dataset.pricingWired === 'true') return;
      shell.dataset.pricingWired = 'true';

      const video = shell.querySelector('.pricing-preview-video');
      const src = shell.getAttribute('data-pricing-src') || '';
      const poster = shell.getAttribute('data-pricing-poster') || '';
      const title = shell.getAttribute('data-pricing-title') || 'Pricing preview';
      const youtube = shell.getAttribute('data-pricing-youtube') || '';
      const portrait = shell.getAttribute('data-pricing-portrait') === 'true';

      function ensurePreview(){
        if(!video || !src) return;
        if(!video.getAttribute('src')){
          video.setAttribute('src', src);
          if(poster) video.setAttribute('poster', poster);
          video.preload = 'metadata';
          try{ video.load(); }catch(e){}
        }
      }

      function playPreview(){
        ensurePreview();
        shell.classList.add('preview-on');
        if(video) video.play().catch(()=>{});
      }

      function stopPreview(){
        shell.classList.remove('preview-on');
        if(video){
          try{ video.pause(); video.currentTime = 0; }catch(e){}
        }
      }

      function openPreview(e){
        if(e){
          e.preventDefault();
          e.stopPropagation();
        }
        let pricingYoutube = youtube;
        if(!pricingYoutube && shell.classList.contains('minimal-pricing-img')) pricingYoutube = 'https://youtube.com/shorts/k2s_fIZtLV8?feature=share';
        if(!pricingYoutube && shell.classList.contains('anim-pricing-img')) pricingYoutube = 'https://youtu.be/oB6tEFoRAww';
        const pricingEmbed = (typeof cnhNormalizeYouTubeEmbedSrc === 'function') ? cnhNormalizeYouTubeEmbedSrc(pricingYoutube) : pricingYoutube;
        if(pricingEmbed && typeof window.vpOpenYouTube === 'function'){
          window.vpOpenYouTube(pricingEmbed, title, portrait, false);
        }else if(pricingYoutube){
          window.open(pricingYoutube, '_blank', 'noopener');
        }
      }

      shell.addEventListener('mouseenter', playPreview, {passive:true});
      shell.addEventListener('mouseleave', stopPreview, {passive:true});
      shell.addEventListener('focus', playPreview);
      shell.addEventListener('blur', stopPreview);
      shell.addEventListener('click', openPreview);
      shell.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          openPreview(e);
        }
      });
    });
  }

  prev && prev.addEventListener('click', () => go(-1));
  next && next.addEventListener('click', () => go(1));

  track.addEventListener('transitionend', function(e){
    if(e.target === track && e.propertyName === 'transform') resetAnimationState();
  });


  viewport.addEventListener('pointerdown', (e) => {
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
  }, {passive:true});

  viewport.addEventListener('pointerup', (e) => {
    if(!dragging) return;
    dragging = false;
    const diffX = e.clientX - startX;
    const diffY = e.clientY - startY;
    if(Math.abs(diffX) > 48 && Math.abs(diffX) > Math.abs(diffY) * 1.2){
      go(diffX < 0 ? 1 : -1);
    }
  }, {passive:true});

  viewport.addEventListener('pointercancel', () => { dragging = false; }, {passive:true});

  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setupClones, 140);
  }, {passive:true});


  window.addEventListener('load', () => {
    setTimeout(() => { setupClones(); setPosition(false); }, 160);
  }, {once:true});

  buildDots();
  setupClones();
  setupPreloadObserver();
})();

(function(){
  const MAP = [
    { selector: '.minimal-pricing-img', id: 'k2s_fIZtLV8', title: 'Minimal Reels Pricing', portrait: true },
    { selector: '.anim-pricing-img',    id: 'oB6tEFoRAww', title: '2D Animation Pricing',  portrait: false }
  ];

  let pressedShell = null;
  let startX = 0;
  let startY = 0;
  let dragged = false;
  let lastOpen = 0;

  function findShell(target){
    if(!target || !target.closest) return null;
    return target.closest('.minimal-pricing-img, .anim-pricing-img');
  }

  function getInfo(shell){
    if(!shell) return null;
    const item = MAP.find(m => shell.matches(m.selector));
    return item ? Object.assign({ shell }, item) : null;
  }

  function embedUrl(id){
    return 'https://www.youtube.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0&playsinline=1&modestbranding=1';
  }

  function forceOpenModal(info){
    if(!info) return;
    const now = Date.now();
    if(now - lastOpen < 350) return;
    lastOpen = now;

    const src = embedUrl(info.id);

    if(typeof window.vpOpenYouTube === 'function'){
      window.vpOpenYouTube(src, info.title, info.portrait, false);
      return;
    }


    const wrap = document.getElementById('vp-wrap');
    const screen = document.getElementById('vp-screen');
    const controls = document.getElementById('vp-controls');
    const frame = document.getElementById('vp-embed-iframe');
    const vid = document.getElementById('vp-video');
    const placeholder = document.getElementById('vp-placeholder');
    if(!wrap || !screen || !frame) { window.open('https://youtu.be/' + info.id, '_blank', 'noopener'); return; }

    try{ if(typeof window.lockPageForVideo === 'function') window.lockPageForVideo(); }catch(e){}
    try{ if(vid){ vid.pause(); vid.removeAttribute('src'); vid.style.display='none'; vid.load(); } }catch(e){}
    if(placeholder) placeholder.style.display='none';

    screen.className = 'vp-screen ' + (info.portrait ? 'portrait' : 'landscape');
    if(controls) controls.className = 'vp-controls ' + (info.portrait ? 'portrait' : 'landscape');
    frame.title = info.title;
    frame.src = src;
    frame.style.display = 'block';
    wrap.classList.add('open','youtube-active');
  }

  document.addEventListener('pointerdown', function(e){
    const shell = findShell(e.target);
    if(!shell) return;
    pressedShell = shell;
    startX = e.clientX || 0;
    startY = e.clientY || 0;
    dragged = false;
  }, true);

  document.addEventListener('pointermove', function(e){
    if(!pressedShell) return;
    if(Math.abs((e.clientX || 0) - startX) > 12 || Math.abs((e.clientY || 0) - startY) > 12){
      dragged = true;
    }
  }, true);

  document.addEventListener('pointercancel', function(){
    pressedShell = null;
    dragged = false;
  }, true);

  document.addEventListener('click', function(e){
    const targetShell = findShell(e.target);
    const shell = targetShell || (!dragged ? pressedShell : null);
    const info = getInfo(shell);
    if(!info) return;

    e.preventDefault();
    e.stopPropagation();
    if(typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
    pressedShell = null;
    dragged = false;
    forceOpenModal(info);
  }, true);

  document.addEventListener('keydown', function(e){
    if(e.key !== 'Enter' && e.key !== ' ') return;
    const info = getInfo(findShell(e.target));
    if(!info) return;
    e.preventDefault();
    e.stopPropagation();
    if(typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
    forceOpenModal(info);
  }, true);
})();

(function(){
  function jumpToContact(event){
    if(event) event.preventDefault();
    const contactSection = document.getElementById('discord');
    if(!contactSection) return;

    const isMobile = window.matchMedia('(max-width: 680px)').matches;
    const topOffset = isMobile ? 12 : 18;
    const targetY = Math.max(0, contactSection.getBoundingClientRect().top + window.pageYOffset - topOffset);

    try{ history.replaceState(null, '', location.pathname + location.search); }catch(err){}
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }

  document.addEventListener('click', function(event){
    const btn = event.target.closest('.js-contact-jump');
    if(!btn) return;
    jumpToContact(event);
  });
})();

(function(){
  function jumpToPricingCards(event){
    if(event) event.preventDefault();

    const pricingSection = document.getElementById('process');
    const pricingCards = document.querySelector('[data-pricing-carousel]') || pricingSection;
    if(!pricingCards) return;

    const isMobile = window.matchMedia('(max-width: 680px)').matches;
    const topOffset = isMobile ? 14 : 10;
    const targetY = Math.max(0, pricingCards.getBoundingClientRect().top + window.pageYOffset - topOffset);


    try{
      history.replaceState(null, '', location.pathname + location.search);
    }catch(err){}

    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }

  document.addEventListener('click', function(event){
    const link = event.target.closest('.js-pricing-jump');
    if(!link) return;
    jumpToPricingCards(event);
  });

  window.addEventListener('load', function(){

    if(location.hash === '#process'){
      try{ history.replaceState(null, '', location.pathname + location.search); }catch(err){}
      setTimeout(function(){ window.scrollTo(0,0); }, 0);
      setTimeout(function(){ window.scrollTo(0,0); }, 80);
    }
  });
})();

(function(){
  let pressedBtn = null;
  let startX = 0;
  let startY = 0;
  let moved = false;
  let lastAction = 0;

  function buttonFrom(target){
    if(!target || !target.closest) return null;
    const btn = target.closest('.pricing-carousel-wrap .pricing-btn');
    return btn || null;
  }

  function jumpToContact(){
    const contactSection = document.getElementById('discord') || document.querySelector('[data-contact-section]') || document.querySelector('footer');
    if(!contactSection) return;
    const isMobile = window.matchMedia('(max-width: 680px)').matches;
    const topOffset = isMobile ? 12 : 18;
    const y = Math.max(0, contactSection.getBoundingClientRect().top + window.pageYOffset - topOffset);
    try{ history.replaceState(null, '', location.pathname + location.search); }catch(err){}
    window.scrollTo({ top:y, behavior:'smooth' });
  }

  function run(btn, event){
    if(!btn) return;
    const now = Date.now();
    if(now - lastAction < 300) return;
    lastAction = now;

    if(event){
      event.preventDefault();
      event.stopPropagation();
      if(typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
    }

    if(btn.classList && btn.classList.contains('pricing-btn-book')){
      const bookingUrl = (btn.getAttribute('href') || '').replace(/&amp;/g, '&');
      if(/^https:\/\/calendar\.app\.google\//.test(bookingUrl)){
        window.open(bookingUrl, '_blank', 'noopener');
        return;
      }
    }

    jumpToContact();
  }

  document.addEventListener('pointerdown', function(event){
    const btn = buttonFrom(event.target);
    if(!btn) return;
    pressedBtn = btn;
    startX = event.clientX || 0;
    startY = event.clientY || 0;
    moved = false;
  }, true);

  document.addEventListener('pointermove', function(event){
    if(!pressedBtn) return;
    const dx = Math.abs((event.clientX || 0) - startX);
    const dy = Math.abs((event.clientY || 0) - startY);
    if(dx > 12 || dy > 12) moved = true;
  }, true);

  document.addEventListener('pointercancel', function(){
    pressedBtn = null;
    moved = false;
  }, true);

  document.addEventListener('click', function(event){
    const btn = buttonFrom(event.target) || (!moved ? pressedBtn : null);
    if(!btn) return;
    const dx = Math.abs((event.clientX || 0) - startX);
    const dy = Math.abs((event.clientY || 0) - startY);
    const wasDrag = moved || dx > 14 || dy > 14;
    pressedBtn = null;
    moved = false;
    if(wasDrag) return;
    run(btn, event);
  }, true);

  document.addEventListener('keydown', function(event){
    if(event.key !== 'Enter' && event.key !== ' ') return;
    const btn = buttonFrom(event.target);
    if(!btn) return;
    run(btn, event);
  }, true);
})();

(function(){
  function currentY(){ return window.scrollY || document.documentElement.scrollTop || 0; }
  function lockX(){
    const x = window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    if(x !== 0){
      const y = currentY();
      document.documentElement.scrollLeft = 0;
      document.body.scrollLeft = 0;
      window.scrollTo(0, y);
    }
  }
  document.addEventListener('click', function(e){
    if(e.target && e.target.closest && e.target.closest('#cat-tabs .cat-tab')){
      const y = currentY();
      requestAnimationFrame(function(){ window.scrollTo(0, y); lockX(); });
      setTimeout(function(){ window.scrollTo(0, y); lockX(); }, 80);
      setTimeout(function(){ window.scrollTo(0, y); lockX(); }, 220);
    }
  }, true);
  window.addEventListener('scroll', lockX, {passive:true});
  window.addEventListener('resize', lockX);
})();

(function(){
  var downShell = null;
  var downX = 0;
  var downY = 0;
  var lastOpenAt = 0;

  function closestShell(target){
    return target && target.closest ? target.closest('.minimal-pricing-img, .anim-pricing-img') : null;
  }

  function extractYouTubeId(raw){
    var url = String(raw || '').trim().replace(/&amp;/g,'&');
    if(!url) return '';
    try{
      var u = new URL(url, window.location.href);
      if(u.hostname.indexOf('youtu.be') !== -1) return u.pathname.replace(/^\/+/, '').split('/')[0] || '';
      if(u.pathname.indexOf('/shorts/') === 0) return u.pathname.split('/')[2] || '';
      if(u.pathname.indexOf('/embed/') === 0) return u.pathname.split('/')[2] || '';
      return u.searchParams.get('v') || '';
    }catch(err){
      var m = url.match(/(?:youtu\.be\/|shorts\/|embed\/|v=)([A-Za-z0-9_-]{6,})/);
      return m ? m[1] : '';
    }
  }

  function rawLinkForShell(shell){
    if(shell.classList.contains('minimal-pricing-img')) return 'https://youtube.com/shorts/k2s_fIZtLV8?feature=share';
    if(shell.classList.contains('anim-pricing-img')) return 'https://youtu.be/oB6tEFoRAww';
    return shell.getAttribute('data-pricing-youtube') || shell.getAttribute('href') || '';
  }

  function suppress(event){
    if(!event) return;
    event.preventDefault();
    event.stopPropagation();
    if(typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
  }

  function openPricingVideo(shell, event){
    if(!shell) return;
    suppress(event);

    var now = Date.now();
    if(now - lastOpenAt < 280) return;
    lastOpenAt = now;

    var raw = rawLinkForShell(shell);
    var id = extractYouTubeId(raw);
    if(!id) return;

    var title = shell.getAttribute('data-pricing-title') || (shell.classList.contains('anim-pricing-img') ? '2D Animation Pricing' : 'Minimal Reels Pricing');
    var portrait = shell.classList.contains('minimal-pricing-img') || shell.getAttribute('data-pricing-portrait') === 'true';
    var embed = 'https://www.youtube.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0&playsinline=1&modestbranding=1';

    if(typeof window.vpOpenYouTube === 'function'){
      window.vpOpenYouTube(embed, title, portrait, false);
    }else{
      window.open(raw, '_blank', 'noopener');
    }
  }

  document.addEventListener('pointerdown', function(event){
    var shell = closestShell(event.target);
    if(!shell) return;
    downShell = shell;
    downX = event.clientX || 0;
    downY = event.clientY || 0;
  }, true);

  document.addEventListener('pointerup', function(event){
    if(!downShell) return;
    var shell = downShell;
    var dx = Math.abs((event.clientX || 0) - downX);
    var dy = Math.abs((event.clientY || 0) - downY);
    downShell = null;
    if(dx <= 12 && dy <= 12) openPricingVideo(shell, event);
  }, true);

  document.addEventListener('click', function(event){
    var shell = closestShell(event.target);
    if(!shell) return;
    openPricingVideo(shell, event);
  }, true);

  document.addEventListener('keydown', function(event){
    if(event.key !== 'Enter' && event.key !== ' ') return;
    var shell = closestShell(event.target);
    if(!shell) return;
    openPricingVideo(shell, event);
  }, true);

  function restorePricingLinks(){
    document.querySelectorAll('.minimal-pricing-img').forEach(function(shell){
      shell.setAttribute('href','https://youtube.com/shorts/k2s_fIZtLV8?feature=share');
      shell.setAttribute('data-pricing-youtube','https://youtube.com/shorts/k2s_fIZtLV8?feature=share');
      shell.setAttribute('data-pricing-title','Minimal Reels Pricing');
      shell.setAttribute('data-pricing-portrait','true');
    });
    document.querySelectorAll('.anim-pricing-img').forEach(function(shell){
      shell.setAttribute('href','https://youtu.be/oB6tEFoRAww');
      shell.setAttribute('data-pricing-youtube','https://youtu.be/oB6tEFoRAww');
      shell.setAttribute('data-pricing-title','2D Animation Pricing');
      shell.setAttribute('data-pricing-portrait','false');
    });
  }
  restorePricingLinks();
  setTimeout(restorePricingLinks, 200);
  setTimeout(restorePricingLinks, 900);
})();

(function(){
  const HERO_REEL_URL = 'https://youtu.be/QBdW_OE0Nug';
  let lastOpen = 0;

  function openHeroReel(event){
    const btn = event.target && event.target.closest ? event.target.closest('.js-hero-reel') : null;
    if(!btn) return;

    event.preventDefault();
    event.stopPropagation();
    if(typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();

    const now = Date.now();
    if(now - lastOpen < 300) return;
    lastOpen = now;

    const rawUrl = btn.getAttribute('data-hero-reel-youtube') || HERO_REEL_URL;
    if(typeof window.vpOpenYouTube === 'function'){
      window.vpOpenYouTube(rawUrl, 'Cut & Hire Reel', false, false);
    }else{
      window.open(rawUrl, '_blank', 'noopener');
    }
  }

  document.addEventListener('click', openHeroReel, true);
  document.addEventListener('keydown', function(event){
    if(event.key !== 'Enter' && event.key !== ' ') return;
    openHeroReel(event);
  }, true);
})();
