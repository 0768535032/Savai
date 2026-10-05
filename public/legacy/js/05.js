
(function(){
  let currentTheme=null;
  const root=document.documentElement;
  
  function applyTheme(pct, force){
    const newTheme = pct < 50 ? 'night' : 'light';
    let changed = newTheme!==currentTheme || force;
    
    if(changed){
      currentTheme=newTheme;
      root.setAttribute('data-theme', newTheme);
      if(newTheme==='night'){
        document.body.classList.add('is-night'); document.body.classList.remove('is-light');
      } else {
        document.body.classList.add('is-light'); document.body.classList.remove('is-night');
      }
      const ind=document.getElementById('theme-indicator');
      if(ind){
        const label=ind.querySelector('.label');
        const dot=ind.querySelector('.dot');
        if(newTheme==='night'){
          label.textContent='DARK MODE ACTIVATED';
          dot.style.background='#aaa';
          dot.style.boxShadow='0 0 14px #aaa';
          ind.style.borderColor='#777';
        } else {
          label.textContent='LIGHT MODE ACTIVATED';
          dot.style.background='#6fa5bd';
          dot.style.boxShadow='0 0 14px #6fa5bd';
          ind.style.borderColor='#6fa5bd';
        }
      }
    }
    
    const sharpImg=document.querySelector('.hero2 .photo img:not(#blur-img-full)');
    const blurImg=document.getElementById('blur-img-full');
    const streak=document.getElementById('streak-overlay');
    if(sharpImg && blurImg){
        // The original image is fully visible at the left extreme; the blurred layer takes over to the right.
        sharpImg.style.clipPath=`inset(0 0 0 ${pct}%)`; // right side visible, size = 100-pct
      blurImg.style.clipPath=`inset(0 ${100-pct}% 0 0)`; // left side visible, size = pct
      if(streak) streak.style.clipPath=`inset(0 ${100-pct}% 0 0)`;
      
      if(newTheme==='night'){
        sharpImg.style.filter='grayscale(1) brightness(0.85) contrast(1.15)';
        sharpImg.style.opacity='1';
        blurImg.style.filter='grayscale(1) blur(18px) brightness(1.35) opacity(0.65)';
      } else {
        sharpImg.style.filter='brightness(0.9) contrast(1.05) saturate(1.2) opacity(0.7)';
        blurImg.style.filter='blur(10px) brightness(1.55) saturate(0.65) contrast(0.92)';
      }
    }
    const hero=document.querySelector('.hero2');
    if(hero){
      hero.style.background = newTheme==='night' ? '#050507' : '#f4f2ee';
    }
  }
  window._applyTheme=applyTheme;

  function setup(){
    const photo=document.querySelector('.hero2 .photo');
    const handle=document.getElementById('focus-handle');
    if(!photo||!handle||photo.dataset.dragReady) return;
    photo.dataset.dragReady='true';
    photo.style.touchAction='none';

    // LABEL = DRAG ME with dim flicker on open
    handle.innerHTML=`
      <div id="drag-knob" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:78px;height:78px;border-radius:50%;background:#0a0a0a;border:2px solid #fff;display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.2);">
        <span style="font:700 13px Syne,sans-serif;color:#fff;letter-spacing:0.18em;line-height:1;">DRAG</span>
        <span style="font:700 13px Syne,sans-serif;color:#fff;letter-spacing:0.18em;line-height:1;margin-top:2px;">ME</span>
      </div>
    `;
    const knob=document.getElementById('drag-knob');
    
    // Flicker animation on open - intense at first, then dim
    if(!document.getElementById('drag-knob-animations')){
      const style=document.createElement('style');
      style.id='drag-knob-animations';
      style.textContent=`
      @keyframes flickerOpen{
        0%{ opacity:1; box-shadow:0 8px 24px rgba(0,0,0,0.6), 0 0 30px rgba(255,255,255,0.9); }
        8%{ opacity:0.3; box-shadow:0 8px 24px rgba(0,0,0,0.3), 0 0 5px rgba(255,255,255,0.2); }
        12%{ opacity:1; }
        18%{ opacity:0.6; }
        22%{ opacity:1; }
        30%{ opacity:0.4; }
        35%{ opacity:1; }
        45%{ opacity:0.75; }
        50%{ opacity:1; }
        62%{ opacity:0.85; }
        68%{ opacity:1; }
        100%{ opacity:1; }
      }
      @keyframes dimFlickerLoop{
        0%,100%{ opacity:1; }
        10%{ opacity:0.82; }
        20%{ opacity:1; }
        55%{ opacity:0.9; }
        70%{ opacity:0.86; }
      }
      #drag-knob.flicker-open{ animation: flickerOpen 1.8s ease-in-out 1; }
      #drag-knob.flicker-dim{ animation: dimFlickerLoop 3.5s infinite steps(2); }
      `;
      document.head.appendChild(style);
    }
    
    knob.classList.add('flicker-open');
    setTimeout(()=>{ knob.classList.remove('flicker-open'); knob.classList.add('flicker-dim'); }, 2000);

    // Indicator - hidden by default, shows activated message
    let ind=document.getElementById('theme-indicator');
    if(!ind){
      ind=document.createElement('div');
      ind.id='theme-indicator';
      ind.style.cssText='position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(24px);z-index:10000;background:rgba(10,10,10,0.94);color:#fff;padding:14px 26px;border-radius:999px;font:600 11px Syne,sans-serif;letter-spacing:0.2em;display:flex;gap:14px;align-items:center;border:1.5px solid #c0563a;backdrop-filter:blur(16px);opacity:0;pointer-events:none;transition:all 0.45s cubic-bezier(0.4,0,0.2,1);';
      ind.innerHTML=`<div class="dot" style="width:10px;height:10px;border-radius:50%;background:#c0563a;box-shadow:0 0 14px #c0563a;transition:all 0.3s;"></div><span class="label">DARK MODE ACTIVATED</span>`;
      document.body.appendChild(ind);
    }

    let hideTimeout=null;
    const showInd=(msg)=>{
      if(hideTimeout) clearTimeout(hideTimeout);
      ind.style.opacity='1';
      ind.style.transform='translateX(-50%) translateY(0)';
      ind.style.pointerEvents='auto';
    };
    const hideInd=()=>{
      if(hideTimeout) clearTimeout(hideTimeout);
      hideTimeout=setTimeout(()=>{ ind.style.opacity='0'; ind.style.transform='translateX(-50%) translateY(24px)'; ind.style.pointerEvents='none'; }, 1400);
    };

    let dragging=false;
    const update=(x)=>{
      const rect=photo.getBoundingClientRect();
      if(!rect.width) return;
      let pct=((x-rect.left)/rect.width)*100;
      pct=Math.max(0,Math.min(100,pct));
      handle.style.left=pct+'%';
      applyTheme(pct);
    };

    photo.addEventListener('pointerdown',(e)=>{
      dragging=true;
      photo.setPointerCapture(e.pointerId);
      update(e.clientX);
      showInd();
      e.preventDefault();
    });
    photo.addEventListener('pointermove',(e)=>{
      if(dragging){
        update(e.clientX);
        ind.style.opacity='1';
      }
    });
    const stopDragging=()=>{
      if(dragging){
        dragging=false;
        hideInd();
      }
    };
    photo.addEventListener('pointerup',stopDragging);
    photo.addEventListener('pointercancel',stopDragging);
    handle.addEventListener('pointerenter',()=>{ if(!dragging) showInd(); });
    handle.addEventListener('pointerleave',()=>{ if(!dragging) hideInd(); });

    // Start in dark mode and keep the mode label in sync with the same threshold used while dragging.
    requestAnimationFrame(()=>{
      const r=photo.getBoundingClientRect();
      update(r.left + r.width*0.12); // start in night
      // Show indicator briefly on open to prompt
      setTimeout(()=>{ showInd(); setTimeout(hideInd, 2200); }, 900);
    });
  }

  setTimeout(setup, 800);
  window.addEventListener('hashchange', ()=> setTimeout(setup, 700));
  setTimeout(setup, 1000);
})();
