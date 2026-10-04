
(function(){
  const pulseSVG=`<svg class="pulse-line" viewBox="0 0 640 160" xmlns="http://www.w3.org/2000/svg"><path class="pulse-base" d="M0 100 L120 100 L145 40 L170 140 L195 60 L215 100 L320 100 L345 20 L365 150 L390 100 L640 100"/><path class="pulse-path" d="M0 100 L120 100 L145 40 L170 140 L195 60 L215 100 L320 100 L345 20 L365 150 L390 100 L640 100"/></svg>`;

  function enhance(){
    // --- FULL BLEED HERO DRAG FIX ---
    const hero=document.querySelector('.hero2');
    const photo=document.querySelector('.hero2 .photo');
    if(hero && photo){
      hero.style.minHeight='100svh';
      hero.style.position='relative';
      const img=photo.querySelector('img');
      if(img && !document.getElementById('blur-img-full')){
        const blurImg=img.cloneNode(true);
        blurImg.id='blur-img-full';
        blurImg.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 30%;filter:blur(18px) brightness(1.1) saturate(1.3);clip-path:inset(0 0 0 52%);z-index:1;pointer-events:auto;';
        photo.appendChild(blurImg);
        let handle=document.getElementById('focus-handle');
        if(!handle){
          handle=document.createElement('div');
          handle.id='focus-handle';
          handle.style.cssText='position:absolute;top:0;bottom:0;width:4px;background:rgba(255,255,255,0.9);left:52%;z-index:5;cursor:ew-resize;box-shadow:0 0 12px rgba(255,255,255,.8);';
          const label=document.createElement('span');
          label.textContent='';
          label.style.cssText='position:absolute;top:50%;left:16px;transform:translateY(-50%);background:rgba(10,10,10,0.85);color:#fff;padding:10px 14px;font:500 10px Syne,sans-serif;letter-spacing:.2em;white-space:nowrap;border-radius:999px;border:1px solid #fff;pointer-events:auto;';
          handle.appendChild(label);
          photo.appendChild(handle);
        }
        let dragging=false;
        const update=(x)=>{
          const rect=photo.getBoundingClientRect();
          let pct=((x-rect.left)/rect.width)*100;
          pct=Math.max(2,Math.min(98,pct));
          handle.style.left=pct+'%';
          blurImg.style.clipPath=`inset(0 0 0 ${pct}%)`;
          img.style.clipPath=`inset(0 ${100-pct}% 0 0)`;
          img.style.filter='blur(0px) brightness(0.85)';
        };
        // fix: make photo handle events
        photo.style.touchAction='none';
        handle.addEventListener('pointerdown',(e)=>{ dragging=true; handle.setPointerCapture(e.pointerId); e.preventDefault(); });
        window.addEventListener('pointerup',()=>{ dragging=false; });
        window.addEventListener('pointermove',(e)=>{ if(dragging) update(e.clientX); });
        photo.addEventListener('pointerdown',(e)=>{ if(e.target===photo || e.target===img || e.target===blurImg){ dragging=true; update(e.clientX); }});
        // initial
        const r=photo.getBoundingClientRect();
        update(r.left + r.width*0.52);
      }
    }

    // --- HOLD PULSE (keep if not exists) ---
    if(!document.getElementById('hold-pulse-section')){
      const trans=document.querySelector('section.trans') || document.querySelector('section.cloudy');
      if(trans){
        const citySrc=document.querySelector('.hero2 .photo img')?.src || '';
        const holdHTML=`
        <section id="hold-pulse-section" class="home-pulse-section">
          <div class="wrap" style="position:relative; z-index:2;">
            <div class="home-pulse-content">
              <p class="home-kicker">FLATLINE CHECK / 01</p>
              <h2>Your brand is a heartbeat,<br><em>and currently it’s flatlining.</em></h2>
              <div class="home-pulse-card">
                <div class="home-pulse-meta">
                  <span>CARDIOGRAM • HOLD TO REMEMBER</span>
                  <span id="bpm" style="font:700 12px Syne,sans-serif; color:#c0563a;">0 BPM</span>
                </div>
                <div id="pulse-container" class="home-pulse-graph">${pulseSVG}</div>
                <div class="home-pulse-actions">
                  <button id="hold-btn">HOLD TO REMEMBER →</button>
                  <span id="hold-hint">Press and hold to resuscitate</span>
                </div>
              </div>
            </div>
          </div>
          <div class="checker-bg" style="position:absolute; inset:0; opacity:0.04; background-image:url('/legacy/assets/a7a08ca3027f82a8.jpg');"></div>
        </section>`;
        trans.insertAdjacentHTML('beforebegin', holdHTML);
        const btn=document.getElementById('hold-btn');
        const bpm=document.getElementById('bpm');
        let holdInt=null, rate=0;
        const start=()=>{
          if(holdInt) return;
          holdInt=setInterval(()=>{
            rate=Math.min(96, rate+2);
            bpm.textContent=rate+' BPM';
            const cont=document.getElementById('pulse-container');
            cont.style.transform=`scale(${1+rate*0.0015})`;
            const p=document.querySelector('#pulse-container .pulse-path');
            if(p) p.style.animationDuration=`${Math.max(0.35, 3.1-rate*0.025)}s`;
            if(rate>=88){
              clearInterval(holdInt); holdInt=null;
              document.getElementById('hold-hint').textContent='HEARTBEAT RESTORED';
              btn.textContent='STORY REVIVED ✓'; btn.style.background='#c0563a';
            }
          },40);
        };
        const stop=()=>{
          if(holdInt){ clearInterval(holdInt); holdInt=null; }
          if(rate<88){
            const dec=setInterval(()=>{
              rate=Math.max(0, rate-5);
              bpm.textContent=rate+' BPM';
              if(rate<=0) clearInterval(dec);
            },40);
          }
        };
        btn.addEventListener('pointerdown', start);
        window.addEventListener('pointerup', stop);
        btn.addEventListener('touchstart', start, {passive:true});
        window.addEventListener('touchend', stop);
      }
    }

    // --- NOTEBOOKS OPEN: SIGNATURE WALL ---
    const studioSection=document.querySelector('.studio-sec');
    if(studioSection && !document.getElementById('signature-wall')){
      const sigHTML=`
      <section id="signature-wall" style="background:#fcfbf8; padding:60px 0 80px; border-top:1.5px solid #0a0a0a; position:relative;">
        <div class="wrap">
          <div style="display:flex; justify-content:space-between; gap:20px; flex-wrap:wrap; align-items:flex-end; margin-bottom:20px;">
            <div>
              <h2 style="font-size:clamp(28px,4vw,48px);">Sign in.</h2>
              <p style="margin-top:8px; color:#5a5a5a; max-width:48ch;">Leave your mark. This is our open notebook — every visitor signs before they sit.</p>
            </div>
            <div style="display:flex; gap:10px;">
              <button id="clear-sig" class="btn ghost" style="padding:10px 18px; font-size:13px;">Clear</button>
              <button id="save-sig" class="btn" style="padding:10px 18px; font-size:13px;">Leave signature →</button>
            </div>
          </div>
          <div style="background:#fff; border:1.5px solid #0a0a0a; border-radius:16px; overflow:hidden; position:relative; box-shadow:0 12px 32px rgba(0,0,0,.06);">
            <canvas id="sig-canvas" width="1200" height="500" style="width:100%; height:420px; display:block; cursor:crosshair; background-image:repeating-linear-gradient(0deg, transparent 0 31px, #00000008 31px 32px), url('/legacy/assets/a7a08ca3027f82a8.jpg'); background-size:auto, 80px; background-blend-mode:normal, multiply; opacity:1;"></canvas>
            <div id="sig-feed" style="position:absolute; inset:0; pointer-events:auto; overflow:hidden;"></div>
          </div>
          <p style="margin-top:12px; font:400 12px Poppins; color:#888;">Signatures are saved locally — refresh to see the wall grow. (No data leaves your browser)</p>
        </div>
      </section>`;
      studioSection.insertAdjacentHTML('afterend', sigHTML);
      if(location.hash==="#/studio/contact"){
        setTimeout(()=>document.getElementById('contact')?.scrollIntoView(), 1100);
      }

      const canvas=document.getElementById('sig-canvas');
      const ctx=canvas.getContext('2d');
      ctx.lineCap='round'; ctx.lineJoin='round'; ctx.strokeStyle='#0a0a0a'; ctx.lineWidth=2.2;
      let drawing=false, last=null;
      const pos=(e)=>{
        const rect=canvas.getBoundingClientRect();
        const scaleX=canvas.width/rect.width;
        const scaleY=canvas.height/rect.height;
        const x=(e.clientX!==undefined? e.clientX : e.touches[0].clientX) - rect.left;
        const y=(e.clientY!==undefined? e.clientY : e.touches[0].clientY) - rect.top;
        return {x:x*scaleX, y:y*scaleY};
      };
      const startDraw=(e)=>{ drawing=true; last=pos(e); };
      const draw=(e)=>{ if(!drawing) return; e.preventDefault(); const p=pos(e); ctx.beginPath(); ctx.moveTo(last.x, last.y); ctx.lineTo(p.x,p.y); ctx.stroke(); last=p; };
      const endDraw=()=>{ drawing=false; };
      canvas.addEventListener('pointerdown', startDraw);
      canvas.addEventListener('pointermove', draw);
      window.addEventListener('pointerup', endDraw);
      canvas.addEventListener('touchstart', startDraw, {passive:false});
      canvas.addEventListener('touchmove', draw, {passive:false});
      canvas.addEventListener('touchend', endDraw);

      // Load previous sigs from localStorage as images
      const feed=document.getElementById('sig-feed');
      const loadWall=()=>{
        feed.innerHTML='';
        try{
          const wall=JSON.parse(localStorage.getItem('savai_wall')||'[]');
          wall.forEach((d,i)=>{
            const img=document.createElement('img');
            img.src=d;
            img.style.cssText=`position:absolute; left:${5+(i*7)%80}%; top:${10+(i*13)%70}%; width:180px; opacity:0.18; transform:rotate(${(i%5-2)*6}deg); filter:contrast(1.2); pointer-events:auto;`;
            feed.appendChild(img);
          });
        }catch(e){}
      };
      loadWall();
      document.getElementById('clear-sig').onclick=()=>{ ctx.clearRect(0,0,canvas.width,canvas.height); };
      document.getElementById('save-sig').onclick=()=>{
        const data=canvas.toDataURL('image/png');
        if(data.length< 10000) return;
        const wall=JSON.parse(localStorage.getItem('savai_wall')||'[]');
        wall.push(data);
        localStorage.setItem('savai_wall', JSON.stringify(wall.slice(-20)));
        ctx.clearRect(0,0,canvas.width,canvas.height);
        loadWall();
        // confetti
        const btn=document.getElementById('save-sig');
        btn.textContent='Signed ✓';
        setTimeout(()=>btn.textContent='Leave signature →', 1200);
      };
    }

    // --- WORK PAGE: revolving night sky video (canvas) ---
    const workHeader=document.querySelector('header.nbhead');
    if(workHeader && workHeader.innerHTML.includes('>Work<') && !document.getElementById('star-canvas')){
      const img=workHeader.querySelector('img');
      if(img){
        img.style.opacity='0';
        const canvas=document.createElement('canvas');
        canvas.id='star-canvas';
        canvas.style.cssText='position:absolute; inset:0; width:100%; height:100%; object-fit:cover;';
        workHeader.style.position='relative'; workHeader.style.overflow='hidden'; workHeader.style.background='#050814';
        workHeader.insertBefore(canvas, img);
        const ctx=canvas.getContext('2d');
        const stars=[];
        for(let i=0;i<300;i++) stars.push({x:Math.random(), y:Math.random(), r:Math.random()*1.6+0.2, tw:Math.random()*Math.PI*2, speed:0.2+Math.random()*0.8});
        let rot=0;
        function resize(){ canvas.width=canvas.offsetWidth*2; canvas.height=canvas.offsetHeight*2; }
        resize(); window.addEventListener('resize', resize);
        (function anim(){
          rot+=0.0006;
          ctx.clearRect(0,0,canvas.width,canvas.height);
          // gradient
          const g=ctx.createLinearGradient(0,0,0,canvas.height);
          g.addColorStop(0,'#0a0e2a'); g.addColorStop(1,'#050814');
          ctx.fillStyle=g; ctx.fillRect(0,0,canvas.width,canvas.height);
          const cx=canvas.width*0.5, cy=canvas.height*0.8;
          stars.forEach(s=>{
            const ang=s.x*Math.PI*2 + rot*s.speed;
            const rad=(s.y*canvas.width*0.7);
            const x=cx+Math.cos(ang)*rad;
            const y=cy+Math.sin(ang)*rad*0.5 - s.y*canvas.height*0.3;
            const tw=Math.sin(Date.now()*0.001 + s.tw)*0.5+0.5;
            ctx.beginPath(); ctx.arc(x,y,s.r*(1+tw*0.6),0,Math.PI*2); ctx.fillStyle=`rgba(255,${200+Math.random()*55},${200+Math.random()*55},${0.4+tw*0.6})`; ctx.fill();
            // milkyway glow
            if(s.r>1.2){
              ctx.beginPath(); ctx.arc(x,y,s.r*4,0,Math.PI*2); ctx.fillStyle=`rgba(120,180,255,${0.06})`; ctx.fill();
            }
          });
          requestAnimationFrame(anim);
        })();
      }
    }

    // --- APPROACH PAGE: waves splashing corners, wet typography ---
    const approachHeader=document.querySelector('header.nbhead');
    if(approachHeader && approachHeader.innerHTML.includes('>Approach<') && !document.getElementById('wave-canvas')){
      const img=approachHeader.querySelector('img');
      if(img){
        img.style.opacity='0.15';
        const canvas=document.createElement('canvas');
        canvas.id='wave-canvas';
        canvas.style.cssText='position:absolute; inset:0; width:100%; height:100%; pointer-events:auto;';
        approachHeader.style.background='#e8f4f8';
        approachHeader.style.position='relative';
        approachHeader.insertBefore(canvas, img.nextSibling);
        const ctx=canvas.getContext('2d');
        function resize(){ canvas.width=approachHeader.offsetWidth*2; canvas.height=approachHeader.offsetHeight*2; }
        resize(); window.addEventListener('resize', resize);
        const drops=[];
        const wetMap=[]; // store wetness for typography effect
        approachHeader.addEventListener('pointermove',(e)=>{
          const rect=approachHeader.getBoundingClientRect();
          const x=(e.clientX-rect.left)/rect.width;
          const y=(e.clientY-rect.top)/rect.height;
          if((x<0.18 && y<0.3) || (x>0.82 && y<0.3) || (x<0.18 && y>0.7) || (x>0.82 && y>0.7)){
            for(let i=0;i<2;i++) drops.push({x: (x+ (Math.random()-0.5)*0.15)*canvas.width, y: y*canvas.height, vx:(Math.random()-0.5)*6, vy:(Math.random()-0.5)*6, r:2+Math.random()*6, life:1});
          }
        });
        // auto splash from corners
        setInterval(()=>{
          const corners=[{x:0.05,y:0.15},{x:0.95,y:0.15},{x:0.05,y:0.85},{x:0.95,y:0.85}];
          const c=corners[Math.floor(Math.random()*4)];
          for(let i=0;i<3;i++) drops.push({x:c.x*canvas.width+ (Math.random()-0.5)*60, y:c.y*canvas.height+ (Math.random()-0.5)*40, vx:(Math.random()-0.5)*8+ (c.x>0.5?-3:3), vy:(Math.random()-0.5)*8, r:3+Math.random()*8, life:1});
        }, 280);
        (function loop(){
          ctx.clearRect(0,0,canvas.width,canvas.height);
          // water blobs cartoon
          drops.forEach((d,i)=>{
            d.x+=d.vx; d.vy+=0.18; d.y+=d.vy; d.vx*=0.98; d.life-=0.012;
            if(d.life<=0){ drops.splice(i,1); return; }
            ctx.beginPath();
            ctx.arc(d.x,d.y,d.r*d.life,0,Math.PI*2);
            ctx.fillStyle=`rgba(111,165,189,${0.5*d.life})`;
            ctx.fill();
            // wet trail
            ctx.beginPath();
            ctx.arc(d.x, d.y+10, d.r*2.5*d.life,0,Math.PI*2);
            ctx.fillStyle=`rgba(111,165,189,${0.08*d.life})`;
            ctx.fill();
          });
          // make typography look wet when drops near center text
          const title=approachHeader.querySelector('h1');
          if(title){
            const wet=drops.filter(d=> Math.abs(d.x-canvas.width*0.5)< canvas.width*0.3 && Math.abs(d.y-canvas.height*0.5)< canvas.height*0.4).length;
            const w=Math.min(1, wet/8);
            title.style.filter=`blur(${w*0.6}px) contrast(${1+w*0.3})`;
            title.style.textShadow=w>0.2 ? `0 0 ${w*12}px rgba(111,165,189,0.6)` : 'none';
          }
          requestAnimationFrame(loop);
        })();
      }
    }
  }
  setTimeout(enhance, 700);
  window.addEventListener('hashchange', ()=>setTimeout(enhance, 700));
  const obs=new MutationObserver(enhance);
  obs.observe(document.body, {childList:true, subtree:true});
})();
