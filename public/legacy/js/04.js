
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
        <div class="epic-city-backdrop" aria-hidden="true">
          <svg viewBox="0 0 1600 560" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <symbol id="city-walker" viewBox="0 0 40 110">
                <circle cx="20" cy="10" r="7" fill="#20201e"/>
                <path d="M15 20 Q20 17 25 20 L29 49 Q21 55 12 49Z" fill="#20201e"/>
                <path class="walker-arm arm-left" d="M15 24 L7 43 L10 58" fill="none" stroke="#20201e" stroke-width="5" stroke-linecap="round"/>
                <path class="walker-arm arm-right" d="M25 24 L33 42 L30 56" fill="none" stroke="#20201e" stroke-width="5" stroke-linecap="round"/>
                <path class="walker-leg leg-left" d="M16 49 L18 77 L9 103" fill="none" stroke="#20201e" stroke-width="5" stroke-linecap="round"/>
                <path class="walker-leg leg-right" d="M25 49 L23 77 L32 103" fill="none" stroke="#20201e" stroke-width="5" stroke-linecap="round"/>
                <path d="M7 104 L3 108 M32 104 L37 108"/>
              </symbol>
              <g id="city-crowd">
                <g class="city-buildings" fill="#40413f">
                  <path d="M0 333h95v-94h30v94h52V214h62v119h34V254h82v79h25V178h96v155h38v-98h56v98h36V225h85v108h36V190h76v143h39V260h65v73h38V215h95v118h31V248h58v85h40V197h90v136h44V268h69v65h42V229h111v104h55v-82h82v82z"/>
                  <path d="M0 333h1600v227H0z" fill="#777570"/>
                  <path d="M0 505h1600v55H0z" fill="#51514f"/>
                </g>
                <g class="city-windows" fill="#d8d2c8">
                  <path d="M135 235h8v12h-8zm18 0h8v12h-8zm-18 23h8v12h-8zm18 0h8v12h-8zm230-58h10v14h-10zm22 0h10v14h-10zm-22 28h10v14h-10zm22 0h10v14h-10zm-22 28h10v14h-10zm22 0h10v14h-10zm205-22h9v13h-9zm19 0h9v13h-9zm-19 26h9v13h-9zm19 0h9v13h-9zm240-61h10v14h-10zm21 0h10v14h-10zm-21 29h10v14h-10zm21 0h10v14h-10zm245 35h10v14h-10zm20 0h10v14h-10zm250-51h9v13h-9zm20 0h9v13h-9z"/>
                </g>
                <path d="M0 333H1600" stroke="#292927" stroke-width="5"/>
                <path d="M0 507H1600" stroke="#ded8ce" stroke-width="5"/>
                <g class="city-people">
                  <use href="#city-walker" x="18" y="365" width="29" height="80"/>
                  <use href="#city-walker" x="94" y="350" width="36" height="99"/>
                  <use href="#city-walker" x="181" y="380" width="26" height="72"/>
                  <use href="#city-walker" x="267" y="351" width="35" height="96"/>
                  <use href="#city-walker" x="350" y="374" width="28" height="77"/>
                  <use href="#city-walker" x="440" y="345" width="39" height="107"/>
                  <use href="#city-walker" x="535" y="368" width="30" height="82"/>
                  <use href="#city-walker" x="625" y="346" width="37" height="102"/>
                  <use href="#city-walker" x="724" y="375" width="28" height="77"/>
                  <use href="#city-walker" x="812" y="350" width="35" height="97"/>
                  <use href="#city-walker" x="900" y="379" width="27" height="74"/>
                  <use href="#city-walker" x="988" y="344" width="39" height="108"/>
                  <use href="#city-walker" x="1080" y="367" width="30" height="83"/>
                  <use href="#city-walker" x="1172" y="349" width="36" height="100"/>
                  <use href="#city-walker" x="1260" y="380" width="27" height="74"/>
                  <use href="#city-walker" x="1350" y="352" width="36" height="98"/>
                  <use href="#city-walker" x="1440" y="372" width="29" height="80"/>
                  <use href="#city-walker" x="1524" y="348" width="38" height="104"/>
                </g>
              </g>
            </defs>
            <g class="city-crowd-track">
              <use href="#city-crowd"/>
              <use href="#city-crowd" x="1600"/>
            </g>
            <g transform="translate(0 -95)">
              <g class="city-crowd-track city-crowd-track-far">
                <use href="#city-crowd"/>
                <use href="#city-crowd" x="1600"/>
              </g>
            </g>
          </svg>
          <span class="city-backdrop-wash"></span>
        </div>
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
