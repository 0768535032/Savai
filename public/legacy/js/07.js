
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
          <p style="font:400 13px Poppins,sans-serif; opacity:0.7; line-height:1.5;">Share your name, role and how Savai helped. We review each submission before it appears on the public wall.</p>
          
          <div id="sig-canvas-wrap">
            <canvas id="sig-canvas" role="img" aria-label="Draw your signature here"></canvas>
            <div style="position:absolute; bottom:6px; right:8px; font:500 8px Syne,sans-serif; letter-spacing:0.15em; opacity:0.4; pointer-events:none;">DRAW ABOVE</div>
          </div>
          <div style="display:flex; gap:8px; margin-top:10px;">
            <button id="clear-sig" type="button" style="flex:0; border:1.5px solid #0a0a0a; background:#fff; padding:8px 14px; font:600 11px Syne,sans-serif; cursor:pointer;">CLEAR</button>
            <div style="flex:1; font:400 10px Poppins,sans-serif; opacity:0.5; display:flex; align-items:center;">Draw your signature, not typed.</div>
          </div>

          <input id="sig-name" class="sig-input" aria-label="Your name" autocomplete="name" placeholder="Your name — e.g., Wanjiku Mwangi" maxlength="120" required />
          <input id="sig-cred" class="sig-input" aria-label="Role and business" autocomplete="organization-title" placeholder="Role & Business — e.g., Founder @ Zuri Organics" maxlength="160" required />
          <textarea id="sig-impact" class="sig-input" aria-label="How Savai impacted your business" rows="3" maxlength="1000" placeholder="How Savai impacted your business — e.g., 'Positioning went from vague to unforgettable. We doubled inquiries in 3 weeks.'" required></textarea>
          <label style="display:flex; gap:9px; align-items:flex-start; margin-top:12px; font:400 12px/1.5 Poppins,sans-serif; color:#555;"><input id="sig-consent" type="checkbox" required style="margin-top:3px;">I agree that my name, role, testimonial and signature may be displayed publicly if approved.</label>
          
          <button id="save-sig" type="button" style="margin-top:14px; width:100%; background:#0a0a0a; color:#fff; border:0; padding:14px; font:700 12px Syne,sans-serif; letter-spacing:0.16em; cursor:pointer; border-radius:0;">LEAVE SIGNATURE + TESTIMONIAL →</button>
          <div id="sig-status" role="status" aria-live="polite" style="font:500 11px Syne,sans-serif; margin-top:8px; min-height:16px;"></div>
        </div>
        <div id="sig-right">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font:700 11px Syne,sans-serif; letter-spacing:0.2em;">WALL • <span id="sig-count">0</span> MARKS</span>
            <button id="sig-refresh" type="button" style="font:500 9px Syne,sans-serif; border:1px solid #0a0a0a; background:transparent; padding:4px 8px; cursor:pointer;">REFRESH</button>
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
        const previous=document.createElement('canvas');
        previous.width=canvas.width;
        previous.height=canvas.height;
        previous.getContext('2d').drawImage(canvas,0,0);
        canvas.width=w; canvas.height=h;
        canvas.style.width=rect.width+'px';
        canvas.style.height=rect.height+'px';
        ctx.setTransform(dpr,0,0,dpr,0,0);
        ctx.lineCap='round'; ctx.lineJoin='round'; ctx.strokeStyle='#0a0a0a'; ctx.lineWidth=2.6;
        ctx.drawImage(previous,0,0,previous.width,previous.height,0,0,rect.width,rect.height);
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
    const consentI=document.getElementById('sig-consent');
    const status=document.getElementById('sig-status');
    const feed=document.getElementById('sig-feed');
    const count=document.getElementById('sig-count');
    const clearBtn=document.getElementById('clear-sig');
    const saveBtn=document.getElementById('save-sig');

    const client=window.savaiSupabase;
    const bucket='studio-signatures';
    function setStatus(message,isError=false){
      status.textContent=message;
      status.style.color=isError?'#c0563a':'#0a7a3a';
    }

    async function render(){
      feed.innerHTML='';
      if(!client){
        count.textContent='—';
        feed.textContent='The signature wall is not connected right now. Please try again later.';
        setStatus('Signature submissions are temporarily unavailable.',true);
        return;
      }

      feed.textContent='Loading approved signatures…';
      try{
        const {data,error}=await client
          .from('studio_testimonials')
          .select('id,name,role,impact,signature_path,status,created_at')
          .eq('status','approved')
          .order('created_at',{ascending:false})
          .limit(30);
        if(error) throw error;

        let signedUrls=[];
        if(data.length){
          const {data:signedData,error:signedError}=await client.storage.from(bucket).createSignedUrls(data.map(item=>item.signature_path),3600);
          if(signedError) throw signedError;
          if(!signedData||signedData.length!==data.length||signedData.some(item=>item.error||!item.signedUrl)){
            throw new Error('One or more approved signature images could not be signed.');
          }
          signedUrls=signedData;
        }

        count.textContent=String(data.length);
        if(!data.length){
          feed.innerHTML='<div class="sig-empty">No approved signatures yet. Leave your mark to be considered for the wall.</div>';
          return;
        }
        data.forEach((entry,index)=>{
          const card=document.createElement('div');
          card.className='sig-card';
          card.style.setProperty('--r', ((index%5)-2)*1.2+'deg');
          const image=document.createElement('img');
          image.className='sig';
          image.src=signedUrls[index].signedUrl;
          image.alt='Signature from '+entry.name;
          const quote=document.createElement('div');
          quote.className='quote';
          quote.textContent='"'+entry.impact+'"';
          const name=document.createElement('div');
          name.className='meta';
          name.textContent=entry.name;
          const role=document.createElement('div');
          role.className='cred';
          role.textContent=entry.role+' • '+new Date(entry.created_at).toLocaleDateString();
          card.append(image,quote,name,role);
          feed.appendChild(card);
        });
      }catch(error){
        console.error('Unable to load approved studio testimonials.',error);
        count.textContent='—';
        feed.textContent='The signature wall is unavailable right now. Please try again later.';
      }
    }

    clearBtn.onclick=()=>{
      const rect=wrap.getBoundingClientRect();
      ctx.clearRect(0,0,rect.width,rect.height);
    };

    document.getElementById('sig-refresh').onclick=()=>{void render();};

    function canvasBlob(){
      return new Promise((resolve,reject)=>{
        canvas.toBlob(blob=>{
          if(blob) resolve(blob);
          else reject(new Error('The signature image could not be created.'));
        },'image/png');
      });
    }

    saveBtn.onclick=async()=>{
      if(!client){
        setStatus('Signature submissions are temporarily unavailable. Please try again later.',true);
        return;
      }
      const hasInk=ctx.getImageData(0,0,canvas.width,canvas.height).data.some((value,index)=>index%4===3&&value>0);
      if(!hasInk){
        setStatus('Please draw your signature first.',true);
        return;
      }
      const name=nameI.value.trim();
      const role=credI.value.trim();
      const impact=impactI.value.trim();
      if(!name||name.length>120||!role||role.length>160){
        setStatus('Add a name (up to 120 characters) and role or business (up to 160 characters).',true);
        return;
      }
      if(impact.length<10||impact.length>1000){
        setStatus('Tell us how Savai impacted your business (10–1,000 characters).',true);
        return;
      }
      if(!consentI.checked){
        setStatus('Please agree to the public display terms before submitting.',true);
        return;
      }

      saveBtn.disabled=true;
      saveBtn.textContent='SUBMITTING…';
      setStatus('Submitting your signature for review…');
      try{
        const blob=await canvasBlob();
        if(blob.size>262144){
          throw new Error('The signature image is too large. Please clear it and draw a simpler signature.');
        }
        const id=crypto.randomUUID();
        const signaturePath=id+'.png';
        const {error:uploadError}=await client.storage.from(bucket).upload(signaturePath,blob,{contentType:'image/png',upsert:false});
        if(uploadError) throw uploadError;
        const {error:insertError}=await client.from('studio_testimonials').insert({
          id,
          name,
          role,
          impact,
          signature_path:signaturePath,
          status:'pending'
        });
        if(insertError) throw insertError;

        const rect=wrap.getBoundingClientRect();
        ctx.clearRect(0,0,rect.width,rect.height);
        nameI.value='';
        credI.value='';
        impactI.value='';
        consentI.checked=false;
        setStatus('Thank you. Your signature was submitted and will appear on the wall if approved.');
      }catch(error){
        console.error('Unable to submit studio testimonial.',error);
        setStatus(error instanceof Error&&error.message.includes('too large')
          ?error.message
          :'We could not submit your signature. Please try again later.',true);
      }finally{
        saveBtn.disabled=false;
        saveBtn.textContent='LEAVE SIGNATURE + TESTIMONIAL →';
      }
    };

    void render();
  }
  
  setTimeout(buildWall, 700);
  window.addEventListener('hashchange', ()=> setTimeout(buildWall, 800));
  setTimeout(buildWall, 900);
  setTimeout(buildWall, 2000);
  new MutationObserver(buildWall).observe(document.body, {childList:true, subtree:true});
})();
