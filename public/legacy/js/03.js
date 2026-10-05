(function(){
  let activeStudioSec=null;
  let cursor=null;
  let listeners=null;

  function cleanupSplatter(){
    if(activeStudioSec && listeners){
      activeStudioSec.removeEventListener('pointerenter',listeners.enter);
      activeStudioSec.removeEventListener('pointerleave',listeners.leave);
      activeStudioSec.removeEventListener('pointermove',listeners.move);
      activeStudioSec.removeEventListener('click',listeners.click);
    }
    if(cursor) cursor.remove();
    activeStudioSec=null;
    cursor=null;
    listeners=null;
  }

  function restoreSplatter(){
    const studioSec=document.querySelector('.studio-sec');
    if(studioSec===activeStudioSec) return;
    cleanupSplatter();
    if(!studioSec) return;

    activeStudioSec=studioSec;
    studioSec.classList.add('gamified');

    cursor=document.createElement('div');
    cursor.id='studio-cursor';
    cursor.setAttribute('aria-hidden','true');
    cursor.textContent='●';
    document.body.appendChild(cursor);

    let splatCount=0;
    let style=document.getElementById('paint-progress');
    const splatterAt=(clientX,clientY)=>{
      const rect=studioSec.getBoundingClientRect();
      const x=clientX-rect.left+studioSec.scrollLeft;
      const y=clientY-rect.top+studioSec.scrollTop;
      if(x<0||y<0||x>rect.width||y>rect.height) return;

      const colors=['#c0563a','#e3a26a','#6fa5bd','#e8c05a','#8a5a45','#d97fa0'];
      const splat=document.createElement('div');
      const size=24+Math.random()*80;
      splat.className='paint-splat';
      const rotation=Math.random()*60-30;
      splat.style.cssText=`left:${x-size/2}px;top:${y-size/2}px;width:${size}px;height:${size*(0.7+Math.random()*0.6)}px;background:${colors[Math.floor(Math.random()*colors.length)]};--splat-rotation:${rotation}deg;transform:rotate(${rotation}deg) scale(.2);`;
      studioSec.appendChild(splat);
      requestAnimationFrame(()=>{
        splat.classList.add('is-settled');
        splat.style.transform=`rotate(${rotation}deg) scale(1)`;
      });

      splatCount++;
      style=document.getElementById('paint-progress');
      if(style){
        const progress=Math.min(100,Math.round(splatCount/20*100));
        style.style.width=progress+'%';
        style.parentElement.setAttribute('aria-valuenow',String(progress));
      }
    };

    const ttl=studioSec.querySelector('.ttl');
    if(ttl && !studioSec.querySelector('#paint-btn')){
      const extra=document.createElement('div');
      extra.className='splatter-controls';
      extra.innerHTML='<button id="paint-btn" class="btn" type="button">Splatter the studio →</button><p>Click anywhere in this section to leave paint.</p><div class="paint-progress-track" role="progressbar" aria-label="Studio splatter progress" aria-valuemin="0" aria-valuemax="100"><div id="paint-progress"></div></div>';
      ttl.appendChild(extra);
    }

    listeners={
      enter:()=>{cursor.style.opacity='1';},
      leave:()=>{cursor.style.opacity='0';},
      move:e=>{
        cursor.style.left=e.clientX+'px';
        cursor.style.top=e.clientY+'px';
      },
      click:e=>{
        if(e.target.closest('#paint-btn')) {
          for(let i=0;i<15;i++){
            const rect=studioSec.getBoundingClientRect();
            setTimeout(()=>{
              if(activeStudioSec!==studioSec||!studioSec.isConnected) return;
              splatterAt(rect.left+Math.random()*rect.width,rect.top+Math.random()*rect.height);
            },i*70);
          }
          return;
        }
        splatterAt(e.clientX,e.clientY);
      }
    };
    studioSec.addEventListener('pointerenter',listeners.enter);
    studioSec.addEventListener('pointerleave',listeners.leave);
    studioSec.addEventListener('pointermove',listeners.move);
    studioSec.addEventListener('click',listeners.click);
  }

  function restoreSea(){
    document.querySelectorAll('header.nbhead').forEach(header=>{
      if(header.innerHTML.includes('Approach')){
        const img=header.querySelector('img');
        if(img){
          img.style.opacity='1';
          img.style.filter='brightness(0.92) saturate(1.1)';
        }
        const waveCanvas=document.getElementById('wave-canvas');
        if(waveCanvas) waveCanvas.style.opacity='0.22';
      }
    });
  }

  const restoreEffects=()=>{restoreSplatter();restoreSea();};
  setTimeout(restoreEffects,900);
  window.addEventListener('hashchange',()=>setTimeout(restoreEffects,800));
})();
