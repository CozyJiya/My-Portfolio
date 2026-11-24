(() => {
  "use strict";
  const S = window.SITE;
  const $ = (q, r = document) => r.querySelector(q);
  const $$ = (q, r = document) => [...r.querySelectorAll(q)];
  const root = document.documentElement;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const reduce = { get matches() { return root.dataset.motion === "less"; } };
  const portrait = matchMedia("(max-aspect-ratio: 9/10)");
  const OUT = "cubic-bezier(.16,1,.3,1)", GLIDE = "cubic-bezier(.3,.9,.25,1)";
  const store = { get: (k) => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };

  const star = '<svg viewBox="0 0 24 24"><use href="#star"/></svg>';

  /* A promise-based tween that always settles, even when the tab is hidden. */
  function tween(ms, step) {
    if (reduce.matches || document.hidden) { step(1); return Promise.resolve(); }
    return new Promise((done) => {
      const t0 = performance.now();
      let over = false;
      const end = () => { if (!over) { over = true; step(1); done(); } };
      const tick = (now) => { if (over) return; const t = clamp((now - t0) / ms, 0, 1); if (t >= 1) return end(); step(t); requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
      setTimeout(end, ms + 400);
    });
  }
  async function play(el, frames, opt) {
    if (reduce.matches || document.hidden) return;
    const a = el.animate(frames, { fill: "both", ...opt });
    await Promise.race([a.finished.catch(() => {}), wait((opt.duration || 0) + (opt.delay || 0) + 300)]);
    a.cancel();
  }

  /* ---------- drawn artwork ---------- */
  const W = "#5D0703", P = "#FFF8E6";
  const bars = (x, y, ws, gap = 14, c = W, o = 0.22) => ws.map((w, i) => `<rect x="${x}" y="${y + i * gap}" width="${w}" height="6" rx="3" fill="${c}" opacity="${o}"/>`).join("");
  const phone = (x, y, r, inner) => `<g transform="translate(${x} ${y}) rotate(${r})"><rect x="6" y="12" width="150" height="300" rx="20" fill="${W}" opacity=".16"/><rect width="150" height="300" rx="20" fill="${P}" stroke="${W}" stroke-width="2.5"/><rect x="54" y="9" width="42" height="5" rx="2.5" fill="${W}" opacity=".35"/>${inner}</g>`;
  const cross = (x, y, w, h, rx = 8) => `<g fill="none" stroke="${W}" stroke-width="1.6" opacity=".5"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}"/><path d="M${x + 3} ${y + 3}L${x + w - 3} ${y + h - 3}M${x + w - 3} ${y + 3}L${x + 3} ${y + h - 3}"/></g>`;
  const note = (x, y, r, c, s = 92) => `<g transform="translate(${x} ${y}) rotate(${r})"><rect x="4" y="7" width="${s}" height="${s}" fill="${W}" opacity=".15"/><rect width="${s}" height="${s}" fill="${c}"/>${bars(13, 28, [s * 0.66, s * 0.5, s * 0.6], 15)}</g>`;
  const ART = {
    frames: `<svg viewBox="0 0 640 400" role="img" aria-label="Sketch of three low-fidelity phone wireframes joined by arrows">
      ${phone(52, 52, -5, cross(16, 30, 118, 92) + bars(16, 138, [90, 62], 15) + cross(16, 180, 54, 66) + cross(80, 180, 54, 66) + `<rect x="16" y="262" width="118" height="22" rx="11" fill="${W}" opacity=".8"/>`)}
      ${phone(246, 34, 2, `<rect x="16" y="28" width="118" height="22" rx="11" fill="none" stroke="${W}" stroke-width="1.6" opacity=".5"/>` + [0, 1, 2, 3].map((i) => cross(16, 66 + i * 56, 42, 42, 6) + bars(68, 74 + i * 56, [62, 40], 14)).join(""))}
      ${phone(440, 60, 6, cross(16, 30, 118, 136) + bars(16, 184, [100, 112, 70], 15) + `<rect x="16" y="246" width="56" height="30" rx="15" fill="none" stroke="${W}" stroke-width="1.8"/><rect x="80" y="246" width="54" height="30" rx="15" fill="${W}" opacity=".85"/>`)}
      <g fill="none" stroke="${W}" stroke-width="2.4" stroke-linecap="round"><path d="M196 196c18-18 32-20 48-10m-11-8 11 8-9 11"/><path d="M398 214c18-18 30-20 46-10m-11-8 11 8-9 11"/></g></svg>`,
    survey: `<svg viewBox="0 0 640 260" role="img" aria-label="Sketch of a survey sheet with tick boxes and answer bars"><g transform="translate(90 24) rotate(-3)"><rect x="5" y="9" width="210" height="216" fill="${W}" opacity=".14"/><rect width="210" height="216" fill="${P}"/>${bars(24, 26, [130], 14, W, 0.6)}${[0, 1, 2, 3].map((i) => `<rect x="24" y="${58 + i * 37}" width="18" height="18" rx="5" fill="${i === 1 ? W : "none"}" stroke="${W}" stroke-width="1.8"/>${i === 1 ? `<path d="M28 ${67 + i * 37}l4 5 7-9" fill="none" stroke="${P}" stroke-width="2.2"/>` : ""}${bars(54, 64 + i * 37, [[116, 92, 124, 78][i]])}`).join("")}</g><g transform="translate(346 40)"><rect x="5" y="9" width="214" height="178" rx="4" fill="${W}" opacity=".14"/><rect width="214" height="178" rx="4" fill="${P}"/>${[150, 104, 168, 72].map((w, i) => `<rect x="22" y="${26 + i * 36}" width="170" height="16" rx="8" fill="${W}" opacity=".08"/><rect x="22" y="${26 + i * 36}" width="${w}" height="16" rx="8" fill="${["#BAD797", "#FFEDAC", W, "#F4C9D6"][i]}"/>`).join("")}</g></svg>`,
    talk: `<svg viewBox="0 0 640 260" role="img" aria-label="Sketch of three speech bubbles, one for each interview">${[[56, 40, "#FFF8E6", -3], [242, 70, "#BAD797", 2], [418, 34, "#FFEDAC", -2]].map(([x, y, c, r], i) => `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M18 0h138a18 18 0 0 1 18 18v84a18 18 0 0 1-18 18H70l-28 32 4-32H18a18 18 0 0 1-18-18V18A18 18 0 0 1 18 0Z" fill="${W}" opacity=".14" transform="translate(5 8)"/><path d="M18 0h138a18 18 0 0 1 18 18v84a18 18 0 0 1-18 18H70l-28 32 4-32H18a18 18 0 0 1-18-18V18A18 18 0 0 1 18 0Z" fill="${c}"/><text x="18" y="50" font-family="Newsreader,Georgia,serif" font-size="58" fill="${W}">“</text>${bars(22, 58, [[126, 104, 78], [118, 130, 60], [130, 92, 110]][i], 18)}</g>`).join("")}</svg>`,
    cluster: `<svg viewBox="0 0 640 260" role="img" aria-label="Sketch of sticky notes grouped into themes"><g fill="none" stroke="${W}" stroke-width="2" stroke-dasharray="6 7" opacity=".5"><ellipse cx="146" cy="130" rx="118" ry="106"/><ellipse cx="340" cy="136" rx="74" ry="92"/><ellipse cx="516" cy="126" rx="106" ry="104"/></g>${note(62, 52, -6, "#FFEDAC")}${note(144, 72, 5, "#FFF8E6")}${note(92, 124, 3, "#BAD797")}${note(292, 64, 4, "#FFF8E6")}${note(304, 122, -5, "#FFEDAC", 80)}${note(440, 44, 4, "#BAD797")}${note(506, 78, -4, "#FFF8E6")}${note(454, 126, -2, "#FFEDAC", 84)}</svg>`,
  };

  const solarPanel = (x, y) => `<g transform="translate(${x} ${y}) skewX(-24)"><rect width="84" height="46" rx="3" fill="#282B4A"/><path d="M28 0V46M56 0V46M0 23H84" stroke="#8f97d6" stroke-width="1.6" opacity=".7"/></g>`;
  ART.solar = `<svg viewBox="0 0 640 400" role="img" aria-label="Sketch of a sun over a rooftop with solar panels and a calculator card"><g stroke="#D98E2B" stroke-width="6" stroke-linecap="round">${Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * 6.283; return `<path d="M${(142 + Math.cos(a) * 74).toFixed(1)} ${(104 + Math.sin(a) * 74).toFixed(1)}L${(142 + Math.cos(a) * 92).toFixed(1)} ${(104 + Math.sin(a) * 92).toFixed(1)}"/>`; }).join("")}</g><circle cx="142" cy="104" r="56" fill="#E9A83A"/><path d="M70 372V262H390V372Z" fill="#FFF8E6"/><path d="M40 264L150 140H470L420 264Z" fill="${W}"/><path d="M70 372V262H390V372" fill="none" stroke="#3E2723" stroke-width="2.5" opacity=".3"/><rect x="198" y="300" width="58" height="72" rx="4" fill="#BAD797"/><rect x="104" y="296" width="60" height="44" rx="4" fill="#F4C9D6"/><rect x="292" y="296" width="60" height="44" rx="4" fill="#F4C9D6"/>${solarPanel(188, 160)}${solarPanel(284, 160)}${solarPanel(160, 212)}${solarPanel(256, 212)}${solarPanel(352, 160)}<g transform="translate(432 150) rotate(4)"><rect x="6" y="10" width="170" height="210" rx="16" fill="#3E2723" opacity=".16"/><rect width="170" height="210" rx="16" fill="#FFFDF6"/><rect x="20" y="22" width="84" height="8" rx="4" fill="#3E2723" opacity=".65"/><rect x="20" y="54" width="130" height="6" rx="3" fill="#3E2723" opacity=".16"/><rect x="20" y="54" width="82" height="6" rx="3" fill="#8FB56A"/><circle cx="102" cy="57" r="10" fill="#8FB56A"/><rect x="20" y="92" width="130" height="30" rx="8" fill="none" stroke="#3E2723" stroke-opacity=".28" stroke-width="2"/><rect x="32" y="104" width="60" height="6" rx="3" fill="#3E2723" opacity=".3"/><rect x="20" y="140" width="130" height="48" rx="10" fill="#FFEDAC"/><rect x="34" y="152" width="46" height="6" rx="3" fill="#3E2723" opacity=".4"/><rect x="34" y="166" width="84" height="10" rx="5" fill="${W}"/></g></svg>`;

  // Small drawings for the scrapbook.
  ART.yarn = `<svg viewBox="0 0 220 132" aria-hidden="true"><circle cx="82" cy="66" r="48" fill="#C2566F"/><g fill="none" stroke="#FFF8E6" stroke-opacity=".6" stroke-width="4" stroke-linecap="round"><path d="M40 52C62 26 102 24 122 46M36 70C62 42 106 40 130 62M40 88C66 60 108 58 128 80"/></g><g fill="none" stroke="#5D0703" stroke-opacity=".5" stroke-width="3.4" stroke-linecap="round"><path d="M58 26C50 50 54 90 76 112M78 20C68 50 72 88 96 110M102 24C92 48 94 82 114 98"/></g><path d="M124 92C150 120 168 112 188 96" fill="none" stroke="#C2566F" stroke-width="5" stroke-linecap="round"/><path d="M146 22L204 66" stroke="#5D0703" stroke-width="6" stroke-linecap="round"/></svg>`;
  ART.novel = `<svg viewBox="0 0 220 132" aria-hidden="true"><path d="M110 34C84 16 52 16 26 26V112C52 102 84 102 110 118C136 102 168 102 194 112V26C168 16 136 16 110 34Z" fill="#FFFDF6"/><path d="M110 34V118" stroke="${W}" stroke-opacity=".35" stroke-width="2"/><g stroke="#3E2723" stroke-opacity=".3" stroke-width="3" stroke-linecap="round" fill="none"><path d="M42 46c18-5 36-4 52 3M42 62c18-5 36-4 52 3M42 78c18-5 30-4 40 0M126 49c16-7 34-8 52-3M126 65c16-7 34-8 52-3M126 81c16-7 34-8 52-3"/></g><path d="M150 20l12 92-9-8-8 10Z" fill="${W}"/></svg>`;
  ART.film = `<svg viewBox="0 0 220 132" aria-hidden="true"><rect x="44" y="50" width="132" height="76" rx="8" fill="#3E2723"/><g transform="rotate(-9 44 46)"><rect x="44" y="26" width="132" height="22" rx="4" fill="#3E2723"/><path d="M58 26l-12 22M86 26L74 48M114 26l-12 22M142 26l-12 22M170 26l-12 22" stroke="#FFF8E6" stroke-width="8"/></g><circle cx="110" cy="88" r="22" fill="#F4C9D6"/><path d="M103 77l20 11-20 11Z" fill="${W}"/></svg>`;
  ART.paint = `<svg viewBox="0 0 220 132" aria-hidden="true"><path d="M86 20c54-14 98 14 96 56-2 40-38 56-64 46-16-6-6-24-18-32-14-8-32 8-44-10-14-24-8-54 30-60Z" fill="#D9B47C"/><circle cx="92" cy="46" r="11" fill="${W}"/><circle cx="126" cy="42" r="11" fill="#F4C9D6"/><circle cx="154" cy="62" r="11" fill="#E9A83A"/><circle cx="152" cy="92" r="11" fill="#282B4A"/><circle cx="76" cy="72" r="8" fill="#3E2723" opacity=".7"/><path d="M34 120L104 60" stroke="${W}" stroke-width="6" stroke-linecap="round"/><path d="M22 130c2-10 8-14 16-15l4 6c-4 6-10 9-20 9Z" fill="#8FB56A"/></svg>`;
  ART.junk = `<svg viewBox="0 0 220 132" aria-hidden="true"><g transform="rotate(-4 110 66)"><rect x="46" y="12" width="132" height="114" rx="6" fill="#8A4B32"/><rect x="54" y="7" width="124" height="112" rx="3" fill="#FFFDF6"/><path d="M62 18h50l4 8-5 9 6 8-4 10H62l4-9-5-8 5-10Z" fill="#D9B47C"/><g stroke="#3E2723" stroke-opacity=".4" stroke-width="2" stroke-linecap="round"><path d="M70 27h34M70 35h28M70 43h32"/></g><g transform="rotate(7 146 48)"><rect x="124" y="20" width="44" height="54" fill="#fff" stroke="#3E2723" stroke-opacity=".16"/><rect x="129" y="25" width="34" height="34" fill="#282B4A"/><circle cx="152" cy="35" r="5" fill="#FFEDAC"/><path d="M129 59l12-15 9 9 5-5 8 11Z" fill="#8FB56A"/></g><rect x="132" y="13" width="30" height="11" fill="#F4C9D6" transform="rotate(-6 147 18)"/><g transform="rotate(-8 90 84)"><path d="M62 72h58v7a5 5 0 0 0 0 10v7H62v-7a5 5 0 0 0 0-10Z" fill="#FFEDAC"/><path d="M106 72v24" stroke="${W}" stroke-opacity=".5" stroke-width="1.6" stroke-dasharray="3 3"/><path d="M70 80h26M70 88h18" stroke="${W}" stroke-width="3" stroke-linecap="round"/></g><path d="M140 112c-2-14 0-22 8-30" fill="none" stroke="#5E8A42" stroke-width="3" stroke-linecap="round"/><g fill="#C2566F"><circle cx="148" cy="78" r="7"/><circle cx="158" cy="84" r="7"/><circle cx="155" cy="95" r="7"/><circle cx="144" cy="94" r="7"/><circle cx="140" cy="85" r="7"/></g><circle cx="149" cy="87" r="5.5" fill="#E9A83A"/></g></svg>`;
  ART.crafts = `<svg viewBox="0 0 220 132" aria-hidden="true"><g transform="rotate(-9 78 74)"><rect x="42" y="34" width="76" height="84" rx="2" fill="#F4C9D6"/><rect x="50" y="26" width="76" height="84" rx="2" fill="#FFFDF6"/><path d="M88 42l7 17 18 2-14 12 4 18-15-10-15 10 4-18-14-12 18-2Z" fill="${W}"/></g><g transform="rotate(10 152 70)"><path d="M138 50h32c6 0 8 5 8 12v48c0 6-4 10-10 10h-28c-6 0-10-4-10-10V62c0-7 2-12 8-12Z" fill="#FFF3DC"/><path d="M146 50l4-22h8l4 22Z" fill="#E9A83A"/><path d="M151 28l3-12 3 12Z" fill="#C97F1E"/><rect x="130" y="72" width="48" height="26" fill="#282B4A"/><path d="M142 85h24" stroke="#FFEDAC" stroke-width="4" stroke-linecap="round"/></g><g transform="translate(58 106)"><ellipse rx="15" ry="5" cy="13" fill="#B98544"/><rect x="-12" y="-12" width="24" height="24" fill="#C2566F"/><path d="M-12-7h24M-12-1h24M-12 5h24" stroke="#fff" stroke-opacity=".45" stroke-width="2"/><ellipse rx="15" ry="5" cy="-13" fill="#D9B47C"/><ellipse rx="4" ry="1.6" cy="-13" fill="#8A4B32"/></g><path d="M71 112c18 12 34 6 46 12" fill="none" stroke="#C2566F" stroke-width="2.4" stroke-linecap="round"/></svg>`;
  ART.puzzle = `<svg viewBox="0 0 220 132" aria-hidden="true"><g transform="rotate(-5 100 70)"><rect x="46" y="16" width="50" height="50" rx="3" fill="#C2566F"/><rect x="96" y="16" width="50" height="50" rx="3" fill="#FFF3DC"/><rect x="46" y="66" width="50" height="50" rx="3" fill="#282B4A"/><circle cx="101" cy="41" r="10" fill="#C2566F"/><circle cx="71" cy="61" r="10" fill="#282B4A"/><circle cx="121" cy="71" r="10" fill="#FFF3DC"/><circle cx="96" cy="91" r="0" /></g><g transform="translate(20 10) rotate(13 142 88)"><path d="M117 63h15a10 10 0 1 0 20 0h15v50h-50V98a10 10 0 1 1 0-20Z" fill="#E9A83A"/><path d="M122 69h8M158 69h4" stroke="#fff" stroke-opacity=".6" stroke-width="3" stroke-linecap="round"/></g><g fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"><path d="M52 26v16M52 22h18"/></g></svg>`;
  ART.bags = `<svg viewBox="0 0 220 132" aria-hidden="true"><g transform="rotate(5 148 78)"><path d="M122 52l10-16 10 10 9-13 9 12 9-9 7 16Z" fill="#FFFDF6"/><rect x="116" y="50" width="62" height="72" rx="3" fill="#F4C9D6"/><path d="M132 62V48c0-18 30-18 30 0v14" fill="none" stroke="${W}" stroke-width="4" stroke-linecap="round"/><path d="M147 78c-7-8-19 1-12 10l12 12 12-12c7-9-5-18-12-10Z" fill="#C2566F"/></g><g transform="rotate(-4 84 74)"><rect x="46" y="38" width="80" height="86" rx="3" fill="${W}"/><path d="M46 38h80v14H46Z" fill="#3a0402" opacity=".35"/><path d="M66 52V32c0-24 40-24 40 0v20" fill="none" stroke="#D9B47C" stroke-width="5" stroke-linecap="round"/><path d="M86 66c2 12 6 16 18 18-12 2-16 6-18 18-2-12-6-16-18-18 12-2 16-6 18-18Z" fill="#FFEDAC"/></g><path d="M126 60c8 4 10 8 12 14" fill="none" stroke="#3E2723" stroke-width="2"/><g transform="rotate(18 142 84)"><path d="M134 74h16v22l-8 7-8-7Z" fill="#FFFDF6"/><circle cx="142" cy="80" r="2.4" fill="${W}"/></g></svg>`;

  // The drawing book's cover: one page of margin doodles.
  const DOODLE = `<svg viewBox="0 0 420 190" aria-hidden="true"><g stroke="none"><circle cx="212" cy="92" r="27" fill="#FFEDAC"/><path d="M212 62c-18-34 18-34 0 0M239 79c24-30 42 2 4 13M236 108c38 4 24 36-4 14M212 121c14 38-22 38-4 2M188 108c-28 22-42-10-4-14M186 80c-38-10-20-42 6-12" fill="#F4C9D6"/><path d="M62 58c-16-24-48-2-34 22 8 14 34 30 34 30s26-16 34-30c14-24-18-46-34-22Z" fill="#F4C9D6" transform="translate(3 3)"/><path d="M324 92h62v26c0 18-12 28-31 28s-31-10-31-28Z" fill="#BAD797" transform="translate(3 3)"/><path d="M120 142c-14 0-14-20 2-20 4-16 30-16 34 0 18-2 20 20 4 20Z" fill="#DCE5F5"/><path d="M318 40l6 14 15 1-11 10 3 15-13-8-13 8 3-15-11-10 15-1Z" fill="#FFEDAC" transform="translate(2 2)"/></g>
    <g fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M212 65c15 0 27 12 27 27s-12 27-27 27-27-12-27-27 12-27 27-27Z"/><path d="M203 64c-16-32 34-34 19 1M235 77c20-32 46 2 8 14M239 100c38 2 24 38-8 18M220 119c12 38-28 36-16 0M192 117c-30 22-46-14-8-18M186 88c-38-10-16-44 8-16"/><path d="M203 87v5M221 87v5M202 101c5 8 15 8 20 0"/>
    <path d="M62 58c-16-24-48-2-34 22 8 14 34 30 34 30s26-16 34-30c14-24-18-46-34-22Z"/><path d="M42 70c-3 6-1 12 2 16"/>
    <path d="M324 92h62v26c0 18-12 28-31 28s-31-10-31-28Z"/><path d="M386 100c20-4 20 26-3 24"/><path d="M342 80c-7-10 7-12 0-22M362 80c-7-10 7-12 0-22"/><path d="M345 114v3M363 114v3M348 126c4 4 8 4 12 0"/>
    <path d="M120 142c-14 0-14-20 2-20 4-16 30-16 34 0 18-2 20 20 4 20Z"/><path d="M128 152l-3 9M140 152l-3 9M152 152l-3 9"/>
    <path d="M318 40l6 14 15 1-11 10 3 15-13-8-13 8 3-15-11-10 15-1Z"/>
    <path d="M120 34c14-18 34 2 18 14-12 8-28-6-14-18 16-12 40 2 34 22"/><path d="M276 152c8-12 16 12 24 0s16 12 24 0"/><path d="M28 146c10-4 14-14 14-14s2 10 14 14c-12 4-14 14-14 14s-4-10-14-14Z"/><path d="M262 22l6 8M278 18v10M292 24l-7 7"/><path d="M88 156c4-14 10-22 18-28M88 156l-3 10 9-6"/><circle cx="176" cy="30" r="3"/><circle cx="254" cy="52" r="2.500"/><circle cx="106" cy="96" r="3"/><circle cx="300" cy="112" r="2.500"/></g></svg><b>more about me</b>`;

  /* ---------- fill in content ---------- */
  function hydrate(scope) {
    $$("[data-email]", scope).forEach((e) => (e.textContent = S.email));
    $$("[data-mailto]", scope).forEach((e) => (e.href = "mailto:" + S.email));
    $$("[data-socials]", scope).forEach((e) => (e.innerHTML = S.socials.map((s) => `<a href="${esc(s.href)}" target="_blank" rel="noopener">${esc(s.name)} ↗</a>`).join("")));
    $$("[data-doodle]", scope).forEach((e) => (e.innerHTML = DOODLE));
    $$("[data-art]", scope).forEach((e) => (e.innerHTML = ART[e.dataset.art]));
  }
  hydrate(document);
  $("#about-body").innerHTML = S.about.map((g) => `<section${g.wide ? ' class="wide"' : ""}><h3>${esc(g.h)}</h3>${g.kind === "line" ? `<p class="one">${esc(g.items.join(", "))}</p>` : `<ul class="${g.kind === "tags" ? "tags" : "lines"}">${g.items.map((i) => (g.kind === "tags" ? `<li>${esc(i)}</li>` : `<li><b>${esc(i[0])}</b><span>${esc(i[1])}${i[2] ? `<small>${esc(i[2])}</small>` : ""}</span></li>`)).join("")}</ul>`}</section>`).join("");
  $("#pins").insertAdjacentHTML("beforeend", S.steps.map((s, i) => `<div class="pin" style="--r:${s.r}deg;--rd:${i * 0.09}s" data-reveal><div class="pin-c" style="background:${s.bg};color:${s.fg}"><span class="pin-n">${i + 1}</span><div><span class="pin-t">${esc(s.title)}</span><span class="pin-d">${esc(s.text)}</span></div></div></div>`).join(""));
  const rnd = (i, n) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  $("#motes").innerHTML = Array.from({ length: 16 }, (_, i) => `<span style="left:${(rnd(i, 1) * 100).toFixed(1)}%;top:${(20 + rnd(i, 2) * 75).toFixed(1)}%;width:${(2 + rnd(i, 3) * 3).toFixed(1)}px;height:${(2 + rnd(i, 3) * 3).toFixed(1)}px;animation-duration:${(9 + rnd(i, 4) * 10).toFixed(1)}s;animation-delay:-${(rnd(i, 5) * 15).toFixed(1)}s"></span>`).join("");

  /* ---------- stage ---------- */
  const stage = $("#stage"), desk = $("#desk");
  let scale = 1, justDragged = false;
  function fit() {
    const vw = root.clientWidth, vh = innerHeight;
    scale = portrait.matches ? Math.min(vw / 390, 1.6) : Math.min(vw / 1440, Math.max(vh, 560) / 900);
    root.style.setProperty("--s", scale.toFixed(4));
    placeLight();
    sizeBook();
  }
  function placeLight() {
    const d = desk.getBoundingClientRect(), h = $(".l-head").getBoundingClientRect();
    if (!d.width) return;
    desk.style.setProperty("--lx", (((h.left + h.width / 2 - d.left) / d.width) * 100).toFixed(1) + "%");
    desk.style.setProperty("--ly", (((h.top + h.height / 2 - d.top) / d.height) * 100).toFixed(1) + "%");
  }
  // A hand-written hint that trails the pointer and says what a click will do.
  const label = $("#cursor-label");
  let lx = 0, ly = 0, lt = { x: 0, y: 0 }, labelOn = false, labelObj = null, raf = 0, last = 0;
  function wake() { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  function frame(now) {
    raf = 0;
    const f = 1 - Math.exp(-Math.min(0.05, (now - last) / 1000) * 14); last = now;
    lt.x = Math.min(lt.x, root.clientWidth - label.offsetWidth - 10); lx += (lt.x - lx) * f; ly += (lt.y - ly) * f;
    label.style.translate = `${lx.toFixed(1)}px ${ly.toFixed(1)}px`;
    if (labelOn && Math.abs(lt.x - lx) + Math.abs(lt.y - ly) > 0.3) raf = requestAnimationFrame(frame);
  }
  function showLabel(obj, e) {
    const was = labelOn; labelObj = obj; labelOn = !!obj;
    if (obj) { label.textContent = obj.dataset.label + " ✦"; if (!was && e) { lx = lt.x = e.clientX + 18; ly = lt.y = e.clientY + 20; } wake(); }
    label.classList.toggle("on", labelOn);
  }
  function relabel(k, text, aria) {
    const o = $(".obj." + k); o.dataset.label = text;
    if (aria) $(".lift", o).setAttribute("aria-label", aria);
    if (labelObj === o && labelOn) label.textContent = text + " ✦";
  }
  if (matchMedia("(hover: hover)").matches) {
    addEventListener("pointermove", (e) => { if (e.pointerType === "touch" || !labelOn) return; lt.x = e.clientX + 18; lt.y = e.clientY + 20; wake(); }, { passive: true });
    stage.addEventListener("pointerover", (e) => { if (e.pointerType !== "touch") showLabel(e.target.closest(".obj[data-label]"), e); });
    stage.addEventListener("pointerleave", () => showLabel(null));
  }
  addEventListener("click", (e) => { if (justDragged) { e.stopPropagation(); e.preventDefault(); justDragged = false; } }, true);

  /* ---------- tea ---------- */
  const mug = $(".obj.mug"), cup = $(".cup"), tea = $(".m-tea");
  const move = (el, frames, opt) => { if (!reduce.matches) return el.animate(frames, opt); };
  let cupAnim = null;
  $("#tea").addEventListener("click", () => {
    const empty = mug.classList.toggle("empty");
    cupAnim?.cancel();
    if (empty) {
      relabel("mug", "pour another", "Pour another cup of tea");
      cupAnim = move(cup, [{ transform: "none" }, { transform: "translate(-6px,-30px) scale(1.16) rotate(-14deg)", offset: 0.24, easing: "ease-in-out" }, { transform: "translate(-6px,-34px) scale(1.17) rotate(-22deg)", offset: 0.46, easing: "ease-in-out" }, { transform: "translate(-6px,-32px) scale(1.16) rotate(-28deg)", offset: 0.72 }, { transform: "none" }], { duration: 1750, easing: "cubic-bezier(.3,0,.2,1)" });
      $("#stain").classList.add("on");
    } else {
      relabel("mug", "drink the tea", "Drink the tea");
      move($(".m-pour"), [{ transform: "scaleY(0)", transformOrigin: "50% 0", opacity: 1 }, { transform: "scaleY(1)", transformOrigin: "50% 0", opacity: 1, offset: 0.18 }, { transform: "scaleY(1)", transformOrigin: "50% 100%", opacity: 1, offset: 0.8 }, { transform: "scaleY(0)", transformOrigin: "50% 100%", opacity: 1 }], { duration: 1200 });
      $$("i", tea).forEach((q, i) => move(q, [{ inset: "48%", opacity: 0.9 }, { inset: "6%", opacity: 0 }], { duration: 900, delay: 350 + i * 380, easing: "ease-out" }));
    }
  });

  /* ---------- biscuit ---------- */
  const bis = $(".obj.biscuit"), holes = $("#bite-holes"), BITES = [[], [[132, 50, 25]], [[106, 42, 19], [130, 88, 26]], [[98, 100, 27], [76, 50, 23], [112, 72, 20]], [[85, 75, 90]]];
  let bites = 0;
  function eat(n, quiet) {
    bites = n; bis.dataset.n = n;
    holes.innerHTML = BITES.slice(0, n + 1).flat().map(([x, y, q]) => `<circle cx="${x}" cy="${y}" r="${q}"/>`).join("");
    relabel("biscuit", n > 3 ? "another biscuit" : n ? "one more bite" : "have a bite", n > 3 ? "Get another biscuit" : "Bite the biscuit");
    if (quiet) return;
    if (n === 0) move($("#bisc"), [{ transform: "translateY(-50px) rotate(-30deg) scale(1.2)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 650, easing: "cubic-bezier(.22,1.3,.36,1)" });
    else {
      move($("#biscuit"), [{ transform: "none" }, { transform: "rotate(-5deg) scale(.97)" }, { transform: "rotate(4deg)" }, { transform: "none" }], { duration: 340, easing: "ease-out" });
      const q = $("#biscuit").getBoundingClientRect(); crumbs(q.left + q.width * (0.72 - n * 0.09), q.top + q.height * 0.48);
    }
  }
  $("#biscuit").addEventListener("click", () => eat(bites > 3 ? 0 : bites + 1));
  eat(0, true);
  function crumbs(x, y, c1 = "#dca85f", c2 = "#a8702f") {
    if (reduce.matches) return;
    for (let i = 0; i < 9; i++) {
      const el = document.createElement("span"); el.className = "spark"; const z = 3 + Math.random() * 5;
      el.style.cssText = `left:${x}px;top:${y}px;width:${z}px;height:${z}px;border-radius:40%;background:${i % 3 ? c1 : c2}`; document.body.append(el);
      const a = Math.random() * 6.28, d = 18 + Math.random() * 44;
      el.animate([{ transform: "none", opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d + 8}px) rotate(160deg)`, opacity: 1, offset: 0.7 }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d + 12}px) rotate(180deg)`, opacity: 0 }], { duration: 650 + Math.random() * 250, easing: OUT }).onfinish = () => el.remove();
    }
  }

  /* ---------- pink notes ---------- */
  const pk = { b: $(".pk-b"), t: $(".pk-t"), i: 0, busy: false };
  const noteHTML = (i) => `<b>Looking for</b><em>${esc(S.lookingFor[i % S.lookingFor.length])}</em>`;
  function paintNotes() { pk.t.innerHTML = noteHTML(pk.i); pk.b.innerHTML = noteHTML(pk.i + 1); $("#pink").setAttribute("aria-label", "Looking for " + S.lookingFor[pk.i % S.lookingFor.length] + ". Peel to see the next note"); }
  paintNotes();
  $("#pink").addEventListener("click", async () => {
    if (pk.busy) return; pk.busy = true;
    move(pk.b, [{ transform: "rotate(-3deg)" }, { transform: "none" }], { duration: 520, easing: OUT, fill: "forwards" });
    await play(pk.t, [{ transform: "none", opacity: 1 }, { transform: "rotate(-7deg) translateY(-26px) scale(1.04)", opacity: 1, offset: 0.35 }, { transform: "translate(70px,-190px) rotate(26deg) scale(1.02)", opacity: 0 }], { duration: 620, easing: "cubic-bezier(.4,0,.5,1)" });
    pk.i++; paintNotes(); pk.b.getAnimations().forEach((a) => a.cancel()); pk.busy = false;
  });

  /* ---------- sketch pad and pencil ---------- */
  const DOODLES = [
    ["M88 24h60c8 0 12 4 12 12v112c0 8-4 12-12 12H88c-8 0-12-4-12-12V36c0-8 4-12 12-12Z", "M88 44h60v40H88Z", "M88 44l60 40", "M148 44l-60 40", "M88 98h42", "M88 112h58", "M88 130h60v15H88Z"],
    ["M118 32c36 0 60 26 60 60s-24 60-60 60-60-26-60-60 24-60 60-60Z", "M98 74v13", "M138 74v13", "M88 106c12 24 48 24 60 0"],
    ["M68 78h88v42c0 22-14 34-44 34s-44-12-44-34Z", "M156 90c28-6 28 36-3 34", "M90 60c-9-12 9-16 0-30", "M112 60c-9-12 9-16 0-30", "M134 60c-9-12 9-16 0-30"],
    ["M54 46v92", "M54 98c12-16 36-14 36 8v32", "M116 88v50", "M116 62v5", "M170 52c4 24 10 31 34 35c-24 4-30 11-34 35c-4-24-10-31-34-35c24-4 30-11 34-35Z"],
  ];
  const doodle = $("#doodle"), pencil = $(".obj.pencil"), eraser = $(".obj.eraser");
  let dn = 0, drawing = false;
  const strokes = (i) => DOODLES[i].map((d) => `<path d="${d}" pathLength="1"/>`).join("");
  doodle.innerHTML = strokes(0);
  async function draw() {
    if (drawing) return; drawing = true;
    dn = (dn + 1) % DOODLES.length;
    const lead = reduce.matches ? 0 : 1;
    if (lead) await play(doodle, [{ opacity: 1 }, { opacity: 0 }], { duration: 200 });
    doodle.innerHTML = strokes(dn);
    const paths = $$("path", doodle);
    if (!lead) { drawing = false; return; }
    paths.forEach((p) => { p.style.strokeDashoffset = 1; p.style.visibility = "hidden"; });
    pencil.classList.add("drawing"); showLabel(null);
    // Work out where the tip rests, and map doodle points into the same space.
    const padB = $("#pad"), pr0 = padB.getBoundingClientRect(), tip0 = pencil.getBoundingClientRect();
    const ang = (parseFloat(getComputedStyle(pencil).getPropertyValue("--r")) * Math.PI) / 180;
    const len = natural($("#pencil")) * scale, mx = tip0.left + tip0.width / 2, my = tip0.top + tip0.height / 2;
    const rest = { x: mx - (Math.cos(ang) * len) / 2, y: my - (Math.sin(ang) * len) / 2 };
    const pa = (parseFloat(getComputedStyle(padB.closest(".obj")).getPropertyValue("--r")) * Math.PI) / 180, k = (natural(padB) * scale) / 236;
    const cx = pr0.left + pr0.width / 2, cy = pr0.top + pr0.height / 2;
    const at = (p) => { const x = (p.x - 118) * k, y = (p.y - 93) * k; return { x: (cx + x * Math.cos(pa) - y * Math.sin(pa) - rest.x) / scale, y: (cy + x * Math.sin(pa) + y * Math.cos(pa) - rest.y) / scale }; };
    let pos = { x: 0, y: 0 };
    const put = (x, y) => { pos = { x, y }; pencil.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`; };
    const tilt = (d) => pencil.style.setProperty("--t", d.toFixed(2) + "deg");
    const hop = (to, ms, h, a, b) => { const s = pos; return tween(ms, (q) => { const e = ease(q); put(s.x + (to.x - s.x) * e, s.y + (to.y - s.y) * e - Math.sin(Math.PI * q) * h); tilt(a + (b - a) * e); }); };
    await hop(at(paths[0].getPointAtLength(0)), 480, 30, 0, -34);
    for (let i = 0; i < paths.length; i++) {
      const p = paths[i], L = p.getTotalLength();
      if (i) await hop(at(p.getPointAtLength(0)), 130, 9, -34, -34);
      p.style.visibility = "";
      await tween(clamp(L * 2.1, 110, 720), (q) => { const pt = at(p.getPointAtLength(L * q)); put(pt.x, pt.y); p.style.strokeDashoffset = 1 - q; tilt(-34 + Math.sin(q * 14) * 2); });
    }
    await hop({ x: 0, y: 0 }, 560, 34, -34, 0);
    pencil.style.translate = ""; pencil.style.removeProperty("--t"); pencil.classList.remove("drawing"); drawing = false;
  }
  $("#pad").addEventListener("click", draw); $("#pencil").addEventListener("click", draw);

  $("#eraser").addEventListener("click", async () => {
    if (drawing) return; drawing = true;
    if (!reduce.matches && doodle.childElementCount) {
      const a = $("#pad").getBoundingClientRect(), b = $("#eraser").getBoundingClientRect();
      const dx = (a.left + a.width / 2 - b.left - b.width / 2) / scale, dy = (a.top + a.height / 2 - b.top - b.height / 2) / scale, k = portrait.matches ? 0.8 : 1;
      const put = (x, y, t) => { eraser.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`; eraser.style.setProperty("--t", t.toFixed(1) + "deg"); };
      eraser.classList.add("busy"); showLabel(null);
      const x0 = dx - 60 * k, y0 = dy - 50 * k;
      await tween(380, (q) => { const e = ease(q); put(x0 * e, y0 * e - Math.sin(q * Math.PI) * 26, -18 * e); });
      await tween(1150, (q) => { put(dx - Math.cos(q * Math.PI * 7) * 60 * k, dy + (q * 2 - 1) * 50 * k, -18 + Math.sin(q * 22) * 5); doodle.style.opacity = 1 - q; });
      const ex = dx + 60 * k, ey = dy + 50 * k;
      doodle.innerHTML = ""; doodle.style.opacity = "";
      const p = $("#pad").getBoundingClientRect(); crumbs(p.left + p.width / 2, p.top + p.height * 0.7, "#e6a9ba", "#f4c9d6");
      await tween(460, (q) => { const e = 1 - ease(q); put(ex * e, ey * e - Math.sin(q * Math.PI) * 26, -18 * e); });
      eraser.style.translate = ""; eraser.style.removeProperty("--t"); eraser.classList.remove("busy");
    }
    doodle.innerHTML = ""; drawing = false;
  });

  /* ---------- the rest of the mess ---------- */
  // Loose papers: the top sheet slides out and goes to the bottom of the pile.
  const loose = { busy: false };
  $("#loose").addEventListener("click", async () => {
    if (loose.busy) return; loose.busy = true;
    const top = $('.ls[data-p="0"]');
    const out = move(top, [{ transform: "none" }, { transform: "translate(-150px,-24px) rotate(-12deg)" }], { duration: 300, easing: "cubic-bezier(.4,0,.6,1)", fill: "forwards" });
    if (out) await Promise.race([out.finished.catch(() => {}), wait(500)]);
    $$(".ls").forEach((s) => (s.dataset.p = (+s.dataset.p + 2) % 3));
    if (out) { out.cancel(); move(top, [{ transform: "translate(-150px,-24px) rotate(-12deg)" }, { transform: "translate(-22px,16px) rotate(-9deg)" }], { duration: 480, easing: OUT }); }
    loose.busy = false;
  });

  const yellow = $(".obj.yellow");
  $$(".yf").forEach((e, i) => (e.textContent = S.reminder[i]));
  $("#yellow").addEventListener("click", () => { const on = yellow.classList.toggle("over"); $("#yellow").setAttribute("aria-pressed", on); $("#yellow").setAttribute("aria-label", "Yellow note: " + S.reminder[on ? 1 : 0]); });

  // Crumpled paper: facets are drawn once, with a fixed seed per ball.
  function ballSVG(seed) {
    const O = 11, I = 6, out = [], inn = [];
    for (let i = 0; i < O; i++) { const a = (i / O) * 6.283, q = 39 + rnd(i, seed) * 10; out.push([50 + Math.cos(a) * q, 50 + Math.sin(a) * q]); }
    for (let i = 0; i < I; i++) { const a = (i / I) * 6.283 + rnd(i, seed + 3) * 0.7, q = 14 + rnd(i, seed + 5) * 12; inn.push([50 + Math.cos(a) * q, 50 + Math.sin(a) * q]); }
    const near = (p) => inn.reduce((b, q) => (Math.hypot(q[0] - p[0], q[1] - p[1]) < Math.hypot(b[0] - p[0], b[1] - p[1]) ? q : b));
    const tri = (p, i, n) => `<polygon points="${p.map((v) => v.map((c) => c.toFixed(1)).join(",")).join(" ")}" fill="hsl(40 ${46 + n * 14}% ${74 + rnd(i, seed + 7) * 21}%)"/>`;
    let s = `<polygon points="${out.map((v) => v.map((c) => c.toFixed(1)).join(",")).join(" ")}" fill="#e6d6b2"/>`;
    out.forEach((p, i) => { const q = out[(i + 1) % O], m = near([(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]); s += tri([p, q, m], i, 0); });
    inn.forEach((p, i) => { s += tri([p, inn[(i + 1) % I], [50 + rnd(i, seed) * 6, 48 + rnd(i, seed + 1) * 6]], i + 20, 1); });
    return `<svg viewBox="0 0 100 100" aria-hidden="true">${s}<g stroke="#8a744c" stroke-opacity=".35" stroke-width="1" fill="none">${inn.map((p, i) => `<path d="M${p[0].toFixed(1)} ${p[1].toFixed(1)}L${out[(i * 2) % O].map((c) => c.toFixed(1)).join(" ")}"/>`).join("")}</g></svg>`;
  }
  $$(".ball").forEach((o, i) => {
    const b = $(".lift", o), k = "b" + (i + 1);
    $(".crumple", o).innerHTML = ballSVG(i * 4 + 2); $(".flat", o).textContent = S.ideas[i % S.ideas.length];
    b.addEventListener("click", () => { const on = o.classList.toggle("open"); b.setAttribute("aria-expanded", on); relabel(k, on ? "crumple it again" : "uncrumple", on ? S.ideas[i % S.ideas.length] + ". Crumple it again" : "Uncrumple a paper ball"); });
  });

  const clipEl = $("#clips svg"), CLIP = "M-5 -14V10a5 5 0 0 0 10 0V-15a7.5 7.5 0 0 0 -15 0V12a10 10 0 0 0 20 0V-8";
  clipEl.innerHTML = ["#b9b6be", "#f4c9d6", "#b9b6be", "#bad797", "#ffedac", "#b9b6be", "#e58fa5", "#d7d4dc"].map((c) => `<g><path d="${CLIP}" stroke="${c}"/></g>`).join("");
  let clipSeed = 1;
  const scatter = () => $$("g", clipEl).forEach((g, i) => (g.style.transform = `translate(${(20 + rnd(i, clipSeed) * 100).toFixed(0)}px,${(18 + rnd(i, clipSeed + 9) * 74).toFixed(0)}px) rotate(${(rnd(i, clipSeed + 5) * 360).toFixed(0)}deg)`));
  scatter();
  $("#clips").addEventListener("click", () => { clipSeed += 13; scatter(); });

  /* ---------- brushes and paint ---------- */
  const STROKES = ["M40 250C90 214 150 220 200 246", "M280 286C330 250 390 262 440 288", "M60 190C110 156 160 168 190 186", "M240 206C270 190 300 196 320 208", "M120 298C160 282 200 292 236 286"];
  const SHADES = ["#F4C9D6", "#E9A83A", "#C2566F", "#FFEDAC", "#8C93D6"];
  const strokesEl = $("#strokes"); let stroke = 2, round = 0;
  const strokePath = (i) => `<path d="${STROKES[i]}" pathLength="1" stroke="${SHADES[(i + round) % 5]}"/>`;
  strokesEl.innerHTML = [0, 1].map(strokePath).join("");
  $("#jar").addEventListener("click", async () => {
    move($(".brushes"), [{ transform: "none" }, { transform: "rotate(-9deg)" }, { transform: "rotate(8deg)" }, { transform: "rotate(-4deg)" }, { transform: "none" }], { duration: 700, easing: "ease-in-out" });
    if (stroke >= STROKES.length) {
      stroke = 0; round++;
      const old = $$("path", strokesEl);
      await play(strokesEl, [{ opacity: 1 }, { opacity: 0 }], { duration: 320 });
      old.forEach((p) => p.remove()); relabel("jar", "make a stroke", "Paint a stroke on the test sheet"); return;
    }
    strokesEl.insertAdjacentHTML("beforeend", strokePath(stroke++));
    move(strokesEl.lastElementChild, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 850, easing: "cubic-bezier(.5,0,.2,1)" });
    if (stroke >= STROKES.length) relabel("jar", "a clean sheet", "Start a clean test sheet");
  });
  /* Paper cutting: the scissors follow the outline, the shape drops out, a new sheet arrives. */
  const CUTS = [
    "M0 34C-42 8 -40 -30 -18 -32C-6 -33 0 -22 0 -18C0 -22 6 -33 18 -32C40 -30 42 8 0 34Z",
    "M0 -40L11 -13L40 -11L18 8L25 36L0 20L-25 36L-18 8L-40 -11L-11 -13Z",
    "M0 -14C-16 -46 16 -46 0 -14C26 -38 48 -8 14 -2C46 10 26 40 6 12C8 44 -26 40 -10 10C-38 34 -50 0 -14 -2C-48 -14 -24 -42 0 -14Z",
    "M-26 22C-50 22 -50 -6 -28 -8C-26 -34 12 -36 18 -14C44 -16 48 22 24 22Z",
    "M8 -38C-34 -34 -38 30 8 38C28 38 36 26 36 26C8 30 -4 -14 24 -30C20 -36 14 -38 8 -38Z",
  ];
  const PAPERS = ["#F4C9D6", "#FFEDAC", "#BAD797", "#E9A83A", "#C9C4EA"];
  const SPOTS = [[196, 26, 14], [236, 84, -16], [30, 182, 10]], REST = { x: 72, y: 44, a: 192 };
  const cutEl = { pieces: $("#pieces"), paper: $("#cut-paper"), hole: $("#cut-hole"), guide: $("#cut-guide"), line: $("#cut-line"), piece: $("#cut-piece"), sheet: $("#cut-sheet"), snips: $("#snips"), a: $(".blade.a"), b: $(".blade.b") };
  let cutN = 2, cutting = false;
  const snipAt = (x, y, a, gape) => { cutEl.snips.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${a.toFixed(1)})`); cutEl.a.setAttribute("transform", `rotate(${gape.toFixed(1)})`); cutEl.b.setAttribute("transform", `rotate(${(-gape).toFixed(1)})`); };
  const pieceAt = (n) => { const [x, y, q] = SPOTS[n % SPOTS.length]; return `translate(${x} ${y}) rotate(${q}) scale(.66)`; };
  const addPiece = (n) => { const old = cutEl.pieces.querySelector(`[data-s="${n % SPOTS.length}"]`); if (old) old.remove(); cutEl.pieces.insertAdjacentHTML("beforeend", `<path class="pc" data-s="${n % SPOTS.length}" d="${CUTS[n % 5]}" fill="${PAPERS[n % 5]}" transform="${pieceAt(n)}"/>`); };
  const newSheet = () => { const d = CUTS[cutN % 5]; cutEl.paper.setAttribute("fill", PAPERS[cutN % 5]); [cutEl.hole, cutEl.guide, cutEl.line].forEach((p) => p.setAttribute("d", d)); cutEl.hole.style.opacity = 0; cutEl.guide.style.opacity = 1; cutEl.line.style.strokeDashoffset = 1; cutEl.piece.innerHTML = ""; };
  addPiece(0); addPiece(1); newSheet(); snipAt(REST.x, REST.y, REST.a, 13);
  $("#cut").addEventListener("click", async () => {
    if (cutting) return; cutting = true;
    const d = CUTS[cutN % 5], col = PAPERS[cutN % 5];
    if (reduce.matches) { addPiece(cutN); cutN++; newSheet(); cutting = false; return; }
    showLabel(null);
    const len = cutEl.line.getTotalLength(), at = (s) => cutEl.line.getPointAtLength(clamp(s, 0, len));
    const dirAt = (s) => { const p = at(s - 1.5), q = at(s + 1.5); return (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI; };
    // Follow the outline without spinning the long way round.
    const near = (a, ref) => { while (a - ref > 180) a -= 360; while (a - ref < -180) a += 360; return a; };
    let ang = near(dirAt(2), REST.a), px = REST.x, py = REST.y;
    const s0 = at(0), back = 58;
    const place = (p, a, g) => { const r = (a * Math.PI) / 180; px = p.x - Math.cos(r) * back; py = p.y - Math.sin(r) * back; snipAt(px, py, a, g); };
    { const a1 = ang, r = (a1 * Math.PI) / 180, tx = s0.x - Math.cos(r) * back, ty = s0.y - Math.sin(r) * back; await tween(420, (q) => { const e = ease(q); snipAt(REST.x + (tx - REST.x) * e, REST.y + (ty - REST.y) * e - Math.sin(q * Math.PI) * 18, REST.a + (a1 - REST.a) * e, 13); }); }
    await tween(1900, (q) => { const s = len * q; ang += (near(dirAt(s), ang) - ang) * 0.22; place(at(s), ang, 3 + Math.abs(Math.sin(q * 34)) * 13); cutEl.line.style.strokeDashoffset = 1 - q; });
    cutEl.guide.style.opacity = 0; cutEl.hole.style.opacity = 0.75;
    // The cut shape pops up, then settles among the others.
    cutEl.piece.innerHTML = `<path class="pc" d="${d}" fill="${col}"/>`;
    const pc = cutEl.piece.firstChild, [sx, sy, sq] = SPOTS[cutN % SPOTS.length], th = (6 * Math.PI) / 180, vx = sx - 88, vy = sy - 94;
    const ex = vx * Math.cos(th) - vy * Math.sin(th), ey = vx * Math.sin(th) + vy * Math.cos(th), hx = px, hy = py, ha = ang, ra = near(REST.a, ang);
    const old = cutEl.pieces.querySelector(`[data-s="${cutN % SPOTS.length}"]`); if (old) play(old, [{ opacity: 1 }, { opacity: 0 }], { duration: 300 }).then(() => old.remove());
    const home = tween(620, (q) => { const e = ease(q); snipAt(hx + (REST.x - hx) * e, hy + (REST.y - hy) * e, ha + (ra - ha) * e, 4 + 9 * e); });
    await tween(760, (q) => { const e = ease(q), pop = Math.sin(q * Math.PI); pc.setAttribute("transform", `translate(${(ex * e).toFixed(1)} ${(ey * e - pop * 34).toFixed(1)}) rotate(${((sq + 6) * e + pop * 14).toFixed(1)}) scale(${(1 + pop * 0.16 - 0.34 * e).toFixed(3)})`); });
    await home;
    addPiece(cutN); cutN++;
    cutEl.piece.innerHTML = "";
    await play(cutEl.sheet, [{ opacity: 1 }, { opacity: 0 }], { duration: 220 });
    newSheet();
    play(cutEl.sheet, [{ opacity: 0, transform: "translateY(-16px) rotate(4deg)" }, { opacity: 1, transform: "none" }], { duration: 420, easing: OUT });
    cutting = false;
  });

  // Headphones play a soft, made-up music box tune.
  const ear = $(".obj.ear"); let ac = null, tuneT = 0, beat = 0;
  function pling(freq, gain, len) {
    const o = ac.createOscillator(), g = ac.createGain(), n = ac.currentTime;
    o.type = "triangle"; o.frequency.value = freq; g.gain.setValueAtTime(0, n); g.gain.linearRampToValueAtTime(gain, n + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, n + len);
    o.connect(g).connect(ac.destination); o.start(n); o.stop(n + len + 0.05);
  }
  function floatNote() {
    if (reduce.matches) return;
    const buds = $$(".bud", ear), b = buds[beat % buds.length].getBoundingClientRect(), el = document.createElement("span");
    el.className = "note-fly"; el.textContent = beat % 3 ? "♪" : "♫"; el.style.cssText = `left:${b.left + b.width / 2}px;top:${b.top}px`; document.body.append(el);
    const s = (Math.random() - 0.5) * 60;
    el.animate([{ transform: "translateY(0) scale(.5)", opacity: 0 }, { opacity: 1, offset: 0.2 }, { transform: `translate(${s}px,-90px) rotate(${s / 2}deg) scale(1.1)`, opacity: 0 }], { duration: 1500, easing: "ease-out" }).onfinish = () => el.remove();
  }
  function tune(on) {
    clearInterval(tuneT); ear.classList.toggle("on", on); $("#ear").setAttribute("aria-pressed", on);
    relabel("ear", on ? "pause" : "press play", on ? "Pause the tune" : "Play a little tune");
    if (!on) return;
    try { ac = ac || new AudioContext(); ac.resume(); } catch {}
    const PENTA = [0, 2, 4, 7, 9, 12, 14, 16], hz = (n) => 392 * Math.pow(2, n / 12), BASS = [-24, -15, -19, -17];
    tuneT = setInterval(() => {
      if (view !== "desk" || document.hidden) return tune(false);
      if (ac) { if (beat % 8 === 0) pling(hz(BASS[(beat / 8) % 4]), 0.05, 2.6); if (Math.random() > 0.34) pling(hz(PENTA[Math.floor(Math.random() * 8)]), 0.04, 1.5); }
      if (beat % 3 === 0) floatNote();
      beat++;
    }, 300);
  }
  $("#ear").addEventListener("click", () => tune(!ear.classList.contains("on")));

  /* ---------- little desk behaviours ---------- */
  const toast = $("#toast"); let toastT;
  function say(t) { toast.textContent = t; toast.classList.add("on"); clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove("on"), 2200); }
  async function copy() {
    let ok = false;
    try { await navigator.clipboard.writeText(S.email); ok = true; } catch {
      const t = document.createElement("textarea"); t.value = S.email; t.style.cssText = "position:fixed;opacity:0"; document.body.append(t); t.select();
      try { ok = document.execCommand("copy"); } catch {} t.remove();
    }
    say(ok ? "Email copied ✓" : S.email);
  }
  function sparks(x, y) {
    if (reduce.matches) return;
    const cs = ["#FFEDAC", "#F4C9D6", "#BAD797", "#FFF8E6"];
    for (let i = 0; i < 18; i++) {
      const el = document.createElement("span"); el.className = "spark"; el.innerHTML = star; el.style.cssText = `left:${x - 8}px;top:${y - 8}px;color:${cs[i % 4]}`; document.body.append(el);
      const a = (i / 18) * 6.283 + Math.random(), d = 70 + Math.random() * 130;
      el.animate([{ transform: "scale(0)" }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d - 40}px) scale(${0.7 + Math.random()}) rotate(${Math.random() * 200}deg)`, opacity: 1, offset: 0.6 }, { transform: `translate(${Math.cos(a) * d * 1.1}px,${Math.sin(a) * d + 60}px) scale(0) rotate(280deg)`, opacity: 0 }], { duration: 1100 + Math.random() * 400, easing: OUT }).onfinish = () => el.remove();
    }
  }
  $$(".task").forEach((b) => b.addEventListener("click", () => {
    const on = b.getAttribute("aria-checked") !== "true";
    b.setAttribute("aria-checked", on);
    if (on && b.hasAttribute("data-px")) {
      const q = b.getBoundingClientRect(); sparks(q.left + 10, q.top + 10); say("moved it 1px left");
      const w = $("span", b); w.style.translate = "-1px";
      setTimeout(() => { b.setAttribute("aria-checked", "false"); w.style.translate = ""; say("moved it back"); }, 2600);
    }
  }));
  const fan = $("#fan");
  // Day and night each have their own swatches and remember their own cover.
  const isNight = () => root.dataset.theme === "night", pal = () => (isNight() && S.paletteNight) || S.palette, coverKey = () => (isNight() ? "jr4-cover-night" : "jr4-cover");
  function cover(i, keep) {
    const c = pal()[i] || pal()[0];
    root.style.setProperty("--cover", c.hex); root.style.setProperty("--cover-fg", c.fg);
    $$(".sw").forEach((b, j) => b.setAttribute("aria-pressed", j === i));
    if (keep) store.set(coverKey(), i);
  }
  function swatches() {
    fan.innerHTML = pal().map((c, i, l) => `<button class="sw" style="--i:${i - (l.length - 1) / 2}" data-c="${i}" aria-label="${esc(c.name)} cover" aria-pressed="false"><i style="background:${c.hex}"></i><b>${c.hex}</b></button>`).join("");
    cover(clamp(+(store.get(coverKey()) || 0) || 0, 0, pal().length - 1));
  }
  swatches();
  fan.addEventListener("click", (e) => {
    const b = e.target.closest(".sw"); if (!b) return;
    if (!fan.classList.contains("open")) { fan.classList.add("open"); relabel("swatch", "pick a cover"); return; }
    cover(+b.dataset.c, true); say(pal()[+b.dataset.c].name + " cover");
  });
  addEventListener("pointerdown", (e) => { if (!e.target.closest("#fan")) { fan.classList.remove("open"); fan.closest(".obj").dataset.label = "my palette"; } });

  const lampBtn = $("#lamp");
  function paintTheme() { const n = root.dataset.theme === "night"; lampBtn.setAttribute("aria-pressed", n); relabel("lamp", n ? "lights on" : "lights off", n ? "Switch to day" : "Switch to night"); themeColor(); }
  function themeColor() { $('meta[name="theme-color"]').content = { fino: "#1D1F37", hanger: "#FAF8E4", dear: "#F3F2EE", garden: "#0A1628" }[root.dataset.view] || (root.dataset.theme === "night" ? "#4D2940" : "#3E2723"); }
  lampBtn.addEventListener("click", () => {
    const next = root.dataset.theme === "night" ? "day" : "night";
    const set = () => { root.dataset.theme = next; store.set("jr4-theme", next); swatches(); paintTheme(); };
    showLabel(null);
    if (!document.startViewTransition || reduce.matches) return set();
    const r = $(".l-head").getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    const R = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.classList.add("instant");
    const vt = document.startViewTransition(set);
    vt.ready.then(() => root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${R}px at ${x}px ${y}px)`] }, { duration: 850, easing: "cubic-bezier(.5,0,.15,1)", pseudoElement: "::view-transition-new(root)" })).catch(() => {});
    vt.finished.catch(() => {}).finally(() => root.classList.remove("instant"));
  });

  /* ---------- arrival ---------- */
  const ORDER = $$(".obj .land");
  function arrive(quick) {
    if (reduce.matches || document.hidden) return;
    const base = quick ? 0 : 160, gap = quick ? 18 : 52;
    if (!quick) {
      $(".hint").animate([{ opacity: 0, transform: "translateY(16px)" }, {}], { duration: 900, delay: 1300, easing: OUT, fill: "backwards" });
      setTimeout(() => { if (view === "desk" && !overlay && !mug.classList.contains("empty")) move(cup, [{ transform: "none" }, { transform: "rotate(-7deg)" }, { transform: "rotate(6deg)" }, { transform: "rotate(-3deg)" }, { transform: "none" }], { duration: 800, easing: "ease-in-out" }); }, 3400);
    }
    ORDER.forEach((el, i) => {
      el.animate([{ opacity: 0, transform: `translateY(${quick ? -16 : -46}px) scale(${quick ? 1.04 : 1.14}) rotate(${i % 2 ? 5 : -5}deg)` }, { opacity: 1, offset: 0.3 }, { opacity: 1, transform: "none" }], { duration: quick ? 600 : 950, delay: base + i * gap, easing: "cubic-bezier(.22,1.2,.36,1)", fill: "backwards" });
    });
  }

  /* ---------- reveal on scroll ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  const watch = (scope) => $$("[data-reveal]", scope).forEach((el) => io.observe(el));
  watch(document); io.observe($("#pins"));
  new IntersectionObserver(([e]) => root.classList.toggle("paused", !e.isIntersecting)).observe(desk);

  let view = "desk", overlay = null, lastFocus = null;

  /* ---------- the book ---------- */
  const pr = S.projects, plist = Object.entries(pr).map(([key, p]) => ({ key, ...p }));
  plist.forEach((p, i) => Object.assign(pr[p.key], { bookPage: i + 2, num: String(i + 1).padStart(2, "0") }));
  const N = plist.length + 3, NAMES = ["Cover", "Contents", ...plist.map((p) => p.title), "The end"];
  const details = (p) => [...p.details, ["Hosted on", p.hosted]].filter((d) => d[1]);
  const rows = (r) => `<dl class="rows">${r.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>`;
  const foot = (n, l = "") => `<div class="pg-foot">${l || "<span></span>"}<span class="pg-n">${n}</span></div>`;
  const PRINTS = [["left:8%;top:9%;width:78%;rotate:-3deg", "left:-6%;top:-5%;rotate:-30deg"], ["right:9%;top:49%;width:72%;rotate:3.5deg", "right:-6%;top:-5%;rotate:28deg;background:rgba(186,215,151,.8)"]];
  const plate = (p, i) => {
    const inner = p.plate
      ? (p.plate.board ? `<div class="print on-top"><img src="${esc(p.plate.board.src)}" width="${p.plate.board.w}" height="${p.plate.board.h}" alt="${esc(p.plate.board.alt)}"><span class="tape" style="${PRINTS[0][1]}"></span></div>` : "") + `<div class="pl-ph${p.plate.board ? "" : " trio"}">${p.plate.phones.map((s) => `<img src="${esc(s.src)}" width="${s.w}" height="${s.h}" alt="${esc(p.title + ": " + s.t)}">`).join("")}</div>`
      : p.shots.length
      ? p.shots.slice(0, 2).map((s, j) => `<div class="print" style="${PRINTS[j][0]}"><img src="${esc(s.src)}" width="${s.w}" height="${s.h}" alt="${esc(s.alt)}"><span class="tape" style="${PRINTS[j][1]}"></span></div>`).join("")
      : `<div class="plate-art">${ART[p.art] || ""}</div>`;
    return `<div class="plate-pg" style="background:${p.bg};color:${p.fg}">${inner}<div class="cap"><span class="pg-n" style="color:inherit">${2 * i + 2}</span><span>Fig. ${i + 1}, ${esc(p.title)}</span></div></div>`;
  };
  const detail = (p, i) => {
    const full = p.steps || p.about, links = full ? `<a class="btn wine" href="#/${p.key}">Know more about this project →</a>` : "";
    return `<div class="pg detail"><span class="pg-chip" style="background:${p.bg};color:${p.fg}">${esc(p.type)}</span><span class="pg-h${p.title.length < 8 ? " xl" : ""}">${esc(p.title)}</span><p class="pg-l">${esc(p.desc)}</p><div class="pg-scroll">${rows(details(p))}</div>${foot(2 * i + 3, links && `<span class="pg-links">${links}</span>`)}</div>`;
  };
  const toc = plist.map((p, i) => [i + 2, p.title, p.toc, 2 * i + 2]);
  const fronts = [
    `<div class="cover-skin" style="position:absolute;inset:0"><div class="cover-frame"><svg class="cover-star"><use href="#star"/></svg><span class="cover-title">My<br>works</span><span class="cover-rule"></span><span class="cover-sub">Jiya Rathod · Vol. 01</span></div></div>`,
    `<div class="pg"><span class="pg-h">My works</span><div class="toc pg-scroll">${toc.map(([go, a, b, p], i) => `<button data-go="${go}"><i>${String(i + 1).padStart(2, "0")}</i><span><b>${esc(a)}</b><small>${esc(b)}</small></span><em>p. ${p}</em></button>`).join("")}</div>${foot(1, '<span class="pg-l it">turn the page →</span>')}</div>`,
    ...plist.map(detail),
    `<div class="pg mid"><svg style="width:26px;height:26px;color:#5D0703"><use href="#star"/></svg><span class="pg-h" style="font-style:italic">The end, for now.</span><p>Thanks for reading. Come say hello any time.</p><button class="btn wine" data-copy>Copy my email</button><button class="btn line sm" data-close>Close the book</button></div>`,
  ];
  const backs = [
    `<div class="endpaper"><div class="plate"><span>this book belongs to</span><b>Jiya Rathod</b></div></div>`,
    ...plist.map(plate),
    `<div class="endpaper"><div class="libcard"><b>My works</b><span class="lc-top"><i>Borrowed by</i><i>When</i></span>${[["me", "too many times"], ["you", "just now"], ["", ""], ["", ""]].map(([a, d]) => `<span><em>${a}</em><em>${d}</em></span>`).join("")}</div></div>`,
    `<div style="position:absolute;inset:0;background:#F4C9D6"></div>`,
  ];
  // The hobby book: three cards to a page.
  const trios = []; for (let i = 0; i < S.craft.length; i += 3) trios.push(S.craft.slice(i, i + 3));
  const hNext = `<div class="hnext"><svg><use href="#star"/></svg><b>${esc(S.craftNext.t)}</b><p>${esc(S.craftNext.d)}</p></div>`;
  const hobbyPage = (list, n) => `<div class="hp"><div class="hcards">${list.map((l, i) => `<article class="hcard" style="--q:${[-1, 0.9, -0.6][(i + n) % 3]}deg"><span class="hart" style="background:${l.bg}">${ART[l.art] || ""}</span><div class="htxt"><b>${esc(l.t)}</b><p>${esc(l.d)}</p>${l.links.length ? `<div class="hlinks">${l.links.map(([a, h]) => (h ? `<a href="${esc(h)}" target="_blank" rel="noopener">${esc(a)} ↗</a>` : `<span>on ${esc(a)}</span>`)).join("")}</div>` : ""}</div></article>`).join("")}${list.length < 3 ? hNext : ""}</div><div class="pg-foot"><span></span><span class="pg-n">${n}</span></div></div>`;
  const padPages = [`<div class="cover-skin" style="position:absolute;inset:0"><span class="dd">${DOODLE}</span></div>`, ...trios.map((l, i) => hobbyPage(l, i + 1))];
  const padNames = ["Cover", ...trios.map((_, i) => (i ? "More things I love" : "More about me"))];

  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2), easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const single = () => root.clientWidth < 760;

  /* One opening book. Both books on the desk are made with this. */
  function makeBook(name, fronts, backs, names) {
    const ov = $("#ov-" + name), bk = $(".bk3d", ov), room = $(".bk-room", ov), fly = $(".bk-fly", ov), N = fronts.length;
    const label = $(".bk-label", ov), dots = $(".bk-dots", ov), btnP = $(".bk-prev", ov), btnN = $(".bk-next", ov);
    bk.innerHTML = `<div class="board l"></div><div class="board r"></div><div class="stack l"></div><div class="stack r"></div>` + fronts.map((f, i) => `<div class="leaf${i ? "" : " hard"}"><div class="face fr">${f}<div class="shade"></div></div><div class="face bk">${backs[i]}<div class="shade"></div></div></div>`).join("") + `<div class="spine"></div>`;
    const leaves = $$(".leaf", bk).map((el) => ({ el, f: $(".fr", el), b: $(".face.bk", el), sf: $(".fr .shade", el), sb: $(".bk .shade", el), a: 0, tw: null }));
    const boardL = $(".board.l", bk), stackL = $(".stack.l", bk), stackR = $(".stack.r", bk), spine = $(".spine", bk);
    dots.innerHTML = names.map((n, i) => `<button data-go="${i}" aria-label="Go to ${esc(n)}"><i></i></button>`).join("");
    // On phones `shift` is 0 for the right page and 1 for the left page.
    let page = 0, focusSide = "R", pw = 460, shift = 0, shiftT = null, raf = 0, grab = null;
    function size() {
      const vw = root.clientWidth, vh = innerHeight;
      let ph;
      if (single()) { pw = Math.min(vw - 44, 420); ph = Math.min(vh - 176, pw * 1.78); }
      else { ph = Math.min(vh - 186, (vw - 120) / 2 / 0.742, 780); pw = ph * 0.742; }
      room.style.setProperty("--pw", pw.toFixed(1) + "px"); room.style.setProperty("--ph", ph.toFixed(1) + "px");
      paint();
    }
    function paint() {
      leaves.forEach((l, i) => {
        l.el.style.transform = `rotateY(${(-l.a).toFixed(2)}deg)`;
        l.el.style.zIndex = l.a < 90 ? 20 - i : 20 + i;
        const m = Math.sin((l.a * Math.PI) / 180), moving = l.a > 0.5 && l.a < 179.5;
        l.el.classList.toggle("moving", moving);
        l.sf.style.opacity = (m * 0.85).toFixed(3); l.sb.style.opacity = (m * 0.85).toFixed(3);
        l.f.style.visibility = l.a < 92 ? "" : "hidden"; l.b.style.visibility = l.a > 88 ? "" : "hidden";
        // Pages buried in the stack do not need painting.
        const above = leaves[i - 1], below = leaves[i + 1];
        const buried = (l.a < 0.5 && above && above.a < 0.5) || (l.a > 179.5 && below && below.a > 179.5);
        l.el.style.visibility = buried ? "hidden" : "";
      });
      const open = clamp(leaves[0].a / 180, 0, 1), past = clamp((leaves[0].a - 80) / 60, 0, 1);
      boardL.style.opacity = past; stackL.style.opacity = open > 0.99 && leaves[1].a > 90 ? 1 : 0; stackR.style.opacity = leaves[N - 2].a < 90 ? 1 : 0; spine.style.opacity = past;
      const target = single() ? (focusSide === "L" ? pw / 2 : -pw / 2) : 0;
      const s = -pw / 2 + (target + pw / 2) * (single() ? shift : open * open * (3 - 2 * open));
      bk.style.transform = `translateX(${s.toFixed(1)}px)`;
    }
    function tick(now) {
      raf = 0; let live = false;
      for (const l of leaves) {
        if (!l.tw) continue;
        const t = (now - l.tw.t0) / l.tw.ms;
        if (t < 0) { live = true; continue; }
        l.a = l.tw.from + (l.tw.to - l.tw.from) * l.tw.e(clamp(t, 0, 1));
        if (t >= 1) { l.a = l.tw.to; l.tw = null; } else live = true;
      }
      if (shiftT) { const t = clamp((now - shiftT.t0) / shiftT.ms, 0, 1); shift = shiftT.from + (shiftT.to - shiftT.from) * easeOut(t); if (t >= 1) shiftT = null; else live = true; }
      paint();
      if (live) raf = requestAnimationFrame(tick);
    }
    const go = () => { if (!raf) raf = requestAnimationFrame(tick); };
    function setFocus(side, ms = 650) {
      focusSide = side;
      const to = side === "L" ? 1 : 0;
      if (reduce.matches || document.hidden) { shift = to; shiftT = null; paint(); } else { shiftT = { from: shift, to, t0: performance.now(), ms }; go(); }
      sync();
    }
    function setPage(p, side, opt = {}) {
      p = clamp(p, 0, N - 1);
      const dir = p >= page ? 1 : -1, ms = opt.ms || 880, gap = opt.gap ?? 110;
      const now = performance.now(), instant = reduce.matches || document.hidden || opt.instant;
      let k = 0;
      const list = dir > 0 ? leaves.map((l, i) => i) : leaves.map((l, i) => N - 1 - i);
      for (const i of list) {
        const l = leaves[i], to = i < p ? 180 : 0;
        if (instant) { l.a = to; l.tw = null; continue; }
        if (Math.abs(l.a - to) < 0.01) { l.tw = null; continue; }
        const mid = l.a > 1 && l.a < 179, dist = Math.abs(l.a - to) / 180;
        l.tw = { from: l.a, to, t0: now + k++ * gap, ms: mid ? Math.max(320, ms * dist) : ms, e: mid ? easeOut : ease };
      }
      page = p;
      if (single()) setFocus(p === 0 ? "R" : side || "L", instant ? 1 : ms);
      if (instant) paint(); else go();
      sync();
      return instant ? 0 : ms + Math.max(0, k - 1) * gap;
    }
    function sync() {
      label.textContent = names[page];
      $$("button", dots).forEach((b, i) => b.setAttribute("aria-current", i === page));
      btnP.disabled = page === 0; btnN.disabled = page === N - 1 && (!single() || focusSide === "R");
      leaves.forEach((l, i) => { l.f.inert = i !== page; l.b.inert = i !== page - 1; });
      if (overlay === name) history.replaceState(history.state, "", page > 1 ? "#" + name + "/" + page : "#" + name);
    }
    function next() { if (overlay !== name) return; if (single() && page > 0 && focusSide === "L") return setFocus("R"); if (page < N - 1) setPage(page + 1, page === 0 ? "R" : "L"); }
    function prev() { if (overlay !== name) return; if (single() && page > 0) { if (focusSide === "R" && page > 1) return setFocus("L"); if (page === 1) return setPage(0); return setPage(page - 1, "R"); } if (page > 0) setPage(page - 1); }
    btnN.onclick = next; btnP.onclick = prev;
    ov.addEventListener("click", (e) => { const b = e.target.closest("[data-go]"); if (b) setPage(+b.dataset.go, "L"); });
    // Pages follow the pointer while you drag them.
    bk.addEventListener("pointerdown", (e) => {
      if (e.button || !ov.classList.contains("ready")) return;
      const r = bk.getBoundingClientRect(), spineX = r.left + r.width / 2;
      grab = { id: e.pointerId, sx: e.clientX, sy: e.clientY, spineX, w: r.width / 2, onCtl: e.target.closest("button,a"), moved: false, i: -1, lastX: e.clientX, lastT: performance.now(), v: 0 };
    });
    addEventListener("pointermove", (e) => {
      if (!grab || e.pointerId !== grab.id) return;
      const dx = e.clientX - grab.sx;
      if (!grab.moved) {
        if (Math.abs(dx) < 7) return;
        grab.moved = true;
        const fwd = dx < 0;
        if (single()) { grab.swipe = true; return; }
        const i = fwd ? page : page - 1;
        if (i < 0 || i >= N - 1 || (fwd && grab.sx < grab.spineX - 20 && page > 0) || (!fwd && grab.sx > grab.spineX + 20)) { grab.swipe = true; return; }
        grab.i = i; leaves[i].tw = null; bk.classList.add("grab"); try { bk.setPointerCapture(e.pointerId); } catch {}
      }
      const now = performance.now(); if (now - grab.lastT > 8) { grab.v = (e.clientX - grab.lastX) / (now - grab.lastT); grab.lastX = e.clientX; grab.lastT = now; }
      if (grab.i >= 0) {
        const reach = Math.abs(grab.sx - grab.spineX) || 1;
        const c = clamp((e.clientX - grab.spineX) / Math.max(reach, grab.w * 0.5), -1, 1);
        leaves[grab.i].a = (Math.acos(c) * 180) / Math.PI;
        paint();
      }
    });
    addEventListener("pointerup", (e) => {
      if (!grab || (e.pointerId !== undefined && e.pointerId !== grab.id)) return;
      const g = grab; grab = null; bk.classList.remove("grab");
      if (g.moved) { justDragged = true; setTimeout(() => (justDragged = false), 60); }
      if (g.i >= 0) {
        const a = leaves[g.i].a, turn = Math.abs(g.v) > 0.35 ? g.v < 0 : a > 90;
        page = g.i + (turn ? 0 : 1); setPage(turn ? g.i + 1 : g.i);
      } else if (g.swipe) { const dx = e.clientX - g.sx; if (Math.abs(dx) > 34) (dx < 0 ? next : prev)(); }
      else if (!g.moved && !g.onCtl) (e.clientX > g.spineX ? next : prev)();
    });
    addEventListener("pointercancel", () => { if (grab && grab.i >= 0) setPage(page); grab = null; });
    bk.addEventListener("dragstart", (e) => e.preventDefault());
    // The space beside the book turns pages too.
    room.addEventListener("click", (e) => { if (!bk.contains(e.target) && ov.classList.contains("ready")) (e.clientX > innerWidth / 2 ? next : prev)(); });
    return { N, fly, size, setPage, sync, next, prev, get page() { return page; }, cover: leaves[0].f, reset() { focusSide = "R"; shift = 0; shiftT = null; page = 0; setPage(0, "R", { instant: true }); size(); } };
  }
  /* A drawing pad bound at the top. A page swings up over the rings and
     round to the back: 0 is lying flat, 180 is straight up, 360 is behind. */
  function makePad(name, pages, names) {
    const ov = $("#ov-" + name), el = $(".sk3d", ov), room = $(".bk-room", ov), fly = $(".sk-fly", ov), N = pages.length;
    const label = $(".bk-label", ov), dots = $(".bk-dots", ov), btnP = $(".bk-prev", ov), btnN = $(".bk-next", ov);
    el.innerHTML = `<div class="sk-board"></div><div class="sk-edge"></div>` + pages.map((p, i) => `<div class="sheet3${i ? "" : " hard"}"><div class="sf fr2">${p}<div class="sshade"></div><div class="under"></div></div><div class="sf bk2"><div class="sshade"></div></div></div>`).join("") + `<div class="sk-wire"></div>`;
    const sheets = $$(".sheet3", el).map((s) => ({ el: s, f: $(".fr2", s), sh: $$(".sshade", s), un: $(".under", s), a: 0, tw: null }));
    dots.innerHTML = names.map((n, i) => `<button data-go="${i}" aria-label="Go to ${esc(n)}"><i></i></button>`).join("");
    let page = 0, ph = 600, raf = 0, grab = null, wheelAt = 0;
    function size() {
      const vw = root.clientWidth, vh = innerHeight;
      let pw;
      if (vw < 760) { pw = Math.min(vw - 44, 440); ph = Math.min(vh - 190, pw * 1.76); }
      else { ph = Math.min(vh - 206, (vw - 150) / 1.42, 780); pw = ph * 1.42; }
      room.style.setProperty("--pw", pw.toFixed(1) + "px"); room.style.setProperty("--ph", ph.toFixed(1) + "px");
      paint();
    }
    function paint() {
      sheets.forEach((s, i) => {
        const a = s.a, flat = a < 0.5, gone = a > 359.5, up = sheets[i - 1];
        s.el.style.transform = `rotateX(${a.toFixed(2)}deg)`;
        s.el.style.zIndex = flat ? 30 - i : a < 180 ? 50 - i : 2 + i;
        s.el.style.visibility = gone || (flat && up && up.a < 0.5) ? "hidden" : "";
        s.el.classList.toggle("moving", !flat && !gone);
        const m = Math.abs(Math.sin((a * Math.PI) / 180)) * 0.8;
        s.sh.forEach((q) => (q.style.opacity = m.toFixed(3)));
        s.un.style.opacity = up && up.a > 0.5 && up.a < 130 ? (0.6 * (1 - up.a / 130)).toFixed(3) : 0;
      });
    }
    function tick(now) {
      raf = 0; let live = false;
      for (const s of sheets) {
        if (!s.tw) continue;
        const t = (now - s.tw.t0) / s.tw.ms;
        if (t < 0) { live = true; continue; }
        s.a = s.tw.from + (s.tw.to - s.tw.from) * s.tw.e(clamp(t, 0, 1));
        if (t >= 1) { s.a = s.tw.to; s.tw = null; } else live = true;
      }
      paint();
      if (live) raf = requestAnimationFrame(tick);
    }
    function setPage(p, side, opt = {}) {
      p = clamp(p, 0, N - 1);
      const dir = p >= page ? 1 : -1, ms = opt.ms ? opt.ms + 150 : 1050, gap = opt.gap ?? 130, now = performance.now();
      const instant = reduce.matches || document.hidden || opt.instant;
      let k = 0;
      const order = sheets.map((_, i) => (dir > 0 ? i : N - 1 - i));
      for (const i of order) {
        const s = sheets[i], to = i < p ? 360 : 0;
        if (instant) { s.a = to; s.tw = null; continue; }
        if (Math.abs(s.a - to) < 0.01) { s.tw = null; continue; }
        const mid = s.a > 1 && s.a < 359, dist = Math.abs(s.a - to) / 360;
        s.tw = { from: s.a, to, t0: now + k++ * gap, ms: mid ? Math.max(380, ms * dist) : ms, e: mid ? easeOut : soft };
      }
      page = p;
      if (instant) paint(); else if (!raf) raf = requestAnimationFrame(tick);
      sync();
      return instant ? 0 : ms + Math.max(0, k - 1) * gap;
    }
    const soft = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    function sync() {
      label.textContent = names[page];
      $$("button", dots).forEach((b, i) => b.setAttribute("aria-current", i === page));
      btnP.disabled = page === 0; btnN.disabled = page === N - 1;
      sheets.forEach((s, i) => (s.f.inert = i !== page));
      if (overlay === name) history.replaceState(history.state, "", page > 1 ? "#" + name + "/" + page : "#" + name);
    }
    const next = () => { if (overlay === name && page < N - 1) setPage(page + 1); };
    const prev = () => { if (overlay === name && page > 0) setPage(page - 1); };
    btnN.onclick = next; btnP.onclick = prev;
    ov.addEventListener("click", (e) => { const b = e.target.closest("[data-go]"); if (b) setPage(+b.dataset.go); });
    // One notch of the wheel turns one page.
    ov.addEventListener("wheel", (e) => { const now = performance.now(); if (Math.abs(e.deltaY) < 12 || now - wheelAt < 750) return; wheelAt = now; (e.deltaY > 0 ? next : prev)(); }, { passive: true });
    el.addEventListener("pointerdown", (e) => {
      if (e.button || !ov.classList.contains("ready")) return;
      grab = { id: e.pointerId, sx: e.clientX, sy: e.clientY, top: el.getBoundingClientRect().top, onCtl: e.target.closest("button,a"), moved: false, i: -1, ly: e.clientY, lt: performance.now(), v: 0 };
    });
    addEventListener("pointermove", (e) => {
      if (!grab || e.pointerId !== grab.id) return;
      const dy = e.clientY - grab.sy;
      if (!grab.moved) {
        if (Math.abs(dy) < 7) return;
        grab.moved = true; grab.up = dy < 0;
        const i = grab.up ? page : page - 1;
        if (i < 0 || i >= N - 1) return;
        grab.i = i; sheets[i].tw = null; el.classList.add("grab"); try { el.setPointerCapture(e.pointerId); } catch {}
      }
      const now = performance.now(); if (now - grab.lt > 8) { grab.v = (e.clientY - grab.ly) / (now - grab.lt); grab.ly = e.clientY; grab.lt = now; }
      if (grab.i < 0) return;
      // Pulling up follows the finger; pulling down brings the last page back over the top.
      const reach = Math.max(grab.sy - grab.top, ph * 0.45);
      sheets[grab.i].a = grab.up ? (Math.acos(clamp((grab.sy - grab.top + dy * 1.15 + (reach - (grab.sy - grab.top))) / reach, -1, 1)) * 180) / Math.PI : 180 * (1 - clamp(dy / (ph * 0.75), 0, 1));
      paint();
    });
    addEventListener("pointerup", (e) => {
      if (!grab || e.pointerId !== grab.id) return;
      const g = grab; grab = null; el.classList.remove("grab");
      if (g.moved) { justDragged = true; setTimeout(() => (justDragged = false), 60); }
      if (g.i >= 0) {
        const a = sheets[g.i].a, over = Math.abs(g.v) > 0.35 ? g.v < 0 : a > 75;
        page = over ? g.i : g.i + 1; setPage(over ? g.i + 1 : g.i);
      } else if (!g.moved && !g.onCtl) (e.clientY < g.top + ph * 0.28 ? prev : next)();
    });
    addEventListener("pointercancel", () => { if (grab && grab.i >= 0) setPage(page); grab = null; });
    el.addEventListener("dragstart", (e) => e.preventDefault());
    room.addEventListener("click", (e) => { if (!el.contains(e.target) && ov.classList.contains("ready")) (e.clientY > innerHeight / 2 ? next : prev)(); });
    return { N, fly, size, setPage, sync, next, prev, get page() { return page; }, cover: sheets[0].f, stretch: true, reset() { page = 0; setPage(0, "", { instant: true }); size(); } };
  }
  const books = { book: makeBook("book", fronts, backs, NAMES), craft: makePad("craft", padPages, padNames) };
  const sizeBook = () => Object.values(books).forEach((b) => b.size());

  /* ---------- overlays that grow out of the desk objects ---------- */
  const scrim = $("#scrim"), pageEl = $("#page");
  function from(src, target, topAligned, stretch) {
    const o = src.closest(".obj"), s = src.getBoundingClientRect(), d = target.getBoundingClientRect();
    if (s.bottom < -200 || s.top > innerHeight + 200) return null;
    const rot = parseFloat(getComputedStyle(o).getPropertyValue("--r")) || 0;
    const w = natural(src) * scale, k = w / target.offsetWidth;
    const dx = s.left + s.width / 2 - (d.left + d.width / 2);
    const dy = topAligned ? s.top + s.height / 2 - (w * topAligned) / 2 - d.top : s.top + s.height / 2 - (d.top + d.height / 2);
    let ky = k;
    if (stretch) { const q = Math.abs((rot * Math.PI) / 180), c = Math.cos(q), n = Math.sin(q); ky = (s.height * c - s.width * n) / (c * c - n * n) / target.offsetHeight; }
    return { k, rot, dx, dy, t: `translate(${dx}px,${dy}px) rotate(${rot}deg) scale(${k},${ky})` };
  }
  // Width of an object in stage pixels, undoing rotation from its bounding box.
  function natural(src) {
    const s = src.getBoundingClientRect(), r = Math.abs(((parseFloat(getComputedStyle(src.closest(".obj")).getPropertyValue("--r")) || 0) * Math.PI) / 180);
    const c = Math.cos(r), n = Math.sin(r);
    return (s.width * c - s.height * n) / (c * c - n * n) / scale;
  }
  const SRC = { about: "paper", contact: "green", book: "book", craft: "craft" };
  async function openOverlay(name, arg) {
    const ov = $("#ov-" + name), obj = $(".obj." + SRC[name]), src = $(".lift", obj);
    overlay = name; lastFocus = document.activeElement; showLabel(null);
    if (scrollY > 40 && src.getBoundingClientRect().bottom < 0) scrollTo({ top: 0, behavior: "instant" });
    ov.hidden = false; ov.scrollTop = 0; ov.inert = false; scrim.classList.add("on"); pageEl.inert = true; root.classList.add("paused");
    const B = books[name];
    if (B) {
      B.reset();
      const fly = B.fly, f = from($(".bk-cover,.sk-cover", obj), B.cover, 0, B.stretch);
      obj.classList.add("away");
      const flight = f ? play(fly, [{ transform: f.t }, { transform: "none" }], { duration: 760, easing: GLIDE }) : play(fly, [{ opacity: 0, transform: "translateY(40px) scale(.94)" }, {}], { duration: 500, easing: OUT });
      await Promise.race([flight, wait(reduce.matches ? 0 : 430)]);
      if (overlay !== name) return;
      ov.classList.add("ready");
      const p = arg > 1 ? arg : 1;
      const t = B.setPage(p, p > 1 ? "L" : "R", { ms: 1000, gap: 130 });
      ov.focus({ preventScroll: true });
      await wait(Math.min(t, 500));
    } else {
      const fly = $("[data-fly]", ov), tall = name === "about";
      const f = from(src, fly, tall ? src.offsetHeight / src.offsetWidth : 0);
      obj.classList.add("away"); $("h2", ov).focus({ preventScroll: true });
      if (tall) fly.style.transformOrigin = "50% 0";
      if (f) {
        const vis = tall ? (fly.offsetWidth * src.offsetHeight) / src.offsetWidth / fly.offsetHeight : 1;
        const cut = tall ? `inset(-60px -70px ${Math.max(0, (1 - vis) * 100).toFixed(1)}% -70px)` : "none", full = tall ? "inset(-60px -70px -70px -70px)" : "none";
        const a = play(fly, [{ transform: f.t, clipPath: cut }, { transform: "none", clipPath: full }], { duration: 720, easing: GLIDE });
        const inner = tall ? $("article", ov) : fly;
        [...inner.children].forEach((c, i) => play(c, [{ opacity: 0 }, { opacity: 1 }], { duration: 380, delay: 160 + i * 60, easing: "ease-out" }));
        await a;
      } else await play(fly, [{ opacity: 0, transform: "translateY(40px)" }, {}], { duration: 500, easing: OUT });
    }
  }
  async function closeOverlay(fast) {
    if (!overlay) return;
    const name = overlay, ov = $("#ov-" + name), obj = $(".obj." + SRC[name]), src = $(".lift", obj);
    overlay = null; ov.inert = true; ov.classList.remove("ready");
    if (!fast) {
      scrim.classList.remove("on");
      const B = books[name];
      if (B) {
        const t = B.setPage(0, "R", { ms: B.page > 1 ? 620 : 560, gap: 60 });
        await wait(Math.max(0, t - 300));
        const f = from($(".bk-cover,.sk-cover", obj), B.cover, 0, B.stretch);
        if (f) await play(B.fly, [{ transform: "none" }, { transform: f.t }], { duration: 560, easing: "cubic-bezier(.5,0,.15,1)" });
      } else {
        const fly = $("[data-fly]", ov), tall = name === "about", f = from(src, fly, tall ? src.offsetHeight / src.offsetWidth : 0);
        const vis = tall ? (fly.offsetWidth * src.offsetHeight) / src.offsetWidth / fly.offsetHeight : 1;
        if (f) await play(fly, [{ transform: "none", clipPath: tall ? "inset(-60px -70px -70px -70px)" : "none" }, { transform: f.t, clipPath: tall ? `inset(-60px -70px ${Math.max(0, (1 - vis) * 100).toFixed(1)}% -70px)` : "none" }], { duration: 520, easing: "cubic-bezier(.5,0,.15,1)" });
      }
    }
    ov.hidden = true; scrim.classList.remove("on"); pageEl.inert = false; obj.classList.remove("away"); root.classList.remove("paused");
    if (!fast) {
      const btn = $("[data-open]", obj); (btn || lastFocus)?.focus?.({ preventScroll: true }); btn?.blur?.();
    }
  }
  // Nothing behind an overlay should scroll.
  $$(".overlay").forEach((o) => {
    o.addEventListener("wheel", (e) => { const s = e.target.closest(".pg-scroll"); if (s && s.scrollHeight > s.clientHeight + 1) return; if (o.scrollHeight <= o.clientHeight + 1) e.preventDefault(); }, { passive: false });
    o.addEventListener("click", (e) => { if (e.target === o && !o.classList.contains("bk-ov")) close(); });
  });

  /* ---------- case pages ---------- */
  function caseHTML(key) {
    const p = pr[key];
    const told = (s, extra, cls) => `<section class="${cls}"><div class="wrap told"><h2 data-reveal>${esc(s.h)}</h2><div><p class="lead" data-reveal>${esc(s.lead)}</p>${s.paras.map((x) => `<p class="body" data-reveal>${esc(x)}</p>`).join("")}${extra}</div></div></section>`;
    const main = p.about
      ? told(p.about, `<ul class="feats">${p.about.features.map(([a, b]) => `<li data-reveal><h3>${esc(a)}</h3><p>${esc(b)}</p></li>`).join("")}</ul>`, "what") + (p.story ? told(p.story, `<ul class="weeks">${p.story.weeks.map(([a, b]) => `<li data-reveal><b>${esc(a)}</b><span>${esc(b)}</span></li>`).join("")}</ul>`, "story") : "")
      : `<section class="wrap how"><div class="how-h" data-reveal><h2>${esc(p.howTitle)}</h2></div><div>${p.steps.map((s, i) => `<div class="st" data-reveal><i>${i + 1}</i><div><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p>${s.art && ART[s.art] ? `<div class="art">${ART[s.art]}</div>` : ""}</div></div>`).join("")}</div></section>`;
    const cov = key === "fino"
      ? `<div class="cover-art fino" data-reveal><img class="c" src="assets/fino-modal.png" width="569" height="306" alt=""><img class="a" src="assets/fino-landing.png" width="1010" height="636" alt="Fino landing page"><img class="b" src="assets/fino-dashboard.png" width="1023" height="631" alt="Fino dashboard"></div>`
      : p.coverPhones ? `<div class="cover-art phones"${p.coverBg ? ` style="background:${p.coverBg}"` : ""} data-reveal>${p.coverPhones.map((s) => `<img src="${esc(s.src)}" width="${s.w}" height="${s.h}" alt="${esc(s.t)}">`).join("")}</div>`
      : p.shots.length > 1 ? `<div class="cover-art fino" data-reveal>${p.shots.slice(0, 2).map((s, i) => `<img class="${"ab"[i]}" src="${esc(s.src)}" width="${s.w}" height="${s.h}" alt="${esc(s.alt)}">`).join("")}</div>`
      : "";
    const light = (hex) => { const n = parseInt(hex.slice(1), 16); return ((n >> 16) * 3 + ((n >> 8) & 255) * 6 + (n & 255)) / 10 > 140; };
    const stages = (p.stages || []).map((s) => `<section class="wrap stage-s"><div class="top"><h2 data-reveal>${esc(s.h)}</h2><p class="d" data-reveal>${esc(s.d)}</p></div>${s.board ? `<div class="board-img${s.board.bg ? "" : " bare"}" style="background:${s.board.bg || "none"}" data-reveal><img src="${esc(s.board.src)}" width="${s.board.w}" height="${s.board.h}" alt="${esc(s.board.alt)}" loading="lazy"></div>` : ""}${s.colors ? `<ul class="pal" data-reveal>${s.colors.map(([n, h]) => `<li style="background:${h};color:${light(h) ? "#3D1021" : "#F7F6D7"}"><b>${esc(n)}</b><span>${h}</span></li>`).join("")}</ul>` : ""}${(s.groups || []).map((g) => `${g.t ? `<h3 data-reveal>${esc(g.t)}</h3>` : ""}<div class="phones-row${g.steps ? " steps" : ""}" style="--sz:${g.size}px;--ar:${g.list[0].w}/${g.list[0].h}" data-reveal>${g.list.map((x, i) => `<figure><img src="${esc(x.src)}" width="${x.w}" height="${x.h}" alt="${esc(s.h + ": " + x.t)}" loading="lazy"><figcaption>${g.steps ? `<i>${i + 1}</i>` : ""}${esc(x.t)}</figcaption></figure>`).join("")}${g.wide ? `<figure class="wide"><img src="${esc(g.wide.src)}" width="${g.wide.w}" height="${g.wide.h}" alt="${esc(g.wide.alt)}" loading="lazy"><figcaption>The first outfit builder</figcaption></figure>` : ""}</div>`).join("")}</section>`).join("");
    return `<div class="bar"><div class="wrap"><a href="#book/${p.bookPage}">← Back to the book</a><b>${esc(p.title)}</b><a href="#contact">Say hello</a></div></div><div class="mark" aria-hidden="true"></div>
      <div class="wrap hero"><div class="chips"><span class="chip solid">${esc(p.type)}</span>${p.company ? `<span class="chip">${esc(p.company)}</span>` : ""}</div><h1 tabindex="-1">${esc(p.title)}</h1><p class="line">${esc(p.line)}</p>${p.live || p.proto || p.post || p.code ? `<div class="hero-links">${[[p.live, "Visit " + p.title, "acc"], [p.proto, "Try the prototype", "acc"], [p.post, "Read my LinkedIn post", "ol"], [p.code, "See the code", "ol"]].filter((x) => x[0]).map(([h, n, c]) => `<a class="btn ${c}" href="${esc(h)}" target="_blank" rel="noopener">${esc(n)} ↗</a>`).join("")}</div>` : ""}
        <dl class="meta">${details(p).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>${cov}</div>
      ${main}${stages}
      ${p.gallery.length ? `<section class="gal${p.story ? " on-bg" : ""}"><div class="wrap gal-head"><h2 data-reveal>${esc(p.galTitle)}</h2><div class="gal-btns"><button class="round" data-gal="-1" aria-label="Previous screens">←</button><button class="round solid" data-gal="1" aria-label="More screens">→</button></div></div><div class="strip" tabindex="0" role="region" aria-label="${esc(p.galTitle)}">${p.gallery.map((g) => `<figure style="--fw:${g.fw || Math.min(760, g.w + 32)}px"><div class="shot"><img src="${esc(g.src)}" width="${g.w}" height="${g.h}" alt="${esc(p.title + ": " + g.t)}" loading="lazy"></div><figcaption><b>${esc(g.t)}</b>${esc(g.d)}</figcaption></figure>`).join("")}</div></section>` : ""}
      <section class="wrap learn${p.learned ? "" : " only"}">${p.learned ? `<p class="sub" data-reveal>What I learned</p><p class="q" data-reveal>${esc(p.learned)}</p>` : ""}<ul class="used" data-reveal><span>Made with</span>${p.tools.map((t) => `<li><b>${esc(t)}</b></li>`).join("")}</ul></section>
      <div class="wrap case-foot"><div class="hi" data-reveal><span>Want to talk about this one?</span><button class="btn acc" data-copy>Copy my email</button></div><footer><span>© 2026 Jiya Rathod</span><span>Designed and built by me</span><a href="#">Back to the desk</a></footer></div>`;
  }
  const caseEl = $("#case-view"); let caseIO;
  function mountCase(key) {
    caseEl.innerHTML = caseHTML(key);
    const strip = $(".strip", caseEl), btns = $$("[data-gal]", caseEl);
    if (strip) {
      const sync = () => { btns[0].disabled = strip.scrollLeft < 8; btns[1].disabled = strip.scrollLeft > strip.scrollWidth - strip.clientWidth - 8; };
      strip.addEventListener("scroll", sync, { passive: true }); requestAnimationFrame(sync);
      btns.forEach((b) => (b.onclick = () => strip.scrollBy({ left: +b.dataset.gal * Math.min(strip.clientWidth * 0.8, 780), behavior: reduce.matches ? "auto" : "smooth" })));
      let d = null;
      strip.addEventListener("pointerdown", (e) => { if (e.pointerType === "mouse" && !e.button) d = { x: e.clientX, s: strip.scrollLeft, v: 0, lx: e.clientX }; });
      strip.addEventListener("pointermove", (e) => { if (!d) return; if (Math.abs(e.clientX - d.x) > 4) strip.classList.add("drag"); d.v = d.v * 0.6 + (e.clientX - d.lx) * 0.4; d.lx = e.clientX; strip.scrollLeft = d.s - (e.clientX - d.x); });
      const up = () => { if (!d) return; let v = d.v; d = null; const glide = () => { if (Math.abs(v) < 0.4 || !strip.isConnected) return strip.classList.remove("drag"); strip.scrollLeft -= v; v *= 0.94; requestAnimationFrame(glide); }; glide(); };
      strip.addEventListener("pointerup", up); strip.addEventListener("pointerleave", up); strip.addEventListener("dragstart", (e) => e.preventDefault());
    }
    caseIO?.disconnect(); const bar = $(".bar", caseEl);
    caseIO = new IntersectionObserver(([e]) => bar.classList.toggle("stuck", !e.isIntersecting && e.boundingClientRect.top < 72), { rootMargin: "-72px 0px 0px 0px" });
    caseIO.observe($(".hero h1", caseEl)); watch(caseEl);
  }
  let deskScroll = 0;
  function mount(v) {
    if (view === "desk") deskScroll = scrollY;
    view = v; root.classList.add("instant"); root.dataset.view = v; themeColor();
    $("#desk-view").hidden = v !== "desk"; caseEl.hidden = v === "desk";
    if (v === "desk") caseEl.innerHTML = ""; else mountCase(v);
    document.title = v === "desk" ? "Jiya Rathod, UI/UX designer" : pr[v].title + ", Jiya Rathod";
    scrollTo({ top: 0, behavior: "instant" });
    if (v === "desk") fit();
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("instant")));
  }

  /* ---------- page wipe ---------- */
  const wipe = $("#wipe"), wPath = $(".wipe-shape path"), wIn = $("#wipe > div");
  const inOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  async function wiped(v, swap) {
    const [bg, fg, text] = { desk: [isNight() ? "#572F48" : "#3E2723", isNight() ? "#FFA67A" : "#FFEDAC", "Back to the desk"], fino: ["#282B4A", "#BAD797", "Fino"], hanger: ["#A5BDE1", "#6E1E3B", "Hanger"] }[v] || [pr[v].bg, pr[v].fg, pr[v].title];
    wPath.setAttribute("fill", bg); wIn.style.color = fg; $("span", wIn).textContent = text; wipe.classList.add("on");
    if (reduce.matches) {
      wPath.setAttribute("d", "M0 0H100V100H0Z");
      const fade = (a, b) => Promise.race([wipe.animate([{ opacity: a }, { opacity: b }], { duration: 220, fill: "forwards" }).finished.catch(() => {}), wait(500)]);
      await fade(0, 1); swap(); await fade(1, 0);
      wipe.classList.remove("on"); wipe.getAnimations().forEach((x) => x.cancel());
      return;
    }
    const txt = wIn.animate([{ opacity: 0, transform: "translateY(40px)" }, { opacity: 1, transform: "none", offset: 0.4 }, { opacity: 1, transform: "none", offset: 0.72 }, { opacity: 0, transform: "translateY(-30px)" }], { duration: 1250, delay: 180, fill: "both", easing: "ease-out" });
    await tween(560, (t) => { const e = inOut(t), y = 100 - e * 100, b = Math.sin(Math.PI * e) * 22; wPath.setAttribute("d", `M0 ${y} Q50 ${y - b} 100 ${y} V100 H0Z`); });
    swap();
    await wait(240);
    await tween(600, (t) => { const e = inOut(t), y = 100 - e * 100, b = Math.sin(Math.PI * e) * 22; wPath.setAttribute("d", `M0 0 H100 V${y} Q50 ${y - b} 0 ${y}Z`); });
    txt.cancel(); wipe.classList.remove("on");
  }

  /* ---------- routing ---------- */
  function parse() {
    const h = location.hash.replace(/^#\/?/, ""), [a, b] = h.split("/");
    if (pr[a]?.steps || pr[a]?.about) return { view: a, overlay: null };
    if (a === "about" || a === "contact") return { view: "desk", overlay: a };
    if (books[a]) return { view: "desk", overlay: a, arg: clamp(+b || 1, 1, books[a].N - 1) };
    return { view: "desk", overlay: null };
  }
  let queue = Promise.resolve();
  function route() { queue = queue.then(go).catch((e) => console.error(e)); return queue; }
  async function go() {
    const r = parse();
    if (r.view !== view) {
      await wiped(r.view, () => { closeOverlay(true); mount(r.view); if (r.view === "desk" && !r.overlay) arrive(true); });
      if (r.view !== "desk") $("h1", caseEl)?.focus({ preventScroll: true });
    }
    const r2 = parse();
    if (r2.view !== view) return go();
    if (r2.overlay !== overlay) { if (overlay) await closeOverlay(); if (r2.overlay) await openOverlay(r2.overlay, r2.arg); }
    else if (books[overlay] && r2.arg !== books[overlay].page && books[overlay].page) books[overlay].setPage(r2.arg, "L");
  }
  function nav(hash) {
    const was = location.hash || "#"; if (hash === was) return route();
    history.pushState({ prev: was, inApp: true }, "", hash === "#" ? location.pathname + location.search : hash); route();
  }
  function close() { if (!overlay) return; if (history.state?.inApp && ["#", ""].includes(history.state.prev)) history.back(); else { history.replaceState(null, "", location.pathname + location.search); route(); } }
  addEventListener("popstate", route); addEventListener("hashchange", route);

  document.addEventListener("click", (e) => {
    const t = e.target;
    if (t.closest("[data-copy]")) return void copy();
    if (t.closest("[data-close]")) return close();
    if (t.closest("[data-top]")) { e.preventDefault(); return scrollTo({ top: 0, behavior: reduce.matches ? "auto" : "smooth" }); }
    const o = t.closest("[data-open]"); if (o) return nav("#" + o.dataset.open);
    const a = t.closest('a[href^="#"]');
    if (a && !e.metaKey && !e.ctrlKey && !e.shiftKey) { e.preventDefault(); nav(a.getAttribute("href")); }
  });
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
    const B = books[overlay];
    if (B && !e.altKey && !e.metaKey && !e.ctrlKey) { if (e.key === "ArrowRight" || (B.stretch && e.key === "ArrowDown")) B.next(); if (e.key === "ArrowLeft" || (B.stretch && e.key === "ArrowUp")) B.prev(); }
  });
  let rz; addEventListener("resize", () => { cancelAnimationFrame(rz); rz = requestAnimationFrame(fit); });

  /* ---------- motion preference ---------- */
  const ask = $("#motion-ask");
  function paintMotion() { $$("[data-motion-toggle]").forEach((b) => (b.textContent = reduce.matches ? "Turn animations on" : "Turn animations off")); }
  function setMotion(v) { root.dataset.motion = v; store.set("jr4-motion", v); ask.hidden = true; paintMotion(); }
  $("#motion-on").onclick = () => { setMotion("full"); if (view === "desk" && scrollY < 80) arrive(false); };
  $("#motion-no").onclick = () => setMotion("less");
  document.addEventListener("click", (e) => { if (e.target.closest("[data-motion-toggle]")) setMotion(reduce.matches ? "full" : "less"); });
  if (reduce.matches && !store.get("jr4-motion")) ask.hidden = false;
  paintMotion();

  /* ---------- start ---------- */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  fit(); paintTheme(); Object.values(books).forEach((b) => b.sync());
  const first = parse();
  if (first.view !== "desk") mount(first.view);
  else { arrive(false); if (first.overlay) setTimeout(route, reduce.matches ? 0 : 1500); }
  document.fonts?.ready.then(() => { fit(); });
})();
