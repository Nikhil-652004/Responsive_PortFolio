// Cartoon mascot (inline SVG, no images): soft, painted anime look - tousled black hair built from layered,
// individually shaded locks with a cool rim light, thick feathered brows, big glossy blue eyes, warm skin with
// rosy cheeks, black hoodie with drawstrings. Hair paths are generated (scratchpad tools/hair.py) and baked in.
// TOON_SVG: big bust, framed like the 900x754 hero photo, used for the hand-off from the photo.
// WALKER_SVG: small full-body version that walks the page. Both share part classes so moods work on either:
// main.js sets data-mood on each <svg> and moves .pupil / .t-head; styles.css maps moods and poses to parts.

const TOON_SVG = `
<svg class="toon bust" viewBox="0 0 900 754" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
  <defs>
    <radialGradient id="tSkin" cx=".42" cy=".4" r=".78"><stop offset="0" stop-color="#f2c1a0"/><stop offset=".5" stop-color="#e0a07a"/><stop offset="1" stop-color="#b9764f"/></radialGradient>
    <linearGradient id="tNeck" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a5a38"/><stop offset=".7" stop-color="#cc8c66"/></linearGradient>
    <radialGradient id="tBlush" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff7d6e" stop-opacity=".5"/><stop offset="1" stop-color="#ff7d6e" stop-opacity="0"/></radialGradient>
    <linearGradient id="tHairA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#161822"/><stop offset="1" stop-color="#07080b"/></linearGradient>
    <linearGradient id="tHairB" x1="0" y1="0" x2=".4" y2="1"><stop offset="0" stop-color="#262a3a"/><stop offset=".5" stop-color="#12131b"/><stop offset="1" stop-color="#08090d"/></linearGradient>
    <linearGradient id="tHairC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e3347"/><stop offset=".45" stop-color="#151722"/><stop offset="1" stop-color="#0a0b10"/></linearGradient>
    <linearGradient id="tHairD" x1="1" y1="0" x2=".5" y2="1"><stop offset="0" stop-color="#1d2030"/><stop offset="1" stop-color="#0b0c11"/></linearGradient>
    <radialGradient id="tIris" cx=".5" cy=".55" r=".55"><stop offset="0" stop-color="#5a9bff"/><stop offset=".5" stop-color="#2156c6"/><stop offset=".92" stop-color="#0c2466"/><stop offset="1" stop-color="#061233"/></radialGradient>
    <linearGradient id="tHood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#262731"/><stop offset="1" stop-color="#0d0e12"/></linearGradient>
    <linearGradient id="tJeans" x1="0" x2="1"><stop offset="0" stop-color="#2d3c58"/><stop offset=".5" stop-color="#3b4d70"/><stop offset="1" stop-color="#2a3852"/></linearGradient>
    <filter id="tBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9"/></filter>
    <filter id="tBlurS" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3"/></filter>
    <linearGradient id="tFadeG" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="754"><stop offset=".7" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
    <mask id="tFade" maskUnits="userSpaceOnUse" x="-300" y="-400" width="1500" height="1154"><rect x="-300" y="-400" width="1500" height="1154" fill="url(#tFadeG)"/></mask>
    <clipPath id="tEyeL"><path d="M366 214 Q380 190 405 188 Q428 189 440 208 Q428 228 404 230 Q380 229 366 214 Z"/></clipPath>
    <clipPath id="tEyeR"><path d="M472 208 Q484 189 507 188 Q531 189 546 210 Q533 227 509 229 Q485 227 472 208 Z"/></clipPath>
  </defs>

  <g mask="url(#tFade)">
  <g class="t-body">
    <path d="M90 754 L104 600 C116 516 176 462 268 444 L380 414 L530 414 L640 444 C734 462 792 516 804 600 L816 754 Z" fill="url(#tHood)"/>
    <path d="M200 560 Q236 650 214 754 L160 754 Q186 650 200 560 Z M712 560 Q676 650 698 754 L752 754 Q726 650 712 560 Z" fill="#050608" opacity=".65" filter="url(#tBlurS)"/>
    <path d="M262 540 Q300 610 292 720 M650 540 Q612 610 620 720" stroke="#2f313c" stroke-width="14" fill="none" opacity=".55" filter="url(#tBlur)"/>
    <path d="M140 580 C160 506 206 470 268 452" stroke="#7c9be0" stroke-width="6" fill="none" opacity=".4" filter="url(#tBlurS)"/>
    <!-- thick rolled hood around the neck -->
    <path d="M266 480 C274 392 360 350 455 350 C550 350 636 392 644 480 C616 446 540 428 455 428 C370 428 294 446 266 480 Z" fill="#191a21"/>
    <path d="M286 462 C300 410 370 384 455 384 C540 384 610 410 624 462" stroke="#3b3e4b" stroke-width="5" fill="none" opacity=".7" filter="url(#tBlurS)"/>
    <path d="M398 318 L396 420 Q455 452 514 420 L512 318 Z" fill="url(#tNeck)"/>
    <path d="M396 318 Q455 392 514 318 L514 382 Q455 420 396 382 Z" fill="#5e2f1a" opacity=".6" filter="url(#tBlur)"/>
    <path d="M388 412 Q455 452 522 412 L520 434 Q455 476 390 434 Z" fill="#0b0c10"/>
    <g class="t-strings">
      <path d="M420 446 Q412 540 413 648 M490 446 Q498 540 497 648" stroke="#2b2c35" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M418 460 Q412 540 412 640" stroke="#4a4c58" stroke-width="2" fill="none" opacity=".7"/>
      <g fill="#c4c9d3"><rect x="407" y="644" width="12" height="30" rx="4"/><rect x="491" y="644" width="12" height="30" rx="4"/></g>
      <path d="M410 648 v22 M494 648 v22" stroke="#fff" stroke-width="2" opacity=".65"/>
      <circle cx="420" cy="444" r="5" fill="#08090c"/><circle cx="490" cy="444" r="5" fill="#08090c"/>
    </g>
  </g>

  <g class="t-head" data-pivot="455 360">
    <path d="M330.0 268.0 C300.0 220.0 292.0 150.0 318.0 100.0 C346.0 46.0 398.0 22.0 456.0 22.0 C516.0 22.0 568.0 48.0 592.0 102.0 C616.0 154.0 606.0 222.0 582.0 268.0Z" fill="url(#tHairA)"/>
    <path d="M325.9 76.7 Q291.7 97.7 265.5 121.6 Q300.8 132.7 340.1 131.5Z" fill="url(#tHairD)"/><path d="M346.7 56.2 Q307.9 64.1 276.2 79.0 Q308.3 91.8 347.3 99.5Z" fill="url(#tHairB)"/><path d="M374.8 34.9 Q329.0 38.7 293.8 33.5 Q321.7 64.3 363.4 75.0Z" fill="url(#tHairD)"/><path d="M399.8 20.2 Q347.5 24.8 318.2 4.6 Q331.1 54.1 374.2 66.0Z" fill="url(#tHairB)"/><path d="M456.8 22.0 Q444.5 -11.9 416.8 -35.4 Q412.3 -4.3 406.4 33.8Z" fill="url(#tHairD)"/><path d="M473.6 24.6 Q444.1 5.2 446.6 -12.2 Q412.5 7.1 424.2 27.6Z" fill="url(#tHairB)"/><path d="M501.0 33.6 Q498.8 7.5 492.9 -14.9 Q473.7 0.9 461.8 23.2Z" fill="url(#tHairD)"/><path d="M536.0 53.5 Q553.1 24.2 551.0 -11.1 Q527.2 6.1 495.5 25.3Z" fill="url(#tHairB)"/><path d="M548.7 79.7 Q574.1 54.0 597.3 42.0 Q566.3 24.1 536.5 33.0Z" fill="url(#tHairD)"/><path d="M565.3 112.2 Q601.4 114.4 633.2 90.2 Q604.4 79.3 569.9 57.2Z" fill="url(#tHairB)"/><path d="M570.6 122.7 Q600.5 101.8 619.0 110.6 Q607.0 73.6 580.7 78.6Z" fill="url(#tHairD)"/>
    <!-- ears -->
    <g><ellipse cx="348" cy="240" rx="19" ry="31" fill="#d18e68"/><path d="M342 222 Q333 240 344 258 Q350 250 348 236" stroke="#9b5a39" stroke-width="4" fill="none" opacity=".6"/></g>
    <g><ellipse cx="562" cy="240" rx="19" ry="31" fill="#c58460"/><path d="M568 222 Q577 240 566 258 Q560 250 562 236" stroke="#8d4f30" stroke-width="4" fill="none" opacity=".6"/></g>
    <!-- face, painted light -->
    <path d="M350 168 C350 112 398 92 455 92 C512 92 560 112 560 168 L560 232 C560 296 520 348 458 362 C392 350 350 298 350 232 Z" fill="url(#tSkin)"/>
    <path d="M532 150 C566 200 562 286 516 336 C506 296 516 224 500 160 Z" fill="#8d4c2d" opacity=".3" filter="url(#tBlur)"/>
    <path d="M356 250 C362 300 396 340 440 356 C404 330 380 300 372 256 Z" fill="#8d4c2d" opacity=".2" filter="url(#tBlur)"/>
    <path d="M350 134 Q455 196 560 134 L560 196 Q455 248 350 196 Z" fill="#7a3d22" opacity=".42" filter="url(#tBlur)"/>
    <ellipse class="t-blush" cx="388" cy="270" rx="42" ry="24" fill="url(#tBlush)"/>
    <ellipse class="t-blush" cx="530" cy="268" rx="38" ry="22" fill="url(#tBlush)"/>
    <ellipse cx="455" cy="334" rx="24" ry="12" fill="#fff" opacity=".12" filter="url(#tBlurS)"/>
    <path d="M340.8 115.1 Q341.4 183.2 335.5 237.8 Q362.2 187.0 373.2 120.9Z" fill="url(#tHairB)"/><path d="M335.8 133.6 Q352.1 196.2 349.2 247.0 Q372.8 196.7 368.2 134.4Z" fill="url(#tHairD)"/><path d="M327.2 149.3 Q343.3 200.7 343.6 242.3 Q368.6 201.6 366.8 150.7Z" fill="url(#tHairB)"/><path d="M326.1 165.6 Q338.0 216.1 339.5 257.2 Q358.3 216.6 357.9 166.4Z" fill="url(#tHairD)"/><path d="M537.0 120.8 Q548.3 196.8 577.2 255.4 Q568.8 193.2 569.0 115.2Z" fill="url(#tHairB)"/><path d="M542.1 136.0 Q541.2 206.4 573.8 259.9 Q561.5 203.9 573.9 132.0Z" fill="url(#tHairD)"/><path d="M546.1 152.4 Q552.7 206.2 576.6 247.7 Q574.4 203.2 579.9 147.6Z" fill="url(#tHairB)"/><path d="M551.9 164.6 Q540.2 216.0 559.8 260.7 Q560.8 217.8 584.1 167.4Z" fill="url(#tHairD)"/>
    <!-- nose -->
    <path d="M470 222 Q480 248 468 264" stroke="#9a5636" stroke-width="6" fill="none" opacity=".35" filter="url(#tBlurS)"/>
    <path d="M444 266 Q456 274 470 265" stroke="#8d4c2d" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".55"/>
    <ellipse cx="455" cy="254" rx="7" ry="5" fill="#fff" opacity=".45" filter="url(#tBlurS)"/>
    <!-- brows: thick, feathered -->
    <g class="t-brow-l"><path d="M362 182 Q390 160 436 166 L435 178 Q394 173 366 192 Z" fill="#14151b" opacity=".6" filter="url(#tBlurS)"/><path d="M366 182 Q392 162 434 168 L433 176 Q394 172 369 189 Z" fill="#101116"/></g>
    <g class="t-brow-r"><path d="M474 166 Q520 160 548 182 L544 192 Q516 173 475 178 Z" fill="#14151b" opacity=".6" filter="url(#tBlurS)"/><path d="M476 168 Q518 162 545 182 L542 189 Q516 172 477 176 Z" fill="#101116"/></g>
    
    <g class="t-eye t-eye-l">
      <path d="M366 214 Q380 190 405 188 Q428 189 440 208 Q428 228 404 230 Q380 229 366 214 Z" fill="#fdf8f4"/>
      <g clip-path="url(#tEyeL)">
        <g class="pupil" data-range="6 4">
          <circle cx="404" cy="210" r="18.5" fill="url(#tIris)"/>
          <ellipse cx="404" cy="219" rx="12" ry="6" fill="#7ab8ff" opacity=".55" filter="url(#tBlurS)"/>
          <circle cx="404" cy="210" r="7.5" fill="#030716"/>
          <ellipse cx="411" cy="202" rx="6" ry="5" fill="#fff"/><circle cx="397" cy="218" r="2.4" fill="#fff" opacity=".85"/>
        </g>
        <path d="M350 170 H560 V198 Q455 212 350 198 Z" fill="#2a1408" opacity=".38" filter="url(#tBlurS)"/>
      </g>
      <path d="M356 204 L362 210 Q376 182 406 181 Q434 182 447 202 L441 207 Q429 193 405 193 Q382 195 368 216 Z" fill="#0d0e13"/>
      <path d="M372 190 Q402 170 438 186" stroke="#8a5236" stroke-width="2.5" fill="none" opacity=".45"/>
      <path d="M384 230 Q404 236 424 227" stroke="#6b3f2c" stroke-width="2" fill="none" opacity=".3"/>
    </g>
    
    <g class="t-eye t-eye-r">
      <path d="M472 208 Q484 189 507 188 Q531 189 546 210 Q533 227 509 229 Q485 227 472 208 Z" fill="#fdf8f4"/>
      <g clip-path="url(#tEyeR)">
        <g class="pupil" data-range="6 4">
          <circle cx="509" cy="208" r="18.5" fill="url(#tIris)"/>
          <ellipse cx="509" cy="217" rx="12" ry="6" fill="#7ab8ff" opacity=".55" filter="url(#tBlurS)"/>
          <circle cx="509" cy="208" r="7.5" fill="#030716"/>
          <ellipse cx="516" cy="200" rx="6" ry="5" fill="#fff"/><circle cx="502" cy="216" r="2.4" fill="#fff" opacity=".85"/>
        </g>
        <path d="M350 170 H560 V198 Q455 212 350 198 Z" fill="#2a1408" opacity=".38" filter="url(#tBlurS)"/>
      </g>
      <path d="M465 203 Q480 182 507 181 Q537 182 554 206 L560 200 L551 213 Q534 194 508 193 Q485 195 471 210 Z" fill="#0d0e13"/>
      <path d="M476 184 Q512 168 544 190" stroke="#8a5236" stroke-width="2.5" fill="none" opacity=".45"/>
      <path d="M489 228 Q509 234 529 225" stroke="#6b3f2c" stroke-width="2" fill="none" opacity=".3"/>
    </g>
    <path class="t-shut t-shut-l" d="M364 214 Q402 232 442 210" stroke="#0d0e13" stroke-width="7" stroke-linecap="round" fill="none"/>
    <path class="t-shut t-shut-r" d="M470 208 Q508 228 548 210" stroke="#0d0e13" stroke-width="7" stroke-linecap="round" fill="none"/>
    <path class="t-joy" d="M368 220 Q402 192 438 218 M474 216 Q508 188 546 216" stroke="#0d0e13" stroke-width="7" stroke-linecap="round" fill="none"/>
    <!-- mouth (one visible per mood): a soft closed smile by default -->
    <g class="mo mo-smile">
      <path d="M432 300 Q458 312 486 292" stroke="#7d3b2c" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <path d="M440 306 Q460 322 478 304 Q460 312 440 306 Z" fill="#d98a7a" opacity=".55"/>
      <path d="M446 312 Q458 316 468 311" stroke="#fff" stroke-width="2" fill="none" opacity=".35"/>
    </g>
    <g class="mo mo-grin"><path d="M420 290 Q455 326 490 288 Q455 298 420 290 Z" fill="#6e2e26"/><path d="M426 292 Q455 302 484 291 Q455 296 426 292 Z" fill="#fff"/></g>
    <g class="mo mo-laugh"><path d="M416 286 Q455 346 494 284 Q455 296 416 286 Z" fill="#6e2e26"/><path d="M424 289 Q455 300 486 287 Q455 294 424 289 Z" fill="#fff"/><ellipse cx="455" cy="320" rx="16" ry="8" fill="#e07a70"/></g>
    <ellipse class="mo mo-o" cx="455" cy="302" rx="11" ry="14" fill="#6e2e26"/>
    <path class="mo mo-smirk" d="M432 302 Q462 306 488 288" stroke="#7d3b2c" stroke-width="4.5" stroke-linecap="round" fill="none"/>
    <g class="t-fringe"><path d="M346.0 182.0 C340.0 110.0 390.0 56.0 455.0 50.0 C520.0 56.0 572.0 110.0 564.0 182.0 C540.0 140.0 500.0 118.0 455.0 116.0 C410.0 118.0 370.0 140.0 346.0 182.0Z" fill="url(#tHairA)"/><path d="M369.9 35.3 Q358.2 85.3 352.0 128.8 Q400.8 117.2 436.5 85.1Z" fill="url(#tHairD)"/><path d="M381.3 29.4 Q373.1 86.5 363.2 131.2 Q417.5 116.4 450.7 76.0Z" fill="url(#tHairC)"/><path d="M411.4 32.0 Q403.0 85.9 389.4 125.6 Q438.2 108.9 466.4 68.0Z" fill="url(#tHairC)"/><path d="M441.1 32.5 Q446.3 86.0 438.6 124.9 Q485.4 102.1 502.1 57.7Z" fill="url(#tHairB)"/><path d="M461.1 25.5 Q453.9 83.4 447.6 130.5 Q492.9 102.4 522.0 55.3Z" fill="url(#tHairC)"/><path d="M474.0 37.1 Q477.7 89.9 472.7 129.8 Q518.1 106.6 537.1 63.2Z" fill="url(#tHairC)"/><path d="M506.4 43.7 Q506.2 99.6 500.0 142.8 Q546.1 117.2 568.9 71.2Z" fill="url(#tHairD)"/><path d="M526.4 49.8 Q530.7 104.3 525.7 145.7 Q571.4 120.2 590.1 74.5Z" fill="url(#tHairC)"/><path d="M335.4 118.3 Q328.6 139.1 335.7 162.0 Q350.0 148.9 368.9 133.5Z" fill="url(#tHairC)"/><path d="M344.1 108.7 Q353.1 156.8 353.2 195.0 Q380.8 161.0 387.4 115.3Z" fill="url(#tHairB)"/><path d="M375.8 102.4 Q389.9 144.3 382.9 175.2 Q415.8 149.3 416.2 110.1Z" fill="url(#tHairC)"/><path d="M381.4 99.7 Q371.6 135.9 386.3 170.5 Q396.5 141.3 420.3 108.2Z" fill="url(#tHairC)"/><path d="M413.4 98.0 Q416.9 150.4 400.1 185.9 Q438.7 158.4 447.3 110.6Z" fill="url(#tHairD)"/><path d="M414.6 103.2 Q410.6 163.8 416.5 214.7 Q432.4 166.9 448.6 107.9Z" fill="url(#tHairC)"/><path d="M438.3 100.4 Q437.9 154.8 442.3 200.0 Q460.2 157.9 473.2 105.2Z" fill="url(#tHairC)"/><path d="M453.9 99.3 Q437.7 154.2 449.0 205.9 Q466.5 162.1 499.0 111.6Z" fill="url(#tHairB)"/><path d="M467.4 99.2 Q454.6 149.6 461.7 195.6 Q479.7 156.5 506.6 110.1Z" fill="url(#tHairC)"/><path d="M491.5 98.9 Q483.1 141.2 485.0 179.0 Q509.1 150.8 532.1 113.9Z" fill="url(#tHairC)"/><path d="M493.9 105.4 Q494.1 155.4 492.8 195.9 Q522.3 163.1 538.0 117.5Z" fill="url(#tHairD)"/><path d="M526.2 110.9 Q516.4 146.7 522.8 180.5 Q537.9 153.5 559.9 121.6Z" fill="url(#tHairC)"/><path d="M526.7 117.3 Q531.0 140.1 538.5 159.8 Q558.9 147.7 570.3 129.2Z" fill="url(#tHairC)"/><path d="M393.4 70.4 Q387.4 83.2 375.1 90.2 M414.1 59.6 Q403.2 82.1 392.0 104.5 M431.3 60.1 Q426.7 82.8 411.9 100.7 M451.2 54.4 Q447.3 80.2 437.0 104.1 M473.0 55.5 Q457.6 75.6 445.6 97.9" stroke="#5a6893" stroke-width="3.50" fill="none" stroke-linecap="round" opacity=".38"/><path d="M318.0 236.0 Q299.3 200.3 300.0 160.0 M300.0 160.0 Q305.6 114.6 330.0 76.0" stroke="#8aaeff" stroke-width="6.00" fill="none" stroke-linecap="round" opacity=".5" filter="url(#tBlurS)"/></g>
  </g>
  </g>
</svg>`;

