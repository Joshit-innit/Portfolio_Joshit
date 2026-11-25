import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const GRAVITY = 2600; // px/s²
const TEXT = "h1, h1 > span, h2, h3, h4, p, li, a, button, dt, dd, label, figcaption"; // h1 > span: the hero name is absolutely placed spans
const BLOCK = "h1 > span, h1, h2, h3, h4, p, li, button, dt, dd, label, figcaption";
const rand = (a, b) => a + Math.random() * (b - a);

/**
 * A small orange cat that wanders the viewport. Text and link boxes it touches slide aside just enough,
 * it stops to lick its leg, a tap makes it sit (tap again to roam), it can be dragged,
 * and it drops in from the top when you scroll down to a new screen.
 */
export default function RoamingCat() {
  const reduce = useReducedMotion();
  const el = useRef(null);
  const [pose, setPose] = useState("walk"); // walk | lick | sit | fall | land
  const [pets, setPets] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const cat = el.current;
    const s = {
      x: rand(80, innerWidth - 200), y: innerHeight - 130, tx: 0, ty: 0, vy: 0, speed: 75,
      face: 1, rot: 0, state: "walk", until: 0, parked: false, drag: null, pointer: null,
      fallStart: 0, landY: 0, lastScroll: scrollY,
    };
    const set = (state, ms = 0) => { s.state = state; s.until = performance.now() + ms; setPose(state); };
    const pickTarget = () => {
      const p = Math.random() < 0.3 && s.pointer; // sometimes wander over to the pointer
      s.tx = p ? p.x - 60 : rand(10, innerWidth - 130);
      s.ty = p ? p.y - 45 : rand(70, innerHeight - 100);
      s.speed = rand(60, 95);
    };
    const settle = () => (s.parked ? set("sit") : (pickTarget(), set("walk")));
    const fall = () => {
      s.y = -110; s.vy = 0; s.rot = 30; s.fallStart = performance.now();
      s.landY = rand(innerHeight * 0.45, innerHeight - 110);
      set("fall");
    };
    pickTarget();

    // ---- pointer: drag, or tap to toggle sit/roam
    const onDown = (e) => {
      e.preventDefault();
      cat.setPointerCapture(e.pointerId);
      s.drag = { dx: e.clientX - s.x, dy: e.clientY - s.y, sx: e.clientX, sy: e.clientY, moved: false };
    };
    const onMove = (e) => {
      s.pointer = { x: e.clientX, y: e.clientY };
      const d = s.drag;
      if (!d) return;
      if (!d.moved && Math.hypot(e.clientX - d.sx, e.clientY - d.sy) > 5) { d.moved = true; set("fall"); s.rot = 0; s.fallStart = 0; }
      if (d.moved) { s.x = e.clientX - d.dx; s.y = e.clientY - d.dy; }
    };
    const onUp = () => {
      const d = s.drag;
      if (!d) return;
      s.drag = null;
      if (!d.moved) { s.parked = !s.parked; setPets((n) => n + 1); }
      settle();
    };
    // ---- the cat rides the page as you scroll; once carried off the top it falls back in, once
    const onScroll = () => {
      const delta = scrollY - s.lastScroll;
      s.lastScroll = scrollY;
      if (s.drag || s.state === "fall" || s.state === "land") return; // mid-air: ignore the scroll, no repeat falls
      s.y -= delta; s.ty -= delta;
      if (s.ty < 70 || s.ty > innerHeight - 100) pickTarget(); // its destination scrolled away
      if (s.y < -95) fall();
      else if (s.y > innerHeight - 90) s.y = innerHeight - 90; // scrolling up: it waits at the bottom edge
    };
    cat.addEventListener("pointerdown", onDown);
    addEventListener("pointermove", onMove);
    addEventListener("pointerup", onUp);
    addEventListener("pointercancel", onUp);
    addEventListener("scroll", onScroll, { passive: true });

    // ---- text the cat touches makes room. Paragraph text is split into word spans; boxed links and
    // buttons (anything not display:inline) move whole, so the box goes with its label.
    const splits = []; // { pieces, original, words, near }
    const splitDone = new WeakSet();
    let candidates = [], units = [], unitSet = new Set();
    const catBox = () => ({ L: s.x + 18, R: s.x + 102, T: s.y + 10, B: s.y + 86, cx: s.x + 60 });
    const inUnit = (n) => { for (let e = n.parentElement; e; e = e.parentElement) if (unitSet.has(e)) return true; return false; };
    const refresh = () => {
      candidates = [...document.querySelectorAll(TEXT)];
      units = [...document.querySelectorAll("a, button")].filter((e) => {
        if (e.closest("[data-cat], [data-cat-skip]")) return false;
        const cs = getComputedStyle(e);
        // only small boxes (chips, buttons) move whole; wide ones like full-width list rows part their words instead
        return cs.display !== "inline" && e.getBoundingClientRect().width <= 320 && (e._dx || cs.translate === "none"); // never fight an element's own translate
      });
      unitSet = new Set(units);
      // boxes in a list share a row: group by the list, not each <li>
      for (const u of units) u._block = u.parentElement.tagName === "LI" ? u.parentElement.parentElement : u.parentElement;
    };
    const splitNear = (now) => {
      const c = catBox();
      for (const e of candidates) {
        const r = e.getBoundingClientRect();
        if (r.right < c.L - 30 || r.left > c.R + 30 || r.bottom < c.T - 30 || r.top > c.B + 30) continue;
        const walker = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
        const nodes = [];
        for (let n; (n = walker.nextNode()); ) if (n.nodeValue.trim() && !splitDone.has(n) && !n.parentElement.closest(".cw, [data-cat], [data-cat-skip]") && !inUnit(n)) nodes.push(n);
        for (const n of nodes) {
          const pieces = n.nodeValue.split(/(\s+)/).filter(Boolean).map((t) => {
            if (/^\s+$/.test(t)) return document.createTextNode(t);
            const w = document.createElement("span");
            w.className = "cw"; w.textContent = t; w._dx = 0;
            return w;
          });
          const block = n.parentElement.closest(BLOCK) || n.parentElement;
          for (const p of pieces) p._block = block;
          splitDone.add(n);
          n.replaceWith(...pieces);
          splits.push({ original: n, pieces, words: pieces.filter((p) => p.nodeType === 1), near: now });
        }
      }
    };
    const restore = (rec) => {
      // React may have re-rendered this text meanwhile; only swap back if our pieces are still in place
      if (rec.pieces[0].isConnected) { rec.pieces[0].before(rec.original); rec.pieces.forEach((p) => p.remove()); }
      splitDone.delete(rec.original);
    };
    const move = (item, dx) => {
      dx = Math.abs(dx) < 1 ? 0 : dx;
      if (Math.abs(dx - item._dx) > 0.5) { item._dx = dx; item.style.translate = dx ? `${dx}px 0` : ""; }
    };
    // shortcut: splits React-owned text nodes, safe only for text that doesn't change; mark live text with data-cat-skip or React crashes
    const nudge = (now) => {
      const c = catBox();
      const items = units.filter((u) => u.isConnected);
      for (const rec of splits) items.push(...rec.words);
      // group items on the cat's rows by block and line, using where each rests (computed translate includes mid-slide)
      const groups = new Map();
      for (const it of items) {
        it._dx ??= 0; it._to = 0;
        if (s.state === "fall") continue;
        const r = it.getBoundingClientRect();
        if (r.top >= c.B || r.bottom <= c.T) continue;
        const left = r.left - (parseFloat(getComputedStyle(it).translate) || 0);
        if (!groups.has(it._block)) groups.set(it._block, []);
        groups.get(it._block).push({ it, left, right: left + r.width, top: r.top, bottom: r.bottom });
      }
      // lines = items whose heights overlap, so mixed font sizes sharing a baseline count as one line
      const rows = [];
      for (const list of groups.values()) {
        list.sort((p, q) => p.top - q.top);
        let row = null;
        for (const o of list) {
          const mid = (o.top + o.bottom) / 2;
          if (row && mid < row.bottom && mid > row.top) { row.items.push(o); row.bottom = Math.max(row.bottom, o.bottom); }
          else rows.push((row = { top: o.top, bottom: o.bottom, items: [o] }));
        }
      }
      // a line moves only if the cat actually touches it; each side then shifts rigidly by just enough to clear the cat
      for (const { items: row } of rows) {
        if (!row.some((o) => o.left < c.R + 4 && o.right > c.L - 4)) continue;
        // something already sliding keeps its direction, so an item centred under the cat doesn't flip back and forth
        const sorted = [...row].sort((p, q) => p.left - q.left);
        let k = sorted.filter((o) => (o.it._dx ? o.it._dx < 0 : (o.left + o.right) / 2 < c.cx)).length; // first k go left
        const needR = (k) => (k < sorted.length ? Math.max(0, c.R + 6 - sorted[k].left) : 0);
        const needL = (k) => (k > 0 ? Math.max(0, sorted[k - 1].right - (c.L - 6)) : 0);
        // no room before a screen edge: hand the nearest item over to the other side until both fit
        while (k < sorted.length && sorted.at(-1).right + needR(k) > innerWidth - 8) k++;
        while (k > 0 && sorted[0].left - needL(k) < 8 && sorted.at(-1).right + needR(k - 1) <= innerWidth - 8) k--;
        const R = Math.min(240, needR(k)), L = Math.min(240, needL(k));
        sorted.forEach((o, i) => (o.it._to = i < k ? -L : R));
      }
      for (const u of units) {
        // the class swaps in a translate transition; drop it once settled so the link's own hover transitions return
        if (u._to) { u.classList.add("cat-unit"); u._near = now; }
        else if (u._near && now - u._near > 1500) { u.classList.remove("cat-unit"); u._near = 0; }
        move(u, u._to || 0);
      }
      for (let i = splits.length - 1; i >= 0; i--) {
        const rec = splits[i];
        let any = false;
        for (const w of rec.words) { move(w, w._to); if (w._dx) any = true; }
        if (any) rec.near = now;
        else if (now - rec.near > 1500) { restore(rec); splits.splice(i, 1); }
      }
    };

    // ---- main loop
    let last = performance.now(), frame = 0, raf;
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      if (frame % 60 === 0) refresh();

      if (!s.drag) {
        if (s.state === "walk") {
          const dx = s.tx - s.x, dy = s.ty - s.y, d = Math.hypot(dx, dy);
          if (d < 4) Math.random() < 0.45 ? set("lick", rand(3000, 5000)) : pickTarget();
          else {
            s.x += (dx / d) * s.speed * dt; s.y += (dy / d) * s.speed * dt;
            if (Math.abs(dx) > 3) s.face = Math.sign(dx);
          }
        } else if (s.state === "lick" && now > s.until) settle();
        else if (s.state === "fall") {
          s.vy += GRAVITY * dt; s.y += s.vy * dt;
          s.rot = 30 * Math.max(0, 1 - (now - s.fallStart) / 400); // a small tilt that levels out on the way down
          if (s.y >= s.landY) { s.y = s.landY; s.rot = 0; set("land", 520); }
        } else if (s.state === "land" && now > s.until) settle();
      }
      s.x = Math.max(-20, Math.min(innerWidth - 100, s.x));
      if (s.state !== "fall" && !s.drag) s.y = Math.min(innerHeight - 90, s.y); // e.g. after a resize; the top edge is where it falls from
      cat.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${s.rot * s.face}deg)`;
      cat.firstChild.style.transform = `scaleX(${s.face})`;

      if (++frame % 2 === 0) { splitNear(now); nudge(now); }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      cat.removeEventListener("pointerdown", onDown);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerup", onUp);
      removeEventListener("pointercancel", onUp);
      removeEventListener("scroll", onScroll);
      splits.forEach(restore);
      for (const u of units) { u.style.translate = ""; u.classList.remove("cat-unit"); }
    };
  }, [reduce]);

  if (reduce) return null;
  const Pose = { walk: Walking, lick: Licking, sit: Sitting, land: Sitting, fall: Falling }[pose];
  return (
    <div ref={el} data-cat className={`cat cat-${pose}`} role="img" aria-label="An orange cat wandering the page. Tap it to sit or roam, or drag it.">
      <div className="cat-flip">
        <svg viewBox="0 0 120 90" width="120" height="90" overflow="visible">
          <Pose />
        </svg>
      </div>
      {pose === "land" && <span className="cat-dust" aria-hidden="true" />}
      {pets > 0 && <span key={pets} className="cat-heart" aria-hidden="true">♥</span>}
    </div>
  );
}

const ORANGE = "#f28c28", DARK = "#c96512", CREAM = "#fde3c4", PINK = "#e86a8a";

function Head({ x, y, tilt = 0, eyes = "open" }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${tilt})`}>
      <g className="cat-head">
        <path className="cat-ear" d="M-12 -8 L-9 -23 L-1 -12 Z" fill={ORANGE} />
        <path className="cat-ear b" d="M2 -12 L10 -23 L13 -7 Z" fill={ORANGE} />
        <path d="M-9 -12 L-8 -18 L-4 -13 Z M5 -13 L9 -18 L10 -12 Z" fill="#f7a8a8" />
        <circle r="14" fill={ORANGE} />
        <path d="M-6 -13 L-4 -7 M0 -14 L0 -8 M6 -13 L4 -7" stroke={DARK} strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="7" cy="5" rx="7" ry="5" fill={CREAM} />
        {eyes === "closed" && <path d="M1 -2 q3 3 6 0" stroke="#1d1d1d" strokeWidth="1.6" fill="none" strokeLinecap="round" />}
        {eyes === "open" && <ellipse className="cat-eye" cx="4" cy="-2" rx="2" ry="3" fill="#1d1d1d" />}
        {eyes === "wide" && <><circle cx="4" cy="-2" r="4" fill="#fff" /><circle cx="5" cy="-2" r="2.2" fill="#1d1d1d" /></>}
        <path d="M12 2 l2 0 l-1 2 Z" fill={PINK} />
        <path d="M12 6 L25 3 M12 7 L25 10" stroke="#fff" strokeWidth="0.8" opacity="0.8" />
      </g>
    </g>
  );
}

