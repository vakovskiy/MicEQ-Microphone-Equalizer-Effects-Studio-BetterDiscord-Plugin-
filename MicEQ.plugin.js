/**
 * @name MicEQ
 * @author vakovskiy
 * @authorId 0
 * @description Эквалайзер и студия обработки микрофона прямо в Discord: 10-полосный EQ, график, пресеты, шакал (bitcrusher), дисторшн, компрессор, гейт, лимитер.
 * @version 1.0.0
 */

const NAME = "MicEQ";
const BANDS = [31, 62, 125, 250, 500, 1000, 2000, 4000, 8000, 16000];
const BAND_LABELS = ["31", "62", "125", "250", "500", "1k", "2k", "4k", "8k", "16k"];
const zeros = () => Array(10).fill(0);

const DEFAULTS = {
    enabled: true,
    preamp: 0,        // dB
    eq: zeros(),      // dB на полосу
    hp: 80,           // Hz, фильтр низов
    lp: 20000,        // Hz, фильтр верхов
    gate: -90,        // dB, -90 = выкл
    compThresh: 0,    // dB
    compRatio: 1,     // 1 = выкл
    bits: 16,         // 16 = выкл
    down: 1,          // 1 = выкл (децимация частоты дискретизации)
    drive: 0,         // 0 = выкл (дисторшн)
    out: 0,           // dB, выходная громкость (перед лимитером)
    ceiling: -12,     // dBFS, жёсткий потолок громкости (защита слуха)
    monVol: 0.4,      // громкость самопрослушивания в тесте
    ns: "off",        // шумоподавление: off | browser
    ec: false,        // эхоподавление браузера
    bridgeIn: "",     // микрофон для моста
    bridgeOut: ""     // виртуальный кабель (CABLE Input)
};

const PRESETS = [
    ["🎚 Без эффектов", {}],
    ["✨ Чистый голос", { hp: 90, eq: [-3, -2, 0, 0, 0, 1, 2, 2, 1, 0], compThresh: -22, compRatio: 3 }],
    ["🔥 Тёплый (больше низов)", { hp: 40, lp: 13000, eq: [6, 6, 4, 2, 0, -1, -2, -3, -3, -4], compThresh: -22, compRatio: 3 }],
    ["💎 Яркий (больше верхов)", { hp: 120, eq: [-6, -4, -2, 0, 1, 3, 4, 4, 3, 2], compThresh: -20, compRatio: 3 }],
    ["🎙 Подкаст / радио-голос", { hp: 70, preamp: 3, eq: [3, 4, 2, 0, -1, 2, 3, 2, 1, 0], compThresh: -24, compRatio: 4, gate: -60 }],
    ["📻 Радио (узкая полоса)", { hp: 300, lp: 3400, preamp: 2, eq: [-12, -10, -6, 0, 4, 5, 4, 0, -6, -12], compThresh: -26, compRatio: 6, drive: 0.4 }],
    ["📞 Телефон", { hp: 400, lp: 3000, preamp: 2, bits: 10, down: 3, drive: 0.6, eq: [-20, -20, -10, 0, 3, 4, 2, -4, -12, -20] }],
    ["📢 Мегафон", { hp: 500, lp: 4500, preamp: 8, drive: 3, out: 0, compThresh: -35, compRatio: 10, eq: [-20, -18, -12, -4, 3, 6, 4, 2, -6, -12] }],
    ["🌊 Подводный", { hp: 60, lp: 900, preamp: 4, eq: [8, 8, 6, 2, -4, -10, -16, -20, -24, -24] }],
    ["👾 8-бит робот", { hp: 150, lp: 8000, bits: 4, down: 12, preamp: 3, drive: 1 }],
    ["💀 Шакал", { hp: 150, lp: 6000, preamp: 8, bits: 6, down: 4, drive: 2, out: 0, compThresh: -30, compRatio: 6 }],
    ["☠ УЛЬТРА-ШАКАЛ", { hp: 200, lp: 5000, preamp: 14, bits: 3, down: 8, drive: 8, out: 0, compThresh: -40, compRatio: 12, eq: [-12, -10, -4, 2, 4, 5, 4, 2, 0, -6] }],
    ["📈 Максимальная громкость", { hp: 100, preamp: 12, drive: 1.5, out: 2, compThresh: -40, compRatio: 12, gate: -55 }],
    ["🔊 Бас-шакал", { hp: 30, lp: 7000, preamp: 10, bits: 5, down: 3, drive: 4, out: 0, eq: [10, 10, 6, 2, -2, 0, 2, 0, -4, -8], compThresh: -38, compRatio: 12 }]
];

