// Brick-toy minifigure of Nikhil, built from his reference render as a cut-out puppet: the render is sliced into
// layers (assets/minifig/parts/*.webp - head, torso+hips, arms, legs) so arms swing at the shoulders and legs at
// the hips, and the printed eyes/brows/mouth were painted out of the head so they're drawn here as SVG in the same
// print style - the eyes track the cursor and the face changes with moods. The parachute uses the parachute render.
// TOON_SVG: the figure framed like the 900x754 hero photo, for the hand-off from the photo (bottom fades out).
// WALKER_SVG: the full figure that walks the page (viewBox = the render's pixels, so pivots are in render coords).
// main.js sets data-mood on each <svg> and moves .pupil / .t-head; styles.css maps moods and poses to parts.

const TOON_SVG = `
<svg class="toon bust" viewBox="0 0 900 754" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
  <defs>
    <linearGradient id="tFadeG" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="754"><stop offset=".72" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
    <mask id="tFade" maskUnits="userSpaceOnUse" x="-300" y="-400" width="1500" height="1154"><rect x="-300" y="-400" width="1500" height="1154" fill="url(#tFadeG)"/></mask>
  </defs>
  <g mask="url(#tFade)"><g transform="translate(164.5 -31.0) scale(1.1195)">
    <g class="t-body">
      <g class="t-leg t-leg-l"><image href="assets/minifig/parts/leg-l.webp" x="100" y="586" width="159" height="219"/></g>
      <g class="t-leg t-leg-r"><image href="assets/minifig/parts/leg-r.webp" x="259" y="586" width="161" height="219"/></g>
      <image href="assets/minifig/parts/torso.webp" x="100" y="306" width="320" height="304"/>
      <g class="t-arm t-arm-l"><image href="assets/minifig/parts/arm-l.webp" x="8" y="314" width="143" height="340"/></g>
      <g class="t-arm t-arm-r"><image href="assets/minifig/parts/arm-r.webp" x="368" y="314" width="143" height="337"/></g>
    </g>
    <g class="t-head" data-pivot="259 318">
      <image href="assets/minifig/parts/head.webp" x="105" y="0" width="315" height="330"/>
      <path class="t-brow-l" d="M206 176 Q226 160 250 166" stroke="#161414" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path class="t-brow-r" d="M262 165 Q285 149 309 158" stroke="#161414" stroke-width="9" fill="none" stroke-linecap="round"/>
      <g class="t-eye t-eye-l"><g class="pupil" data-range="3.2 2.2"><ellipse cx="231" cy="189" rx="9.5" ry="12" fill="#141210"/><circle cx="234.5" cy="183" r="3.6" fill="#fff"/><circle cx="228" cy="195" r="1.4" fill="#fff" opacity=".7"/></g></g>
      <g class="t-eye t-eye-r"><g class="pupil" data-range="3.2 2.2"><ellipse cx="286" cy="188" rx="9.5" ry="12" fill="#141210"/><circle cx="289.5" cy="182" r="3.6" fill="#fff"/><circle cx="283" cy="194" r="1.4" fill="#fff" opacity=".7"/></g></g>
      <path class="t-shut t-shut-l" d="M220 191 Q231 198 242 191" stroke="#141210" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <path class="t-shut t-shut-r" d="M275 190 Q286 197 297 190" stroke="#141210" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <path class="t-joy" d="M220 195 Q231 181 242 195 M275 194 Q286 180 297 194" stroke="#141210" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <g class="mo mo-smile"><path d="M216 227 Q260 268 304 227 Q260 238 216 227 Z" fill="#1b1110"/><path d="M222 230 Q260 252 298 230 Q260 240 222 230 Z" fill="#fff"/><path d="M211 221 Q213 229 220 232 M309 221 Q307 229 300 232" stroke="#1b1110" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>
      <g class="mo mo-grin"><path d="M212 224 Q260 280 308 224 Q260 238 212 224 Z" fill="#1b1110"/><path d="M220 228 Q260 254 300 228 Q260 240 220 228 Z" fill="#fff"/><ellipse cx="260" cy="258" rx="14" ry="6" fill="#d9574d"/></g>
      <g class="mo mo-laugh"><path d="M210 220 Q260 292 310 220 Q260 238 210 220 Z" fill="#1b1110"/><path d="M218 224 Q260 252 302 224 Q260 238 218 224 Z" fill="#fff"/><ellipse cx="260" cy="266" rx="18" ry="8" fill="#d9574d"/></g>
      <ellipse class="mo mo-o" cx="260" cy="240" rx="12" ry="15" fill="#1b1110"/>
      <path class="mo mo-smirk" d="M226 240 Q262 250 294 230" stroke="#1b1110" stroke-width="5" stroke-linecap="round" fill="none"/>
    </g>
  </g></g>
</svg>`;