const Leg = ({ x, cls, far }) => (
  <g className={`cat-leg ${cls}`}>
    <line x1={x} y1="50" x2={x} y2="79" stroke={far ? DARK : ORANGE} strokeWidth="7" strokeLinecap="round" />
    <ellipse cx={x + 1.5} cy="81" rx="5" ry="3" fill={far ? DARK : CREAM} />
  </g>
);

function Walking() {
  return (
    <g>
      {/* diagonal gait: near-back with far-front, far-back with near-front */}
      <Leg x={46} cls="b" far /><Leg x={84} cls="a" far />
      <g className="cat-bob">
        <path className="cat-tail" d="M28 46 C 14 44, 16 26, 6 18" stroke={ORANGE} strokeWidth="7" fill="none" strokeLinecap="round" />
        <ellipse cx="58" cy="50" rx="33" ry="16" fill={ORANGE} />
        <path d="M44 36 q3 8 0 14 M56 34 q3 8 0 14 M68 36 q3 8 0 12" stroke={DARK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <ellipse cx="64" cy="58" rx="17" ry="6" fill={CREAM} />
        <Head x={92} y={32} />
      </g>
      <Leg x={36} cls="a" /><Leg x={74} cls="b" />
    </g>
  );
}

function Sitting() {
  return (
    <g className="cat-sitbody">
      <path className="cat-tailtip" d="M36 80 C 46 92, 76 90, 86 80" stroke={ORANGE} strokeWidth="7" fill="none" strokeLinecap="round" />
      <ellipse cx="54" cy="60" rx="21" ry="23" fill={ORANGE} />
      <circle cx="44" cy="70" r="14" fill={ORANGE} />
      <path d="M38 48 q4 6 0 12 M48 42 q4 7 0 14" stroke={DARK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="66" cy="58" rx="8" ry="14" fill={CREAM} />
      <line x1="62" y1="66" x2="62" y2="82" stroke={ORANGE} strokeWidth="7" strokeLinecap="round" />
      <line x1="70" y1="66" x2="70" y2="82" stroke={ORANGE} strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="63" cy="83" rx="5" ry="3" fill={CREAM} /><ellipse cx="71" cy="83" rx="5" ry="3" fill={CREAM} />
      <Head x={66} y={30} />
    </g>
  );
}

// sitting with a back leg straight up, head working along it
function Licking() {
  return (
    <g>
      <path d="M34 80 C 20 84, 10 74, 14 62" stroke={ORANGE} strokeWidth="7" fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="62" rx="22" ry="20" fill={ORANGE} />
      <path d="M38 48 q4 6 0 12 M48 44 q4 7 0 14" stroke={DARK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <line x1="64" y1="66" x2="64" y2="82" stroke={ORANGE} strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="65" cy="83" rx="5" ry="3" fill={CREAM} />
      <circle cx="46" cy="70" r="13" fill={ORANGE} />
      <g className="cat-upleg">
        <line x1="48" y1="70" x2="84" y2="20" stroke={ORANGE} strokeWidth="9" strokeLinecap="round" />
        <ellipse cx="86" cy="17" rx="6" ry="4.5" fill={CREAM} transform="rotate(-50 86 17)" />
      </g>
      <g className="cat-lick">
        <Head x={58} y={42} tilt={-35} eyes="closed" />
        <g transform="rotate(-35 70 40)"><ellipse className="cat-tongue" cx="70" cy="40" rx="2.6" ry="4" fill={PINK} /></g>
      </g>
    </g>
  );
}

// legs splayed, tail up: used mid-air and while being carried
function Falling() {
  const limb = (x1, y1, x2, y2, cls) => (
    <g className={`cat-flail ${cls}`}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={ORANGE} strokeWidth="7" strokeLinecap="round" />
      <circle cx={x2} cy={y2} r="4" fill={CREAM} />
    </g>
  );
  return (
    <g>
      <path className="cat-tail up" d="M28 46 C 16 40, 22 18, 14 4" stroke={ORANGE} strokeWidth="7" fill="none" strokeLinecap="round" />
      {limb(38, 52, 22, 74, "a")}{limb(48, 54, 40, 80, "b")}{limb(72, 54, 82, 80, "a")}{limb(80, 52, 98, 72, "b")}
      <ellipse cx="58" cy="48" rx="31" ry="15" fill={ORANGE} />
      <path d="M44 35 q3 8 0 13 M56 33 q3 8 0 13 M68 35 q3 8 0 12" stroke={DARK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="64" cy="56" rx="16" ry="5" fill={CREAM} />
      <Head x={92} y={34} eyes="wide" />
    </g>
  );
}