const SLIDERS = [
    { key: "preamp", label: "Предусилитель", min: -20, max: 30, step: 0.5, unit: " dB" },
    { key: "hp", label: "Фильтр низов (HP)", min: 20, max: 1000, step: 1, unit: " Hz" },
    { key: "lp", label: "Фильтр верхов (LP)", min: 1000, max: 20000, step: 50, unit: " Hz" },
    { key: "gate", label: "Шумоподавитель (гейт)", min: -90, max: -20, step: 1, unit: " dB", off: v => v <= -90 },
    { key: "compThresh", label: "Компрессор: порог", min: -60, max: 0, step: 1, unit: " dB", off: v => v >= 0 },
    { key: "compRatio", label: "Компрессор: степень", min: 1, max: 20, step: 0.5, unit: ":1", off: v => v <= 1 },
    { key: "bits", label: "Шакал: разрядность", min: 1, max: 16, step: 1, unit: " бит", off: v => v >= 16 },
    { key: "down", label: "Шакал: децимация частоты", min: 1, max: 32, step: 1, unit: "×", off: v => v <= 1 },
    { key: "drive", label: "Дисторшн (драйв)", min: 0, max: 20, step: 0.1, unit: "", off: v => v <= 0 },
    { key: "out", label: "Выходная громкость", min: -20, max: 20, step: 0.5, unit: " dB" },
    { key: "ceiling", label: "🛡 Потолок громкости (защита слуха)", min: -30, max: -3, step: 1, unit: " dBFS" },
    { key: "monVol", label: "Громкость самопрослушивания (тест)", min: 0, max: 1, step: 0.05, unit: "" }
];

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const dbToGain = db => Math.pow(10, db / 20);

const h = (tag, props = {}, ...kids) => {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
        if (k === "style") e.style.cssText = v;
        else if (k === "class") e.className = v;
        else if (k.startsWith("on")) e.addEventListener(k.slice(2).toLowerCase(), v);
        else e[k] = v;
    }
    kids.flat().forEach(c => { if (c != null) e.append(c); });
    return e;
};