const WALKER_SVG = `
<svg class="toon walker" viewBox="0 0 518 805" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
  <g class="fig-stand">
    <g class="t-body">
      <g class="t-leg t-leg-l"><image href="assets/minifig/parts/leg-l.webp" x="100" y="586" width="159" height="219"/></g>
      <g class="t-leg t-leg-r"><image href="assets/minifig/parts/leg-r.webp" x="259" y="586" width="161" height="219"/></g>
      <image href="assets/minifig/parts/torso.webp" x="100" y="306" width="320" height="304"/>
      <g class="t-arm t-arm-l"><image href="assets/minifig/parts/arm-l.webp" x="8" y="314" width="143" height="340"/></g>
      <g class="t-arm t-arm-r"><image href="assets/minifig/parts/arm-r.webp" x="368" y="314" width="143" height="337"/></g>
    </g>
    <g class="t-head" data-pivot="259 318">
      <image href="assets/minifig/parts/head.webp" x="105" y="0" width="315" height="330"/>
      <path class="t-brow-l" d="M206 176 Q226 160 250 166" stroke="#161414" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path class="t-brow-r" d="M262 165 Q285 149 309 158" stroke="#161414" stroke-width="9" fill="none" stroke-linecap="round"/>
      <g class="t-eye t-eye-l"><g class="pupil" data-range="3.2 2.2"><ellipse cx="231" cy="189" rx="9.5" ry="12" fill="#141210"/><circle cx="234.5" cy="183" r="3.6" fill="#fff"/><circle cx="228" cy="195" r="1.4" fill="#fff" opacity=".7"/></g></g>
      <g class="t-eye t-eye-r"><g class="pupil" data-range="3.2 2.2"><ellipse cx="286" cy="188" rx="9.5" ry="12" fill="#141210"/><circle cx="289.5" cy="182" r="3.6" fill="#fff"/><circle cx="283" cy="194" r="1.4" fill="#fff" opacity=".7"/></g></g>
      <path class="t-shut t-shut-l" d="M220 191 Q231 198 242 191" stroke="#141210" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <path class="t-shut t-shut-r" d="M275 190 Q286 197 297 190" stroke="#141210" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <path class="t-joy" d="M220 195 Q231 181 242 195 M275 194 Q286 180 297 194" stroke="#141210" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <g class="mo mo-smile"><path d="M216 227 Q260 268 304 227 Q260 238 216 227 Z" fill="#1b1110"/><path d="M222 230 Q260 252 298 230 Q260 240 222 230 Z" fill="#fff"/><path d="M211 221 Q213 229 220 232 M309 221 Q307 229 300 232" stroke="#1b1110" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>
      <g class="mo mo-grin"><path d="M212 224 Q260 280 308 224 Q260 238 212 224 Z" fill="#1b1110"/><path d="M220 228 Q260 254 300 228 Q260 240 220 228 Z" fill="#fff"/><ellipse cx="260" cy="258" rx="14" ry="6" fill="#d9574d"/></g>
      <g class="mo mo-laugh"><path d="M210 220 Q260 292 310 220 Q260 238 210 220 Z" fill="#1b1110"/><path d="M218 224 Q260 252 302 224 Q260 238 218 224 Z" fill="#fff"/><ellipse cx="260" cy="266" rx="18" ry="8" fill="#d9574d"/></g>
      <ellipse class="mo mo-o" cx="260" cy="240" rx="12" ry="15" fill="#1b1110"/>
      <path class="mo mo-smirk" d="M226 240 Q262 250 294 230" stroke="#1b1110" stroke-width="5" stroke-linecap="round" fill="none"/>
    </g>
  </g>
  <image class="fig-chute" href="assets/minifig/chute.webp" x="-662.7" y="-617.8" width="1309.8" height="1561.6"/>
</svg>`;
