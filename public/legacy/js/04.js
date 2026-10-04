
(function(){
  function injectEpic(){
    const trans=document.querySelector('section.cloudy.trans') || document.querySelector('section.trans');
    if(!trans) return;
    if(document.getElementById('epic-reveal-section')) return;

    // Build epic transition
    const epicHTML=`
      <div class="checker-strip"></div>
      <div class="nairobi-band">
        <div class="nai">NAI<span class="heart">♥</span>ROBI</div>
        <div class="frame">FRAME 01 / DREAMS ARE NOT ILLEGAL HERE • POSITION IS MEMORY • HOLD TO REMEMBER</div>
      </div>
      <section id="epic-reveal-section" class="epic-reveal">
        <div class="marquee">POSITION • MEMORY • POSITION • MEMORY • POSITION • MEMORY</div>
        <div class="epic-reveal-inner">
          <div style="display:inline-block; background:#0a0a0a; color:#fff; padding:6px 12px; border-radius:999px; font:500 10px Syne,sans-serif; letter-spacing:0.2em; margin-bottom:24px;">THE PROBLEM</div>
          <h2>Good products don't guarantee <em>good positions.</em></h2>
          <p class="sub">The business exists. The city can see it. But nobody has a <strong>clear view</strong> of why it should be chosen. <br><br>That's not a design problem. That's a memory problem. If they can't place you in their story, they can't choose you.</p>
          <div style="margin-top:36px; display:flex; gap:12px; align-items:center;">
            <div style="width:44px; height:1.5px; background:#0a0a0a;"></div>
            <span style="font:500 11px Syne,sans-serif; letter-spacing:0.18em;">SCROLL TO POSITION</span>
          </div>
        </div>
      </section>
      <div class="checker-strip" style="height:14px; background-size:32px;"></div>
    `;

    // Replace the trans section content? Keep trans but insert before it and hide its original background
    trans.insertAdjacentHTML('beforebegin', epicHTML);
    // Hide original trans's bland background and restyle it as part of epic flow
    trans.style.background='#f4f2ee';
    trans.style.padding='0';
    trans.style.border='0';
    const inner=trans.querySelector('.wrap');
    if(inner) inner.style.display='none';

    // Also restyle pulse section to connect better
    const pulseSec=document.getElementById('hold-pulse-section');
    if(pulseSec){
      pulseSec.style.background='#0a0a0a';
      pulseSec.style.color='#fff';
      pulseSec.style.borderTop='1.5px solid #0a0a0a';
      pulseSec.style.borderBottom='0';
      // Make card more alive
      const card=pulseSec.querySelector('div[style*="background:#fff"]');
      if(card){
        card.style.background='#111';
        card.style.borderColor='#333';
        card.style.color='#fff';
        const cont=card.querySelector('#pulse-container');
        if(cont) cont.style.background='#1a1a1a';
      }
    }
  }
  setTimeout(injectEpic, 600);
  window.addEventListener('hashchange', ()=> setTimeout(injectEpic, 700));
  setTimeout(injectEpic, 800);
})();