module.exports = class MicEQ {
    constructor() {
        this.S = { ...DEFAULTS, eq: zeros() };
        this.chains = new Set();
        this.ctx = null;
        this.origGUM = null;
        this.ui = { rows: {}, eq: [] };
        this.monitor = false;
        this.testStream = null;
        this.raf = null;
        this.gh = null;
        this.drag = -1;
        this.stopped = true;
    }

    /* ---------- настройки ---------- */
    load() {
        let d;
        try { d = BdApi.Data ? BdApi.Data.load(NAME, "settings") : BdApi.loadData(NAME, "settings"); } catch (e) { }
        this.S = Object.assign({}, DEFAULTS, d || {});
        this.S.eq = Array.isArray(this.S.eq) && this.S.eq.length === 10 ? this.S.eq.map(Number) : zeros();
    }
    save() {
        try { BdApi.Data ? BdApi.Data.save(NAME, "settings", this.S) : BdApi.saveData(NAME, "settings", this.S); } catch (e) { }
    }

    /* ---------- жизненный цикл ---------- */
    start() {
        this.stopped = false;
        this.load();
        const md = navigator.mediaDevices;
        this.origGUM = md.getUserMedia;
        const self = this;
        md.getUserMedia = function (c) { return self.hook(this, c); };
        this.toast("MicEQ включён. Чтобы обработка применилась, перезайди в голосовой канал или переключи микрофон.");
    }

    stop() {
        this.stopped = true;
        if (this.origGUM) navigator.mediaDevices.getUserMedia = this.origGUM;
        this.stopTest();
        this.stopBridge();
        this.chains.forEach(c => { c.forceDry = true; this.apply(c); });
        if (this.raf) cancelAnimationFrame(this.raf);
        this.raf = null;
    }

    toast(msg, type = "info") {
        try { BdApi.UI ? BdApi.UI.showToast(msg, { type }) : BdApi.showToast(msg, { type }); } catch (e) { console.log("[MicEQ]", msg); }
    }

    /* ---------- перехват микрофона ---------- */
    async hook(md, c) {
        if (!this.stopped && c && c.audio) {
            const a = typeof c.audio === "object" ? c.audio : {};
            c = { ...c, audio: { ...a, noiseSuppression: this.S.ns === "browser", echoCancellation: !!this.S.ec, autoGainControl: false } };
        }
        const stream = await this.origGUM.call(md, c);
        try {
            if (this.stopped || !c || !c.audio || !stream.getAudioTracks().length) return stream;
            return this.wrap(stream);
        } catch (e) {
            console.error("[MicEQ] ошибка обработки, отдаю оригинал", e);
            return stream;
        }
    }

    getCtx() {
        if (!this.ctx || this.ctx.state === "closed") this.ctx = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: "interactive" });
        if (this.ctx.state === "suspended") this.ctx.resume().catch(() => { });
        return this.ctx;
    }

    wrap(stream) {
        const ctx = this.getCtx();
        const self = this;
        const src = ctx.createMediaStreamSource(new MediaStream(stream.getAudioTracks()));

        const pre = ctx.createGain();
        const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.Q.value = 0.707;
        const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.Q.value = 0.707;
        const eq = BANDS.map(f => {
            const b = ctx.createBiquadFilter();
            b.type = "peaking"; b.frequency.value = f; b.Q.value = 1.1;
            return b;
        });
        const comp = ctx.createDynamicsCompressor();
        comp.knee.value = 6; comp.attack.value = 0.003; comp.release.value = 0.15;

        // bitcrusher + гейт
        const crush = ctx.createScriptProcessor(2048, 1, 1);
        crush.channelCount = 1; crush.channelCountMode = "explicit";
        let hold = 0, cnt = 0, env = 0, gg = 1;
        crush.onaudioprocess = e => {
            const S = self.S;
            const inp = e.inputBuffer.getChannelData(0);
            const out = e.outputBuffer.getChannelData(0);
            const bits = S.bits, step = Math.pow(2, bits - 1);
            const n = Math.max(1, Math.round(S.down));
            const gateOn = S.gate > -90, thr = dbToGain(S.gate);
            for (let i = 0; i < inp.length; i++) {
                let x = inp[i];
                if (gateOn) {
                    env = Math.max(Math.abs(x), env * 0.9995);
                    gg += ((env > thr ? 1 : 0) - gg) * 0.01;
                } else gg = 1;
                if (cnt++ % n === 0) {
                    let y = clamp(x, -1, 1);
                    if (bits < 16) y = Math.round(y * step) / step;
                    hold = y;
                }
                out[i] = hold * gg;
            }
        };

        const shaper = ctx.createWaveShaper(); shaper.oversample = "none";
        const outGain = ctx.createGain();
        const limiter = ctx.createDynamicsCompressor();
        limiter.threshold.value = -2; limiter.knee.value = 0; limiter.ratio.value = 20;
        limiter.attack.value = 0.001; limiter.release.value = 0.05;

        const safety = ctx.createWaveShaper(); safety.oversample = "none";
        const wet = ctx.createGain(), dry = ctx.createGain(), mix = ctx.createGain();
        const mon = ctx.createGain(); mon.gain.value = 0;
        const an = ctx.createAnalyser(); an.fftSize = 2048; an.smoothingTimeConstant = 0.8;
        const dest = ctx.createMediaStreamDestination();

        // цепочка: src → pre → hp → lp → EQ → comp → crush → shaper → out → limiter → wet → mix → dest
        let node = src;
        [pre, hp, lp, ...eq, comp, crush, shaper, outGain, limiter, safety].forEach(n => { node.connect(n); node = n; });
        safety.connect(wet); wet.connect(mix);
        src.connect(dry); dry.connect(mix);
        mix.connect(dest);
        safety.connect(an);
        safety.connect(mon); mon.connect(ctx.destination);

        const chain = { src, pre, hp, lp, eq, comp, shaper, outGain, limiter, safety, wet, dry, mon, an, crush, mix, lastDrive: null, lastCeil: null, forceDry: false };
        this.chains.add(chain);
        this.apply(chain);

        const track = dest.stream.getAudioTracks()[0];
        const origStop = track.stop.bind(track);
        track.stop = () => {
            origStop();
            stream.getTracks().forEach(t => { try { t.stop(); } catch (e) { } });
            this.teardown(chain);
        };
        stream.getAudioTracks()[0].addEventListener("ended", () => this.teardown(chain));

        return new MediaStream([track, ...stream.getVideoTracks()]);
    }

    teardown(chain) {
        if (!this.chains.has(chain)) return;
        this.chains.delete(chain);
        try {
            chain.crush.onaudioprocess = null;
            [chain.src, chain.pre, chain.hp, chain.lp, ...chain.eq, chain.comp, chain.crush, chain.shaper, chain.outGain, chain.limiter, chain.safety, chain.wet, chain.dry, chain.mix, chain.mon, chain.an]
                .forEach(n => { try { n.disconnect(); } catch (e) { } });
        } catch (e) { }
    }

    makeCurve(d) {
        const k = 1 + d * 2.5, n = 4096, c = new Float32Array(n), norm = Math.tanh(k);
        for (let i = 0; i < n; i++) { const x = (i / (n - 1)) * 2 - 1; c[i] = Math.tanh(x * k) / norm; }
        return c;
    }

    apply(chain) {
        const S = this.S, t = this.ctx.currentTime, tc = 0.01;
        const on = S.enabled && !chain.forceDry;
        chain.pre.gain.setTargetAtTime(dbToGain(S.preamp), t, tc);
        chain.hp.frequency.setTargetAtTime(S.hp, t, tc);
        chain.lp.frequency.setTargetAtTime(S.lp, t, tc);
        chain.eq.forEach((b, i) => b.gain.setTargetAtTime(S.eq[i], t, tc));
        chain.comp.threshold.setTargetAtTime(S.compRatio <= 1 ? 0 : S.compThresh, t, tc);
        chain.comp.ratio.setTargetAtTime(Math.max(1, S.compRatio), t, tc);
        chain.outGain.gain.setTargetAtTime(dbToGain(S.out), t, tc);
        chain.wet.gain.setTargetAtTime(on ? 1 : 0, t, tc);
        chain.dry.gain.setTargetAtTime(on ? 0 : 1, t, tc);
        chain.mon.gain.setTargetAtTime(this.monitor ? S.monVol : 0, t, tc);
        chain.limiter.threshold.setTargetAtTime(S.ceiling - 3, t, tc);
        if (chain.lastCeil !== S.ceiling) {
            const c = dbToGain(S.ceiling), n = 4096, cv = new Float32Array(n);
            for (let i = 0; i < n; i++) cv[i] = clamp((i / (n - 1)) * 2 - 1, -c, c);
            chain.safety.curve = cv;
            chain.lastCeil = S.ceiling;
        }
        if (chain.lastDrive !== S.drive) {
            chain.shaper.curve = S.drive > 0 ? this.makeCurve(S.drive) : null;
            chain.lastDrive = S.drive;
        }
    }

    updateAll() {
        this.save();
        if (this.ctx) this.chains.forEach(c => this.apply(c));
    }

    /* ---------- тест / мониторинг ---------- */
    async startTest() {
        try {
            this.monitor = true;
            this.testStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.updateAll();
            this.toast("Тест: слышишь себя. Надень наушники, иначе будет эхо!", "warning");
        } catch (e) {
            this.monitor = false;
            this.toast("Не удалось открыть микрофон: " + e.message, "error");
        }
        this.syncUI();
    }
    stopTest() {
        this.monitor = false;
        if (this.testStream) { this.testStream.getTracks().forEach(t => t.stop()); this.testStream = null; }
        if (this.ctx) this.chains.forEach(c => this.apply(c));
        this.syncUI();
    }

    /* ---------- мост в виртуальный кабель ---------- */
    async startBridge() {
        if (this.bridge) return;
        const S = this.S;
        if (!S.bridgeOut) { this.toast("Выбери виртуальный кабель (CABLE Input) в списке «Вывод».", "error"); return; }
        try {
            const a = { noiseSuppression: S.ns === "browser", echoCancellation: !!S.ec, autoGainControl: false, channelCount: 1 };
            if (S.bridgeIn) a.deviceId = { exact: S.bridgeIn };
            const raw = await this.origGUM.call(navigator.mediaDevices, { audio: a });
            const wrapped = this.wrap(raw);
            const el = new Audio();
            el.srcObject = wrapped;
            if (typeof el.setSinkId !== "function") throw new Error("setSinkId не поддерживается этим клиентом");
            await el.setSinkId(S.bridgeOut);
            await el.play();
            this.bridge = { wrapped, el };
            this.toast("Мост запущен. В Discord выбери вход «CABLE Output».", "success");
        } catch (e) {
            console.error("[MicEQ] мост", e);
            this.toast("Мост не запустился: " + e.message, "error");
            this.bridge = null;
        }
        this.syncUI();
    }
    stopBridge() {
        if (!this.bridge) return;
        try { this.bridge.el.pause(); this.bridge.el.srcObject = null; } catch (e) { }
        try { this.bridge.wrapped.getAudioTracks().forEach(t => t.stop()); } catch (e) { }
        this.bridge = null;
        this.syncUI();
    }

    /* ---------- пресеты ---------- */
    applyPreset(p) {
        const keep = { enabled: this.S.enabled };
        this.S = Object.assign({}, DEFAULTS, p, keep);
        this.S.eq = (p.eq || zeros()).slice();
        this.updateAll();
        this.syncUI();
    }

    /* ---------- интерфейс ---------- */
    fmt(def, v) {
        if (def.off && def.off(v)) return "выкл";
        return v + def.unit;
    }

    syncUI() {
        const S = this.S;
        SLIDERS.forEach(d => {
            const r = this.ui.rows[d.key];
            if (!r) return;
            r.input.value = S[d.key];
            r.val.textContent = this.fmt(d, S[d.key]);
        });
        this.ui.eq.forEach((e, i) => { e.input.value = S.eq[i]; e.val.textContent = S.eq[i].toFixed(1); });
        if (this.ui.power) {
            this.ui.power.textContent = S.enabled ? "● Обработка ВКЛ" : "○ Обработка ВЫКЛ (оригинал)";
            this.ui.power.style.background = S.enabled ? "#3ba55d" : "#747f8d";
        }
        if (this.ui.bridgeBtn) this.ui.bridgeBtn.textContent = this.bridge ? "⏹ Остановить мост" : "▶ Запустить мост";
        if (this.ui.nsSel) this.ui.nsSel.value = S.ns;
        if (this.ui.test) this.ui.test.textContent = this.testStream ? "⏹ Остановить тест" : "🎧 Тест (слышать себя)";
    }

    getSettingsPanel() {
        this.ui = { rows: {}, eq: [] };
        const css = `
        .meq{color:var(--text-normal);font-family:var(--font-primary);}
        .meq h3{margin:14px 0 8px;color:var(--header-primary);font-size:15px;}
        .meq .btn{background:var(--brand-experiment,#5865f2);color:#fff;border:0;border-radius:4px;padding:7px 11px;cursor:pointer;font-size:13px;}
        .meq .btn:hover{filter:brightness(1.15);}
        .meq .btn.alt{background:var(--background-modifier-selected,#4f545c);}
        .meq .presets{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:6px;}
        .meq canvas{width:100%;border-radius:6px;background:#0e0f12;cursor:crosshair;touch-action:none;}
        .meq .eqrow{display:flex;gap:4px;justify-content:space-between;background:var(--background-secondary);padding:10px 6px;border-radius:6px;}
        .meq .band{display:flex;flex-direction:column;align-items:center;flex:1;font-size:11px;gap:4px;}
        .meq .band input{writing-mode:vertical-lr;direction:rtl;height:130px;width:22px;}
        .meq .srow{display:grid;grid-template-columns:200px 1fr 80px;gap:10px;align-items:center;padding:4px 0;font-size:13px;}
        .meq .srow input{width:100%;}
        .meq .srow span.v{text-align:right;color:var(--text-muted);font-variant-numeric:tabular-nums;}
        .meq .warn{background:#faa61a22;border-left:3px solid #faa61a;padding:8px 10px;border-radius:4px;font-size:12px;margin:8px 0;}
        `;

        const power = h("button", { class: "btn", onClick: () => { this.S.enabled = !this.S.enabled; this.updateAll(); this.syncUI(); } });
        const test = h("button", { class: "btn alt", onClick: () => (this.testStream ? this.stopTest() : this.startTest()) });
        this.ui.power = power; this.ui.test = test;

        const canvas = h("canvas", { width: 900, height: 300 });
        this.ui.cv = canvas;
        this.bindCanvas(canvas);

        const eqRow = h("div", { class: "eqrow" }, BANDS.map((f, i) => {
            const val = h("span", {});
            const input = h("input", {
                type: "range", min: -24, max: 24, step: 0.5, value: 0,
                onInput: e => { this.S.eq[i] = +e.target.value; val.textContent = this.S.eq[i].toFixed(1); this.updateAll(); }
            });
            this.ui.eq.push({ input, val });
            return h("div", { class: "band" }, val, input, h("b", {}, BAND_LABELS[i]));
        }));

        const rows = SLIDERS.map(d => {
            const val = h("span", { class: "v" });
            const input = h("input", {
                type: "range", min: d.min, max: d.max, step: d.step,
                onInput: e => { this.S[d.key] = +e.target.value; val.textContent = this.fmt(d, this.S[d.key]); this.updateAll(); }
            });
            this.ui.rows[d.key] = { input, val };
            return h("div", { class: "srow" }, h("span", {}, d.label), input, val);
        });

        const presets = h("div", { class: "presets" }, PRESETS.map(([n, p]) =>
            h("button", { class: "btn", onClick: () => this.applyPreset(p) }, n)));

        const mkSel = on => h("select", { style: "background:var(--background-tertiary);color:var(--text-normal);border:0;border-radius:4px;padding:6px;min-width:240px;max-width:100%;", onChange: e => on(e.target.value) });
        const nsSel = mkSel(v => { this.S.ns = v; this.save(); this.toast("Шумоподавление применится при следующем запуске моста / входе в канал."); });
        [["off", "Выкл (чистый звук, лучше для эффектов)"], ["browser", "Браузерное (WebRTC) — убирает фоновый шум"]].forEach(([v, l]) => nsSel.append(h("option", { value: v }, l)));
        this.ui.nsSel = nsSel;
        const ecBox = h("input", { type: "checkbox", checked: !!this.S.ec, onChange: e => { this.S.ec = e.target.checked; this.save(); } });

        const inSel = mkSel(v => { this.S.bridgeIn = v; this.save(); });
        const outSel = mkSel(v => { this.S.bridgeOut = v; this.save(); });
        const fill = (sel, list, cur, key, auto) => {
            sel.innerHTML = "";
            sel.append(h("option", { value: "" }, key === "bridgeIn" ? "— микрофон по умолчанию —" : "— выбери устройство —"));
            list.forEach(d => sel.append(h("option", { value: d.deviceId }, d.label || d.kind)));
            if (!cur && auto) { const m = list.find(d => auto.test(d.label)); if (m) { cur = m.deviceId; this.S[key] = cur; this.save(); } }
            sel.value = cur || "";
        };
        const refresh = async () => {
            try {
                const devs = await navigator.mediaDevices.enumerateDevices();
                fill(inSel, devs.filter(d => d.kind === "audioinput" && !/cable/i.test(d.label)), this.S.bridgeIn, "bridgeIn");
                fill(outSel, devs.filter(d => d.kind === "audiooutput"), this.S.bridgeOut, "bridgeOut", /cable input/i);
            } catch (e) { }
        };
        refresh();
        const bridgeBtn = h("button", { class: "btn", onClick: () => (this.bridge ? this.stopBridge() : this.startBridge()) });
        this.ui.bridgeBtn = bridgeBtn;

        const nsBlock = h("div", {},
            h("div", { class: "srow" }, h("span", {}, "Шумоподавление"), nsSel, h("span", {})),
            h("div", { class: "srow" }, h("span", {}, "Эхоподавление"), h("label", {}, ecBox, " включить"), h("span", {})),
            h("div", { style: "font-size:11px;color:var(--text-muted);" }, "В самом Discord (Голос и видео) поставь шумоподавление «Нет», эхо и AGC выключи, иначе он сам будет глушить эффекты."));

        const bridgeBlock = h("div", {},
            h("div", { class: "warn" }, "Мост нужен, потому что настольный Discord берёт микрофон нативным движком, до которого плагин не достаёт. Один раз поставь бесплатный драйвер VB-CABLE (vb-audio.com/Cable). Плагин обрабатывает микрофон и отправляет звук в «CABLE Input», а в Discord → Голос и видео → Устройство ввода выбери «CABLE Output». Звук вывода Discord НЕ ставь на кабель."),
            h("div", { class: "srow" }, h("span", {}, "Микрофон (вход)"), inSel, h("span", {})),
            h("div", { class: "srow" }, h("span", {}, "Вывод (CABLE Input)"), outSel, h("span", {})),
            h("div", { style: "display:flex;gap:8px;margin-top:6px;" }, bridgeBtn,
                h("button", { class: "btn alt", onClick: refresh }, "↻ Обновить список")));

        const root = h("div", { class: "meq" },
            h("style", {}, css),
            h("div", { style: "display:flex;gap:8px;flex-wrap:wrap;" },
                power, test,
                h("button", { class: "btn alt", onClick: () => this.applyPreset({}) }, "↺ Сброс")),
            h("div", { class: "warn" }, "⚠ Потолок громкости по умолчанию −12 dBFS и работает как жёсткий предел, но всё равно проверяй звук тихо и в наушниках. Экстремальные пресеты очень резкие, поднимай потолок осторожно."),
            h("h3", {}, "Пресеты"), presets,
            h("h3", {}, "График (перетаскивай точки мышкой)"), canvas,
            h("div", { style: "font-size:11px;color:var(--text-muted);margin-top:4px;" },
                "Белая линия — АЧХ твоей настройки (±24 dB), цветной фон — живой спектр микрофона. Если спектра нет — зайди в голосовой канал или нажми «Тест»."),
            h("h3", {}, "10-полосный эквалайзер (dB)"), eqRow,
            h("h3", {}, "Обработка"), rows,
            h("h3", {}, "Шумоподавление"), nsBlock,
            h("h3", {}, "🔌 Мост в Discord (виртуальный кабель)"), bridgeBlock
        );

        this.syncUI();
        if (this.raf) cancelAnimationFrame(this.raf);
        this.draw();
        return root;
    }

    bindCanvas(cv) {
        const fx = (f, W) => (Math.log(f / 20) / Math.log(1000)) * W;
        const pos = e => {
            const r = cv.getBoundingClientRect();
            return { x: ((e.clientX - r.left) / r.width) * cv.width, y: ((e.clientY - r.top) / r.height) * cv.height };
        };
        cv.addEventListener("pointerdown", e => {
            const p = pos(e);
            let best = 0, bd = 1e9;
            BANDS.forEach((f, i) => { const d = Math.abs(fx(f, cv.width) - p.x); if (d < bd) { bd = d; best = i; } });
            this.drag = best;
            cv.setPointerCapture(e.pointerId);
            this.moveBand(cv, p);
        });
        cv.addEventListener("pointermove", e => { if (this.drag >= 0) this.moveBand(cv, pos(e)); });
        cv.addEventListener("pointerup", () => { this.drag = -1; });
        cv.addEventListener("dblclick", e => {
            const p = pos(e);
            let best = 0, bd = 1e9;
            BANDS.forEach((f, i) => { const d = Math.abs(fx(f, cv.width) - p.x); if (d < bd) { bd = d; best = i; } });
            this.S.eq[best] = 0; this.updateAll(); this.syncUI();
        });
    }

    moveBand(cv, p) {
        const H = cv.height;
        const db = clamp(Math.round(((H / 2 - p.y) / (H / 2)) * 24 * 2) / 2, -24, 24);
        this.S.eq[this.drag] = db;
        this.updateAll();
        this.syncUI();
    }

    ghost() {
        const ctx = this.getCtx();
        if (!this.gh) {
            const mk = (type, f) => { const b = ctx.createBiquadFilter(); b.type = type; b.frequency.value = f; return b; };
            this.gh = { hp: mk("highpass", 80), lp: mk("lowpass", 20000), eq: BANDS.map(f => { const b = mk("peaking", f); b.Q.value = 1.1; return b; }) };
            this.gh.hp.Q.value = 0.707; this.gh.lp.Q.value = 0.707;
        }
        const g = this.gh, S = this.S;
        g.hp.frequency.value = S.hp; g.lp.frequency.value = S.lp;
        g.eq.forEach((b, i) => { b.gain.value = S.eq[i]; });
        return g;
    }

    draw() {
        const cv = this.ui.cv;
        if (!cv || !cv.isConnected) { this.raf = null; return; }
        const g2 = cv.getContext("2d"), W = cv.width, H = cv.height;
        const fx = f => (Math.log(f / 20) / Math.log(1000)) * W;
        const dy = db => H / 2 - (db / 24) * (H / 2);
        g2.clearRect(0, 0, W, H);

        // сетка
        g2.lineWidth = 1; g2.font = "11px sans-serif"; g2.fillStyle = "#8a8e94";
        g2.strokeStyle = "#ffffff14";
        [20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000].forEach(f => {
            const x = fx(f); g2.beginPath(); g2.moveTo(x, 0); g2.lineTo(x, H); g2.stroke();
            g2.fillText(f >= 1000 ? f / 1000 + "k" : f, x + 3, H - 4);
        });
        for (let db = -24; db <= 24; db += 12) {
            const y = dy(db); g2.strokeStyle = db === 0 ? "#ffffff40" : "#ffffff14";
            g2.beginPath(); g2.moveTo(0, y); g2.lineTo(W, y); g2.stroke();
            g2.fillText((db > 0 ? "+" : "") + db + " dB", 4, y - 3);
        }

        // живой спектр
        const ch = [...this.chains][0];
        if (ch && this.ctx) {
            const a = ch.an, data = new Float32Array(a.frequencyBinCount);
            a.getFloatFrequencyData(data);
            const sr = this.ctx.sampleRate;
            const grad = g2.createLinearGradient(0, 0, 0, H);
            grad.addColorStop(0, "#ed4245aa"); grad.addColorStop(0.5, "#faa61a77"); grad.addColorStop(1, "#5865f222");
            g2.beginPath(); g2.moveTo(0, H);
            for (let px = 0; px <= W; px += 2) {
                const f = 20 * Math.pow(1000, px / W);
                const idx = clamp(Math.round((f / (sr / 2)) * (data.length - 1)), 0, data.length - 1);
                const db = isFinite(data[idx]) ? data[idx] : -140;
                g2.lineTo(px, H - clamp((db + 110) / 90, 0, 1) * H);
            }
            g2.lineTo(W, H); g2.closePath(); g2.fillStyle = grad; g2.fill();
        }

        // АЧХ
        try {
            const gh = this.ghost(), N = 300;
            const fr = new Float32Array(N), tot = new Float32Array(N).fill(1);
            const m = new Float32Array(N), ph = new Float32Array(N);
            for (let i = 0; i < N; i++) fr[i] = 20 * Math.pow(1000, i / (N - 1));
            [gh.hp, gh.lp, ...gh.eq].forEach(f => { f.getFrequencyResponse(fr, m, ph); for (let i = 0; i < N; i++) tot[i] *= m[i]; });
            g2.beginPath();
            for (let i = 0; i < N; i++) {
                const x = fx(fr[i]), y = dy(clamp(20 * Math.log10(tot[i] || 1e-6), -24, 24));
                i ? g2.lineTo(x, y) : g2.moveTo(x, y);
            }
            g2.strokeStyle = this.S.enabled ? "#ffffff" : "#ffffff55"; g2.lineWidth = 2.5; g2.stroke();
        } catch (e) { }

        // точки полос
        BANDS.forEach((f, i) => {
            g2.beginPath(); g2.arc(fx(f), dy(this.S.eq[i]), 6, 0, Math.PI * 2);
            g2.fillStyle = this.drag === i ? "#faa61a" : "#5865f2"; g2.fill();
            g2.strokeStyle = "#fff"; g2.lineWidth = 1.5; g2.stroke();
        });

        this.raf = requestAnimationFrame(() => this.draw());
    }
};
