
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
                <g class="city-details" fill="none" stroke="#272a29" stroke-linecap="round">
                  <path d="M46 239v-15h22v15m382-61v-17h28v17m424 25v-19h26v19m402 17v-14h30v14" stroke-width="4"/>
                  <path d="M0 278c90-22 140 17 225-3s142 11 220-7 155 16 240-5 152 15 238-5 160 14 240-6 153 13 237-5 140 3 200-8" stroke-width="2" opacity=".58"/>
                </g>
                <g class="city-practical-lights">
                  <g>
                    <path d="M28 294h67v39H28z" fill="#b95f43"/>
                    <path d="M24 291h75v8H24z" fill="#e5a64b"/>
                    <path d="M36 305h21v20H36zm31 0h23v28H67z" fill="#ffd16e"/>
                    <path d="M39 308h15v14H39zm34 0h17v21H73z" fill="#63a7aa"/>
                    <path d="M104 303h66v30h-66z" fill="#426f7d"/>
                    <path d="M109 308h20v17h-20zm29 0h26v17h-26z" fill="#e4a05d"/>
                    <rect class="city-flicker city-light-amber" x="31" y="280" width="61" height="9" rx="2" fill="#e7ad43"/>
                    <path d="M36 282h50" stroke="#51382e" stroke-width="2" stroke-dasharray="3 4"/>
                  </g>
                  <g>
                    <path d="M292 301h60v32h-60z" fill="#bd6549"/>
                    <path d="M298 307h18v18h-18zm27 0h19v18h-19z" fill="#ffd47f"/>
                    <rect class="city-flicker city-light-coral" x="297" y="289" width="49" height="8" rx="2" fill="#dc7c53"/>
                    <path d="M307 291h29" stroke="#fff0d2" stroke-width="2" stroke-dasharray="5 3"/>
                  </g>
                  <g fill="none" stroke="#30312e" stroke-width="4">
                    <path d="M510 294v84m-9-84h18"/>
                    <path d="M1112 278v103m-10-103h20"/>
                  </g>
                  <g class="city-lamp-glow">
                    <circle class="city-flicker city-light-amber" cx="510" cy="292" r="21" fill="#f5bd59" opacity=".62"/>
                    <circle cx="510" cy="292" r="6" fill="#fff0bd"/>
                    <circle class="city-flicker city-light-blue" cx="1112" cy="276" r="22" fill="#69b6ca" opacity=".58"/>
                    <circle cx="1112" cy="276" r="6" fill="#d5fff3"/>
                  </g>
                  <g class="city-matatu">
                    <path d="M684 452h124l-9-36q-3-10-14-10h-85q-9 0-12 10z" fill="#397f91"/>
                    <path d="M698 413h31v24h-36zm39 0h33q8 0 11 8l4 16h-48z" fill="#e8c77c"/>
                    <path d="M687 439h116v9H687z" fill="#dc6849"/>
                    <path d="M706 449a11 11 0 1 0 22 0m48 0a11 11 0 1 0 22 0" fill="#282825" stroke="#282825" stroke-width="5"/>
                    <circle class="city-flicker city-light-amber" cx="685" cy="437" r="4" fill="#ffe5a2"/>
                    <circle class="city-flicker city-light-coral" cx="805" cy="437" r="4" fill="#ffc46e"/>
                  </g>
                  <g class="city-flicker city-light-blue" fill="#75c5ce">
                    <rect x="905" y="301" width="35" height="6" rx="3"/>
                    <rect x="1238" y="267" width="28" height="6" rx="3"/>
                  </g>
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
