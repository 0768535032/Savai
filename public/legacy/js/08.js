
(function(){
  function initTagline(){
    const wrap=document.getElementById('tagline-wrap');
    const orange=document.getElementById('tagline-orange');
    const split=document.getElementById('tagline-split');
    const handle=document.getElementById('focus-handle');
    const photo=document.querySelector('.hero2 .photo');
    if(!wrap||!orange||!split||!handle||!photo) return;
    
    // Palette: shifting colors as drag moves left (night) to right (light)
    // Left = night = warm orange, Right = light = cool and bright
    const palette=[
      {pct:0, color:'#FF6B35'}, // orange night
      {pct:15, color:'#FF2D55'}, // hot pink
      {pct:30, color:'#AF52DE'}, // purple
      {pct:50, color:'#FF3B30'}, // red
      {pct:65, color:'#FF9500'}, // amber
      {pct:80, color:'#FFCC02'}, // yellow
      {pct:100, color:'#5AC8FA'} // sky blue daylight
    ];
    
    function lerpColor(c1,c2,t){
      const h1=parseInt(c1.slice(1,3),16), s1=parseInt(c1.slice(3,5),16), l1=parseInt(c1.slice(5,7),16);
      const h2=parseInt(c2.slice(1,3),16), s2=parseInt(c2.slice(3,5),16), l2=parseInt(c2.slice(5,7),16);
      const r=Math.round(h1+(h2-h1)*t), g=Math.round(s1+(s2-s1)*t), b=Math.round(l1+(l2-l1)*t);
      return `rgb(${r},${g},${b})`;
    }
    
    function colorAt(pct){
      // pct 0-100 (handle position left to right)
      // find segment
      for(let i=0;i<palette.length-1;i++){
        const a=palette[i], b=palette[i+1];
        if(pct>=a.pct && pct<=b.pct){
          const t=(pct-a.pct)/(b.pct-a.pct);
          return lerpColor(a.color,b.color,t);
        }
      }
      return palette[palette.length-1].color;
    }
    
    function updateTaglineColor(handleX, handlePct){
      const tagRect=wrap.getBoundingClientRect();
      let clipPct=((handleX - tagRect.left)/tagRect.width)*100;
      clipPct=Math.max(0,Math.min(100,clipPct));
      split.style.clipPath=`inset(0 ${100-clipPct}% 0 0)`;
      
      // Shifting palette for orange layer based on handlePct (0=left night, 100=right light)
      const c=colorAt(handlePct);
      orange.style.color=c;
      // Shadow that matches color
      const shadowColor=c.replace('rgb','rgba').replace(')',',0.22)');
      orange.style.textShadow=`0 2px 0 rgba(0,0,0,0.14), 0 10px 28px rgba(0,0,0,0.28), 0 2px 50px ${shadowColor}, 0 0 80px ${shadowColor}`;
      
      // Split layer also gets a shifting tint but keeps readability (white/black base with color glow)
      const isLight=document.documentElement.getAttribute('data-theme')==='light';
      if(isLight){
        split.style.color='#0a0a0a';
        split.style.textShadow=`0 2px 0 rgba(255,255,255,0.5), 0 8px 24px rgba(0,0,0,0.15), 0 0 40px ${shadowColor}`;
      } else {
        split.style.color='#fff';
        split.style.textShadow=`0 2px 8px rgba(0,0,0,0.6), 0 10px 28px rgba(0,0,0,0.5), 0 0 60px ${shadowColor}`;
      }
    }
    
    function checkHandle(){
      const photoRect=photo.getBoundingClientRect();
      const handleRect=handle.getBoundingClientRect();
      const handleCenter=handleRect.left + handleRect.width/2;
      let handlePct=((handleCenter - photoRect.left)/photoRect.width)*100;
      handlePct=Math.max(0,Math.min(100,handlePct));
      updateTaglineColor(handleCenter, handlePct);
    }
    
    setInterval(checkHandle, 16);
    window.addEventListener('pointermove', checkHandle);
    window.addEventListener('resize', checkHandle);
    setTimeout(checkHandle, 600);
  }
  
  setTimeout(initTagline, 900);
  window.addEventListener('hashchange', ()=> setTimeout(initTagline, 900));
  setTimeout(initTagline, 1200);
})();