const WALKER_SVG = `
<svg class="toon walker" viewBox="50 30 200 585" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
  <defs>
    <radialGradient id="wSkin" cx=".42" cy=".4" r=".78"><stop offset="0" stop-color="#f2c1a0"/><stop offset=".5" stop-color="#e0a07a"/><stop offset="1" stop-color="#b9764f"/></radialGradient>
    <linearGradient id="wNeck" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a5a38"/><stop offset=".7" stop-color="#cc8c66"/></linearGradient>
    <radialGradient id="wBlush" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff7d6e" stop-opacity=".5"/><stop offset="1" stop-color="#ff7d6e" stop-opacity="0"/></radialGradient>
    <linearGradient id="wHairA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#161822"/><stop offset="1" stop-color="#07080b"/></linearGradient>
    <linearGradient id="wHairB" x1="0" y1="0" x2=".4" y2="1"><stop offset="0" stop-color="#262a3a"/><stop offset=".5" stop-color="#12131b"/><stop offset="1" stop-color="#08090d"/></linearGradient>
    <linearGradient id="wHairC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e3347"/><stop offset=".45" stop-color="#151722"/><stop offset="1" stop-color="#0a0b10"/></linearGradient>
    <linearGradient id="wHairD" x1="1" y1="0" x2=".5" y2="1"><stop offset="0" stop-color="#1d2030"/><stop offset="1" stop-color="#0b0c11"/></linearGradient>
    <radialGradient id="wIris" cx=".5" cy=".55" r=".55"><stop offset="0" stop-color="#5a9bff"/><stop offset=".5" stop-color="#2156c6"/><stop offset=".92" stop-color="#0c2466"/><stop offset="1" stop-color="#061233"/></radialGradient>
    <linearGradient id="wHood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#262731"/><stop offset="1" stop-color="#0d0e12"/></linearGradient>
    <linearGradient id="wJeans" x1="0" x2="1"><stop offset="0" stop-color="#2d3c58"/><stop offset=".5" stop-color="#3b4d70"/><stop offset="1" stop-color="#2a3852"/></linearGradient>
    <filter id="wBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3"/></filter>
    <filter id="wBlurS" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.2"/></filter>
    <linearGradient id="wChute" x1="0" x2="1"><stop offset="0" stop-color="#d9545f"/><stop offset=".33" stop-color="#d9545f"/><stop offset=".33" stop-color="#f6eedc"/><stop offset=".67" stop-color="#f6eedc"/><stop offset=".67" stop-color="#f2bd4f"/><stop offset="1" stop-color="#f2bd4f"/></linearGradient>
    <clipPath id="wEyeL"><path d="M122 126 Q127 117 135 117 Q143 118 146 125 Q141 132 134 132 Q126 131 122 126 Z"/></clipPath>
    <clipPath id="wEyeR"><path d="M154 125 Q157 118 165 117 Q173 117 178 126 Q174 131 166 132 Q159 131 154 125 Z"/></clipPath>
  </defs>

  <!-- parachute for long drops (hidden unless .parachuting) -->
  <g class="t-chute">
    <path d="M50 -40 L62 85 M110 -50 L62 85 M190 -50 L238 85 M250 -40 L238 85" stroke="#efe5cf" stroke-width="1.6"/>
    <path d="M40 -40 Q150 -175 260 -40 Q232 -58 205 -40 Q178 -58 150 -40 Q122 -58 95 -40 Q68 -58 40 -40 Z" fill="url(#wChute)" stroke="#6a4c3b" stroke-width="1.2"/>
    <path d="M75 -70 Q150 -150 225 -70" stroke="#fff" stroke-width="3" fill="none" opacity=".35" stroke-linecap="round"/>
  </g>

  <g class="t-body">
    <path d="M102 328 H198 V360 H102 Z" fill="#2d3c58"/>
    <g class="t-leg t-leg-l">
      <path d="M102 328 L148 328 L146 450 L142 586 L116 586 L109 450 Z" fill="url(#wJeans)"/>
      <path d="M112 584 h33 c4 0 6 8 4 14 c-1 4 -5 6 -9 6 h-37 c-7 0 -9 -8 -3 -13 z" fill="#f2f0ec"/>
      <path d="M101 602 h46 v3 h-46 z" fill="#b9b6b0"/>
    </g>
    <g class="t-leg t-leg-r">
      <path d="M152 328 L198 328 L191 450 L184 586 L158 586 L154 450 Z" fill="url(#wJeans)"/>
      <path d="M188 584 h-33 c-4 0 -6 8 -4 14 c1 4 5 6 9 6 h37 c7 0 9 -8 3 -13 z" fill="#f2f0ec"/>
      <path d="M153 602 h46 v3 h-46 z" fill="#b9b6b0"/>
    </g>
    <g class="t-arm t-arm-l">
      <path d="M100 206 C87 212 81 228 79 246 L75 300 C74 312 75 322 77 330 L95 330 C94 318 94 306 95 296 L101 250 Z" fill="url(#wHood)"/>
      <path d="M76 321 L96 321 L96 333 L76 333 Z" fill="#0f1015"/>
      <ellipse cx="86" cy="343" rx="8.5" ry="10.5" fill="url(#wSkin)"/>
    </g>
    <g class="t-arm t-arm-r">
      <path d="M200 206 C213 212 219 228 221 246 L225 300 C226 312 225 322 223 330 L205 330 C206 318 206 306 205 296 L199 250 Z" fill="url(#wHood)"/>
      <path d="M224 321 L204 321 L204 333 L224 333 Z" fill="#0f1015"/>
      <ellipse cx="214" cy="343" rx="8.5" ry="10.5" fill="url(#wSkin)"/>
    </g>
    <path d="M100 206 C108 198 126 194 140 196 L160 196 C174 194 192 198 200 206 C207 214 209 226 209 240 L208 330 L92 330 L91 240 C91 226 93 214 100 206 Z" fill="url(#wHood)"/>
    <path d="M92 320 H208 V333 H92 Z" fill="#0f1015"/>
    <path d="M94 240 C96 222 104 210 116 203" stroke="#7c9be0" stroke-width="1.8" fill="none" opacity=".45"/>
    <path d="M114 212 C116 190 132 184 150 184 C168 184 184 190 186 212 C172 203 161 200 150 200 C139 200 128 203 114 212 Z" fill="#191a21"/>
    <path d="M141 178 L141 199 Q150 205 159 199 L159 178 Z" fill="url(#wNeck)"/>
    <path d="M138 198 Q150 208 162 198 L161 204 Q150 213 139 204 Z" fill="#0b0c10"/>
    <g class="t-strings">
      <path d="M143 208 Q141 228 142 252 M157 208 Q159 228 158 252" stroke="#2b2c35" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <g fill="#c4c9d3"><rect x="140.5" y="251" width="3.2" height="7" rx="1.2"/><rect x="156.5" y="251" width="3.2" height="7" rx="1.2"/></g>
    </g>
  </g>

  <g class="t-head" data-pivot="150 185">
    <path d="M100.0 140.2 C88.0 121.0 84.8 93.0 95.2 73.0 C106.4 51.4 127.2 41.8 150.4 41.8 C174.4 41.8 195.2 52.2 204.8 73.8 C214.4 94.6 210.4 121.8 200.8 140.2Z" fill="url(#wHairA)"/>
    <path d="M98.4 63.7 Q84.7 72.1 74.2 81.6 Q88.3 86.1 104.0 85.6Z" fill="url(#wHairD)"/><path d="M106.7 55.5 Q91.1 58.6 78.5 64.6 Q91.3 69.7 106.9 72.8Z" fill="url(#wHairB)"/><path d="M117.9 47.0 Q99.6 48.5 85.5 46.4 Q96.7 58.7 113.3 63.0Z" fill="url(#wHairD)"/><path d="M127.9 41.1 Q107.0 42.9 95.3 34.8 Q100.5 54.7 117.7 59.4Z" fill="url(#wHairB)"/><path d="M150.7 41.8 Q145.8 28.3 134.7 18.8 Q132.9 31.3 130.5 46.5Z" fill="url(#wHairD)"/><path d="M157.4 42.9 Q145.6 35.1 146.6 28.1 Q133.0 35.9 137.7 44.0Z" fill="url(#wHairB)"/><path d="M168.4 46.4 Q167.5 36.0 165.2 27.1 Q157.5 33.4 152.7 42.3Z" fill="url(#wHairD)"/><path d="M182.4 54.4 Q189.2 42.7 188.4 28.6 Q178.9 35.4 166.2 43.1Z" fill="url(#wHairB)"/><path d="M187.5 64.9 Q197.7 54.6 206.9 49.8 Q194.5 42.6 182.6 46.2Z" fill="url(#wHairD)"/><path d="M194.1 77.9 Q208.6 78.8 221.3 69.1 Q209.8 64.7 196.0 55.9Z" fill="url(#wHairB)"/><path d="M196.2 82.1 Q208.2 73.7 215.6 77.2 Q210.8 62.4 200.3 64.5Z" fill="url(#wHairD)"/>
    <ellipse cx="108" cy="134" rx="6.5" ry="10" fill="#d18e68"/>
    <ellipse cx="192" cy="134" rx="6.5" ry="10" fill="#c58460"/>
    <path d="M108 110 C108 84 126 72 150 72 C174 72 192 84 192 110 L192 134 C192 160 176 178 151 184 C125 180 108 160 108 134 Z" fill="url(#wSkin)"/>
    <path d="M108 98 Q150 124 192 98 L192 118 Q150 140 108 118 Z" fill="#7a3d22" opacity=".35" filter="url(#wBlur)"/>
    <ellipse class="t-blush" cx="124" cy="146" rx="12" ry="7" fill="url(#wBlush)"/>
    <ellipse class="t-blush" cx="177" cy="145" rx="11" ry="6.5" fill="url(#wBlush)"/>
    <path d="M104.3 79.0 Q104.6 106.3 102.2 128.1 Q112.9 107.8 117.3 81.4Z" fill="url(#wHairB)"/><path d="M102.3 86.4 Q108.8 111.5 107.7 131.8 Q117.1 111.7 115.3 86.8Z" fill="url(#wHairD)"/><path d="M98.9 92.7 Q105.3 113.3 105.4 129.9 Q115.4 113.7 114.7 93.3Z" fill="url(#wHairB)"/><path d="M98.4 99.2 Q103.2 119.4 103.8 135.9 Q111.3 119.7 111.2 99.6Z" fill="url(#wHairD)"/><path d="M182.8 81.3 Q187.3 111.7 198.9 135.2 Q195.5 110.3 195.6 79.1Z" fill="url(#wHairB)"/><path d="M184.9 87.4 Q184.5 115.6 197.5 136.9 Q192.6 114.6 197.5 85.8Z" fill="url(#wHairD)"/><path d="M186.4 93.9 Q189.1 115.5 198.7 132.1 Q197.8 114.3 200.0 92.1Z" fill="url(#wHairB)"/><path d="M188.7 98.8 Q184.1 119.4 191.9 137.3 Q192.3 120.1 201.7 100.0Z" fill="url(#wHairD)"/>
    <ellipse cx="150" cy="141" rx="2.6" ry="2" fill="#fff" opacity=".4"/>
    <path d="M146 145 Q151 148 156 145" stroke="#8d4c2d" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".6"/>
    <g class="t-brow-l"><path d="M118 115 Q129 106 146 108 L145 113 Q130 111 120 119 Z" fill="#101116"/></g>
    <g class="t-brow-r"><path d="M154 108 Q171 106 182 115 L180 119 Q170 111 155 113 Z" fill="#101116"/></g>
    <g class="t-eye t-eye-l">
      <path d="M122 126 Q127 117 135 117 Q143 118 146 125 Q141 132 134 132 Q126 131 122 126 Z" fill="#fdf8f4"/>
      <g clip-path="url(#wEyeL)"><g class="pupil" data-range="2.2 1.6"><circle cx="134" cy="125" r="6.6" fill="url(#wIris)"/><circle cx="134" cy="125" r="2.8" fill="#030716"/><circle cx="136.6" cy="122" r="2" fill="#fff"/></g></g>
      <path d="M118 120 L121 124 Q126 114 136 114 Q145 115 148 122 L146 123 Q142 118 135 118 Q127 119 122 128 Z" fill="#0d0e13"/>
    </g>
    <g class="t-eye t-eye-r">
      <path d="M154 125 Q157 118 165 117 Q173 117 178 126 Q174 131 166 132 Q159 131 154 125 Z" fill="#fdf8f4"/>
      <g clip-path="url(#wEyeR)"><g class="pupil" data-range="2.2 1.6"><circle cx="166" cy="125" r="6.6" fill="url(#wIris)"/><circle cx="166" cy="125" r="2.8" fill="#030716"/><circle cx="168.6" cy="122" r="2" fill="#fff"/></g></g>
      <path d="M152 122 Q155 115 164 114 Q174 114 180 124 L183 120 L179 128 Q173 119 165 118 Q158 119 154 125 Z" fill="#0d0e13"/>
    </g>
    <path class="t-shut t-shut-l" d="M121 127 Q134 133 147 126" stroke="#0d0e13" stroke-width="2.4" stroke-linecap="round" fill="none"/>
    <path class="t-shut t-shut-r" d="M153 126 Q166 133 179 127" stroke="#0d0e13" stroke-width="2.4" stroke-linecap="round" fill="none"/>
    <path class="t-joy" d="M122 129 Q134 119 146 129 M154 129 Q166 119 178 129" stroke="#0d0e13" stroke-width="2.4" stroke-linecap="round" fill="none"/>
    <g class="mo mo-smile"><path d="M142 158 Q151 162 160 155" stroke="#7d3b2c" stroke-width="1.9" stroke-linecap="round" fill="none"/></g>
    <g class="mo mo-grin"><path d="M139 154 Q150 167 161 153 Q150 157 139 154 Z" fill="#6e2e26"/><path d="M141 154.6 Q150 159 159 154 Q150 156.6 141 154.6 Z" fill="#fff"/></g>
    <g class="mo mo-laugh"><path d="M137 152 Q150 174 163 151 Q150 157 137 152 Z" fill="#6e2e26"/><path d="M140 153 Q150 158 160 152.5 Q150 155.4 140 153 Z" fill="#fff"/><ellipse cx="150" cy="164" rx="5.5" ry="3" fill="#e07a70"/></g>
    <ellipse class="mo mo-o" cx="150" cy="158" rx="3.6" ry="5" fill="#6e2e26"/>
    <path class="mo mo-smirk" d="M142 158 Q152 160 160 153" stroke="#7d3b2c" stroke-width="1.9" stroke-linecap="round" fill="none"/>
    <g class="t-fringe"><path d="M106.4 105.8 C104.0 77.0 124.0 55.4 150.0 53.0 C176.0 55.4 196.8 77.0 193.6 105.8 C184.0 89.0 168.0 80.2 150.0 79.4 C132.0 80.2 116.0 89.0 106.4 105.8Z" fill="url(#wHairA)"/><path d="M115.9 47.1 Q111.3 67.1 108.8 84.5 Q128.3 79.9 142.6 67.0Z" fill="url(#wHairD)"/><path d="M120.5 44.7 Q117.2 67.6 113.3 85.5 Q135.0 79.5 148.3 63.4Z" fill="url(#wHairC)"/><path d="M132.6 45.8 Q129.2 67.4 123.8 83.2 Q143.3 76.6 154.5 60.2Z" fill="url(#wHairC)"/><path d="M144.4 46.0 Q146.5 67.4 143.4 83.0 Q162.1 73.9 168.8 56.1Z" fill="url(#wHairB)"/><path d="M152.4 43.2 Q149.6 66.4 147.0 85.2 Q165.2 74.0 176.8 55.1Z" fill="url(#wHairC)"/><path d="M157.6 47.8 Q159.1 69.0 157.1 84.9 Q175.2 75.6 182.8 58.3Z" fill="url(#wHairC)"/><path d="M170.6 50.5 Q170.5 72.8 168.0 90.1 Q186.5 79.9 195.5 61.5Z" fill="url(#wHairD)"/><path d="M178.6 52.9 Q180.3 74.7 178.3 91.3 Q196.5 81.1 204.0 62.8Z" fill="url(#wHairC)"/><path d="M102.1 80.3 Q99.4 88.7 102.3 97.8 Q108.0 92.6 115.5 86.4Z" fill="url(#wHairC)"/><path d="M105.6 76.5 Q109.2 95.7 109.3 111.0 Q120.3 97.4 123.0 79.1Z" fill="url(#wHairB)"/><path d="M118.3 74.0 Q124.0 90.7 121.2 103.1 Q134.3 92.7 134.5 77.0Z" fill="url(#wHairC)"/><path d="M120.6 72.9 Q116.7 87.4 122.5 101.2 Q126.6 89.5 136.1 76.3Z" fill="url(#wHairC)"/><path d="M133.3 72.2 Q134.8 93.1 128.0 107.3 Q143.5 96.4 146.9 77.3Z" fill="url(#wHairD)"/><path d="M133.8 74.3 Q132.3 98.5 134.6 118.9 Q141.0 99.7 147.5 76.2Z" fill="url(#wHairC)"/><path d="M143.3 73.1 Q143.2 94.9 144.9 113.0 Q152.1 96.1 157.3 75.1Z" fill="url(#wHairC)"/><path d="M149.6 72.7 Q143.1 94.7 147.6 115.4 Q154.6 97.8 167.6 77.6Z" fill="url(#wHairB)"/><path d="M154.9 72.7 Q149.8 92.8 152.7 111.2 Q159.9 95.6 170.6 77.0Z" fill="url(#wHairC)"/><path d="M164.6 72.5 Q161.2 89.5 162.0 104.6 Q171.6 93.3 180.9 78.6Z" fill="url(#wHairC)"/><path d="M165.6 75.2 Q165.6 95.2 165.1 111.4 Q176.9 98.2 183.2 80.0Z" fill="url(#wHairD)"/><path d="M178.5 77.4 Q174.5 91.7 177.1 105.2 Q183.2 94.4 192.0 81.6Z" fill="url(#wHairC)"/><path d="M178.7 79.9 Q180.4 89.0 183.4 96.9 Q191.6 92.1 196.1 84.7Z" fill="url(#wHairC)"/><path d="M125.3 61.1 Q123.0 66.3 118.0 69.1 M133.7 56.8 Q129.3 65.8 124.8 74.8 M140.5 57.1 Q138.7 66.1 132.8 73.3 M148.5 54.8 Q146.9 65.1 142.8 74.6 M157.2 55.2 Q151.0 63.3 146.3 72.2" stroke="#5a6893" stroke-width="1.40" fill="none" stroke-linecap="round" opacity=".38"/><path d="M95.2 127.4 Q87.7 113.1 88.0 97.0 M88.0 97.0 Q90.2 78.9 100.0 63.4" stroke="#8aaeff" stroke-width="2.40" fill="none" stroke-linecap="round" opacity=".5" filter="url(#wBlurS)"/></g>
  </g>
</svg>`;
