
(function(){
  function buildWall(){
    const wall=document.getElementById('signature-wall');
    if(!wall) return;
    if(wall.dataset.built==='1') return;
    
    wall.innerHTML=`
      <div id="sig-top">
        <div id="sig-left">
          <div style="display:inline-block; background:#0a0a0a; color:#fff; padding:5px 10px; border-radius:999px; font:500 9px Syne,sans-serif; letter-spacing:0.18em;">LIVE TESTIMONIAL WALL</div>
          <h3 style="font:700 28px Syne,sans-serif; line-height:1.05; margin:14px 0 8px; letter-spacing:-0.02em;">Leave your mark.</h3>
          <p style="font:400 13px Poppins,sans-serif; opacity:0.7; line-height:1.5;">Your signature shows this site is alive and trusted. Add your name, role, and how Savai shifted your business.</p>
          
          <div id="sig-canvas-wrap">
            <canvas id="sig-canvas"></canvas>
            <div style="position:absolute; bottom:6px; right:8px; font:500 8px Syne,sans-serif; letter-spacing:0.15em; opacity:0.4; pointer-events:none;">DRAW ABOVE</div>
          </div>
          <div style="display:flex; gap:8px; margin-top:10px;">
            <button id="clear-sig" style="flex:0; border:1.5px solid #0a0a0a; background:#fff; padding:8px 14px; font:600 11px Syne,sans-serif; cursor:pointer;">CLEAR</button>
            <div style="flex:1; font:400 10px Poppins,sans-serif; opacity:0.5; display:flex; align-items:center;">Draw your signature, not typed.</div>
          </div>

          <input id="sig-name" class="sig-input" placeholder="Your name — e.g., Wanjiku Mwangi" />
          <input id="sig-cred" class="sig-input" placeholder="Role & Business — e.g., Founder @ Zuri Organics" />
          <textarea id="sig-impact" class="sig-input" rows="3" placeholder="How Savai impacted your business — e.g., 'Positioning went from vague to unforgettable. We doubled inquiries in 3 weeks.'"></textarea>
          
          <button id="save-sig" style="margin-top:14px; width:100%; background:#0a0a0a; color:#fff; border:0; padding:14px; font:700 12px Syne,sans-serif; letter-spacing:0.16em; cursor:pointer; border-radius:0;">LEAVE SIGNATURE + TESTIMONIAL →</button>
          <div id="sig-status" style="font:500 11px Syne,sans-serif; margin-top:8px; min-height:16px;"></div>
        </div>
        <div id="sig-right">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font:700 11px Syne,sans-serif; letter-spacing:0.2em;">WALL • <span id="sig-count">0</span> MARKS</span>
            <button id="sig-export" style="font:500 9px Syne,sans-serif; border:1px solid #0a0a0a; background:transparent; padding:4px 8px; cursor:pointer;">EXPORT</button>
          </div>
          <div id="sig-feed"></div>
        </div>
      </div>
    `;
    wall.dataset.built='1';
    
    // Canvas setup - bulletproof
    const canvas=document.getElementById('sig-canvas');
    const wrap=document.getElementById('sig-canvas-wrap');
    const ctx=canvas.getContext('2d', {willReadFrequently:true});
    
    function resize(){
      const rect=wrap.getBoundingClientRect();
      const dpr=Math.max(1, window.devicePixelRatio||1);
      const w=Math.round(rect.width*dpr);
      const h=Math.round(rect.height*dpr);
      if(canvas.width!==w || canvas.height!==h){
        const prev=ctx.getImageData(0,0,canvas.width,canvas.height);
        canvas.width=w; canvas.height=h;
        canvas.style.width=rect.width+'px';
        canvas.style.height=rect.height+'px';
        ctx.setTransform(dpr,0,0,dpr,0,0);
        ctx.lineCap='round'; ctx.lineJoin='round'; ctx.strokeStyle='#0a0a0a'; ctx.lineWidth=2.6;
        // restore if needed (rough)
      } else {
        ctx.setTransform(dpr,0,0,dpr,0,0);
        ctx.lineCap='round'; ctx.lineJoin='round'; ctx.strokeStyle='#0a0a0a'; ctx.lineWidth=2.6;
      }
    }
    resize();
    window.addEventListener('resize', resize);
    
    let drawing=false, last=null;
    function pos(e){
      const rect=canvas.getBoundingClientRect();
      const src=e.touches? e.touches[0] : e;
      return {x: src.clientX - rect.left, y: src.clientY - rect.top};
    }
    
    canvas.addEventListener('pointerdown', (e)=>{
      drawing=true; last=pos(e); canvas.setPointerCapture(e.pointerId); e.preventDefault();
    });
    canvas.addEventListener('pointermove', (e)=>{
      if(!drawing) return;
      const p=pos(e);
      ctx.beginPath(); ctx.moveTo(last.x, last.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      last=p; e.preventDefault();
    });
    const stop=()=>{ drawing=false; };
    canvas.addEventListener('pointerup', stop);
    canvas.addEventListener('pointercancel', stop);
    window.addEventListener('pointerup', stop);
    
    // touch fallback
    canvas.addEventListener('touchstart', (e)=>{ drawing=true; last=pos(e); e.preventDefault(); }, {passive:false});
    canvas.addEventListener('touchmove', (e)=>{ if(!drawing) return; const p=pos(e); ctx.beginPath(); ctx.moveTo(last.x,last.y); ctx.lineTo(p.x,p.y); ctx.stroke(); last=p; e.preventDefault(); }, {passive:false});
    canvas.addEventListener('touchend', stop);

    const nameI=document.getElementById('sig-name');
    const credI=document.getElementById('sig-cred');
    const impactI=document.getElementById('sig-impact');
    const status=document.getElementById('sig-status');
    const feed=document.getElementById('sig-feed');
    const count=document.getElementById('sig-count');
    const clearBtn=document.getElementById('clear-sig');
    const saveBtn=document.getElementById('save-sig');
    
    function getData(){
      try{ return JSON.parse(localStorage.getItem('savai_testimonials')||'[]'); }catch{ return []; }
    }
    function setData(arr){ localStorage.setItem('savai_testimonials', JSON.stringify(arr)); }
    
    function render(){
      const data=getData();
      count.textContent=data.length;
      feed.innerHTML='';
      if(data.length===0){
        feed.innerHTML=`<div class="sig-empty">No marks yet. Be the first to sign — it shows future clients this studio is active and trusted.</div>`;
        return;
      }
      data.slice().reverse().forEach((d,i)=>{
        const card=document.createElement('div');
        card.className='sig-card';
        card.style.setProperty('--r', ((i%5)-2)*1.2+'deg');
        card.innerHTML=`
          <img class="sig" src="${d.sig}" alt="signature" />
          <div class="quote">"${(d.impact||'').replace(/</g,'&lt;')}"</div>
          <div class="meta">${(d.name||'Anonymous').replace(/</g,'&lt;')}</div>
          <div class="cred">${(d.cred||'').replace(/</g,'&lt;')} • ${new Date(d.date).toLocaleDateString()}</div>
        `;
        feed.appendChild(card);
      });
    }
    
    clearBtn.onclick=()=>{
      const rect=wrap.getBoundingClientRect();
      ctx.clearRect(0,0,rect.width,rect.height);
      // redraw background grid via css already
    };
    
    saveBtn.onclick=()=>{
      const rect=wrap.getBoundingClientRect();
      // check if canvas has ink by checking dataURL length and pixel check
      const blank=canvas.toDataURL();
      const tmp=document.createElement('canvas'); tmp.width=canvas.width; tmp.height=canvas.height;
      // quick ink check: sample alpha
      const imgData=ctx.getImageData(0,0, Math.min(300, rect.width), Math.min(200, rect.height));
      let ink=0; for(let i=3;i<imgData.data.length;i+=4){ if(imgData.data[i]>0 || imgData.data[i-1]>0) ink++; if(ink>20) break; }
      // Actually signature draws black so check non-white
      // Simpler: data URL size - blank canvas is ~2k, drawn is >8k
      if(blank.length < 6000){
        status.textContent='Please draw your signature first.';
        status.style.color='#c0563a';
        return;
      }
      if(!nameI.value.trim() || !credI.value.trim()){
        status.textContent='Add your name and role to build trust.';
        status.style.color='#c0563a';
        return;
      }
      if(!impactI.value.trim() || impactI.value.trim().length<10){
        status.textContent='Add how Savai impacted your business (min 10 chars).';
        status.style.color='#c0563a';
        return;
      }
      
      const entry={
        id: Date.now(),
        name: nameI.value.trim(),
        cred: credI.value.trim(),
        impact: impactI.value.trim(),
        sig: blank,
        date: new Date().toISOString()
      };
      const arr=getData();
      arr.push(entry);
      setData(arr);
      render();
      // clear
      ctx.clearRect(0,0,rect.width,rect.height);
      nameI.value=''; credI.value=''; impactI.value='';
      status.textContent='✓ Added to wall — thank you for trusting Savai.';
      status.style.color='#0a7a3a';
      saveBtn.textContent='ADDED ✓';
      setTimeout(()=>{ saveBtn.textContent='LEAVE SIGNATURE + TESTIMONIAL →'; status.textContent=''; }, 2000);
    };
    
    document.getElementById('sig-export').onclick=()=>{
      const data=getData();
      const blob=new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a'); a.href=url; a.download='savai-testimonials.json'; a.click();
    };
    
    render();
    console.log('testimonial wall built');
  }
  
  setTimeout(buildWall, 700);
  window.addEventListener('hashchange', ()=> setTimeout(buildWall, 800));
  setTimeout(buildWall, 900);
  setTimeout(buildWall, 2000);
  new MutationObserver(buildWall).observe(document.body, {childList:true, subtree:true});
})();
