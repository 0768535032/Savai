
(function(){
  function restoreSplatter(){
    const studioSec=document.querySelector('.studio-sec');
    if(!studioSec) return;
    if(document.getElementById('studio-cursor')) return;
    studioSec.style.position='relative';
    const cursor=document.createElement('div');
    cursor.id='studio-cursor';
    cursor.style.cssText='position:fixed; width:32px; height:32px; border-radius:50%; background:#c0563a; pointer-events:none; z-index:9999; transform:translate(-50%,-50%); display:flex; align-items:center; justify-content:center; color:#fff; font-size:14px; opacity:0; transition:opacity .2s;';
    cursor.textContent='●';
    document.body.appendChild(cursor);
    studioSec.addEventListener('mouseenter',()=>{ cursor.style.opacity='1'; });
    studioSec.addEventListener('mouseleave',()=>{ cursor.style.opacity='0'; });
    studioSec.addEventListener('mousemove',(e)=>{ cursor.style.left=e.clientX+'px'; cursor.style.top=e.clientY+'px'; });
    const ttl=studioSec.querySelector('.ttl');
    if(ttl && !document.getElementById('paint-btn')){
      const extra=document.createElement('div');
      extra.style.cssText='margin-top:24px; position:relative; z-index:3;';
      extra.innerHTML=`<button id="paint-btn" class="btn" style="background:#c0563a; border:0; padding:12px 24px; border-radius:999px; color:#fff; cursor:pointer;">Splatter the studio →</button><p style="font:400 12px Poppins,sans-serif; margin-top:10px; color:#5a5a5a;">Click anywhere in this section to leave paint.</p><div style="margin-top:12px; width:200px; height:4px; background:#0001; border-radius:2px; overflow:hidden;"><div id="paint-progress" style="height:100%; width:0%; background:#c0563a; transition:width .3s;"></div></div>`;
      ttl.appendChild(extra);
    }
    let splatCount=0;
    studioSec.addEventListener('click',(e)=>{
      if(e.target.id==='paint-btn' || e.target.closest('#paint-btn')) return;
      const rect=studioSec.getBoundingClientRect();
      const x=e.clientX-rect.left; const y=e.clientY-rect.top;
      if(x<0||y<0||x>rect.width||y>rect.height) return;
      const colors=['#c0563a','#e3a26a','#6fa5bd','#e8c05a','#8a5a45','#d97fa0'];
      const splat=document.createElement('div');
      const sz=24+Math.random()*80;
      splat.style.cssText=`position:absolute; left:${x-sz/2}px; top:${y-sz/2}px; width:${sz}px; height:${sz*(0.7+Math.random()*0.6)}px; background:${colors[Math.floor(Math.random()*colors.length)]}; border-radius:50%; transform:rotate(${Math.random()*60-30}deg); opacity:${0.7+Math.random()*0.3}; pointer-events:none; mix-blend-mode:multiply;`;
      studioSec.appendChild(splat);
      splatCount++; const bar=document.getElementById('paint-progress'); if(bar) bar.style.width=Math.min(100,Math.round(splatCount/20*100))+'%';
    });
    document.addEventListener('click',(e)=>{ if(e.target.id==='paint-btn'){ for(let i=0;i<15;i++) setTimeout(()=>{ const rect=studioSec.getBoundingClientRect(); const ev=new MouseEvent('click',{clientX:rect.left+Math.random()*rect.width, clientY:rect.top+Math.random()*rect.height, bubbles:true}); studioSec.dispatchEvent(ev); }, i*70); }});
  }
  function restoreSea(){
    const approachHeader=document.querySelectorAll('header.nbhead');
    approachHeader.forEach(h=>{
      if(h.innerHTML.includes('Approach')){
        const img=h.querySelector('img'); if(img){ img.style.opacity='1'; img.style.filter='brightness(0.92) saturate(1.1)'; }
        const wc=document.getElementById('wave-canvas'); if(wc){ wc.style.opacity='0.22'; }
      }
    });
  }
  setTimeout(()=>{ restoreSplatter(); restoreSea(); }, 900);
  window.addEventListener('hashchange', ()=> setTimeout(()=>{ restoreSplatter(); restoreSea(); }, 800));
})();
