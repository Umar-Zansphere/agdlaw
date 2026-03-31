var xr = "1.3.4";
function ms(r, e, t) {
    return Math.max(r, Math.min(e, t))
}
function br(r, e, t) {
    return (1 - t) * r + t * e
}
function Er(r, e, t, i) {
    return br(r, e, 1 - Math.exp(-t * i))
}
function Pr(r, e) {
    return (r % e + e) % e
}
var Mr = class {
    isRunning = !1;
    value = 0;
    from = 0;
    to = 0;
    currentTime = 0;
    lerp;
    duration;
    easing;
    onUpdate;
    advance(r) {
        if (!this.isRunning)
            return;
        let e = !1;
        if (this.duration && this.easing) {
            this.currentTime += r;
            const t = ms(0, this.currentTime / this.duration, 1);
            e = t >= 1;
            const i = e ? 1 : this.easing(t);
            this.value = this.from + (this.to - this.from) * i
        } else
            this.lerp ? (this.value = Er(this.value, this.to, this.lerp * 60, r),
                Math.round(this.value) === this.to && (this.value = this.to,
                    e = !0)) : (this.value = this.to,
                        e = !0);
        e && this.stop(),
            this.onUpdate?.(this.value, e)
    }
    stop() {
        this.isRunning = !1
    }
    fromTo(r, e, { lerp: t, duration: i, easing: s, onStart: n, onUpdate: o }) {
        this.from = this.value = r,
            this.to = e,
            this.lerp = t,
            this.duration = i,
            this.easing = s,
            this.currentTime = 0,
            this.isRunning = !0,
            n?.(),
            this.onUpdate = o
    }
}
    ;
function Cr(r, e) {
    let t;
    return function (...i) {
        let s = this;
        clearTimeout(t),
            t = setTimeout(() => {
                t = void 0,
                    r.apply(s, i)
            }
                , e)
    }
}
var Or = class {
    constructor(r, e, { autoResize: t = !0, debounce: i = 250 } = {}) {
        this.wrapper = r,
            this.content = e,
            t && (this.debouncedResize = Cr(this.resize, i),
                this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize, !1) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize),
                    this.wrapperResizeObserver.observe(this.wrapper)),
                this.contentResizeObserver = new ResizeObserver(this.debouncedResize),
                this.contentResizeObserver.observe(this.content)),
            this.resize()
    }
    width = 0;
    height = 0;
    scrollHeight = 0;
    scrollWidth = 0;
    debouncedResize;
    wrapperResizeObserver;
    contentResizeObserver;
    destroy() {
        this.wrapperResizeObserver?.disconnect(),
            this.contentResizeObserver?.disconnect(),
            this.wrapper === window && this.debouncedResize && window.removeEventListener("resize", this.debouncedResize, !1)
    }
    resize = () => {
        this.onWrapperResize(),
            this.onContentResize()
    }
        ;
    onWrapperResize = () => {
        this.wrapper instanceof Window ? (this.width = window.innerWidth,
            this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth,
                this.height = this.wrapper.clientHeight)
    }
        ;
    onContentResize = () => {
        this.wrapper instanceof Window ? (this.scrollHeight = this.content.scrollHeight,
            this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight,
                this.scrollWidth = this.wrapper.scrollWidth)
    }
        ;
    get limit() {
        return {
            x: this.scrollWidth - this.width,
            y: this.scrollHeight - this.height
        }
    }
}
    , gs = class {
        events = {};
        emit(r, ...e) {
            let t = this.events[r] || [];
            for (let i = 0, s = t.length; i < s; i++)
                t[i]?.(...e)
        }
        on(r, e) {
            return this.events[r]?.push(e) || (this.events[r] = [e]),
                () => {
                    this.events[r] = this.events[r]?.filter(t => e !== t)
                }
        }
        off(r, e) {
            this.events[r] = this.events[r]?.filter(t => e !== t)
        }
        destroy() {
            this.events = {}
        }
    }
    , Wi = 100 / 6
    , Oe = {
        passive: !1
    }
    , kr = class {
        constructor(r, e = {
            wheelMultiplier: 1,
            touchMultiplier: 1
        }) {
            this.element = r,
                this.options = e,
                window.addEventListener("resize", this.onWindowResize, !1),
                this.onWindowResize(),
                this.element.addEventListener("wheel", this.onWheel, Oe),
                this.element.addEventListener("touchstart", this.onTouchStart, Oe),
                this.element.addEventListener("touchmove", this.onTouchMove, Oe),
                this.element.addEventListener("touchend", this.onTouchEnd, Oe)
        }
        touchStart = {
            x: 0,
            y: 0
        };
        lastDelta = {
            x: 0,
            y: 0
        };
        window = {
            width: 0,
            height: 0
        };
        emitter = new gs;
        on(r, e) {
            return this.emitter.on(r, e)
        }
        destroy() {
            this.emitter.destroy(),
                window.removeEventListener("resize", this.onWindowResize, !1),
                this.element.removeEventListener("wheel", this.onWheel, Oe),
                this.element.removeEventListener("touchstart", this.onTouchStart, Oe),
                this.element.removeEventListener("touchmove", this.onTouchMove, Oe),
                this.element.removeEventListener("touchend", this.onTouchEnd, Oe)
        }
        onTouchStart = r => {
            const { clientX: e, clientY: t } = r.targetTouches ? r.targetTouches[0] : r;
            this.touchStart.x = e,
                this.touchStart.y = t,
                this.lastDelta = {
                    x: 0,
                    y: 0
                },
                this.emitter.emit("scroll", {
                    deltaX: 0,
                    deltaY: 0,
                    event: r
                })
        }
            ;
        onTouchMove = r => {
            const { clientX: e, clientY: t } = r.targetTouches ? r.targetTouches[0] : r
                , i = -(e - this.touchStart.x) * this.options.touchMultiplier
                , s = -(t - this.touchStart.y) * this.options.touchMultiplier;
            this.touchStart.x = e,
                this.touchStart.y = t,
                this.lastDelta = {
                    x: i,
                    y: s
                },
                this.emitter.emit("scroll", {
                    deltaX: i,
                    deltaY: s,
                    event: r
                })
        }
            ;
        onTouchEnd = r => {
            this.emitter.emit("scroll", {
                deltaX: this.lastDelta.x,
                deltaY: this.lastDelta.y,
                event: r
            })
        }
            ;
        onWheel = r => {
            let { deltaX: e, deltaY: t, deltaMode: i } = r;
            const s = i === 1 ? Wi : i === 2 ? this.window.width : 1
                , n = i === 1 ? Wi : i === 2 ? this.window.height : 1;
            e *= s,
                t *= n,
                e *= this.options.wheelMultiplier,
                t *= this.options.wheelMultiplier,
                this.emitter.emit("scroll", {
                    deltaX: e,
                    deltaY: t,
                    event: r
                })
        }
            ;
        onWindowResize = () => {
            this.window = {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
    }
    , Hi = r => Math.min(1, 1.001 - Math.pow(2, -10 * r))
    , Lr = class {
        _isScrolling = !1;
        _isStopped = !1;
        _isLocked = !1;
        _preventNextNativeScrollEvent = !1;
        _resetVelocityTimeout = null;
        __rafID = null;
        isTouching;
        time = 0;
        userData = {};
        lastVelocity = 0;
        velocity = 0;
        direction = 0;
        options;
        targetScroll;
        animatedScroll;
        animate = new Mr;
        emitter = new gs;
        dimensions;
        virtualScroll;
        constructor({ wrapper: r = window, content: e = document.documentElement, eventsTarget: t = r, smoothWheel: i = !0, syncTouch: s = !1, syncTouchLerp: n = .075, touchInertiaMultiplier: o = 35, duration: a, easing: l, lerp: d = .1, infinite: u = !1, orientation: f = "vertical", gestureOrientation: h = "vertical", touchMultiplier: m = 1, wheelMultiplier: p = 1, autoResize: c = !0, prevent: g, virtualScroll: _, overscroll: v = !0, autoRaf: y = !1, anchors: S = !1, autoToggle: w = !1, allowNestedScroll: x = !1, __experimental__naiveDimensions: T = !1 } = {}) {
            window.lenisVersion = xr,
                (!r || r === document.documentElement) && (r = window),
                typeof a == "number" && typeof l != "function" ? l = Hi : typeof l == "function" && typeof a != "number" && (a = 1),
                this.options = {
                    wrapper: r,
                    content: e,
                    eventsTarget: t,
                    smoothWheel: i,
                    syncTouch: s,
                    syncTouchLerp: n,
                    touchInertiaMultiplier: o,
                    duration: a,
                    easing: l,
                    lerp: d,
                    infinite: u,
                    gestureOrientation: h,
                    orientation: f,
                    touchMultiplier: m,
                    wheelMultiplier: p,
                    autoResize: c,
                    prevent: g,
                    virtualScroll: _,
                    overscroll: v,
                    autoRaf: y,
                    anchors: S,
                    autoToggle: w,
                    allowNestedScroll: x,
                    __experimental__naiveDimensions: T
                },
                this.dimensions = new Or(r, e, {
                    autoResize: c
                }),
                this.updateClassName(),
                this.targetScroll = this.animatedScroll = this.actualScroll,
                this.options.wrapper.addEventListener("scroll", this.onNativeScroll, !1),
                this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, {
                    capture: !0
                }),
                this.options.anchors && this.options.wrapper === window && this.options.wrapper.addEventListener("click", this.onClick, !1),
                this.options.wrapper.addEventListener("pointerdown", this.onPointerDown, !1),
                this.virtualScroll = new kr(t, {
                    touchMultiplier: m,
                    wheelMultiplier: p
                }),
                this.virtualScroll.on("scroll", this.onVirtualScroll),
                this.options.autoToggle && this.rootElement.addEventListener("transitionend", this.onTransitionEnd, {
                    passive: !0
                }),
                this.options.autoRaf && (this.__rafID = requestAnimationFrame(this.raf))
        }
        destroy() {
            this.emitter.destroy(),
                this.options.wrapper.removeEventListener("scroll", this.onNativeScroll, !1),
                this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, {
                    capture: !0
                }),
                this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown, !1),
                this.options.anchors && this.options.wrapper === window && this.options.wrapper.removeEventListener("click", this.onClick, !1),
                this.virtualScroll.destroy(),
                this.dimensions.destroy(),
                this.cleanUpClassName(),
                this.__rafID && cancelAnimationFrame(this.__rafID)
        }
        on(r, e) {
            return this.emitter.on(r, e)
        }
        off(r, e) {
            return this.emitter.off(r, e)
        }
        onScrollEnd = r => {
            r instanceof CustomEvent || (this.isScrolling === "smooth" || this.isScrolling === !1) && r.stopPropagation()
        }
            ;
        dispatchScrollendEvent = () => {
            this.options.wrapper.dispatchEvent(new CustomEvent("scrollend", {
                bubbles: this.options.wrapper === window,
                detail: {
                    lenisScrollEnd: !0
                }
            }))
        }
            ;
        onTransitionEnd = r => {
            if (r.propertyName.includes("overflow")) {
                const e = this.isHorizontal ? "overflow-x" : "overflow-y"
                    , t = getComputedStyle(this.rootElement)[e];
                ["hidden", "clip"].includes(t) ? this.stop() : this.start()
            }
        }
            ;
        setScroll(r) {
            this.isHorizontal ? this.options.wrapper.scrollTo({
                left: r,
                behavior: "instant"
            }) : this.options.wrapper.scrollTo({
                top: r,
                behavior: "instant"
            })
        }
        onClick = r => {
            const t = r.composedPath().find(i => i instanceof HTMLAnchorElement && (i.getAttribute("href")?.startsWith("#") || i.getAttribute("href")?.startsWith("/#") || i.getAttribute("href")?.startsWith("./#")));
            if (t) {
                const i = t.getAttribute("href");
                if (i) {
                    const s = typeof this.options.anchors == "object" && this.options.anchors ? this.options.anchors : void 0;
                    let n = `#${i.split("#")[1]}`;
                    ["#", "/#", "./#", "#top", "/#top", "./#top"].includes(i) && (n = 0),
                        this.scrollTo(n, s)
                }
            }
        }
            ;
        onPointerDown = r => {
            r.button === 1 && this.reset()
        }
            ;
        onVirtualScroll = r => {
            if (typeof this.options.virtualScroll == "function" && this.options.virtualScroll(r) === !1)
                return;
            const { deltaX: e, deltaY: t, event: i } = r;
            if (this.emitter.emit("virtual-scroll", {
                deltaX: e,
                deltaY: t,
                event: i
            }),
                i.ctrlKey || i.lenisStopPropagation)
                return;
            const s = i.type.includes("touch")
                , n = i.type.includes("wheel");
            this.isTouching = i.type === "touchstart" || i.type === "touchmove";
            const o = e === 0 && t === 0;
            if (this.options.syncTouch && s && i.type === "touchstart" && o && !this.isStopped && !this.isLocked) {
                this.reset();
                return
            }
            const l = this.options.gestureOrientation === "vertical" && t === 0 || this.options.gestureOrientation === "horizontal" && e === 0;
            if (o || l)
                return;
            let d = i.composedPath();
            d = d.slice(0, d.indexOf(this.rootElement));
            const u = this.options.prevent;
            if (d.find(g => g instanceof HTMLElement && (typeof u == "function" && u?.(g) || g.hasAttribute?.("data-lenis-prevent") || s && g.hasAttribute?.("data-lenis-prevent-touch") || n && g.hasAttribute?.("data-lenis-prevent-wheel") || this.options.allowNestedScroll && this.checkNestedScroll(g, {
                deltaX: e,
                deltaY: t
            }))))
                return;
            if (this.isStopped || this.isLocked) {
                i.preventDefault();
                return
            }
            if (!(this.options.syncTouch && s || this.options.smoothWheel && n)) {
                this.isScrolling = "native",
                    this.animate.stop(),
                    i.lenisStopPropagation = !0;
                return
            }
            let h = t;
            this.options.gestureOrientation === "both" ? h = Math.abs(t) > Math.abs(e) ? t : e : this.options.gestureOrientation === "horizontal" && (h = e),
                (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && (this.animatedScroll > 0 && this.animatedScroll < this.limit || this.animatedScroll === 0 && t > 0 || this.animatedScroll === this.limit && t < 0)) && (i.lenisStopPropagation = !0),
                i.preventDefault();
            const m = s && this.options.syncTouch
                , c = s && i.type === "touchend" && Math.abs(h) > 5;
            c && (h = this.velocity * this.options.touchInertiaMultiplier),
                this.scrollTo(this.targetScroll + h, {
                    programmatic: !1,
                    ...m ? {
                        lerp: c ? this.options.syncTouchLerp : 1
                    } : {
                        lerp: this.options.lerp,
                        duration: this.options.duration,
                        easing: this.options.easing
                    }
                })
        }
            ;
        resize() {
            this.dimensions.resize(),
                this.animatedScroll = this.targetScroll = this.actualScroll,
                this.emit()
        }
        emit() {
            this.emitter.emit("scroll", this)
        }
        onNativeScroll = () => {
            if (this._resetVelocityTimeout !== null && (clearTimeout(this._resetVelocityTimeout),
                this._resetVelocityTimeout = null),
                this._preventNextNativeScrollEvent) {
                this._preventNextNativeScrollEvent = !1;
                return
            }
            if (this.isScrolling === !1 || this.isScrolling === "native") {
                const r = this.animatedScroll;
                this.animatedScroll = this.targetScroll = this.actualScroll,
                    this.lastVelocity = this.velocity,
                    this.velocity = this.animatedScroll - r,
                    this.direction = Math.sign(this.animatedScroll - r),
                    this.isStopped || (this.isScrolling = "native"),
                    this.emit(),
                    this.velocity !== 0 && (this._resetVelocityTimeout = setTimeout(() => {
                        this.lastVelocity = this.velocity,
                            this.velocity = 0,
                            this.isScrolling = !1,
                            this.emit()
                    }
                        , 400))
            }
        }
            ;
        reset() {
            this.isLocked = !1,
                this.isScrolling = !1,
                this.animatedScroll = this.targetScroll = this.actualScroll,
                this.lastVelocity = this.velocity = 0,
                this.animate.stop()
        }
        start() {
            this.isStopped && (this.reset(),
                this.isStopped = !1,
                this.emit())
        }
        stop() {
            this.isStopped || (this.reset(),
                this.isStopped = !0,
                this.emit())
        }
        raf = r => {
            const e = r - (this.time || r);
            this.time = r,
                this.animate.advance(e * .001),
                this.options.autoRaf && (this.__rafID = requestAnimationFrame(this.raf))
        }
            ;
        scrollTo(r, { offset: e = 0, immediate: t = !1, lock: i = !1, duration: s = this.options.duration, easing: n = this.options.easing, lerp: o = this.options.lerp, onStart: a, onComplete: l, force: d = !1, programmatic: u = !0, userData: f } = {}) {
            if (!((this.isStopped || this.isLocked) && !d)) {
                if (typeof r == "string" && ["top", "left", "start"].includes(r))
                    r = 0;
                else if (typeof r == "string" && ["bottom", "right", "end"].includes(r))
                    r = this.limit;
                else {
                    let h;
                    if (typeof r == "string" ? h = document.querySelector(r) : r instanceof HTMLElement && r?.nodeType && (h = r),
                        h) {
                        if (this.options.wrapper !== window) {
                            const p = this.rootElement.getBoundingClientRect();
                            e -= this.isHorizontal ? p.left : p.top
                        }
                        const m = h.getBoundingClientRect();
                        r = (this.isHorizontal ? m.left : m.top) + this.animatedScroll
                    }
                }
                if (typeof r == "number") {
                    if (r += e,
                        r = Math.round(r),
                        this.options.infinite) {
                        if (u) {
                            this.targetScroll = this.animatedScroll = this.scroll;
                            const h = r - this.animatedScroll;
                            h > this.limit / 2 ? r = r - this.limit : h < -this.limit / 2 && (r = r + this.limit)
                        }
                    } else
                        r = ms(0, r, this.limit);
                    if (r === this.targetScroll) {
                        a?.(this),
                            l?.(this);
                        return
                    }
                    if (this.userData = f ?? {},
                        t) {
                        this.animatedScroll = this.targetScroll = r,
                            this.setScroll(this.scroll),
                            this.reset(),
                            this.preventNextNativeScrollEvent(),
                            this.emit(),
                            l?.(this),
                            this.userData = {},
                            requestAnimationFrame(() => {
                                this.dispatchScrollendEvent()
                            }
                            );
                        return
                    }
                    u || (this.targetScroll = r),
                        typeof s == "number" && typeof n != "function" ? n = Hi : typeof n == "function" && typeof s != "number" && (s = 1),
                        this.animate.fromTo(this.animatedScroll, r, {
                            duration: s,
                            easing: n,
                            lerp: o,
                            onStart: () => {
                                i && (this.isLocked = !0),
                                    this.isScrolling = "smooth",
                                    a?.(this)
                            }
                            ,
                            onUpdate: (h, m) => {
                                this.isScrolling = "smooth",
                                    this.lastVelocity = this.velocity,
                                    this.velocity = h - this.animatedScroll,
                                    this.direction = Math.sign(this.velocity),
                                    this.animatedScroll = h,
                                    this.setScroll(this.scroll),
                                    u && (this.targetScroll = h),
                                    m || this.emit(),
                                    m && (this.reset(),
                                        this.emit(),
                                        l?.(this),
                                        this.userData = {},
                                        requestAnimationFrame(() => {
                                            this.dispatchScrollendEvent()
                                        }
                                        ),
                                        this.preventNextNativeScrollEvent())
                            }
                        })
                }
            }
        }
        preventNextNativeScrollEvent() {
            this._preventNextNativeScrollEvent = !0,
                requestAnimationFrame(() => {
                    this._preventNextNativeScrollEvent = !1
                }
                )
        }
        checkNestedScroll(r, { deltaX: e, deltaY: t }) {
            const i = Date.now()
                , s = r._lenis ??= {};
            let n, o, a, l, d, u, f, h;
            const m = this.options.gestureOrientation;
            if (i - (s.time ?? 0) > 2e3) {
                s.time = Date.now();
                const w = window.getComputedStyle(r);
                s.computedStyle = w;
                const x = w.overflowX
                    , T = w.overflowY;
                if (n = ["auto", "overlay", "scroll"].includes(x),
                    o = ["auto", "overlay", "scroll"].includes(T),
                    s.hasOverflowX = n,
                    s.hasOverflowY = o,
                    !n && !o || m === "vertical" && !o || m === "horizontal" && !n)
                    return !1;
                d = r.scrollWidth,
                    u = r.scrollHeight,
                    f = r.clientWidth,
                    h = r.clientHeight,
                    a = d > f,
                    l = u > h,
                    s.isScrollableX = a,
                    s.isScrollableY = l,
                    s.scrollWidth = d,
                    s.scrollHeight = u,
                    s.clientWidth = f,
                    s.clientHeight = h
            } else
                a = s.isScrollableX,
                    l = s.isScrollableY,
                    n = s.hasOverflowX,
                    o = s.hasOverflowY,
                    d = s.scrollWidth,
                    u = s.scrollHeight,
                    f = s.clientWidth,
                    h = s.clientHeight;
            if (!n && !o || !a && !l || m === "vertical" && (!o || !l) || m === "horizontal" && (!n || !a))
                return !1;
            let p;
            if (m === "horizontal")
                p = "x";
            else if (m === "vertical")
                p = "y";
            else {
                const w = e !== 0
                    , x = t !== 0;
                w && n && a && (p = "x"),
                    x && o && l && (p = "y")
            }
            if (!p)
                return !1;
            let c, g, _, v, y;
            if (p === "x")
                c = r.scrollLeft,
                    g = d - f,
                    _ = e,
                    v = n,
                    y = a;
            else if (p === "y")
                c = r.scrollTop,
                    g = u - h,
                    _ = t,
                    v = o,
                    y = l;
            else
                return !1;
            return (_ > 0 ? c < g : c > 0) && v && y
        }
        get rootElement() {
            return this.options.wrapper === window ? document.documentElement : this.options.wrapper
        }
        get limit() {
            return this.options.__experimental__naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"]
        }
        get isHorizontal() {
            return this.options.orientation === "horizontal"
        }
        get actualScroll() {
            const r = this.options.wrapper;
            return this.isHorizontal ? r.scrollX ?? r.scrollLeft : r.scrollY ?? r.scrollTop
        }
        get scroll() {
            return this.options.infinite ? Pr(this.animatedScroll, this.limit) : this.animatedScroll
        }
        get progress() {
            return this.limit === 0 ? 1 : this.scroll / this.limit
        }
        get isScrolling() {
            return this._isScrolling
        }
        set isScrolling(r) {
            this._isScrolling !== r && (this._isScrolling = r,
                this.updateClassName())
        }
        get isStopped() {
            return this._isStopped
        }
        set isStopped(r) {
            this._isStopped !== r && (this._isStopped = r,
                this.updateClassName())
        }
        get isLocked() {
            return this._isLocked
        }
        set isLocked(r) {
            this._isLocked !== r && (this._isLocked = r,
                this.updateClassName())
        }
        get isSmooth() {
            return this.isScrolling === "smooth"
        }
        get className() {
            let r = "lenis";
            return this.options.autoToggle && (r += " lenis-autoToggle"),
                this.isStopped && (r += " lenis-stopped"),
                this.isLocked && (r += " lenis-locked"),
                this.isScrolling && (r += " lenis-scrolling"),
                this.isScrolling === "smooth" && (r += " lenis-smooth"),
                r
        }
        updateClassName() {
            this.cleanUpClassName(),
                this.rootElement.className = `${this.rootElement.className} ${this.className}`.trim()
        }
        cleanUpClassName() {
            this.rootElement.className = this.rootElement.className.replace(/lenis(-\w+)?/g, "").trim()
        }
    }
    ;
function be(r) {
    if (r === void 0)
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return r
}
function _s(r, e) {
    r.prototype = Object.create(e.prototype),
        r.prototype.constructor = r,
        r.__proto__ = e
}
/*!
 * GSAP 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var ae = {
    autoSleep: 120,
    force3D: "auto",
    nullTargetWarn: 1,
    units: {
        lineHeight: ""
    }
}, rt = {
    duration: .5,
    overwrite: !1,
    delay: 0
}, Ti, X, F, ve = 1e8, $ = 1 / ve, ni = Math.PI * 2, Ar = ni / 4, zr = 0, vs = Math.sqrt, Ir = Math.cos, Dr = Math.sin, Y = function (e) {
    return typeof e == "string"
}, G = function (e) {
    return typeof e == "function"
}, Pe = function (e) {
    return typeof e == "number"
}, xi = function (e) {
    return typeof e > "u"
}, we = function (e) {
    return typeof e == "object"
}, Z = function (e) {
    return e !== !1
}, bi = function () {
    return typeof window < "u"
}, bt = function (e) {
    return G(e) || Y(e)
}, ws = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function () { }
    , U = Array.isArray, oi = /(?:-?\.?\d|\.)+/gi, ys = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Je = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Yt = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, Ss = /[+-]=-?[.\d]+/, Ts = /[^,'"\[\]\s]+/gi, Rr = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, N, pe, ai, Ei, le = {}, Lt = {}, xs, bs = function (e) {
        return (Lt = nt(e, le)) && ie
    }, Pi = function (e, t) {
        return console.warn("Invalid property", e, "set to", t, "Missing plugin? gsap.registerPlugin()")
    }, gt = function (e, t) {
        return !t && console.warn(e)
    }, Es = function (e, t) {
        return e && (le[e] = t) && Lt && (Lt[e] = t) || le
    }, _t = function () {
        return 0
    }, Fr = {
        suppressEvents: !0,
        isStart: !0,
        kill: !1
    }, Mt = {
        suppressEvents: !0,
        kill: !1
    }, Nr = {
        suppressEvents: !0
    }, Mi = {}, Ie = [], li = {}, Ps, se = {}, Xt = {}, Yi = 30, Ct = [], Ci = "", Oi = function (e) {
        var t = e[0], i, s;
        if (we(t) || G(t) || (e = [e]),
            !(i = (t._gsap || {}).harness)) {
            for (s = Ct.length; s-- && !Ct[s].targetTest(t);)
                ;
            i = Ct[s]
        }
        for (s = e.length; s--;)
            e[s] && (e[s]._gsap || (e[s]._gsap = new Ks(e[s], i))) || e.splice(s, 1);
        return e
    }, Xe = function (e) {
        return e._gsap || Oi(ce(e))[0]._gsap
    }, Ms = function (e, t, i) {
        return (i = e[t]) && G(i) ? e[t]() : xi(i) && e.getAttribute && e.getAttribute(t) || i
    }, J = function (e, t) {
        return (e = e.split(",")).forEach(t) || e
    }, B = function (e) {
        return Math.round(e * 1e5) / 1e5 || 0
    }, H = function (e) {
        return Math.round(e * 1e7) / 1e7 || 0
    }, tt = function (e, t) {
        var i = t.charAt(0)
            , s = parseFloat(t.substr(2));
        return e = parseFloat(e),
            i === "+" ? e + s : i === "-" ? e - s : i === "*" ? e * s : e / s
    }, Vr = function (e, t) {
        for (var i = t.length, s = 0; e.indexOf(t[s]) < 0 && ++s < i;)
            ;
        return s < i
    }, At = function () {
        var e = Ie.length, t = Ie.slice(0), i, s;
        for (li = {},
            Ie.length = 0,
            i = 0; i < e; i++)
            s = t[i],
                s && s._lazy && (s.render(s._lazy[0], s._lazy[1], !0)._lazy = 0)
    }, ki = function (e) {
        return !!(e._initted || e._startAt || e.add)
    }, Cs = function (e, t, i, s) {
        Ie.length && !X && At(),
            e.render(t, i, !!(X && t < 0 && ki(e))),
            Ie.length && !X && At()
    }, Os = function (e) {
        var t = parseFloat(e);
        return (t || t === 0) && (e + "").match(Ts).length < 2 ? t : Y(e) ? e.trim() : e
    }, ks = function (e) {
        return e
    }, de = function (e, t) {
        for (var i in t)
            i in e || (e[i] = t[i]);
        return e
    }, Gr = function (e) {
        return function (t, i) {
            for (var s in i)
                s in t || s === "duration" && e || s === "ease" || (t[s] = i[s])
        }
    }, nt = function (e, t) {
        for (var i in t)
            e[i] = t[i];
        return e
    }, Xi = function r(e, t) {
        for (var i in t)
            i !== "__proto__" && i !== "constructor" && i !== "prototype" && (e[i] = we(t[i]) ? r(e[i] || (e[i] = {}), t[i]) : t[i]);
        return e
    }, zt = function (e, t) {
        var i = {}, s;
        for (s in e)
            s in t || (i[s] = e[s]);
        return i
    }, ht = function (e) {
        var t = e.parent || N
            , i = e.keyframes ? Gr(U(e.keyframes)) : de;
        if (Z(e.inherit))
            for (; t;)
                i(e, t.vars.defaults),
                    t = t.parent || t._dp;
        return e
    }, Br = function (e, t) {
        for (var i = e.length, s = i === t.length; s && i-- && e[i] === t[i];)
            ;
        return i < 0
    }, Ls = function (e, t, i, s, n) {
        var o = e[s], a;
        if (n)
            for (a = t[n]; o && o[n] > a;)
                o = o._prev;
        return o ? (t._next = o._next,
            o._next = t) : (t._next = e[i],
                e[i] = t),
            t._next ? t._next._prev = t : e[s] = t,
            t._prev = o,
            t.parent = t._dp = e,
            t
    }, Bt = function (e, t, i, s) {
        i === void 0 && (i = "_first"),
            s === void 0 && (s = "_last");
        var n = t._prev
            , o = t._next;
        n ? n._next = o : e[i] === t && (e[i] = o),
            o ? o._prev = n : e[s] === t && (e[s] = n),
            t._next = t._prev = t.parent = null
    }, Re = function (e, t) {
        e.parent && (!t || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e),
            e._act = 0
    }, qe = function (e, t) {
        if (e && (!t || t._end > e._dur || t._start < 0))
            for (var i = e; i;)
                i._dirty = 1,
                    i = i.parent;
        return e
    }, Wr = function (e) {
        for (var t = e.parent; t && t.parent;)
            t._dirty = 1,
                t.totalDuration(),
                t = t.parent;
        return e
    }, di = function (e, t, i, s) {
        return e._startAt && (X ? e._startAt.revert(Mt) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(t, !0, s))
    }, Hr = function r(e) {
        return !e || e._ts && r(e.parent)
    }, qi = function (e) {
        return e._repeat ? ot(e._tTime, e = e.duration() + e._rDelay) * e : 0
    }, ot = function (e, t) {
        var i = Math.floor(e = H(e / t));
        return e && i === e ? i - 1 : i
    }, It = function (e, t) {
        return (e - t._start) * t._ts + (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur)
    }, Wt = function (e) {
        return e._end = H(e._start + (e._tDur / Math.abs(e._ts || e._rts || $) || 0))
    }, Ht = function (e, t) {
        var i = e._dp;
        return i && i.smoothChildTiming && e._ts && (e._start = H(i._time - (e._ts > 0 ? t / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)),
            Wt(e),
            i._dirty || qe(i, e)),
            e
    }, As = function (e, t) {
        var i;
        if ((t._time || !t._dur && t._initted || t._start < e._time && (t._dur || !t.add)) && (i = It(e.rawTime(), t),
            (!t._dur || xt(0, t.totalDuration(), i) - t._tTime > $) && t.render(i, !0)),
            qe(e, t)._dp && e._initted && e._time >= e._dur && e._ts) {
            if (e._dur < e.duration())
                for (i = e; i._dp;)
                    i.rawTime() >= 0 && i.totalTime(i._tTime),
                        i = i._dp;
            e._zTime = -1e-8
        }
    }, me = function (e, t, i, s) {
        return t.parent && Re(t),
            t._start = H((Pe(i) ? i : i || e !== N ? ue(e, i, t) : e._time) + t._delay),
            t._end = H(t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)),
            Ls(e, t, "_first", "_last", e._sort ? "_start" : 0),
            ui(t) || (e._recent = t),
            s || As(e, t),
            e._ts < 0 && Ht(e, e._tTime),
            e
    }, zs = function (e, t) {
        return (le.ScrollTrigger || Pi("scrollTrigger", t)) && le.ScrollTrigger.create(t, e)
    }, Is = function (e, t, i, s, n) {
        if (Ai(e, t, n),
            !e._initted)
            return 1;
        if (!i && e._pt && !X && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && Ps !== ne.frame)
            return Ie.push(e),
                e._lazy = [n, s],
                1
    }, Yr = function r(e) {
        var t = e.parent;
        return t && t._ts && t._initted && !t._lock && (t.rawTime() < 0 || r(t))
    }, ui = function (e) {
        var t = e.data;
        return t === "isFromStart" || t === "isStart"
    }, Xr = function (e, t, i, s) {
        var n = e.ratio, o = t < 0 || !t && (!e._start && Yr(e) && !(!e._initted && ui(e)) || (e._ts < 0 || e._dp._ts < 0) && !ui(e)) ? 0 : 1, a = e._rDelay, l = 0, d, u, f;
        if (a && e._repeat && (l = xt(0, e._tDur, t),
            u = ot(l, a),
            e._yoyo && u & 1 && (o = 1 - o),
            u !== ot(e._tTime, a) && (n = 1 - o,
                e.vars.repeatRefresh && e._initted && e.invalidate())),
            o !== n || X || s || e._zTime === $ || !t && e._zTime) {
            if (!e._initted && Is(e, t, s, i, l))
                return;
            for (f = e._zTime,
                e._zTime = t || (i ? $ : 0),
                i || (i = t && !f),
                e.ratio = o,
                e._from && (o = 1 - o),
                e._time = 0,
                e._tTime = l,
                d = e._pt; d;)
                d.r(o, d.d),
                    d = d._next;
            t < 0 && di(e, t, i, !0),
                e._onUpdate && !i && oe(e, "onUpdate"),
                l && e._repeat && !i && e.parent && oe(e, "onRepeat"),
                (t >= e._tDur || t < 0) && e.ratio === o && (o && Re(e, 1),
                    !i && !X && (oe(e, o ? "onComplete" : "onReverseComplete", !0),
                        e._prom && e._prom()))
        } else
            e._zTime || (e._zTime = t)
    }, qr = function (e, t, i) {
        var s;
        if (i > t)
            for (s = e._first; s && s._start <= i;) {
                if (s.data === "isPause" && s._start > t)
                    return s;
                s = s._next
            }
        else
            for (s = e._last; s && s._start >= i;) {
                if (s.data === "isPause" && s._start < t)
                    return s;
                s = s._prev
            }
    }, at = function (e, t, i, s) {
        var n = e._repeat
            , o = H(t) || 0
            , a = e._tTime / e._tDur;
        return a && !s && (e._time *= o / e._dur),
            e._dur = o,
            e._tDur = n ? n < 0 ? 1e10 : H(o * (n + 1) + e._rDelay * n) : o,
            a > 0 && !s && Ht(e, e._tTime = e._tDur * a),
            e.parent && Wt(e),
            i || qe(e.parent, e),
            e
    }, $i = function (e) {
        return e instanceof j ? qe(e) : at(e, e._dur)
    }, $r = {
        _start: 0,
        endTime: _t,
        totalDuration: _t
    }, ue = function r(e, t, i) {
        var s = e.labels, n = e._recent || $r, o = e.duration() >= ve ? n.endTime(!1) : e._dur, a, l, d;
        return Y(t) && (isNaN(t) || t in s) ? (l = t.charAt(0),
            d = t.substr(-1) === "%",
            a = t.indexOf("="),
            l === "<" || l === ">" ? (a >= 0 && (t = t.replace(/=/, "")),
                (l === "<" ? n._start : n.endTime(n._repeat >= 0)) + (parseFloat(t.substr(1)) || 0) * (d ? (a < 0 ? n : i).totalDuration() / 100 : 1)) : a < 0 ? (t in s || (s[t] = o),
                    s[t]) : (l = parseFloat(t.charAt(a - 1) + t.substr(a + 1)),
                        d && i && (l = l / 100 * (U(i) ? i[0] : i).totalDuration()),
                        a > 1 ? r(e, t.substr(0, a - 1), i) + l : o + l)) : t == null ? o : +t
    }, pt = function (e, t, i) {
        var s = Pe(t[1]), n = (s ? 2 : 1) + (e < 2 ? 0 : 1), o = t[n], a, l;
        if (s && (o.duration = t[1]),
            o.parent = i,
            e) {
            for (a = o,
                l = i; l && !("immediateRender" in a);)
                a = l.vars.defaults || {},
                    l = Z(l.vars.inherit) && l.parent;
            o.immediateRender = Z(a.immediateRender),
                e < 2 ? o.runBackwards = 1 : o.startAt = t[n - 1]
        }
        return new W(t[0], o, t[n + 1])
    }, Ne = function (e, t) {
        return e || e === 0 ? t(e) : t
    }, xt = function (e, t, i) {
        return i < e ? e : i > t ? t : i
    }, q = function (e, t) {
        return !Y(e) || !(t = Rr.exec(e)) ? "" : t[1]
    }, Ur = function (e, t, i) {
        return Ne(i, function (s) {
            return xt(e, t, s)
        })
    }, fi = [].slice, Ds = function (e, t) {
        return e && we(e) && "length" in e && (!t && !e.length || e.length - 1 in e && we(e[0])) && !e.nodeType && e !== pe
    }, jr = function (e, t, i) {
        return i === void 0 && (i = []),
            e.forEach(function (s) {
                var n;
                return Y(s) && !t || Ds(s, 1) ? (n = i).push.apply(n, ce(s)) : i.push(s)
            }) || i
    }, ce = function (e, t, i) {
        return F && !t && F.selector ? F.selector(e) : Y(e) && !i && (ai || !lt()) ? fi.call((t || Ei).querySelectorAll(e), 0) : U(e) ? jr(e, i) : Ds(e) ? fi.call(e, 0) : e ? [e] : []
    }, ci = function (e) {
        return e = ce(e)[0] || gt("Invalid scope") || {},
            function (t) {
                var i = e.current || e.nativeElement || e;
                return ce(t, i.querySelectorAll ? i : i === e ? gt("Invalid scope") || Ei.createElement("div") : e)
            }
    }, Rs = function (e) {
        return e.sort(function () {
            return .5 - Math.random()
        })
    }, Fs = function (e) {
        if (G(e))
            return e;
        var t = we(e) ? e : {
            each: e
        }
            , i = $e(t.ease)
            , s = t.from || 0
            , n = parseFloat(t.base) || 0
            , o = {}
            , a = s > 0 && s < 1
            , l = isNaN(s) || a
            , d = t.axis
            , u = s
            , f = s;
        return Y(s) ? u = f = {
            center: .5,
            edges: .5,
            end: 1
        }[s] || 0 : !a && l && (u = s[0],
            f = s[1]),
            function (h, m, p) {
                var c = (p || t).length, g = o[c], _, v, y, S, w, x, T, b, E;
                if (!g) {
                    if (E = t.grid === "auto" ? 0 : (t.grid || [1, ve])[1],
                        !E) {
                        for (T = -1e8; T < (T = p[E++].getBoundingClientRect().left) && E < c;)
                            ;
                        E < c && E--
                    }
                    for (g = o[c] = [],
                        _ = l ? Math.min(E, c) * u - .5 : s % E,
                        v = E === ve ? 0 : l ? c * f / E - .5 : s / E | 0,
                        T = 0,
                        b = ve,
                        x = 0; x < c; x++)
                        y = x % E - _,
                            S = v - (x / E | 0),
                            g[x] = w = d ? Math.abs(d === "y" ? S : y) : vs(y * y + S * S),
                            w > T && (T = w),
                            w < b && (b = w);
                    s === "random" && Rs(g),
                        g.max = T - b,
                        g.min = b,
                        g.v = c = (parseFloat(t.amount) || parseFloat(t.each) * (E > c ? c - 1 : d ? d === "y" ? c / E : E : Math.max(E, c / E)) || 0) * (s === "edges" ? -1 : 1),
                        g.b = c < 0 ? n - c : n,
                        g.u = q(t.amount || t.each) || 0,
                        i = i && c < 0 ? $s(i) : i
                }
                return c = (g[h] - g.min) / g.max || 0,
                    H(g.b + (i ? i(c) : c) * g.v) + g.u
            }
    }, hi = function (e) {
        var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
        return function (i) {
            var s = H(Math.round(parseFloat(i) / e) * e * t);
            return (s - s % 1) / t + (Pe(i) ? 0 : q(i))
        }
    }, Ns = function (e, t) {
        var i = U(e), s, n;
        return !i && we(e) && (s = i = e.radius || ve,
            e.values ? (e = ce(e.values),
                (n = !Pe(e[0])) && (s *= s)) : e = hi(e.increment)),
            Ne(t, i ? G(e) ? function (o) {
                return n = e(o),
                    Math.abs(n - o) <= s ? n : o
            }
                : function (o) {
                    for (var a = parseFloat(n ? o.x : o), l = parseFloat(n ? o.y : 0), d = ve, u = 0, f = e.length, h, m; f--;)
                        n ? (h = e[f].x - a,
                            m = e[f].y - l,
                            h = h * h + m * m) : h = Math.abs(e[f] - a),
                            h < d && (d = h,
                                u = f);
                    return u = !s || d <= s ? e[u] : o,
                        n || u === o || Pe(o) ? u : u + q(o)
                }
                : hi(e))
    }, Vs = function (e, t, i, s) {
        return Ne(U(e) ? !t : i === !0 ? !!(i = 0) : !s, function () {
            return U(e) ? e[~~(Math.random() * e.length)] : (i = i || 1e-5) && (s = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) && Math.floor(Math.round((e - i / 2 + Math.random() * (t - e + i * .99)) / i) * i * s) / s
        })
    }, Kr = function () {
        for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
            t[i] = arguments[i];
        return function (s) {
            return t.reduce(function (n, o) {
                return o(n)
            }, s)
        }
    }, Qr = function (e, t) {
        return function (i) {
            return e(parseFloat(i)) + (t || q(i))
        }
    }, Zr = function (e, t, i) {
        return Bs(e, t, 0, 1, i)
    }, Gs = function (e, t, i) {
        return Ne(i, function (s) {
            return e[~~t(s)]
        })
    }, Jr = function r(e, t, i) {
        var s = t - e;
        return U(e) ? Gs(e, r(0, e.length), t) : Ne(i, function (n) {
            return (s + (n - e) % s) % s + e
        })
    }, en = function r(e, t, i) {
        var s = t - e
            , n = s * 2;
        return U(e) ? Gs(e, r(0, e.length - 1), t) : Ne(i, function (o) {
            return o = (n + (o - e) % n) % n || 0,
                e + (o > s ? n - o : o)
        })
    }, vt = function (e) {
        for (var t = 0, i = "", s, n, o, a; ~(s = e.indexOf("random(", t));)
            o = e.indexOf(")", s),
                a = e.charAt(s + 7) === "[",
                n = e.substr(s + 7, o - s - 7).match(a ? Ts : oi),
                i += e.substr(t, s - t) + Vs(a ? n : +n[0], a ? 0 : +n[1], +n[2] || 1e-5),
                t = o + 1;
        return i + e.substr(t, e.length - t)
    }, Bs = function (e, t, i, s, n) {
        var o = t - e
            , a = s - i;
        return Ne(n, function (l) {
            return i + ((l - e) / o * a || 0)
        })
    }, tn = function r(e, t, i, s) {
        var n = isNaN(e + t) ? 0 : function (m) {
            return (1 - m) * e + m * t
        }
            ;
        if (!n) {
            var o = Y(e), a = {}, l, d, u, f, h;
            if (i === !0 && (s = 1) && (i = null),
                o)
                e = {
                    p: e
                },
                    t = {
                        p: t
                    };
            else if (U(e) && !U(t)) {
                for (u = [],
                    f = e.length,
                    h = f - 2,
                    d = 1; d < f; d++)
                    u.push(r(e[d - 1], e[d]));
                f--,
                    n = function (p) {
                        p *= f;
                        var c = Math.min(h, ~~p);
                        return u[c](p - c)
                    }
                    ,
                    i = t
            } else
                s || (e = nt(U(e) ? [] : {}, e));
            if (!u) {
                for (l in t)
                    Li.call(a, e, l, "get", t[l]);
                n = function (p) {
                    return Di(p, a) || (o ? e.p : e)
                }
            }
        }
        return Ne(i, n)
    }, Ui = function (e, t, i) {
        var s = e.labels, n = ve, o, a, l;
        for (o in s)
            a = s[o] - t,
                a < 0 == !!i && a && n > (a = Math.abs(a)) && (l = o,
                    n = a);
        return l
    }, oe = function (e, t, i) {
        var s = e.vars, n = s[t], o = F, a = e._ctx, l, d, u;
        if (n)
            return l = s[t + "Params"],
                d = s.callbackScope || e,
                i && Ie.length && At(),
                a && (F = a),
                u = l ? n.apply(d, l) : n.call(d),
                F = o,
                u
    }, ft = function (e) {
        return Re(e),
            e.scrollTrigger && e.scrollTrigger.kill(!!X),
            e.progress() < 1 && oe(e, "onInterrupt"),
            e
    }, et, Ws = [], Hs = function (e) {
        if (e)
            if (e = !e.name && e.default || e,
                bi() || e.headless) {
                var t = e.name
                    , i = G(e)
                    , s = t && !i && e.init ? function () {
                        this._props = []
                    }
                        : e
                    , n = {
                        init: _t,
                        render: Di,
                        add: Li,
                        kill: vn,
                        modifier: _n,
                        rawVars: 0
                    }
                    , o = {
                        targetTest: 0,
                        get: 0,
                        getSetter: Ii,
                        aliases: {},
                        register: 0
                    };
                if (lt(),
                    e !== s) {
                    if (se[t])
                        return;
                    de(s, de(zt(e, n), o)),
                        nt(s.prototype, nt(n, zt(e, o))),
                        se[s.prop = t] = s,
                        e.targetTest && (Ct.push(s),
                            Mi[t] = 1),
                        t = (t === "css" ? "CSS" : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin"
                }
                Es(t, s),
                    e.register && e.register(ie, s, ee)
            } else
                Ws.push(e)
    }, I = 255, ct = {
        aqua: [0, I, I],
        lime: [0, I, 0],
        silver: [192, 192, 192],
        black: [0, 0, 0],
        maroon: [128, 0, 0],
        teal: [0, 128, 128],
        blue: [0, 0, I],
        navy: [0, 0, 128],
        white: [I, I, I],
        olive: [128, 128, 0],
        yellow: [I, I, 0],
        orange: [I, 165, 0],
        gray: [128, 128, 128],
        purple: [128, 0, 128],
        green: [0, 128, 0],
        red: [I, 0, 0],
        pink: [I, 192, 203],
        cyan: [0, I, I],
        transparent: [I, I, I, 0]
    }, qt = function (e, t, i) {
        return e += e < 0 ? 1 : e > 1 ? -1 : 0,
            (e * 6 < 1 ? t + (i - t) * e * 6 : e < .5 ? i : e * 3 < 2 ? t + (i - t) * (2 / 3 - e) * 6 : t) * I + .5 | 0
    }, Ys = function (e, t, i) {
        var s = e ? Pe(e) ? [e >> 16, e >> 8 & I, e & I] : 0 : ct.black, n, o, a, l, d, u, f, h, m, p;
        if (!s) {
            if (e.substr(-1) === "," && (e = e.substr(0, e.length - 1)),
                ct[e])
                s = ct[e];
            else if (e.charAt(0) === "#") {
                if (e.length < 6 && (n = e.charAt(1),
                    o = e.charAt(2),
                    a = e.charAt(3),
                    e = "#" + n + n + o + o + a + a + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")),
                    e.length === 9)
                    return s = parseInt(e.substr(1, 6), 16),
                        [s >> 16, s >> 8 & I, s & I, parseInt(e.substr(7), 16) / 255];
                e = parseInt(e.substr(1), 16),
                    s = [e >> 16, e >> 8 & I, e & I]
            } else if (e.substr(0, 3) === "hsl") {
                if (s = p = e.match(oi),
                    !t)
                    l = +s[0] % 360 / 360,
                        d = +s[1] / 100,
                        u = +s[2] / 100,
                        o = u <= .5 ? u * (d + 1) : u + d - u * d,
                        n = u * 2 - o,
                        s.length > 3 && (s[3] *= 1),
                        s[0] = qt(l + 1 / 3, n, o),
                        s[1] = qt(l, n, o),
                        s[2] = qt(l - 1 / 3, n, o);
                else if (~e.indexOf("="))
                    return s = e.match(ys),
                        i && s.length < 4 && (s[3] = 1),
                        s
            } else
                s = e.match(oi) || ct.transparent;
            s = s.map(Number)
        }
        return t && !p && (n = s[0] / I,
            o = s[1] / I,
            a = s[2] / I,
            f = Math.max(n, o, a),
            h = Math.min(n, o, a),
            u = (f + h) / 2,
            f === h ? l = d = 0 : (m = f - h,
                d = u > .5 ? m / (2 - f - h) : m / (f + h),
                l = f === n ? (o - a) / m + (o < a ? 6 : 0) : f === o ? (a - n) / m + 2 : (n - o) / m + 4,
                l *= 60),
            s[0] = ~~(l + .5),
            s[1] = ~~(d * 100 + .5),
            s[2] = ~~(u * 100 + .5)),
            i && s.length < 4 && (s[3] = 1),
            s
    }, Xs = function (e) {
        var t = []
            , i = []
            , s = -1;
        return e.split(De).forEach(function (n) {
            var o = n.match(Je) || [];
            t.push.apply(t, o),
                i.push(s += o.length + 1)
        }),
            t.c = i,
            t
    }, ji = function (e, t, i) {
        var s = "", n = (e + s).match(De), o = t ? "hsla(" : "rgba(", a = 0, l, d, u, f;
        if (!n)
            return e;
        if (n = n.map(function (h) {
            return (h = Ys(h, t, 1)) && o + (t ? h[0] + "," + h[1] + "%," + h[2] + "%," + h[3] : h.join(",")) + ")"
        }),
            i && (u = Xs(e),
                l = i.c,
                l.join(s) !== u.c.join(s)))
            for (d = e.replace(De, "1").split(Je),
                f = d.length - 1; a < f; a++)
                s += d[a] + (~l.indexOf(a) ? n.shift() || o + "0,0,0,0)" : (u.length ? u : n.length ? n : i).shift());
        if (!d)
            for (d = e.split(De),
                f = d.length - 1; a < f; a++)
                s += d[a] + n[a];
        return s + d[f]
    }, De = function () {
        var r = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", e;
        for (e in ct)
            r += "|" + e + "\\b";
        return new RegExp(r + ")", "gi")
    }(), sn = /hsl[a]?\(/, qs = function (e) {
        var t = e.join(" "), i;
        if (De.lastIndex = 0,
            De.test(t))
            return i = sn.test(t),
                e[1] = ji(e[1], i),
                e[0] = ji(e[0], i, Xs(e[1])),
                !0
    }, wt, ne = function () {
        var r = Date.now, e = 500, t = 33, i = r(), s = i, n = 1e3 / 240, o = n, a = [], l, d, u, f, h, m, p = function c(g) {
            var _ = r() - s, v = g === !0, y, S, w, x;
            if ((_ > e || _ < 0) && (i += _ - t),
                s += _,
                w = s - i,
                y = w - o,
                (y > 0 || v) && (x = ++f.frame,
                    h = w - f.time * 1e3,
                    f.time = w = w / 1e3,
                    o += y + (y >= n ? 4 : n - y),
                    S = 1),
                v || (l = d(c)),
                S)
                for (m = 0; m < a.length; m++)
                    a[m](w, h, x, g)
        };
        return f = {
            time: 0,
            frame: 0,
            tick: function () {
                p(!0)
            },
            deltaRatio: function (g) {
                return h / (1e3 / (g || 60))
            },
            wake: function () {
                xs && (!ai && bi() && (pe = ai = window,
                    Ei = pe.document || {},
                    le.gsap = ie,
                    (pe.gsapVersions || (pe.gsapVersions = [])).push(ie.version),
                    bs(Lt || pe.GreenSockGlobals || !pe.gsap && pe || {}),
                    Ws.forEach(Hs)),
                    u = typeof requestAnimationFrame < "u" && requestAnimationFrame,
                    l && f.sleep(),
                    d = u || function (g) {
                        return setTimeout(g, o - f.time * 1e3 + 1 | 0)
                    }
                    ,
                    wt = 1,
                    p(2))
            },
            sleep: function () {
                (u ? cancelAnimationFrame : clearTimeout)(l),
                    wt = 0,
                    d = _t
            },
            lagSmoothing: function (g, _) {
                e = g || 1 / 0,
                    t = Math.min(_ || 33, e)
            },
            fps: function (g) {
                n = 1e3 / (g || 240),
                    o = f.time * 1e3 + n
            },
            add: function (g, _, v) {
                var y = _ ? function (S, w, x, T) {
                    g(S, w, x, T),
                        f.remove(y)
                }
                    : g;
                return f.remove(g),
                    a[v ? "unshift" : "push"](y),
                    lt(),
                    y
            },
            remove: function (g, _) {
                ~(_ = a.indexOf(g)) && a.splice(_, 1) && m >= _ && m--
            },
            _listeners: a
        },
            f
    }(), lt = function () {
        return !wt && ne.wake()
    }, A = {}, rn = /^[\d.\-M][\d.\-,\s]/, nn = /["']/g, on = function (e) {
        for (var t = {}, i = e.substr(1, e.length - 3).split(":"), s = i[0], n = 1, o = i.length, a, l, d; n < o; n++)
            l = i[n],
                a = n !== o - 1 ? l.lastIndexOf(",") : l.length,
                d = l.substr(0, a),
                t[s] = isNaN(d) ? d.replace(nn, "").trim() : +d,
                s = l.substr(a + 1).trim();
        return t
    }, an = function (e) {
        var t = e.indexOf("(") + 1
            , i = e.indexOf(")")
            , s = e.indexOf("(", t);
        return e.substring(t, ~s && s < i ? e.indexOf(")", i + 1) : i)
    }, ln = function (e) {
        var t = (e + "").split("(")
            , i = A[t[0]];
        return i && t.length > 1 && i.config ? i.config.apply(null, ~e.indexOf("{") ? [on(t[1])] : an(e).split(",").map(Os)) : A._CE && rn.test(e) ? A._CE("", e) : i
    }, $s = function (e) {
        return function (t) {
            return 1 - e(1 - t)
        }
    }, Us = function r(e, t) {
        for (var i = e._first, s; i;)
            i instanceof j ? r(i, t) : i.vars.yoyoEase && (!i._yoyo || !i._repeat) && i._yoyo !== t && (i.timeline ? r(i.timeline, t) : (s = i._ease,
                i._ease = i._yEase,
                i._yEase = s,
                i._yoyo = t)),
                i = i._next
    }, $e = function (e, t) {
        return e && (G(e) ? e : A[e] || ln(e)) || t
    }, Ke = function (e, t, i, s) {
        i === void 0 && (i = function (l) {
            return 1 - t(1 - l)
        }
        ),
            s === void 0 && (s = function (l) {
                return l < .5 ? t(l * 2) / 2 : 1 - t((1 - l) * 2) / 2
            }
            );
        var n = {
            easeIn: t,
            easeOut: i,
            easeInOut: s
        }, o;
        return J(e, function (a) {
            A[a] = le[a] = n,
                A[o = a.toLowerCase()] = i;
            for (var l in n)
                A[o + (l === "easeIn" ? ".in" : l === "easeOut" ? ".out" : ".inOut")] = A[a + "." + l] = n[l]
        }),
            n
    }, js = function (e) {
        return function (t) {
            return t < .5 ? (1 - e(1 - t * 2)) / 2 : .5 + e((t - .5) * 2) / 2
        }
    }, $t = function r(e, t, i) {
        var s = t >= 1 ? t : 1
            , n = (i || (e ? .3 : .45)) / (t < 1 ? t : 1)
            , o = n / ni * (Math.asin(1 / s) || 0)
            , a = function (u) {
                return u === 1 ? 1 : s * Math.pow(2, -10 * u) * Dr((u - o) * n) + 1
            }
            , l = e === "out" ? a : e === "in" ? function (d) {
                return 1 - a(1 - d)
            }
                : js(a);
        return n = ni / n,
            l.config = function (d, u) {
                return r(e, d, u)
            }
            ,
            l
    }, Ut = function r(e, t) {
        t === void 0 && (t = 1.70158);
        var i = function (o) {
            return o ? --o * o * ((t + 1) * o + t) + 1 : 0
        }
            , s = e === "out" ? i : e === "in" ? function (n) {
                return 1 - i(1 - n)
            }
                : js(i);
        return s.config = function (n) {
            return r(e, n)
        }
            ,
            s
    };
J("Linear,Quad,Cubic,Quart,Quint,Strong", function (r, e) {
    var t = e < 5 ? e + 1 : e;
    Ke(r + ",Power" + (t - 1), e ? function (i) {
        return Math.pow(i, t)
    }
        : function (i) {
            return i
        }
        , function (i) {
            return 1 - Math.pow(1 - i, t)
        }, function (i) {
            return i < .5 ? Math.pow(i * 2, t) / 2 : 1 - Math.pow((1 - i) * 2, t) / 2
        })
});
A.Linear.easeNone = A.none = A.Linear.easeIn;
Ke("Elastic", $t("in"), $t("out"), $t());
(function (r, e) {
    var t = 1 / e
        , i = 2 * t
        , s = 2.5 * t
        , n = function (a) {
            return a < t ? r * a * a : a < i ? r * Math.pow(a - 1.5 / e, 2) + .75 : a < s ? r * (a -= 2.25 / e) * a + .9375 : r * Math.pow(a - 2.625 / e, 2) + .984375
        };
    Ke("Bounce", function (o) {
        return 1 - n(1 - o)
    }, n)
}
)(7.5625, 2.75);
Ke("Expo", function (r) {
    return Math.pow(2, 10 * (r - 1)) * r + r * r * r * r * r * r * (1 - r)
});
Ke("Circ", function (r) {
    return -(vs(1 - r * r) - 1)
});
Ke("Sine", function (r) {
    return r === 1 ? 1 : -Ir(r * Ar) + 1
});
Ke("Back", Ut("in"), Ut("out"), Ut());
A.SteppedEase = A.steps = le.SteppedEase = {
    config: function (e, t) {
        e === void 0 && (e = 1);
        var i = 1 / e
            , s = e + (t ? 0 : 1)
            , n = t ? 1 : 0
            , o = 1 - $;
        return function (a) {
            return ((s * xt(0, o, a) | 0) + n) * i
        }
    }
};
rt.ease = A["quad.out"];
J("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (r) {
    return Ci += r + "," + r + "Params,"
});
var Ks = function (e, t) {
    this.id = zr++,
        e._gsap = this,
        this.target = e,
        this.harness = t,
        this.get = t ? t.get : Ms,
        this.set = t ? t.getSetter : Ii
}
    , yt = function () {
        function r(t) {
            this.vars = t,
                this._delay = +t.delay || 0,
                (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0,
                    this._yoyo = !!t.yoyo || !!t.yoyoEase),
                this._ts = 1,
                at(this, +t.duration, 1, 1),
                this.data = t.data,
                F && (this._ctx = F,
                    F.data.push(this)),
                wt || ne.wake()
        }
        var e = r.prototype;
        return e.delay = function (i) {
            return i || i === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + i - this._delay),
                this._delay = i,
                this) : this._delay
        }
            ,
            e.duration = function (i) {
                return arguments.length ? this.totalDuration(this._repeat > 0 ? i + (i + this._rDelay) * this._repeat : i) : this.totalDuration() && this._dur
            }
            ,
            e.totalDuration = function (i) {
                return arguments.length ? (this._dirty = 0,
                    at(this, this._repeat < 0 ? i : (i - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
            }
            ,
            e.totalTime = function (i, s) {
                if (lt(),
                    !arguments.length)
                    return this._tTime;
                var n = this._dp;
                if (n && n.smoothChildTiming && this._ts) {
                    for (Ht(this, i),
                        !n._dp || n.parent || As(n, this); n && n.parent;)
                        n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0),
                            n = n.parent;
                    !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && i < this._tDur || this._ts < 0 && i > 0 || !this._tDur && !i) && me(this._dp, this, this._start - this._delay)
                }
                return (this._tTime !== i || !this._dur && !s || this._initted && Math.abs(this._zTime) === $ || !i && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = i),
                    Cs(this, i, s)),
                    this
            }
            ,
            e.time = function (i, s) {
                return arguments.length ? this.totalTime(Math.min(this.totalDuration(), i + qi(this)) % (this._dur + this._rDelay) || (i ? this._dur : 0), s) : this._time
            }
            ,
            e.totalProgress = function (i, s) {
                return arguments.length ? this.totalTime(this.totalDuration() * i, s) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0
            }
            ,
            e.progress = function (i, s) {
                return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - i : i) + qi(this), s) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0
            }
            ,
            e.iteration = function (i, s) {
                var n = this.duration() + this._rDelay;
                return arguments.length ? this.totalTime(this._time + (i - 1) * n, s) : this._repeat ? ot(this._tTime, n) + 1 : 1
            }
            ,
            e.timeScale = function (i, s) {
                if (!arguments.length)
                    return this._rts === -1e-8 ? 0 : this._rts;
                if (this._rts === i)
                    return this;
                var n = this.parent && this._ts ? It(this.parent._time, this) : this._tTime;
                return this._rts = +i || 0,
                    this._ts = this._ps || i === -1e-8 ? 0 : this._rts,
                    this.totalTime(xt(-Math.abs(this._delay), this.totalDuration(), n), s !== !1),
                    Wt(this),
                    Wr(this)
            }
            ,
            e.paused = function (i) {
                return arguments.length ? (this._ps !== i && (this._ps = i,
                    i ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()),
                        this._ts = this._act = 0) : (lt(),
                            this._ts = this._rts,
                            this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== $ && (this._tTime -= $)))),
                    this) : this._ps
            }
            ,
            e.startTime = function (i) {
                if (arguments.length) {
                    this._start = i;
                    var s = this.parent || this._dp;
                    return s && (s._sort || !this.parent) && me(s, this, i - this._delay),
                        this
                }
                return this._start
            }
            ,
            e.endTime = function (i) {
                return this._start + (Z(i) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
            }
            ,
            e.rawTime = function (i) {
                var s = this.parent || this._dp;
                return s ? i && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? It(s.rawTime(i), this) : this._tTime : this._tTime
            }
            ,
            e.revert = function (i) {
                i === void 0 && (i = Nr);
                var s = X;
                return X = i,
                    ki(this) && (this.timeline && this.timeline.revert(i),
                        this.totalTime(-.01, i.suppressEvents)),
                    this.data !== "nested" && i.kill !== !1 && this.kill(),
                    X = s,
                    this
            }
            ,
            e.globalTime = function (i) {
                for (var s = this, n = arguments.length ? i : s.rawTime(); s;)
                    n = s._start + n / (Math.abs(s._ts) || 1),
                        s = s._dp;
                return !this.parent && this._sat ? this._sat.globalTime(i) : n
            }
            ,
            e.repeat = function (i) {
                return arguments.length ? (this._repeat = i === 1 / 0 ? -2 : i,
                    $i(this)) : this._repeat === -2 ? 1 / 0 : this._repeat
            }
            ,
            e.repeatDelay = function (i) {
                if (arguments.length) {
                    var s = this._time;
                    return this._rDelay = i,
                        $i(this),
                        s ? this.time(s) : this
                }
                return this._rDelay
            }
            ,
            e.yoyo = function (i) {
                return arguments.length ? (this._yoyo = i,
                    this) : this._yoyo
            }
            ,
            e.seek = function (i, s) {
                return this.totalTime(ue(this, i), Z(s))
            }
            ,
            e.restart = function (i, s) {
                return this.play().totalTime(i ? -this._delay : 0, Z(s)),
                    this._dur || (this._zTime = -1e-8),
                    this
            }
            ,
            e.play = function (i, s) {
                return i != null && this.seek(i, s),
                    this.reversed(!1).paused(!1)
            }
            ,
            e.reverse = function (i, s) {
                return i != null && this.seek(i || this.totalDuration(), s),
                    this.reversed(!0).paused(!1)
            }
            ,
            e.pause = function (i, s) {
                return i != null && this.seek(i, s),
                    this.paused(!0)
            }
            ,
            e.resume = function () {
                return this.paused(!1)
            }
            ,
            e.reversed = function (i) {
                return arguments.length ? (!!i !== this.reversed() && this.timeScale(-this._rts || (i ? -1e-8 : 0)),
                    this) : this._rts < 0
            }
            ,
            e.invalidate = function () {
                return this._initted = this._act = 0,
                    this._zTime = -1e-8,
                    this
            }
            ,
            e.isActive = function () {
                var i = this.parent || this._dp, s = this._start, n;
                return !!(!i || this._ts && this._initted && i.isActive() && (n = i.rawTime(!0)) >= s && n < this.endTime(!0) - $)
            }
            ,
            e.eventCallback = function (i, s, n) {
                var o = this.vars;
                return arguments.length > 1 ? (s ? (o[i] = s,
                    n && (o[i + "Params"] = n),
                    i === "onUpdate" && (this._onUpdate = s)) : delete o[i],
                    this) : o[i]
            }
            ,
            e.then = function (i) {
                var s = this;
                return new Promise(function (n) {
                    var o = G(i) ? i : ks
                        , a = function () {
                            var d = s.then;
                            s.then = null,
                                G(o) && (o = o(s)) && (o.then || o === s) && (s.then = d),
                                n(o),
                                s.then = d
                        };
                    s._initted && s.totalProgress() === 1 && s._ts >= 0 || !s._tTime && s._ts < 0 ? a() : s._prom = a
                }
                )
            }
            ,
            e.kill = function () {
                ft(this)
            }
            ,
            r
    }();
de(yt.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -1e-8,
    _prom: 0,
    _ps: !1,
    _rts: 1
});
var j = function (r) {
    _s(e, r);
    function e(i, s) {
        var n;
        return i === void 0 && (i = {}),
            n = r.call(this, i) || this,
            n.labels = {},
            n.smoothChildTiming = !!i.smoothChildTiming,
            n.autoRemoveChildren = !!i.autoRemoveChildren,
            n._sort = Z(i.sortChildren),
            N && me(i.parent || N, be(n), s),
            i.reversed && n.reverse(),
            i.paused && n.paused(!0),
            i.scrollTrigger && zs(be(n), i.scrollTrigger),
            n
    }
    var t = e.prototype;
    return t.to = function (s, n, o) {
        return pt(0, arguments, this),
            this
    }
        ,
        t.from = function (s, n, o) {
            return pt(1, arguments, this),
                this
        }
        ,
        t.fromTo = function (s, n, o, a) {
            return pt(2, arguments, this),
                this
        }
        ,
        t.set = function (s, n, o) {
            return n.duration = 0,
                n.parent = this,
                ht(n).repeatDelay || (n.repeat = 0),
                n.immediateRender = !!n.immediateRender,
                new W(s, n, ue(this, o), 1),
                this
        }
        ,
        t.call = function (s, n, o) {
            return me(this, W.delayedCall(0, s, n), o)
        }
        ,
        t.staggerTo = function (s, n, o, a, l, d, u) {
            return o.duration = n,
                o.stagger = o.stagger || a,
                o.onComplete = d,
                o.onCompleteParams = u,
                o.parent = this,
                new W(s, o, ue(this, l)),
                this
        }
        ,
        t.staggerFrom = function (s, n, o, a, l, d, u) {
            return o.runBackwards = 1,
                ht(o).immediateRender = Z(o.immediateRender),
                this.staggerTo(s, n, o, a, l, d, u)
        }
        ,
        t.staggerFromTo = function (s, n, o, a, l, d, u, f) {
            return a.startAt = o,
                ht(a).immediateRender = Z(a.immediateRender),
                this.staggerTo(s, n, a, l, d, u, f)
        }
        ,
        t.render = function (s, n, o) {
            var a = this._time, l = this._dirty ? this.totalDuration() : this._tDur, d = this._dur, u = s <= 0 ? 0 : H(s), f = this._zTime < 0 != s < 0 && (this._initted || !d), h, m, p, c, g, _, v, y, S, w, x, T;
            if (this !== N && u > l && s >= 0 && (u = l),
                u !== this._tTime || o || f) {
                if (a !== this._time && d && (u += this._time - a,
                    s += this._time - a),
                    h = u,
                    S = this._start,
                    y = this._ts,
                    _ = !y,
                    f && (d || (a = this._zTime),
                        (s || !n) && (this._zTime = s)),
                    this._repeat) {
                    if (x = this._yoyo,
                        g = d + this._rDelay,
                        this._repeat < -1 && s < 0)
                        return this.totalTime(g * 100 + s, n, o);
                    if (h = H(u % g),
                        u === l ? (c = this._repeat,
                            h = d) : (w = H(u / g),
                                c = ~~w,
                                c && c === w && (h = d,
                                    c--),
                                h > d && (h = d)),
                        w = ot(this._tTime, g),
                        !a && this._tTime && w !== c && this._tTime - w * g - this._dur <= 0 && (w = c),
                        x && c & 1 && (h = d - h,
                            T = 1),
                        c !== w && !this._lock) {
                        var b = x && w & 1
                            , E = b === (x && c & 1);
                        if (c < w && (b = !b),
                            a = b ? 0 : u % d ? d : u,
                            this._lock = 1,
                            this.render(a || (T ? 0 : H(c * g)), n, !d)._lock = 0,
                            this._tTime = u,
                            !n && this.parent && oe(this, "onRepeat"),
                            this.vars.repeatRefresh && !T && (this.invalidate()._lock = 1),
                            a && a !== this._time || _ !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
                            return this;
                        if (d = this._dur,
                            l = this._tDur,
                            E && (this._lock = 2,
                                a = b ? d : -1e-4,
                                this.render(a, !0),
                                this.vars.repeatRefresh && !T && this.invalidate()),
                            this._lock = 0,
                            !this._ts && !_)
                            return this;
                        Us(this, T)
                    }
                }
                if (this._hasPause && !this._forcing && this._lock < 2 && (v = qr(this, H(a), H(h)),
                    v && (u -= h - (h = v._start))),
                    this._tTime = u,
                    this._time = h,
                    this._act = !y,
                    this._initted || (this._onUpdate = this.vars.onUpdate,
                        this._initted = 1,
                        this._zTime = s,
                        a = 0),
                    !a && u && !n && !w && (oe(this, "onStart"),
                        this._tTime !== u))
                    return this;
                if (h >= a && s >= 0)
                    for (m = this._first; m;) {
                        if (p = m._next,
                            (m._act || h >= m._start) && m._ts && v !== m) {
                            if (m.parent !== this)
                                return this.render(s, n, o);
                            if (m.render(m._ts > 0 ? (h - m._start) * m._ts : (m._dirty ? m.totalDuration() : m._tDur) + (h - m._start) * m._ts, n, o),
                                h !== this._time || !this._ts && !_) {
                                v = 0,
                                    p && (u += this._zTime = -1e-8);
                                break
                            }
                        }
                        m = p
                    }
                else {
                    m = this._last;
                    for (var P = s < 0 ? s : h; m;) {
                        if (p = m._prev,
                            (m._act || P <= m._end) && m._ts && v !== m) {
                            if (m.parent !== this)
                                return this.render(s, n, o);
                            if (m.render(m._ts > 0 ? (P - m._start) * m._ts : (m._dirty ? m.totalDuration() : m._tDur) + (P - m._start) * m._ts, n, o || X && ki(m)),
                                h !== this._time || !this._ts && !_) {
                                v = 0,
                                    p && (u += this._zTime = P ? -1e-8 : $);
                                break
                            }
                        }
                        m = p
                    }
                }
                if (v && !n && (this.pause(),
                    v.render(h >= a ? 0 : -1e-8)._zTime = h >= a ? 1 : -1,
                    this._ts))
                    return this._start = S,
                        Wt(this),
                        this.render(s, n, o);
                this._onUpdate && !n && oe(this, "onUpdate", !0),
                    (u === l && this._tTime >= this.totalDuration() || !u && a) && (S === this._start || Math.abs(y) !== Math.abs(this._ts)) && (this._lock || ((s || !d) && (u === l && this._ts > 0 || !u && this._ts < 0) && Re(this, 1),
                        !n && !(s < 0 && !a) && (u || a || !l) && (oe(this, u === l && s >= 0 ? "onComplete" : "onReverseComplete", !0),
                            this._prom && !(u < l && this.timeScale() > 0) && this._prom())))
            }
            return this
        }
        ,
        t.add = function (s, n) {
            var o = this;
            if (Pe(n) || (n = ue(this, n, s)),
                !(s instanceof yt)) {
                if (U(s))
                    return s.forEach(function (a) {
                        return o.add(a, n)
                    }),
                        this;
                if (Y(s))
                    return this.addLabel(s, n);
                if (G(s))
                    s = W.delayedCall(0, s);
                else
                    return this
            }
            return this !== s ? me(this, s, n) : this
        }
        ,
        t.getChildren = function (s, n, o, a) {
            s === void 0 && (s = !0),
                n === void 0 && (n = !0),
                o === void 0 && (o = !0),
                a === void 0 && (a = -1e8);
            for (var l = [], d = this._first; d;)
                d._start >= a && (d instanceof W ? n && l.push(d) : (o && l.push(d),
                    s && l.push.apply(l, d.getChildren(!0, n, o)))),
                    d = d._next;
            return l
        }
        ,
        t.getById = function (s) {
            for (var n = this.getChildren(1, 1, 1), o = n.length; o--;)
                if (n[o].vars.id === s)
                    return n[o]
        }
        ,
        t.remove = function (s) {
            return Y(s) ? this.removeLabel(s) : G(s) ? this.killTweensOf(s) : (s.parent === this && Bt(this, s),
                s === this._recent && (this._recent = this._last),
                qe(this))
        }
        ,
        t.totalTime = function (s, n) {
            return arguments.length ? (this._forcing = 1,
                !this._dp && this._ts && (this._start = H(ne.time - (this._ts > 0 ? s / this._ts : (this.totalDuration() - s) / -this._ts))),
                r.prototype.totalTime.call(this, s, n),
                this._forcing = 0,
                this) : this._tTime
        }
        ,
        t.addLabel = function (s, n) {
            return this.labels[s] = ue(this, n),
                this
        }
        ,
        t.removeLabel = function (s) {
            return delete this.labels[s],
                this
        }
        ,
        t.addPause = function (s, n, o) {
            var a = W.delayedCall(0, n || _t, o);
            return a.data = "isPause",
                this._hasPause = 1,
                me(this, a, ue(this, s))
        }
        ,
        t.removePause = function (s) {
            var n = this._first;
            for (s = ue(this, s); n;)
                n._start === s && n.data === "isPause" && Re(n),
                    n = n._next
        }
        ,
        t.killTweensOf = function (s, n, o) {
            for (var a = this.getTweensOf(s, o), l = a.length; l--;)
                ke !== a[l] && a[l].kill(s, n);
            return this
        }
        ,
        t.getTweensOf = function (s, n) {
            for (var o = [], a = ce(s), l = this._first, d = Pe(n), u; l;)
                l instanceof W ? Vr(l._targets, a) && (d ? (!ke || l._initted && l._ts) && l.globalTime(0) <= n && l.globalTime(l.totalDuration()) > n : !n || l.isActive()) && o.push(l) : (u = l.getTweensOf(a, n)).length && o.push.apply(o, u),
                    l = l._next;
            return o
        }
        ,
        t.tweenTo = function (s, n) {
            n = n || {};
            var o = this, a = ue(o, s), l = n, d = l.startAt, u = l.onStart, f = l.onStartParams, h = l.immediateRender, m, p = W.to(o, de({
                ease: n.ease || "none",
                lazy: !1,
                immediateRender: !1,
                time: a,
                overwrite: "auto",
                duration: n.duration || Math.abs((a - (d && "time" in d ? d.time : o._time)) / o.timeScale()) || $,
                onStart: function () {
                    if (o.pause(),
                        !m) {
                        var g = n.duration || Math.abs((a - (d && "time" in d ? d.time : o._time)) / o.timeScale());
                        p._dur !== g && at(p, g, 0, 1).render(p._time, !0, !0),
                            m = 1
                    }
                    u && u.apply(p, f || [])
                }
            }, n));
            return h ? p.render(0) : p
        }
        ,
        t.tweenFromTo = function (s, n, o) {
            return this.tweenTo(n, de({
                startAt: {
                    time: ue(this, s)
                }
            }, o))
        }
        ,
        t.recent = function () {
            return this._recent
        }
        ,
        t.nextLabel = function (s) {
            return s === void 0 && (s = this._time),
                Ui(this, ue(this, s))
        }
        ,
        t.previousLabel = function (s) {
            return s === void 0 && (s = this._time),
                Ui(this, ue(this, s), 1)
        }
        ,
        t.currentLabel = function (s) {
            return arguments.length ? this.seek(s, !0) : this.previousLabel(this._time + $)
        }
        ,
        t.shiftChildren = function (s, n, o) {
            o === void 0 && (o = 0);
            for (var a = this._first, l = this.labels, d; a;)
                a._start >= o && (a._start += s,
                    a._end += s),
                    a = a._next;
            if (n)
                for (d in l)
                    l[d] >= o && (l[d] += s);
            return qe(this)
        }
        ,
        t.invalidate = function (s) {
            var n = this._first;
            for (this._lock = 0; n;)
                n.invalidate(s),
                    n = n._next;
            return r.prototype.invalidate.call(this, s)
        }
        ,
        t.clear = function (s) {
            s === void 0 && (s = !0);
            for (var n = this._first, o; n;)
                o = n._next,
                    this.remove(n),
                    n = o;
            return this._dp && (this._time = this._tTime = this._pTime = 0),
                s && (this.labels = {}),
                qe(this)
        }
        ,
        t.totalDuration = function (s) {
            var n = 0, o = this, a = o._last, l = ve, d, u, f;
            if (arguments.length)
                return o.timeScale((o._repeat < 0 ? o.duration() : o.totalDuration()) / (o.reversed() ? -s : s));
            if (o._dirty) {
                for (f = o.parent; a;)
                    d = a._prev,
                        a._dirty && a.totalDuration(),
                        u = a._start,
                        u > l && o._sort && a._ts && !o._lock ? (o._lock = 1,
                            me(o, a, u - a._delay, 1)._lock = 0) : l = u,
                        u < 0 && a._ts && (n -= u,
                            (!f && !o._dp || f && f.smoothChildTiming) && (o._start += u / o._ts,
                                o._time -= u,
                                o._tTime -= u),
                            o.shiftChildren(-u, !1, -1 / 0),
                            l = 0),
                        a._end > n && a._ts && (n = a._end),
                        a = d;
                at(o, o === N && o._time > n ? o._time : n, 1, 1),
                    o._dirty = 0
            }
            return o._tDur
        }
        ,
        e.updateRoot = function (s) {
            if (N._ts && (Cs(N, It(s, N)),
                Ps = ne.frame),
                ne.frame >= Yi) {
                Yi += ae.autoSleep || 120;
                var n = N._first;
                if ((!n || !n._ts) && ae.autoSleep && ne._listeners.length < 2) {
                    for (; n && !n._ts;)
                        n = n._next;
                    n || ne.sleep()
                }
            }
        }
        ,
        e
}(yt);
de(j.prototype, {
    _lock: 0,
    _hasPause: 0,
    _forcing: 0
});
var dn = function (e, t, i, s, n, o, a) {
    var l = new ee(this._pt, e, t, 0, 1, ir, null, n), d = 0, u = 0, f, h, m, p, c, g, _, v;
    for (l.b = i,
        l.e = s,
        i += "",
        s += "",
        (_ = ~s.indexOf("random(")) && (s = vt(s)),
        o && (v = [i, s],
            o(v, e, t),
            i = v[0],
            s = v[1]),
        h = i.match(Yt) || []; f = Yt.exec(s);)
        p = f[0],
            c = s.substring(d, f.index),
            m ? m = (m + 1) % 5 : c.substr(-5) === "rgba(" && (m = 1),
            p !== h[u++] && (g = parseFloat(h[u - 1]) || 0,
                l._pt = {
                    _next: l._pt,
                    p: c || u === 1 ? c : ",",
                    s: g,
                    c: p.charAt(1) === "=" ? tt(g, p) - g : parseFloat(p) - g,
                    m: m && m < 4 ? Math.round : 0
                },
                d = Yt.lastIndex);
    return l.c = d < s.length ? s.substring(d, s.length) : "",
        l.fp = a,
        (Ss.test(s) || _) && (l.e = 0),
        this._pt = l,
        l
}, Li = function (e, t, i, s, n, o, a, l, d, u) {
    G(s) && (s = s(n || 0, e, o));
    var f = e[t], h = i !== "get" ? i : G(f) ? d ? e[t.indexOf("set") || !G(e["get" + t.substr(3)]) ? t : "get" + t.substr(3)](d) : e[t]() : f, m = G(f) ? d ? pn : er : zi, p;
    if (Y(s) && (~s.indexOf("random(") && (s = vt(s)),
        s.charAt(1) === "=" && (p = tt(h, s) + (q(h) || 0),
            (p || p === 0) && (s = p))),
        !u || h !== s || pi)
        return !isNaN(h * s) && s !== "" ? (p = new ee(this._pt, e, t, +h || 0, s - (h || 0), typeof f == "boolean" ? gn : tr, 0, m),
            d && (p.fp = d),
            a && p.modifier(a, this, e),
            this._pt = p) : (!f && !(t in e) && Pi(t, s),
                dn.call(this, e, t, h, s, m, l || ae.stringFilter, d))
}, un = function (e, t, i, s, n) {
    if (G(e) && (e = mt(e, n, t, i, s)),
        !we(e) || e.style && e.nodeType || U(e) || ws(e))
        return Y(e) ? mt(e, n, t, i, s) : e;
    var o = {}, a;
    for (a in e)
        o[a] = mt(e[a], n, t, i, s);
    return o
}, Qs = function (e, t, i, s, n, o) {
    var a, l, d, u;
    if (se[e] && (a = new se[e]).init(n, a.rawVars ? t[e] : un(t[e], s, n, o, i), i, s, o) !== !1 && (i._pt = l = new ee(i._pt, n, e, 0, 1, a.render, a, 0, a.priority),
        i !== et))
        for (d = i._ptLookup[i._targets.indexOf(n)],
            u = a._props.length; u--;)
            d[a._props[u]] = l;
    return a
}, ke, pi, Ai = function r(e, t, i) {
    var s = e.vars, n = s.ease, o = s.startAt, a = s.immediateRender, l = s.lazy, d = s.onUpdate, u = s.runBackwards, f = s.yoyoEase, h = s.keyframes, m = s.autoRevert, p = e._dur, c = e._startAt, g = e._targets, _ = e.parent, v = _ && _.data === "nested" ? _.vars.targets : g, y = e._overwrite === "auto" && !Ti, S = e.timeline, w, x, T, b, E, P, M, C, k, D, z, O, L;
    if (S && (!h || !n) && (n = "none"),
        e._ease = $e(n, rt.ease),
        e._yEase = f ? $s($e(f === !0 ? n : f, rt.ease)) : 0,
        f && e._yoyo && !e._repeat && (f = e._yEase,
            e._yEase = e._ease,
            e._ease = f),
        e._from = !S && !!s.runBackwards,
        !S || h && !s.stagger) {
        if (C = g[0] ? Xe(g[0]).harness : 0,
            O = C && s[C.prop],
            w = zt(s, Mi),
            c && (c._zTime < 0 && c.progress(1),
                t < 0 && u && a && !m ? c.render(-1, !0) : c.revert(u && p ? Mt : Fr),
                c._lazy = 0),
            o) {
            if (Re(e._startAt = W.set(g, de({
                data: "isStart",
                overwrite: !1,
                parent: _,
                immediateRender: !0,
                lazy: !c && Z(l),
                startAt: null,
                delay: 0,
                onUpdate: d && function () {
                    return oe(e, "onUpdate")
                }
                ,
                stagger: 0
            }, o))),
                e._startAt._dp = 0,
                e._startAt._sat = e,
                t < 0 && (X || !a && !m) && e._startAt.revert(Mt),
                a && p && t <= 0 && i <= 0) {
                t && (e._zTime = t);
                return
            }
        } else if (u && p && !c) {
            if (t && (a = !1),
                T = de({
                    overwrite: !1,
                    data: "isFromStart",
                    lazy: a && !c && Z(l),
                    immediateRender: a,
                    stagger: 0,
                    parent: _
                }, w),
                O && (T[C.prop] = O),
                Re(e._startAt = W.set(g, T)),
                e._startAt._dp = 0,
                e._startAt._sat = e,
                t < 0 && (X ? e._startAt.revert(Mt) : e._startAt.render(-1, !0)),
                e._zTime = t,
                !a)
                r(e._startAt, $, $);
            else if (!t)
                return
        }
        for (e._pt = e._ptCache = 0,
            l = p && Z(l) || l && !p,
            x = 0; x < g.length; x++) {
            if (E = g[x],
                M = E._gsap || Oi(g)[x]._gsap,
                e._ptLookup[x] = D = {},
                li[M.id] && Ie.length && At(),
                z = v === g ? x : v.indexOf(E),
                C && (k = new C).init(E, O || w, e, z, v) !== !1 && (e._pt = b = new ee(e._pt, E, k.name, 0, 1, k.render, k, 0, k.priority),
                    k._props.forEach(function (R) {
                        D[R] = b
                    }),
                    k.priority && (P = 1)),
                !C || O)
                for (T in w)
                    se[T] && (k = Qs(T, w, e, z, E, v)) ? k.priority && (P = 1) : D[T] = b = Li.call(e, E, T, "get", w[T], z, v, 0, s.stringFilter);
            e._op && e._op[x] && e.kill(E, e._op[x]),
                y && e._pt && (ke = e,
                    N.killTweensOf(E, D, e.globalTime(t)),
                    L = !e.parent,
                    ke = 0),
                e._pt && l && (li[M.id] = 1)
        }
        P && sr(e),
            e._onInit && e._onInit(e)
    }
    e._onUpdate = d,
        e._initted = (!e._op || e._pt) && !L,
        h && t <= 0 && S.render(ve, !0, !0)
}, fn = function (e, t, i, s, n, o, a, l) {
    var d = (e._pt && e._ptCache || (e._ptCache = {}))[t], u, f, h, m;
    if (!d)
        for (d = e._ptCache[t] = [],
            h = e._ptLookup,
            m = e._targets.length; m--;) {
            if (u = h[m][t],
                u && u.d && u.d._pt)
                for (u = u.d._pt; u && u.p !== t && u.fp !== t;)
                    u = u._next;
            if (!u)
                return pi = 1,
                    e.vars[t] = "+=0",
                    Ai(e, a),
                    pi = 0,
                    l ? gt(t + " not eligible for reset") : 1;
            d.push(u)
        }
    for (m = d.length; m--;)
        f = d[m],
            u = f._pt || f,
            u.s = (s || s === 0) && !n ? s : u.s + (s || 0) + o * u.c,
            u.c = i - u.s,
            f.e && (f.e = B(i) + q(f.e)),
            f.b && (f.b = u.s + q(f.b))
}, cn = function (e, t) {
    var i = e[0] ? Xe(e[0]).harness : 0, s = i && i.aliases, n, o, a, l;
    if (!s)
        return t;
    n = nt({}, t);
    for (o in s)
        if (o in n)
            for (l = s[o].split(","),
                a = l.length; a--;)
                n[l[a]] = n[o];
    return n
}, hn = function (e, t, i, s) {
    var n = t.ease || s || "power1.inOut", o, a;
    if (U(t))
        a = i[e] || (i[e] = []),
            t.forEach(function (l, d) {
                return a.push({
                    t: d / (t.length - 1) * 100,
                    v: l,
                    e: n
                })
            });
    else
        for (o in t)
            a = i[o] || (i[o] = []),
                o === "ease" || a.push({
                    t: parseFloat(e),
                    v: t[o],
                    e: n
                })
}, mt = function (e, t, i, s, n) {
    return G(e) ? e.call(t, i, s, n) : Y(e) && ~e.indexOf("random(") ? vt(e) : e
}, Zs = Ci + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert", Js = {};
J(Zs + ",id,stagger,delay,duration,paused,scrollTrigger", function (r) {
    return Js[r] = 1
});
var W = function (r) {
    _s(e, r);
    function e(i, s, n, o) {
        var a;
        typeof s == "number" && (n.duration = s,
            s = n,
            n = null),
            a = r.call(this, o ? s : ht(s)) || this;
        var l = a.vars, d = l.duration, u = l.delay, f = l.immediateRender, h = l.stagger, m = l.overwrite, p = l.keyframes, c = l.defaults, g = l.scrollTrigger, _ = l.yoyoEase, v = s.parent || N, y = (U(i) || ws(i) ? Pe(i[0]) : "length" in s) ? [i] : ce(i), S, w, x, T, b, E, P, M;
        if (a._targets = y.length ? Oi(y) : gt("GSAP target " + i + " not found. https://gsap.com", !ae.nullTargetWarn) || [],
            a._ptLookup = [],
            a._overwrite = m,
            p || h || bt(d) || bt(u)) {
            if (s = a.vars,
                S = a.timeline = new j({
                    data: "nested",
                    defaults: c || {},
                    targets: v && v.data === "nested" ? v.vars.targets : y
                }),
                S.kill(),
                S.parent = S._dp = be(a),
                S._start = 0,
                h || bt(d) || bt(u)) {
                if (T = y.length,
                    P = h && Fs(h),
                    we(h))
                    for (b in h)
                        ~Zs.indexOf(b) && (M || (M = {}),
                            M[b] = h[b]);
                for (w = 0; w < T; w++)
                    x = zt(s, Js),
                        x.stagger = 0,
                        _ && (x.yoyoEase = _),
                        M && nt(x, M),
                        E = y[w],
                        x.duration = +mt(d, be(a), w, E, y),
                        x.delay = (+mt(u, be(a), w, E, y) || 0) - a._delay,
                        !h && T === 1 && x.delay && (a._delay = u = x.delay,
                            a._start += u,
                            x.delay = 0),
                        S.to(E, x, P ? P(w, E, y) : 0),
                        S._ease = A.none;
                S.duration() ? d = u = 0 : a.timeline = 0
            } else if (p) {
                ht(de(S.vars.defaults, {
                    ease: "none"
                })),
                    S._ease = $e(p.ease || s.ease || "none");
                var C = 0, k, D, z;
                if (U(p))
                    p.forEach(function (O) {
                        return S.to(y, O, ">")
                    }),
                        S.duration();
                else {
                    x = {};
                    for (b in p)
                        b === "ease" || b === "easeEach" || hn(b, p[b], x, p.easeEach);
                    for (b in x)
                        for (k = x[b].sort(function (O, L) {
                            return O.t - L.t
                        }),
                            C = 0,
                            w = 0; w < k.length; w++)
                            D = k[w],
                                z = {
                                    ease: D.e,
                                    duration: (D.t - (w ? k[w - 1].t : 0)) / 100 * d
                                },
                                z[b] = D.v,
                                S.to(y, z, C),
                                C += z.duration;
                    S.duration() < d && S.to({}, {
                        duration: d - S.duration()
                    })
                }
            }
            d || a.duration(d = S.duration())
        } else
            a.timeline = 0;
        return m === !0 && !Ti && (ke = be(a),
            N.killTweensOf(y),
            ke = 0),
            me(v, be(a), n),
            s.reversed && a.reverse(),
            s.paused && a.paused(!0),
            (f || !d && !p && a._start === H(v._time) && Z(f) && Hr(be(a)) && v.data !== "nested") && (a._tTime = -1e-8,
                a.render(Math.max(0, -u) || 0)),
            g && zs(be(a), g),
            a
    }
    var t = e.prototype;
    return t.render = function (s, n, o) {
        var a = this._time, l = this._tDur, d = this._dur, u = s < 0, f = s > l - $ && !u ? l : s < $ ? 0 : s, h, m, p, c, g, _, v, y, S;
        if (!d)
            Xr(this, s, n, o);
        else if (f !== this._tTime || !s || o || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== u || this._lazy) {
            if (h = f,
                y = this.timeline,
                this._repeat) {
                if (c = d + this._rDelay,
                    this._repeat < -1 && u)
                    return this.totalTime(c * 100 + s, n, o);
                if (h = H(f % c),
                    f === l ? (p = this._repeat,
                        h = d) : (g = H(f / c),
                            p = ~~g,
                            p && p === g ? (h = d,
                                p--) : h > d && (h = d)),
                    _ = this._yoyo && p & 1,
                    _ && (S = this._yEase,
                        h = d - h),
                    g = ot(this._tTime, c),
                    h === a && !o && this._initted && p === g)
                    return this._tTime = f,
                        this;
                p !== g && (y && this._yEase && Us(y, _),
                    this.vars.repeatRefresh && !_ && !this._lock && h !== c && this._initted && (this._lock = o = 1,
                        this.render(H(c * p), !0).invalidate()._lock = 0))
            }
            if (!this._initted) {
                if (Is(this, u ? s : h, o, n, f))
                    return this._tTime = 0,
                        this;
                if (a !== this._time && !(o && this.vars.repeatRefresh && p !== g))
                    return this;
                if (d !== this._dur)
                    return this.render(s, n, o)
            }
            if (this._tTime = f,
                this._time = h,
                !this._act && this._ts && (this._act = 1,
                    this._lazy = 0),
                this.ratio = v = (S || this._ease)(h / d),
                this._from && (this.ratio = v = 1 - v),
                !a && f && !n && !g && (oe(this, "onStart"),
                    this._tTime !== f))
                return this;
            for (m = this._pt; m;)
                m.r(v, m.d),
                    m = m._next;
            y && y.render(s < 0 ? s : y._dur * y._ease(h / this._dur), n, o) || this._startAt && (this._zTime = s),
                this._onUpdate && !n && (u && di(this, s, n, o),
                    oe(this, "onUpdate")),
                this._repeat && p !== g && this.vars.onRepeat && !n && this.parent && oe(this, "onRepeat"),
                (f === this._tDur || !f) && this._tTime === f && (u && !this._onUpdate && di(this, s, !0, !0),
                    (s || !d) && (f === this._tDur && this._ts > 0 || !f && this._ts < 0) && Re(this, 1),
                    !n && !(u && !a) && (f || a || _) && (oe(this, f === l ? "onComplete" : "onReverseComplete", !0),
                        this._prom && !(f < l && this.timeScale() > 0) && this._prom()))
        }
        return this
    }
        ,
        t.targets = function () {
            return this._targets
        }
        ,
        t.invalidate = function (s) {
            return (!s || !this.vars.runBackwards) && (this._startAt = 0),
                this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0,
                this._ptLookup = [],
                this.timeline && this.timeline.invalidate(s),
                r.prototype.invalidate.call(this, s)
        }
        ,
        t.resetTo = function (s, n, o, a, l) {
            wt || ne.wake(),
                this._ts || this.play();
            var d = Math.min(this._dur, (this._dp._time - this._start) * this._ts), u;
            return this._initted || Ai(this, d),
                u = this._ease(d / this._dur),
                fn(this, s, n, o, a, u, d, l) ? this.resetTo(s, n, o, a, 1) : (Ht(this, 0),
                    this.parent || Ls(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0),
                    this.render(0))
        }
        ,
        t.kill = function (s, n) {
            if (n === void 0 && (n = "all"),
                !s && (!n || n === "all"))
                return this._lazy = this._pt = 0,
                    this.parent ? ft(this) : this.scrollTrigger && this.scrollTrigger.kill(!!X),
                    this;
            if (this.timeline) {
                var o = this.timeline.totalDuration();
                return this.timeline.killTweensOf(s, n, ke && ke.vars.overwrite !== !0)._first || ft(this),
                    this.parent && o !== this.timeline.totalDuration() && at(this, this._dur * this.timeline._tDur / o, 0, 1),
                    this
            }
            var a = this._targets, l = s ? ce(s) : a, d = this._ptLookup, u = this._pt, f, h, m, p, c, g, _;
            if ((!n || n === "all") && Br(a, l))
                return n === "all" && (this._pt = 0),
                    ft(this);
            for (f = this._op = this._op || [],
                n !== "all" && (Y(n) && (c = {},
                    J(n, function (v) {
                        return c[v] = 1
                    }),
                    n = c),
                    n = cn(a, n)),
                _ = a.length; _--;)
                if (~l.indexOf(a[_])) {
                    h = d[_],
                        n === "all" ? (f[_] = n,
                            p = h,
                            m = {}) : (m = f[_] = f[_] || {},
                                p = n);
                    for (c in p)
                        g = h && h[c],
                            g && ((!("kill" in g.d) || g.d.kill(c) === !0) && Bt(this, g, "_pt"),
                                delete h[c]),
                            m !== "all" && (m[c] = 1)
                }
            return this._initted && !this._pt && u && ft(this),
                this
        }
        ,
        e.to = function (s, n) {
            return new e(s, n, arguments[2])
        }
        ,
        e.from = function (s, n) {
            return pt(1, arguments)
        }
        ,
        e.delayedCall = function (s, n, o, a) {
            return new e(n, 0, {
                immediateRender: !1,
                lazy: !1,
                overwrite: !1,
                delay: s,
                onComplete: n,
                onReverseComplete: n,
                onCompleteParams: o,
                onReverseCompleteParams: o,
                callbackScope: a
            })
        }
        ,
        e.fromTo = function (s, n, o) {
            return pt(2, arguments)
        }
        ,
        e.set = function (s, n) {
            return n.duration = 0,
                n.repeatDelay || (n.repeat = 0),
                new e(s, n)
        }
        ,
        e.killTweensOf = function (s, n, o) {
            return N.killTweensOf(s, n, o)
        }
        ,
        e
}(yt);
de(W.prototype, {
    _targets: [],
    _lazy: 0,
    _startAt: 0,
    _op: 0,
    _onInit: 0
});
J("staggerTo,staggerFrom,staggerFromTo", function (r) {
    W[r] = function () {
        var e = new j
            , t = fi.call(arguments, 0);
        return t.splice(r === "staggerFromTo" ? 5 : 4, 0, 0),
            e[r].apply(e, t)
    }
});
var zi = function (e, t, i) {
    return e[t] = i
}
    , er = function (e, t, i) {
        return e[t](i)
    }
    , pn = function (e, t, i, s) {
        return e[t](s.fp, i)
    }
    , mn = function (e, t, i) {
        return e.setAttribute(t, i)
    }
    , Ii = function (e, t) {
        return G(e[t]) ? er : xi(e[t]) && e.setAttribute ? mn : zi
    }
    , tr = function (e, t) {
        return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e6) / 1e6, t)
    }
    , gn = function (e, t) {
        return t.set(t.t, t.p, !!(t.s + t.c * e), t)
    }
    , ir = function (e, t) {
        var i = t._pt
            , s = "";
        if (!e && t.b)
            s = t.b;
        else if (e === 1 && t.e)
            s = t.e;
        else {
            for (; i;)
                s = i.p + (i.m ? i.m(i.s + i.c * e) : Math.round((i.s + i.c * e) * 1e4) / 1e4) + s,
                    i = i._next;
            s += t.c
        }
        t.set(t.t, t.p, s, t)
    }
    , Di = function (e, t) {
        for (var i = t._pt; i;)
            i.r(e, i.d),
                i = i._next
    }
    , _n = function (e, t, i, s) {
        for (var n = this._pt, o; n;)
            o = n._next,
                n.p === s && n.modifier(e, t, i),
                n = o
    }
    , vn = function (e) {
        for (var t = this._pt, i, s; t;)
            s = t._next,
                t.p === e && !t.op || t.op === e ? Bt(this, t, "_pt") : t.dep || (i = 1),
                t = s;
        return !i
    }
    , wn = function (e, t, i, s) {
        s.mSet(e, t, s.m.call(s.tween, i, s.mt), s)
    }
    , sr = function (e) {
        for (var t = e._pt, i, s, n, o; t;) {
            for (i = t._next,
                s = n; s && s.pr > t.pr;)
                s = s._next;
            (t._prev = s ? s._prev : o) ? t._prev._next = t : n = t,
                (t._next = s) ? s._prev = t : o = t,
                t = i
        }
        e._pt = n
    }
    , ee = function () {
        function r(t, i, s, n, o, a, l, d, u) {
            this.t = i,
                this.s = n,
                this.c = o,
                this.p = s,
                this.r = a || tr,
                this.d = l || this,
                this.set = d || zi,
                this.pr = u || 0,
                this._next = t,
                t && (t._prev = this)
        }
        var e = r.prototype;
        return e.modifier = function (i, s, n) {
            this.mSet = this.mSet || this.set,
                this.set = wn,
                this.m = i,
                this.mt = n,
                this.tween = s
        }
            ,
            r
    }();
J(Ci + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function (r) {
    return Mi[r] = 1
});
le.TweenMax = le.TweenLite = W;
le.TimelineLite = le.TimelineMax = j;
N = new j({
    sortChildren: !1,
    defaults: rt,
    autoRemoveChildren: !0,
    id: "root",
    smoothChildTiming: !0
});
ae.stringFilter = qs;
var Ue = []
    , Ot = {}
    , yn = []
    , Ki = 0
    , Sn = 0
    , jt = function (e) {
        return (Ot[e] || yn).map(function (t) {
            return t()
        })
    }
    , mi = function () {
        var e = Date.now()
            , t = [];
        e - Ki > 2 && (jt("matchMediaInit"),
            Ue.forEach(function (i) {
                var s = i.queries, n = i.conditions, o, a, l, d;
                for (a in s)
                    o = pe.matchMedia(s[a]).matches,
                        o && (l = 1),
                        o !== n[a] && (n[a] = o,
                            d = 1);
                d && (i.revert(),
                    l && t.push(i))
            }),
            jt("matchMediaRevert"),
            t.forEach(function (i) {
                return i.onMatch(i, function (s) {
                    return i.add(null, s)
                })
            }),
            Ki = e,
            jt("matchMedia"))
    }
    , rr = function () {
        function r(t, i) {
            this.selector = i && ci(i),
                this.data = [],
                this._r = [],
                this.isReverted = !1,
                this.id = Sn++,
                t && this.add(t)
        }
        var e = r.prototype;
        return e.add = function (i, s, n) {
            G(i) && (n = s,
                s = i,
                i = G);
            var o = this
                , a = function () {
                    var d = F, u = o.selector, f;
                    return d && d !== o && d.data.push(o),
                        n && (o.selector = ci(n)),
                        F = o,
                        f = s.apply(o, arguments),
                        G(f) && o._r.push(f),
                        F = d,
                        o.selector = u,
                        o.isReverted = !1,
                        f
                };
            return o.last = a,
                i === G ? a(o, function (l) {
                    return o.add(null, l)
                }) : i ? o[i] = a : a
        }
            ,
            e.ignore = function (i) {
                var s = F;
                F = null,
                    i(this),
                    F = s
            }
            ,
            e.getTweens = function () {
                var i = [];
                return this.data.forEach(function (s) {
                    return s instanceof r ? i.push.apply(i, s.getTweens()) : s instanceof W && !(s.parent && s.parent.data === "nested") && i.push(s)
                }),
                    i
            }
            ,
            e.clear = function () {
                this._r.length = this.data.length = 0
            }
            ,
            e.kill = function (i, s) {
                var n = this;
                if (i ? function () {
                    for (var a = n.getTweens(), l = n.data.length, d; l--;)
                        d = n.data[l],
                            d.data === "isFlip" && (d.revert(),
                                d.getChildren(!0, !0, !1).forEach(function (u) {
                                    return a.splice(a.indexOf(u), 1)
                                }));
                    for (a.map(function (u) {
                        return {
                            g: u._dur || u._delay || u._sat && !u._sat.vars.immediateRender ? u.globalTime(0) : -1 / 0,
                            t: u
                        }
                    }).sort(function (u, f) {
                        return f.g - u.g || -1 / 0
                    }).forEach(function (u) {
                        return u.t.revert(i)
                    }),
                        l = n.data.length; l--;)
                        d = n.data[l],
                            d instanceof j ? d.data !== "nested" && (d.scrollTrigger && d.scrollTrigger.revert(),
                                d.kill()) : !(d instanceof W) && d.revert && d.revert(i);
                    n._r.forEach(function (u) {
                        return u(i, n)
                    }),
                        n.isReverted = !0
                }() : this.data.forEach(function (a) {
                    return a.kill && a.kill()
                }),
                    this.clear(),
                    s)
                    for (var o = Ue.length; o--;)
                        Ue[o].id === this.id && Ue.splice(o, 1)
            }
            ,
            e.revert = function (i) {
                this.kill(i || {})
            }
            ,
            r
    }()
    , Tn = function () {
        function r(t) {
            this.contexts = [],
                this.scope = t,
                F && F.data.push(this)
        }
        var e = r.prototype;
        return e.add = function (i, s, n) {
            we(i) || (i = {
                matches: i
            });
            var o = new rr(0, n || this.scope), a = o.conditions = {}, l, d, u;
            F && !o.selector && (o.selector = F.selector),
                this.contexts.push(o),
                s = o.add("onMatch", s),
                o.queries = i;
            for (d in i)
                d === "all" ? u = 1 : (l = pe.matchMedia(i[d]),
                    l && (Ue.indexOf(o) < 0 && Ue.push(o),
                        (a[d] = l.matches) && (u = 1),
                        l.addListener ? l.addListener(mi) : l.addEventListener("change", mi)));
            return u && s(o, function (f) {
                return o.add(null, f)
            }),
                this
        }
            ,
            e.revert = function (i) {
                this.kill(i || {})
            }
            ,
            e.kill = function (i) {
                this.contexts.forEach(function (s) {
                    return s.kill(i, !0)
                })
            }
            ,
            r
    }()
    , Dt = {
        registerPlugin: function () {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
                t[i] = arguments[i];
            t.forEach(function (s) {
                return Hs(s)
            })
        },
        timeline: function (e) {
            return new j(e)
        },
        getTweensOf: function (e, t) {
            return N.getTweensOf(e, t)
        },
        getProperty: function (e, t, i, s) {
            Y(e) && (e = ce(e)[0]);
            var n = Xe(e || {}).get
                , o = i ? ks : Os;
            return i === "native" && (i = ""),
                e && (t ? o((se[t] && se[t].get || n)(e, t, i, s)) : function (a, l, d) {
                    return o((se[a] && se[a].get || n)(e, a, l, d))
                }
                )
        },
        quickSetter: function (e, t, i) {
            if (e = ce(e),
                e.length > 1) {
                var s = e.map(function (u) {
                    return ie.quickSetter(u, t, i)
                })
                    , n = s.length;
                return function (u) {
                    for (var f = n; f--;)
                        s[f](u)
                }
            }
            e = e[0] || {};
            var o = se[t]
                , a = Xe(e)
                , l = a.harness && (a.harness.aliases || {})[t] || t
                , d = o ? function (u) {
                    var f = new o;
                    et._pt = 0,
                        f.init(e, i ? u + i : u, et, 0, [e]),
                        f.render(1, f),
                        et._pt && Di(1, et)
                }
                    : a.set(e, l);
            return o ? d : function (u) {
                return d(e, l, i ? u + i : u, a, 1)
            }
        },
        quickTo: function (e, t, i) {
            var s, n = ie.to(e, de((s = {},
                s[t] = "+=0.1",
                s.paused = !0,
                s.stagger = 0,
                s), i || {})), o = function (l, d, u) {
                    return n.resetTo(t, l, d, u)
                };
            return o.tween = n,
                o
        },
        isTweening: function (e) {
            return N.getTweensOf(e, !0).length > 0
        },
        defaults: function (e) {
            return e && e.ease && (e.ease = $e(e.ease, rt.ease)),
                Xi(rt, e || {})
        },
        config: function (e) {
            return Xi(ae, e || {})
        },
        registerEffect: function (e) {
            var t = e.name
                , i = e.effect
                , s = e.plugins
                , n = e.defaults
                , o = e.extendTimeline;
            (s || "").split(",").forEach(function (a) {
                return a && !se[a] && !le[a] && gt(t + " effect requires " + a + " plugin.")
            }),
                Xt[t] = function (a, l, d) {
                    return i(ce(a), de(l || {}, n), d)
                }
                ,
                o && (j.prototype[t] = function (a, l, d) {
                    return this.add(Xt[t](a, we(l) ? l : (d = l) && {}, this), d)
                }
                )
        },
        registerEase: function (e, t) {
            A[e] = $e(t)
        },
        parseEase: function (e, t) {
            return arguments.length ? $e(e, t) : A
        },
        getById: function (e) {
            return N.getById(e)
        },
        exportRoot: function (e, t) {
            e === void 0 && (e = {});
            var i = new j(e), s, n;
            for (i.smoothChildTiming = Z(e.smoothChildTiming),
                N.remove(i),
                i._dp = 0,
                i._time = i._tTime = N._time,
                s = N._first; s;)
                n = s._next,
                    (t || !(!s._dur && s instanceof W && s.vars.onComplete === s._targets[0])) && me(i, s, s._start - s._delay),
                    s = n;
            return me(N, i, 0),
                i
        },
        context: function (e, t) {
            return e ? new rr(e, t) : F
        },
        matchMedia: function (e) {
            return new Tn(e)
        },
        matchMediaRefresh: function () {
            return Ue.forEach(function (e) {
                var t = e.conditions, i, s;
                for (s in t)
                    t[s] && (t[s] = !1,
                        i = 1);
                i && e.revert()
            }) || mi()
        },
        addEventListener: function (e, t) {
            var i = Ot[e] || (Ot[e] = []);
            ~i.indexOf(t) || i.push(t)
        },
        removeEventListener: function (e, t) {
            var i = Ot[e]
                , s = i && i.indexOf(t);
            s >= 0 && i.splice(s, 1)
        },
        utils: {
            wrap: Jr,
            wrapYoyo: en,
            distribute: Fs,
            random: Vs,
            snap: Ns,
            normalize: Zr,
            getUnit: q,
            clamp: Ur,
            splitColor: Ys,
            toArray: ce,
            selector: ci,
            mapRange: Bs,
            pipe: Kr,
            unitize: Qr,
            interpolate: tn,
            shuffle: Rs
        },
        install: bs,
        effects: Xt,
        ticker: ne,
        updateRoot: j.updateRoot,
        plugins: se,
        globalTimeline: N,
        core: {
            PropTween: ee,
            globals: Es,
            Tween: W,
            Timeline: j,
            Animation: yt,
            getCache: Xe,
            _removeLinkedListItem: Bt,
            reverting: function () {
                return X
            },
            context: function (e) {
                return e && F && (F.data.push(e),
                    e._ctx = F),
                    F
            },
            suppressOverwrites: function (e) {
                return Ti = e
            }
        }
    };
J("to,from,fromTo,delayedCall,set,killTweensOf", function (r) {
    return Dt[r] = W[r]
});
ne.add(j.updateRoot);
et = Dt.to({}, {
    duration: 0
});
var xn = function (e, t) {
    for (var i = e._pt; i && i.p !== t && i.op !== t && i.fp !== t;)
        i = i._next;
    return i
}
    , bn = function (e, t) {
        var i = e._targets, s, n, o;
        for (s in t)
            for (n = i.length; n--;)
                o = e._ptLookup[n][s],
                    o && (o = o.d) && (o._pt && (o = xn(o, s)),
                        o && o.modifier && o.modifier(t[s], e, i[n], s))
    }
    , Kt = function (e, t) {
        return {
            name: e,
            headless: 1,
            rawVars: 1,
            init: function (s, n, o) {
                o._onInit = function (a) {
                    var l, d;
                    if (Y(n) && (l = {},
                        J(n, function (u) {
                            return l[u] = 1
                        }),
                        n = l),
                        t) {
                        l = {};
                        for (d in n)
                            l[d] = t(n[d]);
                        n = l
                    }
                    bn(a, n)
                }
            }
        }
    }
    , ie = Dt.registerPlugin({
        name: "attr",
        init: function (e, t, i, s, n) {
            var o, a, l;
            this.tween = i;
            for (o in t)
                l = e.getAttribute(o) || "",
                    a = this.add(e, "setAttribute", (l || 0) + "", t[o], s, n, 0, 0, o),
                    a.op = o,
                    a.b = l,
                    this._props.push(o)
        },
        render: function (e, t) {
            for (var i = t._pt; i;)
                X ? i.set(i.t, i.p, i.b, i) : i.r(e, i.d),
                    i = i._next
        }
    }, {
        name: "endArray",
        headless: 1,
        init: function (e, t) {
            for (var i = t.length; i--;)
                this.add(e, i, e[i] || 0, t[i], 0, 0, 0, 0, 0, 1)
        }
    }, Kt("roundProps", hi), Kt("modifiers"), Kt("snap", Ns)) || Dt;
W.version = j.version = ie.version = "3.13.0";
xs = 1;
bi() && lt();
A.Power0;
A.Power1;
A.Power2;
A.Power3;
A.Power4;
A.Linear;
A.Quad;
A.Cubic;
A.Quart;
A.Quint;
A.Strong;
A.Elastic;
A.Back;
A.SteppedEase;
A.Bounce;
A.Sine;
A.Expo;
A.Circ;
/*!
 * CSSPlugin 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/
var Qi, Le, it, Ri, Ye, Zi, Fi, En = function () {
    return typeof window < "u"
}, Me = {}, He = 180 / Math.PI, st = Math.PI / 180, Ze = Math.atan2, Ji = 1e8, Ni = /([A-Z])/g, Pn = /(left|right|width|margin|padding|x)/i, Mn = /[\s,\(]\S/, ge = {
    autoAlpha: "opacity,visibility",
    scale: "scaleX,scaleY",
    alpha: "opacity"
}, gi = function (e, t) {
    return t.set(t.t, t.p, Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t)
}, Cn = function (e, t) {
    return t.set(t.t, t.p, e === 1 ? t.e : Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u, t)
}, On = function (e, t) {
    return t.set(t.t, t.p, e ? Math.round((t.s + t.c * e) * 1e4) / 1e4 + t.u : t.b, t)
}, kn = function (e, t) {
    var i = t.s + t.c * e;
    t.set(t.t, t.p, ~~(i + (i < 0 ? -.5 : .5)) + t.u, t)
}, nr = function (e, t) {
    return t.set(t.t, t.p, e ? t.e : t.b, t)
}, or = function (e, t) {
    return t.set(t.t, t.p, e !== 1 ? t.b : t.e, t)
}, Ln = function (e, t, i) {
    return e.style[t] = i
}, An = function (e, t, i) {
    return e.style.setProperty(t, i)
}, zn = function (e, t, i) {
    return e._gsap[t] = i
}, In = function (e, t, i) {
    return e._gsap.scaleX = e._gsap.scaleY = i
}, Dn = function (e, t, i, s, n) {
    var o = e._gsap;
    o.scaleX = o.scaleY = i,
        o.renderTransform(n, o)
}, Rn = function (e, t, i, s, n) {
    var o = e._gsap;
    o[t] = i,
        o.renderTransform(n, o)
}, V = "transform", te = V + "Origin", Fn = function r(e, t) {
    var i = this
        , s = this.target
        , n = s.style
        , o = s._gsap;
    if (e in Me && n) {
        if (this.tfm = this.tfm || {},
            e !== "transform")
            e = ge[e] || e,
                ~e.indexOf(",") ? e.split(",").forEach(function (a) {
                    return i.tfm[a] = Ee(s, a)
                }) : this.tfm[e] = o.x ? o[e] : Ee(s, e),
                e === te && (this.tfm.zOrigin = o.zOrigin);
        else
            return ge.transform.split(",").forEach(function (a) {
                return r.call(i, a, t)
            });
        if (this.props.indexOf(V) >= 0)
            return;
        o.svg && (this.svgo = s.getAttribute("data-svg-origin"),
            this.props.push(te, t, "")),
            e = V
    }
    (n || t) && this.props.push(e, t, n[e])
}, ar = function (e) {
    e.translate && (e.removeProperty("translate"),
        e.removeProperty("scale"),
        e.removeProperty("rotate"))
}, Nn = function () {
    var e = this.props, t = this.target, i = t.style, s = t._gsap, n, o;
    for (n = 0; n < e.length; n += 3)
        e[n + 1] ? e[n + 1] === 2 ? t[e[n]](e[n + 2]) : t[e[n]] = e[n + 2] : e[n + 2] ? i[e[n]] = e[n + 2] : i.removeProperty(e[n].substr(0, 2) === "--" ? e[n] : e[n].replace(Ni, "-$1").toLowerCase());
    if (this.tfm) {
        for (o in this.tfm)
            s[o] = this.tfm[o];
        s.svg && (s.renderTransform(),
            t.setAttribute("data-svg-origin", this.svgo || "")),
            n = Fi(),
            (!n || !n.isStart) && !i[V] && (ar(i),
                s.zOrigin && i[te] && (i[te] += " " + s.zOrigin + "px",
                    s.zOrigin = 0,
                    s.renderTransform()),
                s.uncache = 1)
    }
}, lr = function (e, t) {
    var i = {
        target: e,
        props: [],
        revert: Nn,
        save: Fn
    };
    return e._gsap || ie.core.getCache(e),
        t && e.style && e.nodeType && t.split(",").forEach(function (s) {
            return i.save(s)
        }),
        i
}, dr, _i = function (e, t) {
    var i = Le.createElementNS ? Le.createElementNS((t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : Le.createElement(e);
    return i && i.style ? i : Le.createElement(e)
}, he = function r(e, t, i) {
    var s = getComputedStyle(e);
    return s[t] || s.getPropertyValue(t.replace(Ni, "-$1").toLowerCase()) || s.getPropertyValue(t) || !i && r(e, dt(t) || t, 1) || ""
}, es = "O,Moz,ms,Ms,Webkit".split(","), dt = function (e, t, i) {
    var s = t || Ye
        , n = s.style
        , o = 5;
    if (e in n && !i)
        return e;
    for (e = e.charAt(0).toUpperCase() + e.substr(1); o-- && !(es[o] + e in n);)
        ;
    return o < 0 ? null : (o === 3 ? "ms" : o >= 0 ? es[o] : "") + e
}, vi = function () {
    En() && window.document && (Qi = window,
        Le = Qi.document,
        it = Le.documentElement,
        Ye = _i("div") || {
            style: {}
        },
        _i("div"),
        V = dt(V),
        te = V + "Origin",
        Ye.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0",
        dr = !!dt("perspective"),
        Fi = ie.core.reverting,
        Ri = 1)
}, ts = function (e) {
    var t = e.ownerSVGElement, i = _i("svg", t && t.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), s = e.cloneNode(!0), n;
    s.style.display = "block",
        i.appendChild(s),
        it.appendChild(i);
    try {
        n = s.getBBox()
    } catch { }
    return i.removeChild(s),
        it.removeChild(i),
        n
}, is = function (e, t) {
    for (var i = t.length; i--;)
        if (e.hasAttribute(t[i]))
            return e.getAttribute(t[i])
}, ur = function (e) {
    var t, i;
    try {
        t = e.getBBox()
    } catch {
        t = ts(e),
            i = 1
    }
    return t && (t.width || t.height) || i || (t = ts(e)),
        t && !t.width && !t.x && !t.y ? {
            x: +is(e, ["x", "cx", "x1"]) || 0,
            y: +is(e, ["y", "cy", "y1"]) || 0,
            width: 0,
            height: 0
        } : t
}, fr = function (e) {
    return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && ur(e))
}, je = function (e, t) {
    if (t) {
        var i = e.style, s;
        t in Me && t !== te && (t = V),
            i.removeProperty ? (s = t.substr(0, 2),
                (s === "ms" || t.substr(0, 6) === "webkit") && (t = "-" + t),
                i.removeProperty(s === "--" ? t : t.replace(Ni, "-$1").toLowerCase())) : i.removeAttribute(t)
    }
}, Ae = function (e, t, i, s, n, o) {
    var a = new ee(e._pt, t, i, 0, 1, o ? or : nr);
    return e._pt = a,
        a.b = s,
        a.e = n,
        e._props.push(i),
        a
}, ss = {
    deg: 1,
    rad: 1,
    turn: 1
}, Vn = {
    grid: 1,
    flex: 1
}, Fe = function r(e, t, i, s) {
    var n = parseFloat(i) || 0, o = (i + "").trim().substr((n + "").length) || "px", a = Ye.style, l = Pn.test(t), d = e.tagName.toLowerCase() === "svg", u = (d ? "client" : "offset") + (l ? "Width" : "Height"), f = 100, h = s === "px", m = s === "%", p, c, g, _;
    if (s === o || !n || ss[s] || ss[o])
        return n;
    if (o !== "px" && !h && (n = r(e, t, i, "px")),
        _ = e.getCTM && fr(e),
        (m || o === "%") && (Me[t] || ~t.indexOf("adius")))
        return p = _ ? e.getBBox()[l ? "width" : "height"] : e[u],
            B(m ? n / p * f : n / 100 * p);
    if (a[l ? "width" : "height"] = f + (h ? o : s),
        c = s !== "rem" && ~t.indexOf("adius") || s === "em" && e.appendChild && !d ? e : e.parentNode,
        _ && (c = (e.ownerSVGElement || {}).parentNode),
        (!c || c === Le || !c.appendChild) && (c = Le.body),
        g = c._gsap,
        g && m && g.width && l && g.time === ne.time && !g.uncache)
        return B(n / g.width * f);
    if (m && (t === "height" || t === "width")) {
        var v = e.style[t];
        e.style[t] = f + s,
            p = e[u],
            v ? e.style[t] = v : je(e, t)
    } else
        (m || o === "%") && !Vn[he(c, "display")] && (a.position = he(e, "position")),
            c === e && (a.position = "static"),
            c.appendChild(Ye),
            p = Ye[u],
            c.removeChild(Ye),
            a.position = "absolute";
    return l && m && (g = Xe(c),
        g.time = ne.time,
        g.width = c[u]),
        B(h ? p * n / f : p && n ? f / p * n : 0)
}, Ee = function (e, t, i, s) {
    var n;
    return Ri || vi(),
        t in ge && t !== "transform" && (t = ge[t],
            ~t.indexOf(",") && (t = t.split(",")[0])),
        Me[t] && t !== "transform" ? (n = Tt(e, s),
            n = t !== "transformOrigin" ? n[t] : n.svg ? n.origin : Ft(he(e, te)) + " " + n.zOrigin + "px") : (n = e.style[t],
                (!n || n === "auto" || s || ~(n + "").indexOf("calc(")) && (n = Rt[t] && Rt[t](e, t, i) || he(e, t) || Ms(e, t) || (t === "opacity" ? 1 : 0))),
        i && !~(n + "").trim().indexOf(" ") ? Fe(e, t, n, i) + i : n
}, Gn = function (e, t, i, s) {
    if (!i || i === "none") {
        var n = dt(t, e, 1)
            , o = n && he(e, n, 1);
        o && o !== i ? (t = n,
            i = o) : t === "borderColor" && (i = he(e, "borderTopColor"))
    }
    var a = new ee(this._pt, e.style, t, 0, 1, ir), l = 0, d = 0, u, f, h, m, p, c, g, _, v, y, S, w;
    if (a.b = i,
        a.e = s,
        i += "",
        s += "",
        s.substring(0, 6) === "var(--" && (s = he(e, s.substring(4, s.indexOf(")")))),
        s === "auto" && (c = e.style[t],
            e.style[t] = s,
            s = he(e, t) || s,
            c ? e.style[t] = c : je(e, t)),
        u = [i, s],
        qs(u),
        i = u[0],
        s = u[1],
        h = i.match(Je) || [],
        w = s.match(Je) || [],
        w.length) {
        for (; f = Je.exec(s);)
            g = f[0],
                v = s.substring(l, f.index),
                p ? p = (p + 1) % 5 : (v.substr(-5) === "rgba(" || v.substr(-5) === "hsla(") && (p = 1),
                g !== (c = h[d++] || "") && (m = parseFloat(c) || 0,
                    S = c.substr((m + "").length),
                    g.charAt(1) === "=" && (g = tt(m, g) + S),
                    _ = parseFloat(g),
                    y = g.substr((_ + "").length),
                    l = Je.lastIndex - y.length,
                    y || (y = y || ae.units[t] || S,
                        l === s.length && (s += y,
                            a.e += y)),
                    S !== y && (m = Fe(e, t, c, y) || 0),
                    a._pt = {
                        _next: a._pt,
                        p: v || d === 1 ? v : ",",
                        s: m,
                        c: _ - m,
                        m: p && p < 4 || t === "zIndex" ? Math.round : 0
                    });
        a.c = l < s.length ? s.substring(l, s.length) : ""
    } else
        a.r = t === "display" && s === "none" ? or : nr;
    return Ss.test(s) && (a.e = 0),
        this._pt = a,
        a
}, rs = {
    top: "0%",
    bottom: "100%",
    left: "0%",
    right: "100%",
    center: "50%"
}, Bn = function (e) {
    var t = e.split(" ")
        , i = t[0]
        , s = t[1] || "50%";
    return (i === "top" || i === "bottom" || s === "left" || s === "right") && (e = i,
        i = s,
        s = e),
        t[0] = rs[i] || i,
        t[1] = rs[s] || s,
        t.join(" ")
}, Wn = function (e, t) {
    if (t.tween && t.tween._time === t.tween._dur) {
        var i = t.t, s = i.style, n = t.u, o = i._gsap, a, l, d;
        if (n === "all" || n === !0)
            s.cssText = "",
                l = 1;
        else
            for (n = n.split(","),
                d = n.length; --d > -1;)
                a = n[d],
                    Me[a] && (l = 1,
                        a = a === "transformOrigin" ? te : V),
                    je(i, a);
        l && (je(i, V),
            o && (o.svg && i.removeAttribute("transform"),
                s.scale = s.rotate = s.translate = "none",
                Tt(i, 1),
                o.uncache = 1,
                ar(s)))
    }
}, Rt = {
    clearProps: function (e, t, i, s, n) {
        if (n.data !== "isFromStart") {
            var o = e._pt = new ee(e._pt, t, i, 0, 0, Wn);
            return o.u = s,
                o.pr = -10,
                o.tween = n,
                e._props.push(i),
                1
        }
    }
}, St = [1, 0, 0, 1, 0, 0], cr = {}, hr = function (e) {
    return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e
}, ns = function (e) {
    var t = he(e, V);
    return hr(t) ? St : t.substr(7).match(ys).map(B)
}, Vi = function (e, t) {
    var i = e._gsap || Xe(e), s = e.style, n = ns(e), o, a, l, d;
    return i.svg && e.getAttribute("transform") ? (l = e.transform.baseVal.consolidate().matrix,
        n = [l.a, l.b, l.c, l.d, l.e, l.f],
        n.join(",") === "1,0,0,1,0,0" ? St : n) : (n === St && !e.offsetParent && e !== it && !i.svg && (l = s.display,
            s.display = "block",
            o = e.parentNode,
            (!o || !e.offsetParent && !e.getBoundingClientRect().width) && (d = 1,
                a = e.nextElementSibling,
                it.appendChild(e)),
            n = ns(e),
            l ? s.display = l : je(e, "display"),
            d && (a ? o.insertBefore(e, a) : o ? o.appendChild(e) : it.removeChild(e))),
            t && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n)
}, wi = function (e, t, i, s, n, o) {
    var a = e._gsap, l = n || Vi(e, !0), d = a.xOrigin || 0, u = a.yOrigin || 0, f = a.xOffset || 0, h = a.yOffset || 0, m = l[0], p = l[1], c = l[2], g = l[3], _ = l[4], v = l[5], y = t.split(" "), S = parseFloat(y[0]) || 0, w = parseFloat(y[1]) || 0, x, T, b, E;
    i ? l !== St && (T = m * g - p * c) && (b = S * (g / T) + w * (-c / T) + (c * v - g * _) / T,
        E = S * (-p / T) + w * (m / T) - (m * v - p * _) / T,
        S = b,
        w = E) : (x = ur(e),
            S = x.x + (~y[0].indexOf("%") ? S / 100 * x.width : S),
            w = x.y + (~(y[1] || y[0]).indexOf("%") ? w / 100 * x.height : w)),
        s || s !== !1 && a.smooth ? (_ = S - d,
            v = w - u,
            a.xOffset = f + (_ * m + v * c) - _,
            a.yOffset = h + (_ * p + v * g) - v) : a.xOffset = a.yOffset = 0,
        a.xOrigin = S,
        a.yOrigin = w,
        a.smooth = !!s,
        a.origin = t,
        a.originIsAbsolute = !!i,
        e.style[te] = "0px 0px",
        o && (Ae(o, a, "xOrigin", d, S),
            Ae(o, a, "yOrigin", u, w),
            Ae(o, a, "xOffset", f, a.xOffset),
            Ae(o, a, "yOffset", h, a.yOffset)),
        e.setAttribute("data-svg-origin", S + " " + w)
}, Tt = function (e, t) {
    var i = e._gsap || new Ks(e);
    if ("x" in i && !t && !i.uncache)
        return i;
    var s = e.style, n = i.scaleX < 0, o = "px", a = "deg", l = getComputedStyle(e), d = he(e, te) || "0", u, f, h, m, p, c, g, _, v, y, S, w, x, T, b, E, P, M, C, k, D, z, O, L, R, Q, Ce, Ve, ye, Bi, Se, Ge;
    return u = f = h = c = g = _ = v = y = S = 0,
        m = p = 1,
        i.svg = !!(e.getCTM && fr(e)),
        l.translate && ((l.translate !== "none" || l.scale !== "none" || l.rotate !== "none") && (s[V] = (l.translate !== "none" ? "translate3d(" + (l.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (l.rotate !== "none" ? "rotate(" + l.rotate + ") " : "") + (l.scale !== "none" ? "scale(" + l.scale.split(" ").join(",") + ") " : "") + (l[V] !== "none" ? l[V] : "")),
            s.scale = s.rotate = s.translate = "none"),
        T = Vi(e, i.svg),
        i.svg && (i.uncache ? (R = e.getBBox(),
            d = i.xOrigin - R.x + "px " + (i.yOrigin - R.y) + "px",
            L = "") : L = !t && e.getAttribute("data-svg-origin"),
            wi(e, L || d, !!L || i.originIsAbsolute, i.smooth !== !1, T)),
        w = i.xOrigin || 0,
        x = i.yOrigin || 0,
        T !== St && (M = T[0],
            C = T[1],
            k = T[2],
            D = T[3],
            u = z = T[4],
            f = O = T[5],
            T.length === 6 ? (m = Math.sqrt(M * M + C * C),
                p = Math.sqrt(D * D + k * k),
                c = M || C ? Ze(C, M) * He : 0,
                v = k || D ? Ze(k, D) * He + c : 0,
                v && (p *= Math.abs(Math.cos(v * st))),
                i.svg && (u -= w - (w * M + x * k),
                    f -= x - (w * C + x * D))) : (Ge = T[6],
                        Bi = T[7],
                        Ce = T[8],
                        Ve = T[9],
                        ye = T[10],
                        Se = T[11],
                        u = T[12],
                        f = T[13],
                        h = T[14],
                        b = Ze(Ge, ye),
                        g = b * He,
                        b && (E = Math.cos(-b),
                            P = Math.sin(-b),
                            L = z * E + Ce * P,
                            R = O * E + Ve * P,
                            Q = Ge * E + ye * P,
                            Ce = z * -P + Ce * E,
                            Ve = O * -P + Ve * E,
                            ye = Ge * -P + ye * E,
                            Se = Bi * -P + Se * E,
                            z = L,
                            O = R,
                            Ge = Q),
                        b = Ze(-k, ye),
                        _ = b * He,
                        b && (E = Math.cos(-b),
                            P = Math.sin(-b),
                            L = M * E - Ce * P,
                            R = C * E - Ve * P,
                            Q = k * E - ye * P,
                            Se = D * P + Se * E,
                            M = L,
                            C = R,
                            k = Q),
                        b = Ze(C, M),
                        c = b * He,
                        b && (E = Math.cos(b),
                            P = Math.sin(b),
                            L = M * E + C * P,
                            R = z * E + O * P,
                            C = C * E - M * P,
                            O = O * E - z * P,
                            M = L,
                            z = R),
                        g && Math.abs(g) + Math.abs(c) > 359.9 && (g = c = 0,
                            _ = 180 - _),
                        m = B(Math.sqrt(M * M + C * C + k * k)),
                        p = B(Math.sqrt(O * O + Ge * Ge)),
                        b = Ze(z, O),
                        v = Math.abs(b) > 2e-4 ? b * He : 0,
                        S = Se ? 1 / (Se < 0 ? -Se : Se) : 0),
            i.svg && (L = e.getAttribute("transform"),
                i.forceCSS = e.setAttribute("transform", "") || !hr(he(e, V)),
                L && e.setAttribute("transform", L))),
        Math.abs(v) > 90 && Math.abs(v) < 270 && (n ? (m *= -1,
            v += c <= 0 ? 180 : -180,
            c += c <= 0 ? 180 : -180) : (p *= -1,
                v += v <= 0 ? 180 : -180)),
        t = t || i.uncache,
        i.x = u - ((i.xPercent = u && (!t && i.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-u) ? -50 : 0))) ? e.offsetWidth * i.xPercent / 100 : 0) + o,
        i.y = f - ((i.yPercent = f && (!t && i.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-f) ? -50 : 0))) ? e.offsetHeight * i.yPercent / 100 : 0) + o,
        i.z = h + o,
        i.scaleX = B(m),
        i.scaleY = B(p),
        i.rotation = B(c) + a,
        i.rotationX = B(g) + a,
        i.rotationY = B(_) + a,
        i.skewX = v + a,
        i.skewY = y + a,
        i.transformPerspective = S + o,
        (i.zOrigin = parseFloat(d.split(" ")[2]) || !t && i.zOrigin || 0) && (s[te] = Ft(d)),
        i.xOffset = i.yOffset = 0,
        i.force3D = ae.force3D,
        i.renderTransform = i.svg ? Yn : dr ? pr : Hn,
        i.uncache = 0,
        i
}, Ft = function (e) {
    return (e = e.split(" "))[0] + " " + e[1]
}, Qt = function (e, t, i) {
    var s = q(t);
    return B(parseFloat(t) + parseFloat(Fe(e, "x", i + "px", s))) + s
}, Hn = function (e, t) {
    t.z = "0px",
        t.rotationY = t.rotationX = "0deg",
        t.force3D = 0,
        pr(e, t)
}, Be = "0deg", ut = "0px", We = ") ", pr = function (e, t) {
    var i = t || this
        , s = i.xPercent
        , n = i.yPercent
        , o = i.x
        , a = i.y
        , l = i.z
        , d = i.rotation
        , u = i.rotationY
        , f = i.rotationX
        , h = i.skewX
        , m = i.skewY
        , p = i.scaleX
        , c = i.scaleY
        , g = i.transformPerspective
        , _ = i.force3D
        , v = i.target
        , y = i.zOrigin
        , S = ""
        , w = _ === "auto" && e && e !== 1 || _ === !0;
    if (y && (f !== Be || u !== Be)) {
        var x = parseFloat(u) * st, T = Math.sin(x), b = Math.cos(x), E;
        x = parseFloat(f) * st,
            E = Math.cos(x),
            o = Qt(v, o, T * E * -y),
            a = Qt(v, a, -Math.sin(x) * -y),
            l = Qt(v, l, b * E * -y + y)
    }
    g !== ut && (S += "perspective(" + g + We),
        (s || n) && (S += "translate(" + s + "%, " + n + "%) "),
        (w || o !== ut || a !== ut || l !== ut) && (S += l !== ut || w ? "translate3d(" + o + ", " + a + ", " + l + ") " : "translate(" + o + ", " + a + We),
        d !== Be && (S += "rotate(" + d + We),
        u !== Be && (S += "rotateY(" + u + We),
        f !== Be && (S += "rotateX(" + f + We),
        (h !== Be || m !== Be) && (S += "skew(" + h + ", " + m + We),
        (p !== 1 || c !== 1) && (S += "scale(" + p + ", " + c + We),
        v.style[V] = S || "translate(0, 0)"
}, Yn = function (e, t) {
    var i = t || this, s = i.xPercent, n = i.yPercent, o = i.x, a = i.y, l = i.rotation, d = i.skewX, u = i.skewY, f = i.scaleX, h = i.scaleY, m = i.target, p = i.xOrigin, c = i.yOrigin, g = i.xOffset, _ = i.yOffset, v = i.forceCSS, y = parseFloat(o), S = parseFloat(a), w, x, T, b, E;
    l = parseFloat(l),
        d = parseFloat(d),
        u = parseFloat(u),
        u && (u = parseFloat(u),
            d += u,
            l += u),
        l || d ? (l *= st,
            d *= st,
            w = Math.cos(l) * f,
            x = Math.sin(l) * f,
            T = Math.sin(l - d) * -h,
            b = Math.cos(l - d) * h,
            d && (u *= st,
                E = Math.tan(d - u),
                E = Math.sqrt(1 + E * E),
                T *= E,
                b *= E,
                u && (E = Math.tan(u),
                    E = Math.sqrt(1 + E * E),
                    w *= E,
                    x *= E)),
            w = B(w),
            x = B(x),
            T = B(T),
            b = B(b)) : (w = f,
                b = h,
                x = T = 0),
        (y && !~(o + "").indexOf("px") || S && !~(a + "").indexOf("px")) && (y = Fe(m, "x", o, "px"),
            S = Fe(m, "y", a, "px")),
        (p || c || g || _) && (y = B(y + p - (p * w + c * T) + g),
            S = B(S + c - (p * x + c * b) + _)),
        (s || n) && (E = m.getBBox(),
            y = B(y + s / 100 * E.width),
            S = B(S + n / 100 * E.height)),
        E = "matrix(" + w + "," + x + "," + T + "," + b + "," + y + "," + S + ")",
        m.setAttribute("transform", E),
        v && (m.style[V] = E)
}, Xn = function (e, t, i, s, n) {
    var o = 360, a = Y(n), l = parseFloat(n) * (a && ~n.indexOf("rad") ? He : 1), d = l - s, u = s + d + "deg", f, h;
    return a && (f = n.split("_")[1],
        f === "short" && (d %= o,
            d !== d % (o / 2) && (d += d < 0 ? o : -360)),
        f === "cw" && d < 0 ? d = (d + o * Ji) % o - ~~(d / o) * o : f === "ccw" && d > 0 && (d = (d - o * Ji) % o - ~~(d / o) * o)),
        e._pt = h = new ee(e._pt, t, i, s, d, Cn),
        h.e = u,
        h.u = "deg",
        e._props.push(i),
        h
}, os = function (e, t) {
    for (var i in t)
        e[i] = t[i];
    return e
}, qn = function (e, t, i) {
    var s = os({}, i._gsap), n = "perspective,force3D,transformOrigin,svgOrigin", o = i.style, a, l, d, u, f, h, m, p;
    s.svg ? (d = i.getAttribute("transform"),
        i.setAttribute("transform", ""),
        o[V] = t,
        a = Tt(i, 1),
        je(i, V),
        i.setAttribute("transform", d)) : (d = getComputedStyle(i)[V],
            o[V] = t,
            a = Tt(i, 1),
            o[V] = d);
    for (l in Me)
        d = s[l],
            u = a[l],
            d !== u && n.indexOf(l) < 0 && (m = q(d),
                p = q(u),
                f = m !== p ? Fe(i, l, d, p) : parseFloat(d),
                h = parseFloat(u),
                e._pt = new ee(e._pt, a, l, f, h - f, gi),
                e._pt.u = p || 0,
                e._props.push(l));
    os(a, s)
};
J("padding,margin,Width,Radius", function (r, e) {
    var t = "Top"
        , i = "Right"
        , s = "Bottom"
        , n = "Left"
        , o = (e < 3 ? [t, i, s, n] : [t + n, t + i, s + i, s + n]).map(function (a) {
            return e < 2 ? r + a : "border" + a + r
        });
    Rt[e > 1 ? "border" + r : r] = function (a, l, d, u, f) {
        var h, m;
        if (arguments.length < 4)
            return h = o.map(function (p) {
                return Ee(a, p, d)
            }),
                m = h.join(" "),
                m.split(h[0]).length === 5 ? h[0] : m;
        h = (u + "").split(" "),
            m = {},
            o.forEach(function (p, c) {
                return m[p] = h[c] = h[c] || h[(c - 1) / 2 | 0]
            }),
            a.init(l, m, f)
    }
});
var mr = {
    name: "css",
    register: vi,
    targetTest: function (e) {
        return e.style && e.nodeType
    },
    init: function (e, t, i, s, n) {
        var o = this._props, a = e.style, l = i.vars.startAt, d, u, f, h, m, p, c, g, _, v, y, S, w, x, T, b;
        Ri || vi(),
            this.styles = this.styles || lr(e),
            b = this.styles.props,
            this.tween = i;
        for (c in t)
            if (c !== "autoRound" && (u = t[c],
                !(se[c] && Qs(c, t, i, s, e, n)))) {
                if (m = typeof u,
                    p = Rt[c],
                    m === "function" && (u = u.call(i, s, e, n),
                        m = typeof u),
                    m === "string" && ~u.indexOf("random(") && (u = vt(u)),
                    p)
                    p(this, e, c, u, i) && (T = 1);
                else if (c.substr(0, 2) === "--")
                    d = (getComputedStyle(e).getPropertyValue(c) + "").trim(),
                        u += "",
                        De.lastIndex = 0,
                        De.test(d) || (g = q(d),
                            _ = q(u)),
                        _ ? g !== _ && (d = Fe(e, c, d, _) + _) : g && (u += g),
                        this.add(a, "setProperty", d, u, s, n, 0, 0, c),
                        o.push(c),
                        b.push(c, 0, a[c]);
                else if (m !== "undefined") {
                    if (l && c in l ? (d = typeof l[c] == "function" ? l[c].call(i, s, e, n) : l[c],
                        Y(d) && ~d.indexOf("random(") && (d = vt(d)),
                        q(d + "") || d === "auto" || (d += ae.units[c] || q(Ee(e, c)) || ""),
                        (d + "").charAt(1) === "=" && (d = Ee(e, c))) : d = Ee(e, c),
                        h = parseFloat(d),
                        v = m === "string" && u.charAt(1) === "=" && u.substr(0, 2),
                        v && (u = u.substr(2)),
                        f = parseFloat(u),
                        c in ge && (c === "autoAlpha" && (h === 1 && Ee(e, "visibility") === "hidden" && f && (h = 0),
                            b.push("visibility", 0, a.visibility),
                            Ae(this, a, "visibility", h ? "inherit" : "hidden", f ? "inherit" : "hidden", !f)),
                            c !== "scale" && c !== "transform" && (c = ge[c],
                                ~c.indexOf(",") && (c = c.split(",")[0]))),
                        y = c in Me,
                        y) {
                        if (this.styles.save(c),
                            m === "string" && u.substring(0, 6) === "var(--" && (u = he(e, u.substring(4, u.indexOf(")"))),
                                f = parseFloat(u)),
                            S || (w = e._gsap,
                                w.renderTransform && !t.parseTransform || Tt(e, t.parseTransform),
                                x = t.smoothOrigin !== !1 && w.smooth,
                                S = this._pt = new ee(this._pt, a, V, 0, 1, w.renderTransform, w, 0, -1),
                                S.dep = 1),
                            c === "scale")
                            this._pt = new ee(this._pt, w, "scaleY", w.scaleY, (v ? tt(w.scaleY, v + f) : f) - w.scaleY || 0, gi),
                                this._pt.u = 0,
                                o.push("scaleY", c),
                                c += "X";
                        else if (c === "transformOrigin") {
                            b.push(te, 0, a[te]),
                                u = Bn(u),
                                w.svg ? wi(e, u, 0, x, 0, this) : (_ = parseFloat(u.split(" ")[2]) || 0,
                                    _ !== w.zOrigin && Ae(this, w, "zOrigin", w.zOrigin, _),
                                    Ae(this, a, c, Ft(d), Ft(u)));
                            continue
                        } else if (c === "svgOrigin") {
                            wi(e, u, 1, x, 0, this);
                            continue
                        } else if (c in cr) {
                            Xn(this, w, c, h, v ? tt(h, v + u) : u);
                            continue
                        } else if (c === "smoothOrigin") {
                            Ae(this, w, "smooth", w.smooth, u);
                            continue
                        } else if (c === "force3D") {
                            w[c] = u;
                            continue
                        } else if (c === "transform") {
                            qn(this, u, e);
                            continue
                        }
                    } else
                        c in a || (c = dt(c) || c);
                    if (y || (f || f === 0) && (h || h === 0) && !Mn.test(u) && c in a)
                        g = (d + "").substr((h + "").length),
                            f || (f = 0),
                            _ = q(u) || (c in ae.units ? ae.units[c] : g),
                            g !== _ && (h = Fe(e, c, d, _)),
                            this._pt = new ee(this._pt, y ? w : a, c, h, (v ? tt(h, v + f) : f) - h, !y && (_ === "px" || c === "zIndex") && t.autoRound !== !1 ? kn : gi),
                            this._pt.u = _ || 0,
                            g !== _ && _ !== "%" && (this._pt.b = d,
                                this._pt.r = On);
                    else if (c in a)
                        Gn.call(this, e, c, d, v ? v + u : u);
                    else if (c in e)
                        this.add(e, c, d || e[c], v ? v + u : u, s, n);
                    else if (c !== "parseTransform") {
                        Pi(c, u);
                        continue
                    }
                    y || (c in a ? b.push(c, 0, a[c]) : typeof e[c] == "function" ? b.push(c, 2, e[c]()) : b.push(c, 1, d || e[c])),
                        o.push(c)
                }
            }
        T && sr(this)
    },
    render: function (e, t) {
        if (t.tween._time || !Fi())
            for (var i = t._pt; i;)
                i.r(e, i.d),
                    i = i._next;
        else
            t.styles.revert()
    },
    get: Ee,
    aliases: ge,
    getSetter: function (e, t, i) {
        var s = ge[t];
        return s && s.indexOf(",") < 0 && (t = s),
            t in Me && t !== te && (e._gsap.x || Ee(e, "x")) ? i && Zi === i ? t === "scale" ? In : zn : (Zi = i || {}) && (t === "scale" ? Dn : Rn) : e.style && !xi(e.style[t]) ? Ln : ~t.indexOf("-") ? An : Ii(e, t)
    },
    core: {
        _removeProperty: je,
        _getMatrix: Vi
    }
};
ie.utils.checkPrefix = dt;
ie.core.getStyleSaver = lr;
(function (r, e, t, i) {
    var s = J(r + "," + e + "," + t, function (n) {
        Me[n] = 1
    });
    J(e, function (n) {
        ae.units[n] = "deg",
            cr[n] = 1
    }),
        ge[s[13]] = r + "," + e,
        J(i, function (n) {
            var o = n.split(":");
            ge[o[1]] = s[o[0]]
        })
}
)("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
J("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (r) {
    ae.units[r] = "px"
});
ie.registerPlugin(mr);
var xe = ie.registerPlugin(mr) || ie;
xe.core.Tween;
function as(r) {
    return r !== null && typeof r == "object" && "constructor" in r && r.constructor === Object
}
function Gi(r, e) {
    r === void 0 && (r = {}),
        e === void 0 && (e = {});
    const t = ["__proto__", "constructor", "prototype"];
    Object.keys(e).filter(i => t.indexOf(i) < 0).forEach(i => {
        typeof r[i] > "u" ? r[i] = e[i] : as(e[i]) && as(r[i]) && Object.keys(e[i]).length > 0 && Gi(r[i], e[i])
    }
    )
}
const gr = {
    body: {},
    addEventListener() { },
    removeEventListener() { },
    activeElement: {
        blur() { },
        nodeName: ""
    },
    querySelector() {
        return null
    },
    querySelectorAll() {
        return []
    },
    getElementById() {
        return null
    },
    createEvent() {
        return {
            initEvent() { }
        }
    },
    createElement() {
        return {
            children: [],
            childNodes: [],
            style: {},
            setAttribute() { },
            getElementsByTagName() {
                return []
            }
        }
    },
    createElementNS() {
        return {}
    },
    importNode() {
        return null
    },
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    }
};
function Qe() {
    const r = typeof document < "u" ? document : {};
    return Gi(r, gr),
        r
}
const $n = {
    document: gr,
    navigator: {
        userAgent: ""
    },
    location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: ""
    },
    history: {
        replaceState() { },
        pushState() { },
        go() { },
        back() { }
    },
    CustomEvent: function () {
        return this
    },
    addEventListener() { },
    removeEventListener() { },
    getComputedStyle() {
        return {
            getPropertyValue() {
                return ""
            }
        }
    },
    Image() { },
    Date() { },
    screen: {},
    setTimeout() { },
    clearTimeout() { },
    matchMedia() {
        return {}
    },
    requestAnimationFrame(r) {
        return typeof setTimeout > "u" ? (r(),
            null) : setTimeout(r, 0)
    },
    cancelAnimationFrame(r) {
        typeof setTimeout > "u" || clearTimeout(r)
    }
};
function K() {
    const r = typeof window < "u" ? window : {};
    return Gi(r, $n),
        r
}
function Un(r) {
    return r === void 0 && (r = ""),
        r.trim().split(" ").filter(e => !!e.trim())
}
function jn(r) {
    const e = r;
    Object.keys(e).forEach(t => {
        try {
            e[t] = null
        } catch { }
        try {
            delete e[t]
        } catch { }
    }
    )
}
function yi(r, e) {
    return e === void 0 && (e = 0),
        setTimeout(r, e)
}
function Nt() {
    return Date.now()
}
function Kn(r) {
    const e = K();
    let t;
    return e.getComputedStyle && (t = e.getComputedStyle(r, null)),
        !t && r.currentStyle && (t = r.currentStyle),
        t || (t = r.style),
        t
}
function Qn(r, e) {
    e === void 0 && (e = "x");
    const t = K();
    let i, s, n;
    const o = Kn(r);
    return t.WebKitCSSMatrix ? (s = o.transform || o.webkitTransform,
        s.split(",").length > 6 && (s = s.split(", ").map(a => a.replace(",", ".")).join(", ")),
        n = new t.WebKitCSSMatrix(s === "none" ? "" : s)) : (n = o.MozTransform || o.OTransform || o.MsTransform || o.msTransform || o.transform || o.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"),
            i = n.toString().split(",")),
        e === "x" && (t.WebKitCSSMatrix ? s = n.m41 : i.length === 16 ? s = parseFloat(i[12]) : s = parseFloat(i[4])),
        e === "y" && (t.WebKitCSSMatrix ? s = n.m42 : i.length === 16 ? s = parseFloat(i[13]) : s = parseFloat(i[5])),
        s || 0
}
function Et(r) {
    return typeof r == "object" && r !== null && r.constructor && Object.prototype.toString.call(r).slice(8, -1) === "Object"
}
function Zn(r) {
    return typeof window < "u" && typeof window.HTMLElement < "u" ? r instanceof HTMLElement : r && (r.nodeType === 1 || r.nodeType === 11)
}
function re() {
    const r = Object(arguments.length <= 0 ? void 0 : arguments[0])
        , e = ["__proto__", "constructor", "prototype"];
    for (let t = 1; t < arguments.length; t += 1) {
        const i = t < 0 || arguments.length <= t ? void 0 : arguments[t];
        if (i != null && !Zn(i)) {
            const s = Object.keys(Object(i)).filter(n => e.indexOf(n) < 0);
            for (let n = 0, o = s.length; n < o; n += 1) {
                const a = s[n]
                    , l = Object.getOwnPropertyDescriptor(i, a);
                l !== void 0 && l.enumerable && (Et(r[a]) && Et(i[a]) ? i[a].__swiper__ ? r[a] = i[a] : re(r[a], i[a]) : !Et(r[a]) && Et(i[a]) ? (r[a] = {},
                    i[a].__swiper__ ? r[a] = i[a] : re(r[a], i[a])) : r[a] = i[a])
            }
        }
    }
    return r
}
function Pt(r, e, t) {
    r.style.setProperty(e, t)
}
function _r(r) {
    let { swiper: e, targetPosition: t, side: i } = r;
    const s = K()
        , n = -e.translate;
    let o = null, a;
    const l = e.params.speed;
    e.wrapperEl.style.scrollSnapType = "none",
        s.cancelAnimationFrame(e.cssModeFrameID);
    const d = t > n ? "next" : "prev"
        , u = (h, m) => d === "next" && h >= m || d === "prev" && h <= m
        , f = () => {
            a = new Date().getTime(),
                o === null && (o = a);
            const h = Math.max(Math.min((a - o) / l, 1), 0)
                , m = .5 - Math.cos(h * Math.PI) / 2;
            let p = n + m * (t - n);
            if (u(p, t) && (p = t),
                e.wrapperEl.scrollTo({
                    [i]: p
                }),
                u(p, t)) {
                e.wrapperEl.style.overflow = "hidden",
                    e.wrapperEl.style.scrollSnapType = "",
                    setTimeout(() => {
                        e.wrapperEl.style.overflow = "",
                            e.wrapperEl.scrollTo({
                                [i]: p
                            })
                    }
                    ),
                    s.cancelAnimationFrame(e.cssModeFrameID);
                return
            }
            e.cssModeFrameID = s.requestAnimationFrame(f)
        }
        ;
    f()
}
function _e(r, e) {
    e === void 0 && (e = "");
    const t = K()
        , i = [...r.children];
    return t.HTMLSlotElement && r instanceof HTMLSlotElement && i.push(...r.assignedElements()),
        e ? i.filter(s => s.matches(e)) : i
}
function Jn(r, e) {
    const t = [e];
    for (; t.length > 0;) {
        const i = t.shift();
        if (r === i)
            return !0;
        t.push(...i.children, ...i.shadowRoot ? i.shadowRoot.children : [], ...i.assignedElements ? i.assignedElements() : [])
    }
}
function eo(r, e) {
    const t = K();
    let i = e.contains(r);
    return !i && t.HTMLSlotElement && e instanceof HTMLSlotElement && (i = [...e.assignedElements()].includes(r),
        i || (i = Jn(r, e))),
        i
}
function Vt(r) {
    try {
        console.warn(r);
        return
    } catch { }
}
function Gt(r, e) {
    e === void 0 && (e = []);
    const t = document.createElement(r);
    return t.classList.add(...Array.isArray(e) ? e : Un(e)),
        t
}
function to(r, e) {
    const t = [];
    for (; r.previousElementSibling;) {
        const i = r.previousElementSibling;
        e ? i.matches(e) && t.push(i) : t.push(i),
            r = i
    }
    return t
}
function io(r, e) {
    const t = [];
    for (; r.nextElementSibling;) {
        const i = r.nextElementSibling;
        e ? i.matches(e) && t.push(i) : t.push(i),
            r = i
    }
    return t
}
function ze(r, e) {
    return K().getComputedStyle(r, null).getPropertyValue(e)
}
function ls(r) {
    let e = r, t;
    if (e) {
        for (t = 0; (e = e.previousSibling) !== null;)
            e.nodeType === 1 && (t += 1);
        return t
    }
}
function so(r, e) {
    const t = [];
    let i = r.parentElement;
    for (; i;)
        t.push(i),
            i = i.parentElement;
    return t
}
function ds(r, e, t) {
    const i = K();
    return r[e === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(i.getComputedStyle(r, null).getPropertyValue(e === "width" ? "margin-right" : "margin-top")) + parseFloat(i.getComputedStyle(r, null).getPropertyValue(e === "width" ? "margin-left" : "margin-bottom"))
}
function Te(r) {
    return (Array.isArray(r) ? r : [r]).filter(e => !!e)
}
let Zt;
function ro() {
    const r = K()
        , e = Qe();
    return {
        smoothScroll: e.documentElement && e.documentElement.style && "scrollBehavior" in e.documentElement.style,
        touch: !!("ontouchstart" in r || r.DocumentTouch && e instanceof r.DocumentTouch)
    }
}
function vr() {
    return Zt || (Zt = ro()),
        Zt
}
let Jt;
function no(r) {
    let { userAgent: e } = r === void 0 ? {} : r;
    const t = vr()
        , i = K()
        , s = i.navigator.platform
        , n = e || i.navigator.userAgent
        , o = {
            ios: !1,
            android: !1
        }
        , a = i.screen.width
        , l = i.screen.height
        , d = n.match(/(Android);?[\s\/]+([\d.]+)?/);
    let u = n.match(/(iPad).*OS\s([\d_]+)/);
    const f = n.match(/(iPod)(.*OS\s([\d_]+))?/)
        , h = !u && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/)
        , m = s === "Win32";
    let p = s === "MacIntel";
    const c = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
    return !u && p && t.touch && c.indexOf(`${a}x${l}`) >= 0 && (u = n.match(/(Version)\/([\d.]+)/),
        u || (u = [0, 1, "13_0_0"]),
        p = !1),
        d && !m && (o.os = "android",
            o.android = !0),
        (u || h || f) && (o.os = "ios",
            o.ios = !0),
        o
}
function wr(r) {
    return r === void 0 && (r = {}),
        Jt || (Jt = no(r)),
        Jt
}
let ei;
function oo() {
    const r = K()
        , e = wr();
    let t = !1;
    function i() {
        const a = r.navigator.userAgent.toLowerCase();
        return a.indexOf("safari") >= 0 && a.indexOf("chrome") < 0 && a.indexOf("android") < 0
    }
    if (i()) {
        const a = String(r.navigator.userAgent);
        if (a.includes("Version/")) {
            const [l, d] = a.split("Version/")[1].split(" ")[0].split(".").map(u => Number(u));
            t = l < 16 || l === 16 && d < 2
        }
    }
    const s = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(r.navigator.userAgent)
        , n = i()
        , o = n || s && e.ios;
    return {
        isSafari: t || n,
        needPerspectiveFix: t,
        need3dFix: o,
        isWebView: s
    }
}
function yr() {
    return ei || (ei = oo()),
        ei
}
function ao(r) {
    let { swiper: e, on: t, emit: i } = r;
    const s = K();
    let n = null
        , o = null;
    const a = () => {
        !e || e.destroyed || !e.initialized || (i("beforeResize"),
            i("resize"))
    }
        , l = () => {
            !e || e.destroyed || !e.initialized || (n = new ResizeObserver(f => {
                o = s.requestAnimationFrame(() => {
                    const { width: h, height: m } = e;
                    let p = h
                        , c = m;
                    f.forEach(g => {
                        let { contentBoxSize: _, contentRect: v, target: y } = g;
                        y && y !== e.el || (p = v ? v.width : (_[0] || _).inlineSize,
                            c = v ? v.height : (_[0] || _).blockSize)
                    }
                    ),
                        (p !== h || c !== m) && a()
                }
                )
            }
            ),
                n.observe(e.el))
        }
        , d = () => {
            o && s.cancelAnimationFrame(o),
                n && n.unobserve && e.el && (n.unobserve(e.el),
                    n = null)
        }
        , u = () => {
            !e || e.destroyed || !e.initialized || i("orientationchange")
        }
        ;
    t("init", () => {
        if (e.params.resizeObserver && typeof s.ResizeObserver < "u") {
            l();
            return
        }
        s.addEventListener("resize", a),
            s.addEventListener("orientationchange", u)
    }
    ),
        t("destroy", () => {
            d(),
                s.removeEventListener("resize", a),
                s.removeEventListener("orientationchange", u)
        }
        )
}
function lo(r) {
    let { swiper: e, extendParams: t, on: i, emit: s } = r;
    const n = []
        , o = K()
        , a = function (u, f) {
            f === void 0 && (f = {});
            const h = o.MutationObserver || o.WebkitMutationObserver
                , m = new h(p => {
                    if (e.__preventObserver__)
                        return;
                    if (p.length === 1) {
                        s("observerUpdate", p[0]);
                        return
                    }
                    const c = function () {
                        s("observerUpdate", p[0])
                    };
                    o.requestAnimationFrame ? o.requestAnimationFrame(c) : o.setTimeout(c, 0)
                }
                );
            m.observe(u, {
                attributes: typeof f.attributes > "u" ? !0 : f.attributes,
                childList: e.isElement || (typeof f.childList > "u" ? !0 : f).childList,
                characterData: typeof f.characterData > "u" ? !0 : f.characterData
            }),
                n.push(m)
        }
        , l = () => {
            if (e.params.observer) {
                if (e.params.observeParents) {
                    const u = so(e.hostEl);
                    for (let f = 0; f < u.length; f += 1)
                        a(u[f])
                }
                a(e.hostEl, {
                    childList: e.params.observeSlideChildren
                }),
                    a(e.wrapperEl, {
                        attributes: !1
                    })
            }
        }
        , d = () => {
            n.forEach(u => {
                u.disconnect()
            }
            ),
                n.splice(0, n.length)
        }
        ;
    t({
        observer: !1,
        observeParents: !1,
        observeSlideChildren: !1
    }),
        i("init", l),
        i("destroy", d)
}
var uo = {
    on(r, e, t) {
        const i = this;
        if (!i.eventsListeners || i.destroyed || typeof e != "function")
            return i;
        const s = t ? "unshift" : "push";
        return r.split(" ").forEach(n => {
            i.eventsListeners[n] || (i.eventsListeners[n] = []),
                i.eventsListeners[n][s](e)
        }
        ),
            i
    },
    once(r, e, t) {
        const i = this;
        if (!i.eventsListeners || i.destroyed || typeof e != "function")
            return i;
        function s() {
            i.off(r, s),
                s.__emitterProxy && delete s.__emitterProxy;
            for (var n = arguments.length, o = new Array(n), a = 0; a < n; a++)
                o[a] = arguments[a];
            e.apply(i, o)
        }
        return s.__emitterProxy = e,
            i.on(r, s, t)
    },
    onAny(r, e) {
        const t = this;
        if (!t.eventsListeners || t.destroyed || typeof r != "function")
            return t;
        const i = e ? "unshift" : "push";
        return t.eventsAnyListeners.indexOf(r) < 0 && t.eventsAnyListeners[i](r),
            t
    },
    offAny(r) {
        const e = this;
        if (!e.eventsListeners || e.destroyed || !e.eventsAnyListeners)
            return e;
        const t = e.eventsAnyListeners.indexOf(r);
        return t >= 0 && e.eventsAnyListeners.splice(t, 1),
            e
    },
    off(r, e) {
        const t = this;
        return !t.eventsListeners || t.destroyed || !t.eventsListeners || r.split(" ").forEach(i => {
            typeof e > "u" ? t.eventsListeners[i] = [] : t.eventsListeners[i] && t.eventsListeners[i].forEach((s, n) => {
                (s === e || s.__emitterProxy && s.__emitterProxy === e) && t.eventsListeners[i].splice(n, 1)
            }
            )
        }
        ),
            t
    },
    emit() {
        const r = this;
        if (!r.eventsListeners || r.destroyed || !r.eventsListeners)
            return r;
        let e, t, i;
        for (var s = arguments.length, n = new Array(s), o = 0; o < s; o++)
            n[o] = arguments[o];
        return typeof n[0] == "string" || Array.isArray(n[0]) ? (e = n[0],
            t = n.slice(1, n.length),
            i = r) : (e = n[0].events,
                t = n[0].data,
                i = n[0].context || r),
            t.unshift(i),
            (Array.isArray(e) ? e : e.split(" ")).forEach(l => {
                r.eventsAnyListeners && r.eventsAnyListeners.length && r.eventsAnyListeners.forEach(d => {
                    d.apply(i, [l, ...t])
                }
                ),
                    r.eventsListeners && r.eventsListeners[l] && r.eventsListeners[l].forEach(d => {
                        d.apply(i, t)
                    }
                    )
            }
            ),
            r
    }
};
function fo() {
    const r = this;
    let e, t;
    const i = r.el;
    typeof r.params.width < "u" && r.params.width !== null ? e = r.params.width : e = i.clientWidth,
        typeof r.params.height < "u" && r.params.height !== null ? t = r.params.height : t = i.clientHeight,
        !(e === 0 && r.isHorizontal() || t === 0 && r.isVertical()) && (e = e - parseInt(ze(i, "padding-left") || 0, 10) - parseInt(ze(i, "padding-right") || 0, 10),
            t = t - parseInt(ze(i, "padding-top") || 0, 10) - parseInt(ze(i, "padding-bottom") || 0, 10),
            Number.isNaN(e) && (e = 0),
            Number.isNaN(t) && (t = 0),
            Object.assign(r, {
                width: e,
                height: t,
                size: r.isHorizontal() ? e : t
            }))
}
function co() {
    const r = this;
    function e(P, M) {
        return parseFloat(P.getPropertyValue(r.getDirectionLabel(M)) || 0)
    }
    const t = r.params
        , { wrapperEl: i, slidesEl: s, size: n, rtlTranslate: o, wrongRTL: a } = r
        , l = r.virtual && t.virtual.enabled
        , d = l ? r.virtual.slides.length : r.slides.length
        , u = _e(s, `.${r.params.slideClass}, swiper-slide`)
        , f = l ? r.virtual.slides.length : u.length;
    let h = [];
    const m = []
        , p = [];
    let c = t.slidesOffsetBefore;
    typeof c == "function" && (c = t.slidesOffsetBefore.call(r));
    let g = t.slidesOffsetAfter;
    typeof g == "function" && (g = t.slidesOffsetAfter.call(r));
    const _ = r.snapGrid.length
        , v = r.slidesGrid.length;
    let y = t.spaceBetween
        , S = -c
        , w = 0
        , x = 0;
    if (typeof n > "u")
        return;
    typeof y == "string" && y.indexOf("%") >= 0 ? y = parseFloat(y.replace("%", "")) / 100 * n : typeof y == "string" && (y = parseFloat(y)),
        r.virtualSize = -y,
        u.forEach(P => {
            o ? P.style.marginLeft = "" : P.style.marginRight = "",
                P.style.marginBottom = "",
                P.style.marginTop = ""
        }
        ),
        t.centeredSlides && t.cssMode && (Pt(i, "--swiper-centered-offset-before", ""),
            Pt(i, "--swiper-centered-offset-after", ""));
    const T = t.grid && t.grid.rows > 1 && r.grid;
    T ? r.grid.initSlides(u) : r.grid && r.grid.unsetSlides();
    let b;
    const E = t.slidesPerView === "auto" && t.breakpoints && Object.keys(t.breakpoints).filter(P => typeof t.breakpoints[P].slidesPerView < "u").length > 0;
    for (let P = 0; P < f; P += 1) {
        b = 0;
        let M;
        if (u[P] && (M = u[P]),
            T && r.grid.updateSlide(P, M, u),
            !(u[P] && ze(M, "display") === "none")) {
            if (t.slidesPerView === "auto") {
                E && (u[P].style[r.getDirectionLabel("width")] = "");
                const C = getComputedStyle(M)
                    , k = M.style.transform
                    , D = M.style.webkitTransform;
                if (k && (M.style.transform = "none"),
                    D && (M.style.webkitTransform = "none"),
                    t.roundLengths)
                    b = r.isHorizontal() ? ds(M, "width") : ds(M, "height");
                else {
                    const z = e(C, "width")
                        , O = e(C, "padding-left")
                        , L = e(C, "padding-right")
                        , R = e(C, "margin-left")
                        , Q = e(C, "margin-right")
                        , Ce = C.getPropertyValue("box-sizing");
                    if (Ce && Ce === "border-box")
                        b = z + R + Q;
                    else {
                        const { clientWidth: Ve, offsetWidth: ye } = M;
                        b = z + O + L + R + Q + (ye - Ve)
                    }
                }
                k && (M.style.transform = k),
                    D && (M.style.webkitTransform = D),
                    t.roundLengths && (b = Math.floor(b))
            } else
                b = (n - (t.slidesPerView - 1) * y) / t.slidesPerView,
                    t.roundLengths && (b = Math.floor(b)),
                    u[P] && (u[P].style[r.getDirectionLabel("width")] = `${b}px`);
            u[P] && (u[P].swiperSlideSize = b),
                p.push(b),
                t.centeredSlides ? (S = S + b / 2 + w / 2 + y,
                    w === 0 && P !== 0 && (S = S - n / 2 - y),
                    P === 0 && (S = S - n / 2 - y),
                    Math.abs(S) < 1 / 1e3 && (S = 0),
                    t.roundLengths && (S = Math.floor(S)),
                    x % t.slidesPerGroup === 0 && h.push(S),
                    m.push(S)) : (t.roundLengths && (S = Math.floor(S)),
                        (x - Math.min(r.params.slidesPerGroupSkip, x)) % r.params.slidesPerGroup === 0 && h.push(S),
                        m.push(S),
                        S = S + b + y),
                r.virtualSize += b + y,
                w = b,
                x += 1
        }
    }
    if (r.virtualSize = Math.max(r.virtualSize, n) + g,
        o && a && (t.effect === "slide" || t.effect === "coverflow") && (i.style.width = `${r.virtualSize + y}px`),
        t.setWrapperSize && (i.style[r.getDirectionLabel("width")] = `${r.virtualSize + y}px`),
        T && r.grid.updateWrapperSize(b, h),
        !t.centeredSlides) {
        const P = [];
        for (let M = 0; M < h.length; M += 1) {
            let C = h[M];
            t.roundLengths && (C = Math.floor(C)),
                h[M] <= r.virtualSize - n && P.push(C)
        }
        h = P,
            Math.floor(r.virtualSize - n) - Math.floor(h[h.length - 1]) > 1 && h.push(r.virtualSize - n)
    }
    if (l && t.loop) {
        const P = p[0] + y;
        if (t.slidesPerGroup > 1) {
            const M = Math.ceil((r.virtual.slidesBefore + r.virtual.slidesAfter) / t.slidesPerGroup)
                , C = P * t.slidesPerGroup;
            for (let k = 0; k < M; k += 1)
                h.push(h[h.length - 1] + C)
        }
        for (let M = 0; M < r.virtual.slidesBefore + r.virtual.slidesAfter; M += 1)
            t.slidesPerGroup === 1 && h.push(h[h.length - 1] + P),
                m.push(m[m.length - 1] + P),
                r.virtualSize += P
    }
    if (h.length === 0 && (h = [0]),
        y !== 0) {
        const P = r.isHorizontal() && o ? "marginLeft" : r.getDirectionLabel("marginRight");
        u.filter((M, C) => !t.cssMode || t.loop ? !0 : C !== u.length - 1).forEach(M => {
            M.style[P] = `${y}px`
        }
        )
    }
    if (t.centeredSlides && t.centeredSlidesBounds) {
        let P = 0;
        p.forEach(C => {
            P += C + (y || 0)
        }
        ),
            P -= y;
        const M = P > n ? P - n : 0;
        h = h.map(C => C <= 0 ? -c : C > M ? M + g : C)
    }
    if (t.centerInsufficientSlides) {
        let P = 0;
        p.forEach(C => {
            P += C + (y || 0)
        }
        ),
            P -= y;
        const M = (t.slidesOffsetBefore || 0) + (t.slidesOffsetAfter || 0);
        if (P + M < n) {
            const C = (n - P - M) / 2;
            h.forEach((k, D) => {
                h[D] = k - C
            }
            ),
                m.forEach((k, D) => {
                    m[D] = k + C
                }
                )
        }
    }
    if (Object.assign(r, {
        slides: u,
        snapGrid: h,
        slidesGrid: m,
        slidesSizesGrid: p
    }),
        t.centeredSlides && t.cssMode && !t.centeredSlidesBounds) {
        Pt(i, "--swiper-centered-offset-before", `${-h[0]}px`),
            Pt(i, "--swiper-centered-offset-after", `${r.size / 2 - p[p.length - 1] / 2}px`);
        const P = -r.snapGrid[0]
            , M = -r.slidesGrid[0];
        r.snapGrid = r.snapGrid.map(C => C + P),
            r.slidesGrid = r.slidesGrid.map(C => C + M)
    }
    if (f !== d && r.emit("slidesLengthChange"),
        h.length !== _ && (r.params.watchOverflow && r.checkOverflow(),
            r.emit("snapGridLengthChange")),
        m.length !== v && r.emit("slidesGridLengthChange"),
        t.watchSlidesProgress && r.updateSlidesOffset(),
        r.emit("slidesUpdated"),
        !l && !t.cssMode && (t.effect === "slide" || t.effect === "fade")) {
        const P = `${t.containerModifierClass}backface-hidden`
            , M = r.el.classList.contains(P);
        f <= t.maxBackfaceHiddenSlides ? M || r.el.classList.add(P) : M && r.el.classList.remove(P)
    }
}
function ho(r) {
    const e = this
        , t = []
        , i = e.virtual && e.params.virtual.enabled;
    let s = 0, n;
    typeof r == "number" ? e.setTransition(r) : r === !0 && e.setTransition(e.params.speed);
    const o = a => i ? e.slides[e.getSlideIndexByData(a)] : e.slides[a];
    if (e.params.slidesPerView !== "auto" && e.params.slidesPerView > 1)
        if (e.params.centeredSlides)
            (e.visibleSlides || []).forEach(a => {
                t.push(a)
            }
            );
        else
            for (n = 0; n < Math.ceil(e.params.slidesPerView); n += 1) {
                const a = e.activeIndex + n;
                if (a > e.slides.length && !i)
                    break;
                t.push(o(a))
            }
    else
        t.push(o(e.activeIndex));
    for (n = 0; n < t.length; n += 1)
        if (typeof t[n] < "u") {
            const a = t[n].offsetHeight;
            s = a > s ? a : s
        }
    (s || s === 0) && (e.wrapperEl.style.height = `${s}px`)
}
function po() {
    const r = this
        , e = r.slides
        , t = r.isElement ? r.isHorizontal() ? r.wrapperEl.offsetLeft : r.wrapperEl.offsetTop : 0;
    for (let i = 0; i < e.length; i += 1)
        e[i].swiperSlideOffset = (r.isHorizontal() ? e[i].offsetLeft : e[i].offsetTop) - t - r.cssOverflowAdjustment()
}
const us = (r, e, t) => {
    e && !r.classList.contains(t) ? r.classList.add(t) : !e && r.classList.contains(t) && r.classList.remove(t)
}
    ;
function mo(r) {
    r === void 0 && (r = this && this.translate || 0);
    const e = this
        , t = e.params
        , { slides: i, rtlTranslate: s, snapGrid: n } = e;
    if (i.length === 0)
        return;
    typeof i[0].swiperSlideOffset > "u" && e.updateSlidesOffset();
    let o = -r;
    s && (o = r),
        e.visibleSlidesIndexes = [],
        e.visibleSlides = [];
    let a = t.spaceBetween;
    typeof a == "string" && a.indexOf("%") >= 0 ? a = parseFloat(a.replace("%", "")) / 100 * e.size : typeof a == "string" && (a = parseFloat(a));
    for (let l = 0; l < i.length; l += 1) {
        const d = i[l];
        let u = d.swiperSlideOffset;
        t.cssMode && t.centeredSlides && (u -= i[0].swiperSlideOffset);
        const f = (o + (t.centeredSlides ? e.minTranslate() : 0) - u) / (d.swiperSlideSize + a)
            , h = (o - n[0] + (t.centeredSlides ? e.minTranslate() : 0) - u) / (d.swiperSlideSize + a)
            , m = -(o - u)
            , p = m + e.slidesSizesGrid[l]
            , c = m >= 0 && m <= e.size - e.slidesSizesGrid[l]
            , g = m >= 0 && m < e.size - 1 || p > 1 && p <= e.size || m <= 0 && p >= e.size;
        g && (e.visibleSlides.push(d),
            e.visibleSlidesIndexes.push(l)),
            us(d, g, t.slideVisibleClass),
            us(d, c, t.slideFullyVisibleClass),
            d.progress = s ? -f : f,
            d.originalProgress = s ? -h : h
    }
}
function go(r) {
    const e = this;
    if (typeof r > "u") {
        const u = e.rtlTranslate ? -1 : 1;
        r = e && e.translate && e.translate * u || 0
    }
    const t = e.params
        , i = e.maxTranslate() - e.minTranslate();
    let { progress: s, isBeginning: n, isEnd: o, progressLoop: a } = e;
    const l = n
        , d = o;
    if (i === 0)
        s = 0,
            n = !0,
            o = !0;
    else {
        s = (r - e.minTranslate()) / i;
        const u = Math.abs(r - e.minTranslate()) < 1
            , f = Math.abs(r - e.maxTranslate()) < 1;
        n = u || s <= 0,
            o = f || s >= 1,
            u && (s = 0),
            f && (s = 1)
    }
    if (t.loop) {
        const u = e.getSlideIndexByData(0)
            , f = e.getSlideIndexByData(e.slides.length - 1)
            , h = e.slidesGrid[u]
            , m = e.slidesGrid[f]
            , p = e.slidesGrid[e.slidesGrid.length - 1]
            , c = Math.abs(r);
        c >= h ? a = (c - h) / p : a = (c + p - m) / p,
            a > 1 && (a -= 1)
    }
    Object.assign(e, {
        progress: s,
        progressLoop: a,
        isBeginning: n,
        isEnd: o
    }),
        (t.watchSlidesProgress || t.centeredSlides && t.autoHeight) && e.updateSlidesProgress(r),
        n && !l && e.emit("reachBeginning toEdge"),
        o && !d && e.emit("reachEnd toEdge"),
        (l && !n || d && !o) && e.emit("fromEdge"),
        e.emit("progress", s)
}
const ti = (r, e, t) => {
    e && !r.classList.contains(t) ? r.classList.add(t) : !e && r.classList.contains(t) && r.classList.remove(t)
}
    ;
function _o() {
    const r = this
        , { slides: e, params: t, slidesEl: i, activeIndex: s } = r
        , n = r.virtual && t.virtual.enabled
        , o = r.grid && t.grid && t.grid.rows > 1
        , a = f => _e(i, `.${t.slideClass}${f}, swiper-slide${f}`)[0];
    let l, d, u;
    if (n)
        if (t.loop) {
            let f = s - r.virtual.slidesBefore;
            f < 0 && (f = r.virtual.slides.length + f),
                f >= r.virtual.slides.length && (f -= r.virtual.slides.length),
                l = a(`[data-swiper-slide-index="${f}"]`)
        } else
            l = a(`[data-swiper-slide-index="${s}"]`);
    else
        o ? (l = e.find(f => f.column === s),
            u = e.find(f => f.column === s + 1),
            d = e.find(f => f.column === s - 1)) : l = e[s];
    l && (o || (u = io(l, `.${t.slideClass}, swiper-slide`)[0],
        t.loop && !u && (u = e[0]),
        d = to(l, `.${t.slideClass}, swiper-slide`)[0],
        t.loop && !d === 0 && (d = e[e.length - 1]))),
        e.forEach(f => {
            ti(f, f === l, t.slideActiveClass),
                ti(f, f === u, t.slideNextClass),
                ti(f, f === d, t.slidePrevClass)
        }
        ),
        r.emitSlidesClasses()
}
const kt = (r, e) => {
    if (!r || r.destroyed || !r.params)
        return;
    const t = () => r.isElement ? "swiper-slide" : `.${r.params.slideClass}`
        , i = e.closest(t());
    if (i) {
        let s = i.querySelector(`.${r.params.lazyPreloaderClass}`);
        !s && r.isElement && (i.shadowRoot ? s = i.shadowRoot.querySelector(`.${r.params.lazyPreloaderClass}`) : requestAnimationFrame(() => {
            i.shadowRoot && (s = i.shadowRoot.querySelector(`.${r.params.lazyPreloaderClass}`),
                s && s.remove())
        }
        )),
            s && s.remove()
    }
}
    , ii = (r, e) => {
        if (!r.slides[e])
            return;
        const t = r.slides[e].querySelector('[loading="lazy"]');
        t && t.removeAttribute("loading")
    }
    , Si = r => {
        if (!r || r.destroyed || !r.params)
            return;
        let e = r.params.lazyPreloadPrevNext;
        const t = r.slides.length;
        if (!t || !e || e < 0)
            return;
        e = Math.min(e, t);
        const i = r.params.slidesPerView === "auto" ? r.slidesPerViewDynamic() : Math.ceil(r.params.slidesPerView)
            , s = r.activeIndex;
        if (r.params.grid && r.params.grid.rows > 1) {
            const o = s
                , a = [o - e];
            a.push(...Array.from({
                length: e
            }).map((l, d) => o + i + d)),
                r.slides.forEach((l, d) => {
                    a.includes(l.column) && ii(r, d)
                }
                );
            return
        }
        const n = s + i - 1;
        if (r.params.rewind || r.params.loop)
            for (let o = s - e; o <= n + e; o += 1) {
                const a = (o % t + t) % t;
                (a < s || a > n) && ii(r, a)
            }
        else
            for (let o = Math.max(s - e, 0); o <= Math.min(n + e, t - 1); o += 1)
                o !== s && (o > n || o < s) && ii(r, o)
    }
    ;
function vo(r) {
    const { slidesGrid: e, params: t } = r
        , i = r.rtlTranslate ? r.translate : -r.translate;
    let s;
    for (let n = 0; n < e.length; n += 1)
        typeof e[n + 1] < "u" ? i >= e[n] && i < e[n + 1] - (e[n + 1] - e[n]) / 2 ? s = n : i >= e[n] && i < e[n + 1] && (s = n + 1) : i >= e[n] && (s = n);
    return t.normalizeSlideIndex && (s < 0 || typeof s > "u") && (s = 0),
        s
}
function wo(r) {
    const e = this
        , t = e.rtlTranslate ? e.translate : -e.translate
        , { snapGrid: i, params: s, activeIndex: n, realIndex: o, snapIndex: a } = e;
    let l = r, d;
    const u = m => {
        let p = m - e.virtual.slidesBefore;
        return p < 0 && (p = e.virtual.slides.length + p),
            p >= e.virtual.slides.length && (p -= e.virtual.slides.length),
            p
    }
        ;
    if (typeof l > "u" && (l = vo(e)),
        i.indexOf(t) >= 0)
        d = i.indexOf(t);
    else {
        const m = Math.min(s.slidesPerGroupSkip, l);
        d = m + Math.floor((l - m) / s.slidesPerGroup)
    }
    if (d >= i.length && (d = i.length - 1),
        l === n && !e.params.loop) {
        d !== a && (e.snapIndex = d,
            e.emit("snapIndexChange"));
        return
    }
    if (l === n && e.params.loop && e.virtual && e.params.virtual.enabled) {
        e.realIndex = u(l);
        return
    }
    const f = e.grid && s.grid && s.grid.rows > 1;
    let h;
    if (e.virtual && s.virtual.enabled && s.loop)
        h = u(l);
    else if (f) {
        const m = e.slides.find(c => c.column === l);
        let p = parseInt(m.getAttribute("data-swiper-slide-index"), 10);
        Number.isNaN(p) && (p = Math.max(e.slides.indexOf(m), 0)),
            h = Math.floor(p / s.grid.rows)
    } else if (e.slides[l]) {
        const m = e.slides[l].getAttribute("data-swiper-slide-index");
        m ? h = parseInt(m, 10) : h = l
    } else
        h = l;
    Object.assign(e, {
        previousSnapIndex: a,
        snapIndex: d,
        previousRealIndex: o,
        realIndex: h,
        previousIndex: n,
        activeIndex: l
    }),
        e.initialized && Si(e),
        e.emit("activeIndexChange"),
        e.emit("snapIndexChange"),
        (e.initialized || e.params.runCallbacksOnInit) && (o !== h && e.emit("realIndexChange"),
            e.emit("slideChange"))
}
function yo(r, e) {
    const t = this
        , i = t.params;
    let s = r.closest(`.${i.slideClass}, swiper-slide`);
    !s && t.isElement && e && e.length > 1 && e.includes(r) && [...e.slice(e.indexOf(r) + 1, e.length)].forEach(a => {
        !s && a.matches && a.matches(`.${i.slideClass}, swiper-slide`) && (s = a)
    }
    );
    let n = !1, o;
    if (s) {
        for (let a = 0; a < t.slides.length; a += 1)
            if (t.slides[a] === s) {
                n = !0,
                    o = a;
                break
            }
    }
    if (s && n)
        t.clickedSlide = s,
            t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(s.getAttribute("data-swiper-slide-index"), 10) : t.clickedIndex = o;
    else {
        t.clickedSlide = void 0,
            t.clickedIndex = void 0;
        return
    }
    i.slideToClickedSlide && t.clickedIndex !== void 0 && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
}
var So = {
    updateSize: fo,
    updateSlides: co,
    updateAutoHeight: ho,
    updateSlidesOffset: po,
    updateSlidesProgress: mo,
    updateProgress: go,
    updateSlidesClasses: _o,
    updateActiveIndex: wo,
    updateClickedSlide: yo
};
function To(r) {
    r === void 0 && (r = this.isHorizontal() ? "x" : "y");
    const e = this
        , { params: t, rtlTranslate: i, translate: s, wrapperEl: n } = e;
    if (t.virtualTranslate)
        return i ? -s : s;
    if (t.cssMode)
        return s;
    let o = Qn(n, r);
    return o += e.cssOverflowAdjustment(),
        i && (o = -o),
        o || 0
}
function xo(r, e) {
    const t = this
        , { rtlTranslate: i, params: s, wrapperEl: n, progress: o } = t;
    let a = 0
        , l = 0;
    const d = 0;
    t.isHorizontal() ? a = i ? -r : r : l = r,
        s.roundLengths && (a = Math.floor(a),
            l = Math.floor(l)),
        t.previousTranslate = t.translate,
        t.translate = t.isHorizontal() ? a : l,
        s.cssMode ? n[t.isHorizontal() ? "scrollLeft" : "scrollTop"] = t.isHorizontal() ? -a : -l : s.virtualTranslate || (t.isHorizontal() ? a -= t.cssOverflowAdjustment() : l -= t.cssOverflowAdjustment(),
            n.style.transform = `translate3d(${a}px, ${l}px, ${d}px)`);
    let u;
    const f = t.maxTranslate() - t.minTranslate();
    f === 0 ? u = 0 : u = (r - t.minTranslate()) / f,
        u !== o && t.updateProgress(r),
        t.emit("setTranslate", t.translate, e)
}
function bo() {
    return -this.snapGrid[0]
}
function Eo() {
    return -this.snapGrid[this.snapGrid.length - 1]
}
function Po(r, e, t, i, s) {
    r === void 0 && (r = 0),
        e === void 0 && (e = this.params.speed),
        t === void 0 && (t = !0),
        i === void 0 && (i = !0);
    const n = this
        , { params: o, wrapperEl: a } = n;
    if (n.animating && o.preventInteractionOnTransition)
        return !1;
    const l = n.minTranslate()
        , d = n.maxTranslate();
    let u;
    if (i && r > l ? u = l : i && r < d ? u = d : u = r,
        n.updateProgress(u),
        o.cssMode) {
        const f = n.isHorizontal();
        if (e === 0)
            a[f ? "scrollLeft" : "scrollTop"] = -u;
        else {
            if (!n.support.smoothScroll)
                return _r({
                    swiper: n,
                    targetPosition: -u,
                    side: f ? "left" : "top"
                }),
                    !0;
            a.scrollTo({
                [f ? "left" : "top"]: -u,
                behavior: "smooth"
            })
        }
        return !0
    }
    return e === 0 ? (n.setTransition(0),
        n.setTranslate(u),
        t && (n.emit("beforeTransitionStart", e, s),
            n.emit("transitionEnd"))) : (n.setTransition(e),
                n.setTranslate(u),
                t && (n.emit("beforeTransitionStart", e, s),
                    n.emit("transitionStart")),
                n.animating || (n.animating = !0,
                    n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function (h) {
                        !n || n.destroyed || h.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd),
                            n.onTranslateToWrapperTransitionEnd = null,
                            delete n.onTranslateToWrapperTransitionEnd,
                            n.animating = !1,
                            t && n.emit("transitionEnd"))
                    }
                    ),
                    n.wrapperEl.addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd))),
        !0
}
var Mo = {
    getTranslate: To,
    setTranslate: xo,
    minTranslate: bo,
    maxTranslate: Eo,
    translateTo: Po
};
function Co(r, e) {
    const t = this;
    t.params.cssMode || (t.wrapperEl.style.transitionDuration = `${r}ms`,
        t.wrapperEl.style.transitionDelay = r === 0 ? "0ms" : ""),
        t.emit("setTransition", r, e)
}
function Sr(r) {
    let { swiper: e, runCallbacks: t, direction: i, step: s } = r;
    const { activeIndex: n, previousIndex: o } = e;
    let a = i;
    a || (n > o ? a = "next" : n < o ? a = "prev" : a = "reset"),
        e.emit(`transition${s}`),
        t && a === "reset" ? e.emit(`slideResetTransition${s}`) : t && n !== o && (e.emit(`slideChangeTransition${s}`),
            a === "next" ? e.emit(`slideNextTransition${s}`) : e.emit(`slidePrevTransition${s}`))
}
function Oo(r, e) {
    r === void 0 && (r = !0);
    const t = this
        , { params: i } = t;
    i.cssMode || (i.autoHeight && t.updateAutoHeight(),
        Sr({
            swiper: t,
            runCallbacks: r,
            direction: e,
            step: "Start"
        }))
}
function ko(r, e) {
    r === void 0 && (r = !0);
    const t = this
        , { params: i } = t;
    t.animating = !1,
        !i.cssMode && (t.setTransition(0),
            Sr({
                swiper: t,
                runCallbacks: r,
                direction: e,
                step: "End"
            }))
}
var Lo = {
    setTransition: Co,
    transitionStart: Oo,
    transitionEnd: ko
};
function Ao(r, e, t, i, s) {
    r === void 0 && (r = 0),
        t === void 0 && (t = !0),
        typeof r == "string" && (r = parseInt(r, 10));
    const n = this;
    let o = r;
    o < 0 && (o = 0);
    const { params: a, snapGrid: l, slidesGrid: d, previousIndex: u, activeIndex: f, rtlTranslate: h, wrapperEl: m, enabled: p } = n;
    if (!p && !i && !s || n.destroyed || n.animating && a.preventInteractionOnTransition)
        return !1;
    typeof e > "u" && (e = n.params.speed);
    const c = Math.min(n.params.slidesPerGroupSkip, o);
    let g = c + Math.floor((o - c) / n.params.slidesPerGroup);
    g >= l.length && (g = l.length - 1);
    const _ = -l[g];
    if (a.normalizeSlideIndex)
        for (let T = 0; T < d.length; T += 1) {
            const b = -Math.floor(_ * 100)
                , E = Math.floor(d[T] * 100)
                , P = Math.floor(d[T + 1] * 100);
            typeof d[T + 1] < "u" ? b >= E && b < P - (P - E) / 2 ? o = T : b >= E && b < P && (o = T + 1) : b >= E && (o = T)
        }
    if (n.initialized && o !== f && (!n.allowSlideNext && (h ? _ > n.translate && _ > n.minTranslate() : _ < n.translate && _ < n.minTranslate()) || !n.allowSlidePrev && _ > n.translate && _ > n.maxTranslate() && (f || 0) !== o))
        return !1;
    o !== (u || 0) && t && n.emit("beforeSlideChangeStart"),
        n.updateProgress(_);
    let v;
    o > f ? v = "next" : o < f ? v = "prev" : v = "reset";
    const y = n.virtual && n.params.virtual.enabled;
    if (!(y && s) && (h && -_ === n.translate || !h && _ === n.translate))
        return n.updateActiveIndex(o),
            a.autoHeight && n.updateAutoHeight(),
            n.updateSlidesClasses(),
            a.effect !== "slide" && n.setTranslate(_),
            v !== "reset" && (n.transitionStart(t, v),
                n.transitionEnd(t, v)),
            !1;
    if (a.cssMode) {
        const T = n.isHorizontal()
            , b = h ? _ : -_;
        if (e === 0)
            y && (n.wrapperEl.style.scrollSnapType = "none",
                n._immediateVirtual = !0),
                y && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0 ? (n._cssModeVirtualInitialSet = !0,
                    requestAnimationFrame(() => {
                        m[T ? "scrollLeft" : "scrollTop"] = b
                    }
                    )) : m[T ? "scrollLeft" : "scrollTop"] = b,
                y && requestAnimationFrame(() => {
                    n.wrapperEl.style.scrollSnapType = "",
                        n._immediateVirtual = !1
                }
                );
        else {
            if (!n.support.smoothScroll)
                return _r({
                    swiper: n,
                    targetPosition: b,
                    side: T ? "left" : "top"
                }),
                    !0;
            m.scrollTo({
                [T ? "left" : "top"]: b,
                behavior: "smooth"
            })
        }
        return !0
    }
    const x = yr().isSafari;
    return y && !s && x && n.isElement && n.virtual.update(!1, !1, o),
        n.setTransition(e),
        n.setTranslate(_),
        n.updateActiveIndex(o),
        n.updateSlidesClasses(),
        n.emit("beforeTransitionStart", e, i),
        n.transitionStart(t, v),
        e === 0 ? n.transitionEnd(t, v) : n.animating || (n.animating = !0,
            n.onSlideToWrapperTransitionEnd || (n.onSlideToWrapperTransitionEnd = function (b) {
                !n || n.destroyed || b.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onSlideToWrapperTransitionEnd),
                    n.onSlideToWrapperTransitionEnd = null,
                    delete n.onSlideToWrapperTransitionEnd,
                    n.transitionEnd(t, v))
            }
            ),
            n.wrapperEl.addEventListener("transitionend", n.onSlideToWrapperTransitionEnd)),
        !0
}
function zo(r, e, t, i) {
    r === void 0 && (r = 0),
        t === void 0 && (t = !0),
        typeof r == "string" && (r = parseInt(r, 10));
    const s = this;
    if (s.destroyed)
        return;
    typeof e > "u" && (e = s.params.speed);
    const n = s.grid && s.params.grid && s.params.grid.rows > 1;
    let o = r;
    if (s.params.loop)
        if (s.virtual && s.params.virtual.enabled)
            o = o + s.virtual.slidesBefore;
        else {
            let a;
            if (n) {
                const h = o * s.params.grid.rows;
                a = s.slides.find(m => m.getAttribute("data-swiper-slide-index") * 1 === h).column
            } else
                a = s.getSlideIndexByData(o);
            const l = n ? Math.ceil(s.slides.length / s.params.grid.rows) : s.slides.length
                , { centeredSlides: d } = s.params;
            let u = s.params.slidesPerView;
            u === "auto" ? u = s.slidesPerViewDynamic() : (u = Math.ceil(parseFloat(s.params.slidesPerView, 10)),
                d && u % 2 === 0 && (u = u + 1));
            let f = l - a < u;
            if (d && (f = f || a < Math.ceil(u / 2)),
                i && d && s.params.slidesPerView !== "auto" && !n && (f = !1),
                f) {
                const h = d ? a < s.activeIndex ? "prev" : "next" : a - s.activeIndex - 1 < s.params.slidesPerView ? "next" : "prev";
                s.loopFix({
                    direction: h,
                    slideTo: !0,
                    activeSlideIndex: h === "next" ? a + 1 : a - l + 1,
                    slideRealIndex: h === "next" ? s.realIndex : void 0
                })
            }
            if (n) {
                const h = o * s.params.grid.rows;
                o = s.slides.find(m => m.getAttribute("data-swiper-slide-index") * 1 === h).column
            } else
                o = s.getSlideIndexByData(o)
        }
    return requestAnimationFrame(() => {
        s.slideTo(o, e, t, i)
    }
    ),
        s
}
function Io(r, e, t) {
    e === void 0 && (e = !0);
    const i = this
        , { enabled: s, params: n, animating: o } = i;
    if (!s || i.destroyed)
        return i;
    typeof r > "u" && (r = i.params.speed);
    let a = n.slidesPerGroup;
    n.slidesPerView === "auto" && n.slidesPerGroup === 1 && n.slidesPerGroupAuto && (a = Math.max(i.slidesPerViewDynamic("current", !0), 1));
    const l = i.activeIndex < n.slidesPerGroupSkip ? 1 : a
        , d = i.virtual && n.virtual.enabled;
    if (n.loop) {
        if (o && !d && n.loopPreventsSliding)
            return !1;
        if (i.loopFix({
            direction: "next"
        }),
            i._clientLeft = i.wrapperEl.clientLeft,
            i.activeIndex === i.slides.length - 1 && n.cssMode)
            return requestAnimationFrame(() => {
                i.slideTo(i.activeIndex + l, r, e, t)
            }
            ),
                !0
    }
    return n.rewind && i.isEnd ? i.slideTo(0, r, e, t) : i.slideTo(i.activeIndex + l, r, e, t)
}
function Do(r, e, t) {
    e === void 0 && (e = !0);
    const i = this
        , { params: s, snapGrid: n, slidesGrid: o, rtlTranslate: a, enabled: l, animating: d } = i;
    if (!l || i.destroyed)
        return i;
    typeof r > "u" && (r = i.params.speed);
    const u = i.virtual && s.virtual.enabled;
    if (s.loop) {
        if (d && !u && s.loopPreventsSliding)
            return !1;
        i.loopFix({
            direction: "prev"
        }),
            i._clientLeft = i.wrapperEl.clientLeft
    }
    const f = a ? i.translate : -i.translate;
    function h(v) {
        return v < 0 ? -Math.floor(Math.abs(v)) : Math.floor(v)
    }
    const m = h(f)
        , p = n.map(v => h(v))
        , c = s.freeMode && s.freeMode.enabled;
    let g = n[p.indexOf(m) - 1];
    if (typeof g > "u" && (s.cssMode || c)) {
        let v;
        n.forEach((y, S) => {
            m >= y && (v = S)
        }
        ),
            typeof v < "u" && (g = c ? n[v] : n[v > 0 ? v - 1 : v])
    }
    let _ = 0;
    if (typeof g < "u" && (_ = o.indexOf(g),
        _ < 0 && (_ = i.activeIndex - 1),
        s.slidesPerView === "auto" && s.slidesPerGroup === 1 && s.slidesPerGroupAuto && (_ = _ - i.slidesPerViewDynamic("previous", !0) + 1,
            _ = Math.max(_, 0))),
        s.rewind && i.isBeginning) {
        const v = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
        return i.slideTo(v, r, e, t)
    } else if (s.loop && i.activeIndex === 0 && s.cssMode)
        return requestAnimationFrame(() => {
            i.slideTo(_, r, e, t)
        }
        ),
            !0;
    return i.slideTo(_, r, e, t)
}
function Ro(r, e, t) {
    e === void 0 && (e = !0);
    const i = this;
    if (!i.destroyed)
        return typeof r > "u" && (r = i.params.speed),
            i.slideTo(i.activeIndex, r, e, t)
}
function Fo(r, e, t, i) {
    e === void 0 && (e = !0),
        i === void 0 && (i = .5);
    const s = this;
    if (s.destroyed)
        return;
    typeof r > "u" && (r = s.params.speed);
    let n = s.activeIndex;
    const o = Math.min(s.params.slidesPerGroupSkip, n)
        , a = o + Math.floor((n - o) / s.params.slidesPerGroup)
        , l = s.rtlTranslate ? s.translate : -s.translate;
    if (l >= s.snapGrid[a]) {
        const d = s.snapGrid[a]
            , u = s.snapGrid[a + 1];
        l - d > (u - d) * i && (n += s.params.slidesPerGroup)
    } else {
        const d = s.snapGrid[a - 1]
            , u = s.snapGrid[a];
        l - d <= (u - d) * i && (n -= s.params.slidesPerGroup)
    }
    return n = Math.max(n, 0),
        n = Math.min(n, s.slidesGrid.length - 1),
        s.slideTo(n, r, e, t)
}
function No() {
    const r = this;
    if (r.destroyed)
        return;
    const { params: e, slidesEl: t } = r
        , i = e.slidesPerView === "auto" ? r.slidesPerViewDynamic() : e.slidesPerView;
    let s = r.clickedIndex, n;
    const o = r.isElement ? "swiper-slide" : `.${e.slideClass}`;
    if (e.loop) {
        if (r.animating)
            return;
        n = parseInt(r.clickedSlide.getAttribute("data-swiper-slide-index"), 10),
            e.centeredSlides ? s < r.loopedSlides - i / 2 || s > r.slides.length - r.loopedSlides + i / 2 ? (r.loopFix(),
                s = r.getSlideIndex(_e(t, `${o}[data-swiper-slide-index="${n}"]`)[0]),
                yi(() => {
                    r.slideTo(s)
                }
                )) : r.slideTo(s) : s > r.slides.length - i ? (r.loopFix(),
                    s = r.getSlideIndex(_e(t, `${o}[data-swiper-slide-index="${n}"]`)[0]),
                    yi(() => {
                        r.slideTo(s)
                    }
                    )) : r.slideTo(s)
    } else
        r.slideTo(s)
}
var Vo = {
    slideTo: Ao,
    slideToLoop: zo,
    slideNext: Io,
    slidePrev: Do,
    slideReset: Ro,
    slideToClosest: Fo,
    slideToClickedSlide: No
};
function Go(r, e) {
    const t = this
        , { params: i, slidesEl: s } = t;
    if (!i.loop || t.virtual && t.params.virtual.enabled)
        return;
    const n = () => {
        _e(s, `.${i.slideClass}, swiper-slide`).forEach((h, m) => {
            h.setAttribute("data-swiper-slide-index", m)
        }
        )
    }
        , o = t.grid && i.grid && i.grid.rows > 1
        , a = i.slidesPerGroup * (o ? i.grid.rows : 1)
        , l = t.slides.length % a !== 0
        , d = o && t.slides.length % i.grid.rows !== 0
        , u = f => {
            for (let h = 0; h < f; h += 1) {
                const m = t.isElement ? Gt("swiper-slide", [i.slideBlankClass]) : Gt("div", [i.slideClass, i.slideBlankClass]);
                t.slidesEl.append(m)
            }
        }
        ;
    if (l) {
        if (i.loopAddBlankSlides) {
            const f = a - t.slides.length % a;
            u(f),
                t.recalcSlides(),
                t.updateSlides()
        } else
            Vt("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
        n()
    } else if (d) {
        if (i.loopAddBlankSlides) {
            const f = i.grid.rows - t.slides.length % i.grid.rows;
            u(f),
                t.recalcSlides(),
                t.updateSlides()
        } else
            Vt("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
        n()
    } else
        n();
    t.loopFix({
        slideRealIndex: r,
        direction: i.centeredSlides ? void 0 : "next",
        initial: e
    })
}
function Bo(r) {
    let { slideRealIndex: e, slideTo: t = !0, direction: i, setTranslate: s, activeSlideIndex: n, initial: o, byController: a, byMousewheel: l } = r === void 0 ? {} : r;
    const d = this;
    if (!d.params.loop)
        return;
    d.emit("beforeLoopFix");
    const { slides: u, allowSlidePrev: f, allowSlideNext: h, slidesEl: m, params: p } = d
        , { centeredSlides: c, initialSlide: g } = p;
    if (d.allowSlidePrev = !0,
        d.allowSlideNext = !0,
        d.virtual && p.virtual.enabled) {
        t && (!p.centeredSlides && d.snapIndex === 0 ? d.slideTo(d.virtual.slides.length, 0, !1, !0) : p.centeredSlides && d.snapIndex < p.slidesPerView ? d.slideTo(d.virtual.slides.length + d.snapIndex, 0, !1, !0) : d.snapIndex === d.snapGrid.length - 1 && d.slideTo(d.virtual.slidesBefore, 0, !1, !0)),
            d.allowSlidePrev = f,
            d.allowSlideNext = h,
            d.emit("loopFix");
        return
    }
    let _ = p.slidesPerView;
    _ === "auto" ? _ = d.slidesPerViewDynamic() : (_ = Math.ceil(parseFloat(p.slidesPerView, 10)),
        c && _ % 2 === 0 && (_ = _ + 1));
    const v = p.slidesPerGroupAuto ? _ : p.slidesPerGroup;
    let y = v;
    y % v !== 0 && (y += v - y % v),
        y += p.loopAdditionalSlides,
        d.loopedSlides = y;
    const S = d.grid && p.grid && p.grid.rows > 1;
    u.length < _ + y || d.params.effect === "cards" && u.length < _ + y * 2 ? Vt("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : S && p.grid.fill === "row" && Vt("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
    const w = []
        , x = []
        , T = S ? Math.ceil(u.length / p.grid.rows) : u.length
        , b = o && T - g < _ && !c;
    let E = b ? g : d.activeIndex;
    typeof n > "u" ? n = d.getSlideIndex(u.find(O => O.classList.contains(p.slideActiveClass))) : E = n;
    const P = i === "next" || !i
        , M = i === "prev" || !i;
    let C = 0
        , k = 0;
    const z = (S ? u[n].column : n) + (c && typeof s > "u" ? -_ / 2 + .5 : 0);
    if (z < y) {
        C = Math.max(y - z, v);
        for (let O = 0; O < y - z; O += 1) {
            const L = O - Math.floor(O / T) * T;
            if (S) {
                const R = T - L - 1;
                for (let Q = u.length - 1; Q >= 0; Q -= 1)
                    u[Q].column === R && w.push(Q)
            } else
                w.push(T - L - 1)
        }
    } else if (z + _ > T - y) {
        k = Math.max(z - (T - y * 2), v),
            b && (k = Math.max(k, _ - T + g + 1));
        for (let O = 0; O < k; O += 1) {
            const L = O - Math.floor(O / T) * T;
            S ? u.forEach((R, Q) => {
                R.column === L && x.push(Q)
            }
            ) : x.push(L)
        }
    }
    if (d.__preventObserver__ = !0,
        requestAnimationFrame(() => {
            d.__preventObserver__ = !1
        }
        ),
        d.params.effect === "cards" && u.length < _ + y * 2 && (x.includes(n) && x.splice(x.indexOf(n), 1),
            w.includes(n) && w.splice(w.indexOf(n), 1)),
        M && w.forEach(O => {
            u[O].swiperLoopMoveDOM = !0,
                m.prepend(u[O]),
                u[O].swiperLoopMoveDOM = !1
        }
        ),
        P && x.forEach(O => {
            u[O].swiperLoopMoveDOM = !0,
                m.append(u[O]),
                u[O].swiperLoopMoveDOM = !1
        }
        ),
        d.recalcSlides(),
        p.slidesPerView === "auto" ? d.updateSlides() : S && (w.length > 0 && M || x.length > 0 && P) && d.slides.forEach((O, L) => {
            d.grid.updateSlide(L, O, d.slides)
        }
        ),
        p.watchSlidesProgress && d.updateSlidesOffset(),
        t) {
        if (w.length > 0 && M) {
            if (typeof e > "u") {
                const O = d.slidesGrid[E]
                    , R = d.slidesGrid[E + C] - O;
                l ? d.setTranslate(d.translate - R) : (d.slideTo(E + Math.ceil(C), 0, !1, !0),
                    s && (d.touchEventsData.startTranslate = d.touchEventsData.startTranslate - R,
                        d.touchEventsData.currentTranslate = d.touchEventsData.currentTranslate - R))
            } else if (s) {
                const O = S ? w.length / p.grid.rows : w.length;
                d.slideTo(d.activeIndex + O, 0, !1, !0),
                    d.touchEventsData.currentTranslate = d.translate
            }
        } else if (x.length > 0 && P)
            if (typeof e > "u") {
                const O = d.slidesGrid[E]
                    , R = d.slidesGrid[E - k] - O;
                l ? d.setTranslate(d.translate - R) : (d.slideTo(E - k, 0, !1, !0),
                    s && (d.touchEventsData.startTranslate = d.touchEventsData.startTranslate - R,
                        d.touchEventsData.currentTranslate = d.touchEventsData.currentTranslate - R))
            } else {
                const O = S ? x.length / p.grid.rows : x.length;
                d.slideTo(d.activeIndex - O, 0, !1, !0)
            }
    }
    if (d.allowSlidePrev = f,
        d.allowSlideNext = h,
        d.controller && d.controller.control && !a) {
        const O = {
            slideRealIndex: e,
            direction: i,
            setTranslate: s,
            activeSlideIndex: n,
            byController: !0
        };
        Array.isArray(d.controller.control) ? d.controller.control.forEach(L => {
            !L.destroyed && L.params.loop && L.loopFix({
                ...O,
                slideTo: L.params.slidesPerView === p.slidesPerView ? t : !1
            })
        }
        ) : d.controller.control instanceof d.constructor && d.controller.control.params.loop && d.controller.control.loopFix({
            ...O,
            slideTo: d.controller.control.params.slidesPerView === p.slidesPerView ? t : !1
        })
    }
    d.emit("loopFix")
}
function Wo() {
    const r = this
        , { params: e, slidesEl: t } = r;
    if (!e.loop || !t || r.virtual && r.params.virtual.enabled)
        return;
    r.recalcSlides();
    const i = [];
    r.slides.forEach(s => {
        const n = typeof s.swiperSlideIndex > "u" ? s.getAttribute("data-swiper-slide-index") * 1 : s.swiperSlideIndex;
        i[n] = s
    }
    ),
        r.slides.forEach(s => {
            s.removeAttribute("data-swiper-slide-index")
        }
        ),
        i.forEach(s => {
            t.append(s)
        }
        ),
        r.recalcSlides(),
        r.slideTo(r.realIndex, 0)
}
var Ho = {
    loopCreate: Go,
    loopFix: Bo,
    loopDestroy: Wo
};
function Yo(r) {
    const e = this;
    if (!e.params.simulateTouch || e.params.watchOverflow && e.isLocked || e.params.cssMode)
        return;
    const t = e.params.touchEventsTarget === "container" ? e.el : e.wrapperEl;
    e.isElement && (e.__preventObserver__ = !0),
        t.style.cursor = "move",
        t.style.cursor = r ? "grabbing" : "grab",
        e.isElement && requestAnimationFrame(() => {
            e.__preventObserver__ = !1
        }
        )
}
function Xo() {
    const r = this;
    r.params.watchOverflow && r.isLocked || r.params.cssMode || (r.isElement && (r.__preventObserver__ = !0),
        r[r.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "",
        r.isElement && requestAnimationFrame(() => {
            r.__preventObserver__ = !1
        }
        ))
}
var qo = {
    setGrabCursor: Yo,
    unsetGrabCursor: Xo
};
function $o(r, e) {
    e === void 0 && (e = this);
    function t(i) {
        if (!i || i === Qe() || i === K())
            return null;
        i.assignedSlot && (i = i.assignedSlot);
        const s = i.closest(r);
        return !s && !i.getRootNode ? null : s || t(i.getRootNode().host)
    }
    return t(e)
}
function fs(r, e, t) {
    const i = K()
        , { params: s } = r
        , n = s.edgeSwipeDetection
        , o = s.edgeSwipeThreshold;
    return n && (t <= o || t >= i.innerWidth - o) ? n === "prevent" ? (e.preventDefault(),
        !0) : !1 : !0
}
function Uo(r) {
    const e = this
        , t = Qe();
    let i = r;
    i.originalEvent && (i = i.originalEvent);
    const s = e.touchEventsData;
    if (i.type === "pointerdown") {
        if (s.pointerId !== null && s.pointerId !== i.pointerId)
            return;
        s.pointerId = i.pointerId
    } else
        i.type === "touchstart" && i.targetTouches.length === 1 && (s.touchId = i.targetTouches[0].identifier);
    if (i.type === "touchstart") {
        fs(e, i, i.targetTouches[0].pageX);
        return
    }
    const { params: n, touches: o, enabled: a } = e;
    if (!a || !n.simulateTouch && i.pointerType === "mouse" || e.animating && n.preventInteractionOnTransition)
        return;
    !e.animating && n.cssMode && n.loop && e.loopFix();
    let l = i.target;
    if (n.touchEventsTarget === "wrapper" && !eo(l, e.wrapperEl) || "which" in i && i.which === 3 || "button" in i && i.button > 0 || s.isTouched && s.isMoved)
        return;
    const d = !!n.noSwipingClass && n.noSwipingClass !== ""
        , u = i.composedPath ? i.composedPath() : i.path;
    d && i.target && i.target.shadowRoot && u && (l = u[0]);
    const f = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`
        , h = !!(i.target && i.target.shadowRoot);
    if (n.noSwiping && (h ? $o(f, l) : l.closest(f))) {
        e.allowClick = !0;
        return
    }
    if (n.swipeHandler && !l.closest(n.swipeHandler))
        return;
    o.currentX = i.pageX,
        o.currentY = i.pageY;
    const m = o.currentX
        , p = o.currentY;
    if (!fs(e, i, m))
        return;
    Object.assign(s, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0
    }),
        o.startX = m,
        o.startY = p,
        s.touchStartTime = Nt(),
        e.allowClick = !0,
        e.updateSize(),
        e.swipeDirection = void 0,
        n.threshold > 0 && (s.allowThresholdMove = !1);
    let c = !0;
    l.matches(s.focusableElements) && (c = !1,
        l.nodeName === "SELECT" && (s.isTouched = !1)),
        t.activeElement && t.activeElement.matches(s.focusableElements) && t.activeElement !== l && (i.pointerType === "mouse" || i.pointerType !== "mouse" && !l.matches(s.focusableElements)) && t.activeElement.blur();
    const g = c && e.allowTouchMove && n.touchStartPreventDefault;
    (n.touchStartForcePreventDefault || g) && !l.isContentEditable && i.preventDefault(),
        n.freeMode && n.freeMode.enabled && e.freeMode && e.animating && !n.cssMode && e.freeMode.onTouchStart(),
        e.emit("touchStart", i)
}
function jo(r) {
    const e = Qe()
        , t = this
        , i = t.touchEventsData
        , { params: s, touches: n, rtlTranslate: o, enabled: a } = t;
    if (!a || !s.simulateTouch && r.pointerType === "mouse")
        return;
    let l = r;
    if (l.originalEvent && (l = l.originalEvent),
        l.type === "pointermove" && (i.touchId !== null || l.pointerId !== i.pointerId))
        return;
    let d;
    if (l.type === "touchmove") {
        if (d = [...l.changedTouches].find(w => w.identifier === i.touchId),
            !d || d.identifier !== i.touchId)
            return
    } else
        d = l;
    if (!i.isTouched) {
        i.startMoving && i.isScrolling && t.emit("touchMoveOpposite", l);
        return
    }
    const u = d.pageX
        , f = d.pageY;
    if (l.preventedByNestedSwiper) {
        n.startX = u,
            n.startY = f;
        return
    }
    if (!t.allowTouchMove) {
        l.target.matches(i.focusableElements) || (t.allowClick = !1),
            i.isTouched && (Object.assign(n, {
                startX: u,
                startY: f,
                currentX: u,
                currentY: f
            }),
                i.touchStartTime = Nt());
        return
    }
    if (s.touchReleaseOnEdges && !s.loop)
        if (t.isVertical()) {
            if (f < n.startY && t.translate <= t.maxTranslate() || f > n.startY && t.translate >= t.minTranslate()) {
                i.isTouched = !1,
                    i.isMoved = !1;
                return
            }
        } else {
            if (o && (u > n.startX && -t.translate <= t.maxTranslate() || u < n.startX && -t.translate >= t.minTranslate()))
                return;
            if (!o && (u < n.startX && t.translate <= t.maxTranslate() || u > n.startX && t.translate >= t.minTranslate()))
                return
        }
    if (e.activeElement && e.activeElement.matches(i.focusableElements) && e.activeElement !== l.target && l.pointerType !== "mouse" && e.activeElement.blur(),
        e.activeElement && l.target === e.activeElement && l.target.matches(i.focusableElements)) {
        i.isMoved = !0,
            t.allowClick = !1;
        return
    }
    i.allowTouchCallbacks && t.emit("touchMove", l),
        n.previousX = n.currentX,
        n.previousY = n.currentY,
        n.currentX = u,
        n.currentY = f;
    const h = n.currentX - n.startX
        , m = n.currentY - n.startY;
    if (t.params.threshold && Math.sqrt(h ** 2 + m ** 2) < t.params.threshold)
        return;
    if (typeof i.isScrolling > "u") {
        let w;
        t.isHorizontal() && n.currentY === n.startY || t.isVertical() && n.currentX === n.startX ? i.isScrolling = !1 : h * h + m * m >= 25 && (w = Math.atan2(Math.abs(m), Math.abs(h)) * 180 / Math.PI,
            i.isScrolling = t.isHorizontal() ? w > s.touchAngle : 90 - w > s.touchAngle)
    }
    if (i.isScrolling && t.emit("touchMoveOpposite", l),
        typeof i.startMoving > "u" && (n.currentX !== n.startX || n.currentY !== n.startY) && (i.startMoving = !0),
        i.isScrolling || l.type === "touchmove" && i.preventTouchMoveFromPointerMove) {
        i.isTouched = !1;
        return
    }
    if (!i.startMoving)
        return;
    t.allowClick = !1,
        !s.cssMode && l.cancelable && l.preventDefault(),
        s.touchMoveStopPropagation && !s.nested && l.stopPropagation();
    let p = t.isHorizontal() ? h : m
        , c = t.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
    s.oneWayMovement && (p = Math.abs(p) * (o ? 1 : -1),
        c = Math.abs(c) * (o ? 1 : -1)),
        n.diff = p,
        p *= s.touchRatio,
        o && (p = -p,
            c = -c);
    const g = t.touchesDirection;
    t.swipeDirection = p > 0 ? "prev" : "next",
        t.touchesDirection = c > 0 ? "prev" : "next";
    const _ = t.params.loop && !s.cssMode
        , v = t.touchesDirection === "next" && t.allowSlideNext || t.touchesDirection === "prev" && t.allowSlidePrev;
    if (!i.isMoved) {
        if (_ && v && t.loopFix({
            direction: t.swipeDirection
        }),
            i.startTranslate = t.getTranslate(),
            t.setTransition(0),
            t.animating) {
            const w = new window.CustomEvent("transitionend", {
                bubbles: !0,
                cancelable: !0,
                detail: {
                    bySwiperTouchMove: !0
                }
            });
            t.wrapperEl.dispatchEvent(w)
        }
        i.allowMomentumBounce = !1,
            s.grabCursor && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!0),
            t.emit("sliderFirstMove", l)
    }
    if (new Date().getTime(),
        s._loopSwapReset !== !1 && i.isMoved && i.allowThresholdMove && g !== t.touchesDirection && _ && v && Math.abs(p) >= 1) {
        Object.assign(n, {
            startX: u,
            startY: f,
            currentX: u,
            currentY: f,
            startTranslate: i.currentTranslate
        }),
            i.loopSwapReset = !0,
            i.startTranslate = i.currentTranslate;
        return
    }
    t.emit("sliderMove", l),
        i.isMoved = !0,
        i.currentTranslate = p + i.startTranslate;
    let y = !0
        , S = s.resistanceRatio;
    if (s.touchReleaseOnEdges && (S = 0),
        p > 0 ? (_ && v && i.allowThresholdMove && i.currentTranslate > (s.centeredSlides ? t.minTranslate() - t.slidesSizesGrid[t.activeIndex + 1] - (s.slidesPerView !== "auto" && t.slides.length - s.slidesPerView >= 2 ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween : 0) - t.params.spaceBetween : t.minTranslate()) && t.loopFix({
            direction: "prev",
            setTranslate: !0,
            activeSlideIndex: 0
        }),
            i.currentTranslate > t.minTranslate() && (y = !1,
                s.resistance && (i.currentTranslate = t.minTranslate() - 1 + (-t.minTranslate() + i.startTranslate + p) ** S))) : p < 0 && (_ && v && i.allowThresholdMove && i.currentTranslate < (s.centeredSlides ? t.maxTranslate() + t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween + (s.slidesPerView !== "auto" && t.slides.length - s.slidesPerView >= 2 ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween : 0) : t.maxTranslate()) && t.loopFix({
                    direction: "next",
                    setTranslate: !0,
                    activeSlideIndex: t.slides.length - (s.slidesPerView === "auto" ? t.slidesPerViewDynamic() : Math.ceil(parseFloat(s.slidesPerView, 10)))
                }),
                    i.currentTranslate < t.maxTranslate() && (y = !1,
                        s.resistance && (i.currentTranslate = t.maxTranslate() + 1 - (t.maxTranslate() - i.startTranslate - p) ** S))),
        y && (l.preventedByNestedSwiper = !0),
        !t.allowSlideNext && t.swipeDirection === "next" && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate),
        !t.allowSlidePrev && t.swipeDirection === "prev" && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate),
        !t.allowSlidePrev && !t.allowSlideNext && (i.currentTranslate = i.startTranslate),
        s.threshold > 0)
        if (Math.abs(p) > s.threshold || i.allowThresholdMove) {
            if (!i.allowThresholdMove) {
                i.allowThresholdMove = !0,
                    n.startX = n.currentX,
                    n.startY = n.currentY,
                    i.currentTranslate = i.startTranslate,
                    n.diff = t.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY;
                return
            }
        } else {
            i.currentTranslate = i.startTranslate;
            return
        }
    !s.followFinger || s.cssMode || ((s.freeMode && s.freeMode.enabled && t.freeMode || s.watchSlidesProgress) && (t.updateActiveIndex(),
        t.updateSlidesClasses()),
        s.freeMode && s.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(),
        t.updateProgress(i.currentTranslate),
        t.setTranslate(i.currentTranslate))
}
function Ko(r) {
    const e = this
        , t = e.touchEventsData;
    let i = r;
    i.originalEvent && (i = i.originalEvent);
    let s;
    if (i.type === "touchend" || i.type === "touchcancel") {
        if (s = [...i.changedTouches].find(w => w.identifier === t.touchId),
            !s || s.identifier !== t.touchId)
            return
    } else {
        if (t.touchId !== null || i.pointerId !== t.pointerId)
            return;
        s = i
    }
    if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(i.type) && !(["pointercancel", "contextmenu"].includes(i.type) && (e.browser.isSafari || e.browser.isWebView)))
        return;
    t.pointerId = null,
        t.touchId = null;
    const { params: o, touches: a, rtlTranslate: l, slidesGrid: d, enabled: u } = e;
    if (!u || !o.simulateTouch && i.pointerType === "mouse")
        return;
    if (t.allowTouchCallbacks && e.emit("touchEnd", i),
        t.allowTouchCallbacks = !1,
        !t.isTouched) {
        t.isMoved && o.grabCursor && e.setGrabCursor(!1),
            t.isMoved = !1,
            t.startMoving = !1;
        return
    }
    o.grabCursor && t.isMoved && t.isTouched && (e.allowSlideNext === !0 || e.allowSlidePrev === !0) && e.setGrabCursor(!1);
    const f = Nt()
        , h = f - t.touchStartTime;
    if (e.allowClick) {
        const w = i.path || i.composedPath && i.composedPath();
        e.updateClickedSlide(w && w[0] || i.target, w),
            e.emit("tap click", i),
            h < 300 && f - t.lastClickTime < 300 && e.emit("doubleTap doubleClick", i)
    }
    if (t.lastClickTime = Nt(),
        yi(() => {
            e.destroyed || (e.allowClick = !0)
        }
        ),
        !t.isTouched || !t.isMoved || !e.swipeDirection || a.diff === 0 && !t.loopSwapReset || t.currentTranslate === t.startTranslate && !t.loopSwapReset) {
        t.isTouched = !1,
            t.isMoved = !1,
            t.startMoving = !1;
        return
    }
    t.isTouched = !1,
        t.isMoved = !1,
        t.startMoving = !1;
    let m;
    if (o.followFinger ? m = l ? e.translate : -e.translate : m = -t.currentTranslate,
        o.cssMode)
        return;
    if (o.freeMode && o.freeMode.enabled) {
        e.freeMode.onTouchEnd({
            currentPos: m
        });
        return
    }
    const p = m >= -e.maxTranslate() && !e.params.loop;
    let c = 0
        , g = e.slidesSizesGrid[0];
    for (let w = 0; w < d.length; w += w < o.slidesPerGroupSkip ? 1 : o.slidesPerGroup) {
        const x = w < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
        typeof d[w + x] < "u" ? (p || m >= d[w] && m < d[w + x]) && (c = w,
            g = d[w + x] - d[w]) : (p || m >= d[w]) && (c = w,
                g = d[d.length - 1] - d[d.length - 2])
    }
    let _ = null
        , v = null;
    o.rewind && (e.isBeginning ? v = o.virtual && o.virtual.enabled && e.virtual ? e.virtual.slides.length - 1 : e.slides.length - 1 : e.isEnd && (_ = 0));
    const y = (m - d[c]) / g
        , S = c < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
    if (h > o.longSwipesMs) {
        if (!o.longSwipes) {
            e.slideTo(e.activeIndex);
            return
        }
        e.swipeDirection === "next" && (y >= o.longSwipesRatio ? e.slideTo(o.rewind && e.isEnd ? _ : c + S) : e.slideTo(c)),
            e.swipeDirection === "prev" && (y > 1 - o.longSwipesRatio ? e.slideTo(c + S) : v !== null && y < 0 && Math.abs(y) > o.longSwipesRatio ? e.slideTo(v) : e.slideTo(c))
    } else {
        if (!o.shortSwipes) {
            e.slideTo(e.activeIndex);
            return
        }
        e.navigation && (i.target === e.navigation.nextEl || i.target === e.navigation.prevEl) ? i.target === e.navigation.nextEl ? e.slideTo(c + S) : e.slideTo(c) : (e.swipeDirection === "next" && e.slideTo(_ !== null ? _ : c + S),
            e.swipeDirection === "prev" && e.slideTo(v !== null ? v : c))
    }
}
function cs() {
    const r = this
        , { params: e, el: t } = r;
    if (t && t.offsetWidth === 0)
        return;
    e.breakpoints && r.setBreakpoint();
    const { allowSlideNext: i, allowSlidePrev: s, snapGrid: n } = r
        , o = r.virtual && r.params.virtual.enabled;
    r.allowSlideNext = !0,
        r.allowSlidePrev = !0,
        r.updateSize(),
        r.updateSlides(),
        r.updateSlidesClasses();
    const a = o && e.loop;
    (e.slidesPerView === "auto" || e.slidesPerView > 1) && r.isEnd && !r.isBeginning && !r.params.centeredSlides && !a ? r.slideTo(r.slides.length - 1, 0, !1, !0) : r.params.loop && !o ? r.slideToLoop(r.realIndex, 0, !1, !0) : r.slideTo(r.activeIndex, 0, !1, !0),
        r.autoplay && r.autoplay.running && r.autoplay.paused && (clearTimeout(r.autoplay.resizeTimeout),
            r.autoplay.resizeTimeout = setTimeout(() => {
                r.autoplay && r.autoplay.running && r.autoplay.paused && r.autoplay.resume()
            }
                , 500)),
        r.allowSlidePrev = s,
        r.allowSlideNext = i,
        r.params.watchOverflow && n !== r.snapGrid && r.checkOverflow()
}
function Qo(r) {
    const e = this;
    e.enabled && (e.allowClick || (e.params.preventClicks && r.preventDefault(),
        e.params.preventClicksPropagation && e.animating && (r.stopPropagation(),
            r.stopImmediatePropagation())))
}
function Zo() {
    const r = this
        , { wrapperEl: e, rtlTranslate: t, enabled: i } = r;
    if (!i)
        return;
    r.previousTranslate = r.translate,
        r.isHorizontal() ? r.translate = -e.scrollLeft : r.translate = -e.scrollTop,
        r.translate === 0 && (r.translate = 0),
        r.updateActiveIndex(),
        r.updateSlidesClasses();
    let s;
    const n = r.maxTranslate() - r.minTranslate();
    n === 0 ? s = 0 : s = (r.translate - r.minTranslate()) / n,
        s !== r.progress && r.updateProgress(t ? -r.translate : r.translate),
        r.emit("setTranslate", r.translate, !1)
}
function Jo(r) {
    const e = this;
    kt(e, r.target),
        !(e.params.cssMode || e.params.slidesPerView !== "auto" && !e.params.autoHeight) && e.update()
}
function ea() {
    const r = this;
    r.documentTouchHandlerProceeded || (r.documentTouchHandlerProceeded = !0,
        r.params.touchReleaseOnEdges && (r.el.style.touchAction = "auto"))
}
const Tr = (r, e) => {
    const t = Qe()
        , { params: i, el: s, wrapperEl: n, device: o } = r
        , a = !!i.nested
        , l = e === "on" ? "addEventListener" : "removeEventListener"
        , d = e;
    !s || typeof s == "string" || (t[l]("touchstart", r.onDocumentTouchStart, {
        passive: !1,
        capture: a
    }),
        s[l]("touchstart", r.onTouchStart, {
            passive: !1
        }),
        s[l]("pointerdown", r.onTouchStart, {
            passive: !1
        }),
        t[l]("touchmove", r.onTouchMove, {
            passive: !1,
            capture: a
        }),
        t[l]("pointermove", r.onTouchMove, {
            passive: !1,
            capture: a
        }),
        t[l]("touchend", r.onTouchEnd, {
            passive: !0
        }),
        t[l]("pointerup", r.onTouchEnd, {
            passive: !0
        }),
        t[l]("pointercancel", r.onTouchEnd, {
            passive: !0
        }),
        t[l]("touchcancel", r.onTouchEnd, {
            passive: !0
        }),
        t[l]("pointerout", r.onTouchEnd, {
            passive: !0
        }),
        t[l]("pointerleave", r.onTouchEnd, {
            passive: !0
        }),
        t[l]("contextmenu", r.onTouchEnd, {
            passive: !0
        }),
        (i.preventClicks || i.preventClicksPropagation) && s[l]("click", r.onClick, !0),
        i.cssMode && n[l]("scroll", r.onScroll),
        i.updateOnWindowResize ? r[d](o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", cs, !0) : r[d]("observerUpdate", cs, !0),
        s[l]("load", r.onLoad, {
            capture: !0
        }))
}
    ;
function ta() {
    const r = this
        , { params: e } = r;
    r.onTouchStart = Uo.bind(r),
        r.onTouchMove = jo.bind(r),
        r.onTouchEnd = Ko.bind(r),
        r.onDocumentTouchStart = ea.bind(r),
        e.cssMode && (r.onScroll = Zo.bind(r)),
        r.onClick = Qo.bind(r),
        r.onLoad = Jo.bind(r),
        Tr(r, "on")
}
function ia() {
    Tr(this, "off")
}
var sa = {
    attachEvents: ta,
    detachEvents: ia
};
const hs = (r, e) => r.grid && e.grid && e.grid.rows > 1;
function ra() {
    const r = this
        , { realIndex: e, initialized: t, params: i, el: s } = r
        , n = i.breakpoints;
    if (!n || n && Object.keys(n).length === 0)
        return;
    const o = Qe()
        , a = i.breakpointsBase === "window" || !i.breakpointsBase ? i.breakpointsBase : "container"
        , l = ["window", "container"].includes(i.breakpointsBase) || !i.breakpointsBase ? r.el : o.querySelector(i.breakpointsBase)
        , d = r.getBreakpoint(n, a, l);
    if (!d || r.currentBreakpoint === d)
        return;
    const f = (d in n ? n[d] : void 0) || r.originalParams
        , h = hs(r, i)
        , m = hs(r, f)
        , p = r.params.grabCursor
        , c = f.grabCursor
        , g = i.enabled;
    h && !m ? (s.classList.remove(`${i.containerModifierClass}grid`, `${i.containerModifierClass}grid-column`),
        r.emitContainerClasses()) : !h && m && (s.classList.add(`${i.containerModifierClass}grid`),
            (f.grid.fill && f.grid.fill === "column" || !f.grid.fill && i.grid.fill === "column") && s.classList.add(`${i.containerModifierClass}grid-column`),
            r.emitContainerClasses()),
        p && !c ? r.unsetGrabCursor() : !p && c && r.setGrabCursor(),
        ["navigation", "pagination", "scrollbar"].forEach(x => {
            if (typeof f[x] > "u")
                return;
            const T = i[x] && i[x].enabled
                , b = f[x] && f[x].enabled;
            T && !b && r[x].disable(),
                !T && b && r[x].enable()
        }
        );
    const _ = f.direction && f.direction !== i.direction
        , v = i.loop && (f.slidesPerView !== i.slidesPerView || _)
        , y = i.loop;
    _ && t && r.changeDirection(),
        re(r.params, f);
    const S = r.params.enabled
        , w = r.params.loop;
    Object.assign(r, {
        allowTouchMove: r.params.allowTouchMove,
        allowSlideNext: r.params.allowSlideNext,
        allowSlidePrev: r.params.allowSlidePrev
    }),
        g && !S ? r.disable() : !g && S && r.enable(),
        r.currentBreakpoint = d,
        r.emit("_beforeBreakpoint", f),
        t && (v ? (r.loopDestroy(),
            r.loopCreate(e),
            r.updateSlides()) : !y && w ? (r.loopCreate(e),
                r.updateSlides()) : y && !w && r.loopDestroy()),
        r.emit("breakpoint", f)
}
function na(r, e, t) {
    if (e === void 0 && (e = "window"),
        !r || e === "container" && !t)
        return;
    let i = !1;
    const s = K()
        , n = e === "window" ? s.innerHeight : t.clientHeight
        , o = Object.keys(r).map(a => {
            if (typeof a == "string" && a.indexOf("@") === 0) {
                const l = parseFloat(a.substr(1));
                return {
                    value: n * l,
                    point: a
                }
            }
            return {
                value: a,
                point: a
            }
        }
        );
    o.sort((a, l) => parseInt(a.value, 10) - parseInt(l.value, 10));
    for (let a = 0; a < o.length; a += 1) {
        const { point: l, value: d } = o[a];
        e === "window" ? s.matchMedia(`(min-width: ${d}px)`).matches && (i = l) : d <= t.clientWidth && (i = l)
    }
    return i || "max"
}
var oa = {
    setBreakpoint: ra,
    getBreakpoint: na
};
function aa(r, e) {
    const t = [];
    return r.forEach(i => {
        typeof i == "object" ? Object.keys(i).forEach(s => {
            i[s] && t.push(e + s)
        }
        ) : typeof i == "string" && t.push(e + i)
    }
    ),
        t
}
function la() {
    const r = this
        , { classNames: e, params: t, rtl: i, el: s, device: n } = r
        , o = aa(["initialized", t.direction, {
            "free-mode": r.params.freeMode && t.freeMode.enabled
        }, {
                autoheight: t.autoHeight
            }, {
                rtl: i
            }, {
                grid: t.grid && t.grid.rows > 1
            }, {
                "grid-column": t.grid && t.grid.rows > 1 && t.grid.fill === "column"
            }, {
                android: n.android
            }, {
                ios: n.ios
            }, {
                "css-mode": t.cssMode
            }, {
                centered: t.cssMode && t.centeredSlides
            }, {
                "watch-progress": t.watchSlidesProgress
            }], t.containerModifierClass);
    e.push(...o),
        s.classList.add(...e),
        r.emitContainerClasses()
}
function da() {
    const r = this
        , { el: e, classNames: t } = r;
    !e || typeof e == "string" || (e.classList.remove(...t),
        r.emitContainerClasses())
}
var ua = {
    addClasses: la,
    removeClasses: da
};
function fa() {
    const r = this
        , { isLocked: e, params: t } = r
        , { slidesOffsetBefore: i } = t;
    if (i) {
        const s = r.slides.length - 1
            , n = r.slidesGrid[s] + r.slidesSizesGrid[s] + i * 2;
        r.isLocked = r.size > n
    } else
        r.isLocked = r.snapGrid.length === 1;
    t.allowSlideNext === !0 && (r.allowSlideNext = !r.isLocked),
        t.allowSlidePrev === !0 && (r.allowSlidePrev = !r.isLocked),
        e && e !== r.isLocked && (r.isEnd = !1),
        e !== r.isLocked && r.emit(r.isLocked ? "lock" : "unlock")
}
var ca = {
    checkOverflow: fa
}
    , ps = {
        init: !0,
        direction: "horizontal",
        oneWayMovement: !1,
        swiperElementNodeName: "SWIPER-CONTAINER",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        eventsPrefix: "swiper",
        enabled: !0,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 5,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        loop: !1,
        loopAddBlankSlides: !0,
        loopAdditionalSlides: 0,
        loopPreventsSliding: !0,
        rewind: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-blank",
        slideActiveClass: "swiper-slide-active",
        slideVisibleClass: "swiper-slide-visible",
        slideFullyVisibleClass: "swiper-slide-fully-visible",
        slideNextClass: "swiper-slide-next",
        slidePrevClass: "swiper-slide-prev",
        wrapperClass: "swiper-wrapper",
        lazyPreloaderClass: "swiper-lazy-preloader",
        lazyPreloadPrevNext: 0,
        runCallbacksOnInit: !0,
        _emitClasses: !1
    };
function ha(r, e) {
    return function (i) {
        i === void 0 && (i = {});
        const s = Object.keys(i)[0]
            , n = i[s];
        if (typeof n != "object" || n === null) {
            re(e, i);
            return
        }
        if (r[s] === !0 && (r[s] = {
            enabled: !0
        }),
            s === "navigation" && r[s] && r[s].enabled && !r[s].prevEl && !r[s].nextEl && (r[s].auto = !0),
            ["pagination", "scrollbar"].indexOf(s) >= 0 && r[s] && r[s].enabled && !r[s].el && (r[s].auto = !0),
            !(s in r && "enabled" in n)) {
            re(e, i);
            return
        }
        typeof r[s] == "object" && !("enabled" in r[s]) && (r[s].enabled = !0),
            r[s] || (r[s] = {
                enabled: !1
            }),
            re(e, i)
    }
}
const si = {
    eventsEmitter: uo,
    update: So,
    translate: Mo,
    transition: Lo,
    slide: Vo,
    loop: Ho,
    grabCursor: qo,
    events: sa,
    breakpoints: oa,
    checkOverflow: ca,
    classes: ua
}
    , ri = {};
class fe {
    constructor() {
        let e, t;
        for (var i = arguments.length, s = new Array(i), n = 0; n < i; n++)
            s[n] = arguments[n];
        s.length === 1 && s[0].constructor && Object.prototype.toString.call(s[0]).slice(8, -1) === "Object" ? t = s[0] : [e, t] = s,
            t || (t = {}),
            t = re({}, t),
            e && !t.el && (t.el = e);
        const o = Qe();
        if (t.el && typeof t.el == "string" && o.querySelectorAll(t.el).length > 1) {
            const u = [];
            return o.querySelectorAll(t.el).forEach(f => {
                const h = re({}, t, {
                    el: f
                });
                u.push(new fe(h))
            }
            ),
                u
        }
        const a = this;
        a.__swiper__ = !0,
            a.support = vr(),
            a.device = wr({
                userAgent: t.userAgent
            }),
            a.browser = yr(),
            a.eventsListeners = {},
            a.eventsAnyListeners = [],
            a.modules = [...a.__modules__],
            t.modules && Array.isArray(t.modules) && a.modules.push(...t.modules);
        const l = {};
        a.modules.forEach(u => {
            u({
                params: t,
                swiper: a,
                extendParams: ha(t, l),
                on: a.on.bind(a),
                once: a.once.bind(a),
                off: a.off.bind(a),
                emit: a.emit.bind(a)
            })
        }
        );
        const d = re({}, ps, l);
        return a.params = re({}, d, ri, t),
            a.originalParams = re({}, a.params),
            a.passedParams = re({}, t),
            a.params && a.params.on && Object.keys(a.params.on).forEach(u => {
                a.on(u, a.params.on[u])
            }
            ),
            a.params && a.params.onAny && a.onAny(a.params.onAny),
            Object.assign(a, {
                enabled: a.params.enabled,
                el: e,
                classNames: [],
                slides: [],
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal() {
                    return a.params.direction === "horizontal"
                },
                isVertical() {
                    return a.params.direction === "vertical"
                },
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                cssOverflowAdjustment() {
                    return Math.trunc(this.translate / 2 ** 23) * 2 ** 23
                },
                allowSlideNext: a.params.allowSlideNext,
                allowSlidePrev: a.params.allowSlidePrev,
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: a.params.focusableElements,
                    lastClickTime: 0,
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    startMoving: void 0,
                    pointerId: null,
                    touchId: null
                },
                allowClick: !0,
                allowTouchMove: a.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            }),
            a.emit("_swiper"),
            a.params.init && a.init(),
            a
    }
    getDirectionLabel(e) {
        return this.isHorizontal() ? e : {
            width: "height",
            "margin-top": "margin-left",
            "margin-bottom ": "margin-right",
            "margin-left": "margin-top",
            "margin-right": "margin-bottom",
            "padding-left": "padding-top",
            "padding-right": "padding-bottom",
            marginRight: "marginBottom"
        }[e]
    }
    getSlideIndex(e) {
        const { slidesEl: t, params: i } = this
            , s = _e(t, `.${i.slideClass}, swiper-slide`)
            , n = ls(s[0]);
        return ls(e) - n
    }
    getSlideIndexByData(e) {
        return this.getSlideIndex(this.slides.find(t => t.getAttribute("data-swiper-slide-index") * 1 === e))
    }
    recalcSlides() {
        const e = this
            , { slidesEl: t, params: i } = e;
        e.slides = _e(t, `.${i.slideClass}, swiper-slide`)
    }
    enable() {
        const e = this;
        e.enabled || (e.enabled = !0,
            e.params.grabCursor && e.setGrabCursor(),
            e.emit("enable"))
    }
    disable() {
        const e = this;
        e.enabled && (e.enabled = !1,
            e.params.grabCursor && e.unsetGrabCursor(),
            e.emit("disable"))
    }
    setProgress(e, t) {
        const i = this;
        e = Math.min(Math.max(e, 0), 1);
        const s = i.minTranslate()
            , o = (i.maxTranslate() - s) * e + s;
        i.translateTo(o, typeof t > "u" ? 0 : t),
            i.updateActiveIndex(),
            i.updateSlidesClasses()
    }
    emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el)
            return;
        const t = e.el.className.split(" ").filter(i => i.indexOf("swiper") === 0 || i.indexOf(e.params.containerModifierClass) === 0);
        e.emit("_containerClasses", t.join(" "))
    }
    getSlideClasses(e) {
        const t = this;
        return t.destroyed ? "" : e.className.split(" ").filter(i => i.indexOf("swiper-slide") === 0 || i.indexOf(t.params.slideClass) === 0).join(" ")
    }
    emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el)
            return;
        const t = [];
        e.slides.forEach(i => {
            const s = e.getSlideClasses(i);
            t.push({
                slideEl: i,
                classNames: s
            }),
                e.emit("_slideClass", i, s)
        }
        ),
            e.emit("_slideClasses", t)
    }
    slidesPerViewDynamic(e, t) {
        e === void 0 && (e = "current"),
            t === void 0 && (t = !1);
        const i = this
            , { params: s, slides: n, slidesGrid: o, slidesSizesGrid: a, size: l, activeIndex: d } = i;
        let u = 1;
        if (typeof s.slidesPerView == "number")
            return s.slidesPerView;
        if (s.centeredSlides) {
            let f = n[d] ? Math.ceil(n[d].swiperSlideSize) : 0, h;
            for (let m = d + 1; m < n.length; m += 1)
                n[m] && !h && (f += Math.ceil(n[m].swiperSlideSize),
                    u += 1,
                    f > l && (h = !0));
            for (let m = d - 1; m >= 0; m -= 1)
                n[m] && !h && (f += n[m].swiperSlideSize,
                    u += 1,
                    f > l && (h = !0))
        } else if (e === "current")
            for (let f = d + 1; f < n.length; f += 1)
                (t ? o[f] + a[f] - o[d] < l : o[f] - o[d] < l) && (u += 1);
        else
            for (let f = d - 1; f >= 0; f -= 1)
                o[d] - o[f] < l && (u += 1);
        return u
    }
    update() {
        const e = this;
        if (!e || e.destroyed)
            return;
        const { snapGrid: t, params: i } = e;
        i.breakpoints && e.setBreakpoint(),
            [...e.el.querySelectorAll('[loading="lazy"]')].forEach(o => {
                o.complete && kt(e, o)
            }
            ),
            e.updateSize(),
            e.updateSlides(),
            e.updateProgress(),
            e.updateSlidesClasses();
        function s() {
            const o = e.rtlTranslate ? e.translate * -1 : e.translate
                , a = Math.min(Math.max(o, e.maxTranslate()), e.minTranslate());
            e.setTranslate(a),
                e.updateActiveIndex(),
                e.updateSlidesClasses()
        }
        let n;
        if (i.freeMode && i.freeMode.enabled && !i.cssMode)
            s(),
                i.autoHeight && e.updateAutoHeight();
        else {
            if ((i.slidesPerView === "auto" || i.slidesPerView > 1) && e.isEnd && !i.centeredSlides) {
                const o = e.virtual && i.virtual.enabled ? e.virtual.slides : e.slides;
                n = e.slideTo(o.length - 1, 0, !1, !0)
            } else
                n = e.slideTo(e.activeIndex, 0, !1, !0);
            n || s()
        }
        i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
            e.emit("update")
    }
    changeDirection(e, t) {
        t === void 0 && (t = !0);
        const i = this
            , s = i.params.direction;
        return e || (e = s === "horizontal" ? "vertical" : "horizontal"),
            e === s || e !== "horizontal" && e !== "vertical" || (i.el.classList.remove(`${i.params.containerModifierClass}${s}`),
                i.el.classList.add(`${i.params.containerModifierClass}${e}`),
                i.emitContainerClasses(),
                i.params.direction = e,
                i.slides.forEach(n => {
                    e === "vertical" ? n.style.width = "" : n.style.height = ""
                }
                ),
                i.emit("changeDirection"),
                t && i.update()),
            i
    }
    changeLanguageDirection(e) {
        const t = this;
        t.rtl && e === "rtl" || !t.rtl && e === "ltr" || (t.rtl = e === "rtl",
            t.rtlTranslate = t.params.direction === "horizontal" && t.rtl,
            t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
                t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
                    t.el.dir = "ltr"),
            t.update())
    }
    mount(e) {
        const t = this;
        if (t.mounted)
            return !0;
        let i = e || t.params.el;
        if (typeof i == "string" && (i = document.querySelector(i)),
            !i)
            return !1;
        i.swiper = t,
            i.parentNode && i.parentNode.host && i.parentNode.host.nodeName === t.params.swiperElementNodeName.toUpperCase() && (t.isElement = !0);
        const s = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let o = i && i.shadowRoot && i.shadowRoot.querySelector ? i.shadowRoot.querySelector(s()) : _e(i, s())[0];
        return !o && t.params.createElements && (o = Gt("div", t.params.wrapperClass),
            i.append(o),
            _e(i, `.${t.params.slideClass}`).forEach(a => {
                o.append(a)
            }
            )),
            Object.assign(t, {
                el: i,
                wrapperEl: o,
                slidesEl: t.isElement && !i.parentNode.host.slideSlots ? i.parentNode.host : o,
                hostEl: t.isElement ? i.parentNode.host : i,
                mounted: !0,
                rtl: i.dir.toLowerCase() === "rtl" || ze(i, "direction") === "rtl",
                rtlTranslate: t.params.direction === "horizontal" && (i.dir.toLowerCase() === "rtl" || ze(i, "direction") === "rtl"),
                wrongRTL: ze(o, "display") === "-webkit-box"
            }),
            !0
    }
    init(e) {
        const t = this;
        if (t.initialized || t.mount(e) === !1)
            return t;
        t.emit("beforeInit"),
            t.params.breakpoints && t.setBreakpoint(),
            t.addClasses(),
            t.updateSize(),
            t.updateSlides(),
            t.params.watchOverflow && t.checkOverflow(),
            t.params.grabCursor && t.enabled && t.setGrabCursor(),
            t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0),
            t.params.loop && t.loopCreate(void 0, !0),
            t.attachEvents();
        const s = [...t.el.querySelectorAll('[loading="lazy"]')];
        return t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
            s.forEach(n => {
                n.complete ? kt(t, n) : n.addEventListener("load", o => {
                    kt(t, o.target)
                }
                )
            }
            ),
            Si(t),
            t.initialized = !0,
            Si(t),
            t.emit("init"),
            t.emit("afterInit"),
            t
    }
    destroy(e, t) {
        e === void 0 && (e = !0),
            t === void 0 && (t = !0);
        const i = this
            , { params: s, el: n, wrapperEl: o, slides: a } = i;
        return typeof i.params > "u" || i.destroyed || (i.emit("beforeDestroy"),
            i.initialized = !1,
            i.detachEvents(),
            s.loop && i.loopDestroy(),
            t && (i.removeClasses(),
                n && typeof n != "string" && n.removeAttribute("style"),
                o && o.removeAttribute("style"),
                a && a.length && a.forEach(l => {
                    l.classList.remove(s.slideVisibleClass, s.slideFullyVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass),
                        l.removeAttribute("style"),
                        l.removeAttribute("data-swiper-slide-index")
                }
                )),
            i.emit("destroy"),
            Object.keys(i.eventsListeners).forEach(l => {
                i.off(l)
            }
            ),
            e !== !1 && (i.el && typeof i.el != "string" && (i.el.swiper = null),
                jn(i)),
            i.destroyed = !0),
            null
    }
    static extendDefaults(e) {
        re(ri, e)
    }
    static get extendedDefaults() {
        return ri
    }
    static get defaults() {
        return ps
    }
    static installModule(e) {
        fe.prototype.__modules__ || (fe.prototype.__modules__ = []);
        const t = fe.prototype.__modules__;
        typeof e == "function" && t.indexOf(e) < 0 && t.push(e)
    }
    static use(e) {
        return Array.isArray(e) ? (e.forEach(t => fe.installModule(t)),
            fe) : (fe.installModule(e),
                fe)
    }
}
Object.keys(si).forEach(r => {
    Object.keys(si[r]).forEach(e => {
        fe.prototype[e] = si[r][e]
    }
    )
}
);
fe.use([ao, lo]);
function pa(r, e, t, i) {
    return r.params.createElements && Object.keys(i).forEach(s => {
        if (!t[s] && t.auto === !0) {
            let n = _e(r.el, `.${i[s]}`)[0];
            n || (n = Gt("div", i[s]),
                n.className = i[s],
                r.el.append(n)),
                t[s] = n,
                e[s] = n
        }
    }
    ),
        t
}
function ma(r) {
    let { swiper: e, extendParams: t, on: i, emit: s } = r;
    t({
        navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
            navigationDisabledClass: "swiper-navigation-disabled"
        }
    }),
        e.navigation = {
            nextEl: null,
            prevEl: null
        };
    function n(p) {
        let c;
        return p && typeof p == "string" && e.isElement && (c = e.el.querySelector(p) || e.hostEl.querySelector(p),
            c) ? c : (p && (typeof p == "string" && (c = [...document.querySelectorAll(p)]),
                e.params.uniqueNavElements && typeof p == "string" && c && c.length > 1 && e.el.querySelectorAll(p).length === 1 ? c = e.el.querySelector(p) : c && c.length === 1 && (c = c[0])),
                p && !c ? p : c)
    }
    function o(p, c) {
        const g = e.params.navigation;
        p = Te(p),
            p.forEach(_ => {
                _ && (_.classList[c ? "add" : "remove"](...g.disabledClass.split(" ")),
                    _.tagName === "BUTTON" && (_.disabled = c),
                    e.params.watchOverflow && e.enabled && _.classList[e.isLocked ? "add" : "remove"](g.lockClass))
            }
            )
    }
    function a() {
        const { nextEl: p, prevEl: c } = e.navigation;
        if (e.params.loop) {
            o(c, !1),
                o(p, !1);
            return
        }
        o(c, e.isBeginning && !e.params.rewind),
            o(p, e.isEnd && !e.params.rewind)
    }
    function l(p) {
        p.preventDefault(),
            !(e.isBeginning && !e.params.loop && !e.params.rewind) && (e.slidePrev(),
                s("navigationPrev"))
    }
    function d(p) {
        p.preventDefault(),
            !(e.isEnd && !e.params.loop && !e.params.rewind) && (e.slideNext(),
                s("navigationNext"))
    }
    function u() {
        const p = e.params.navigation;
        if (e.params.navigation = pa(e, e.originalParams.navigation, e.params.navigation, {
            nextEl: "swiper-button-next",
            prevEl: "swiper-button-prev"
        }),
            !(p.nextEl || p.prevEl))
            return;
        let c = n(p.nextEl)
            , g = n(p.prevEl);
        Object.assign(e.navigation, {
            nextEl: c,
            prevEl: g
        }),
            c = Te(c),
            g = Te(g);
        const _ = (v, y) => {
            v && v.addEventListener("click", y === "next" ? d : l),
                !e.enabled && v && v.classList.add(...p.lockClass.split(" "))
        }
            ;
        c.forEach(v => _(v, "next")),
            g.forEach(v => _(v, "prev"))
    }
    function f() {
        let { nextEl: p, prevEl: c } = e.navigation;
        p = Te(p),
            c = Te(c);
        const g = (_, v) => {
            _.removeEventListener("click", v === "next" ? d : l),
                _.classList.remove(...e.params.navigation.disabledClass.split(" "))
        }
            ;
        p.forEach(_ => g(_, "next")),
            c.forEach(_ => g(_, "prev"))
    }
    i("init", () => {
        e.params.navigation.enabled === !1 ? m() : (u(),
            a())
    }
    ),
        i("toEdge fromEdge lock unlock", () => {
            a()
        }
        ),
        i("destroy", () => {
            f()
        }
        ),
        i("enable disable", () => {
            let { nextEl: p, prevEl: c } = e.navigation;
            if (p = Te(p),
                c = Te(c),
                e.enabled) {
                a();
                return
            }
            [...p, ...c].filter(g => !!g).forEach(g => g.classList.add(e.params.navigation.lockClass))
        }
        ),
        i("click", (p, c) => {
            let { nextEl: g, prevEl: _ } = e.navigation;
            g = Te(g),
                _ = Te(_);
            const v = c.target;
            let y = _.includes(v) || g.includes(v);
            if (e.isElement && !y) {
                const S = c.path || c.composedPath && c.composedPath();
                S && (y = S.find(w => g.includes(w) || _.includes(w)))
            }
            if (e.params.navigation.hideOnClick && !y) {
                if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === v || e.pagination.el.contains(v)))
                    return;
                let S;
                g.length ? S = g[0].classList.contains(e.params.navigation.hiddenClass) : _.length && (S = _[0].classList.contains(e.params.navigation.hiddenClass)),
                    s(S === !0 ? "navigationShow" : "navigationHide"),
                    [...g, ..._].filter(w => !!w).forEach(w => w.classList.toggle(e.params.navigation.hiddenClass))
            }
        }
        );
    const h = () => {
        e.el.classList.remove(...e.params.navigation.navigationDisabledClass.split(" ")),
            u(),
            a()
    }
        , m = () => {
            e.el.classList.add(...e.params.navigation.navigationDisabledClass.split(" ")),
                f()
        }
        ;
    Object.assign(e.navigation, {
        enable: h,
        disable: m,
        update: a,
        init: u,
        destroy: f
    })
}
new fe(".mySwiper", {
    modules: [ma],
    slidesPerView: 1,
    loop: !0,
    navigation: {
        nextEl: ".right-button",
        prevEl: ".left-button"
    }
});
document.addEventListener("DOMContentLoaded", r => {
    function e() {
        const o = new Lr({
            wheelMultiplier: 1.5,
            smoothWheel: !0
        });
        function a(l) {
            o.raf(l),
                requestAnimationFrame(a)
        }
        requestAnimationFrame(a)
    }
    function t() {
        const o = document.querySelector(".header__menu-toggler")
            , a = document.getElementById("main-navigation");
        let l = o?.getAttribute("aria-expanded") === "true";
        o?.addEventListener("click", d => {
            l = !l,
                o.setAttribute("aria-expanded", l),
                l ? a.style.transform = "translateX(0)" : a.style.transform = "translateX(100%)"
        }
        )
    }
    function i() {
        const o = document.querySelectorAll(".accordion-item__button");
        function a(l) {
            this.getAttribute("aria-expanded") == "false" ? this.setAttribute("aria-expanded", "true") : this.setAttribute("aria-expanded", "false")
        }
        o.forEach(l => {
            l.addEventListener("click", a)
        }
        )
    }
    function s() {
        const o = document.getElementById("image-preview")
            , a = o?.querySelector("img")
            , l = document.querySelector(".service .service__grid-list")
            , d = l?.querySelectorAll(".service-item");
        if (!o || !a || !l || !d) {
            console.warn("Image preview setup failed: missing required elements");
            return
        }
        let u = !1
            , f = 0
            , h = 0;
        d.forEach(m => {
            m.addEventListener("mouseenter", () => {
                const p = m.getAttribute("data-image");
                p && (a.src = p)
            }
            )
        }
        ),
            l.addEventListener("mouseenter", () => {
                u = !0,
                    xe.to(o, {
                        scale: 1,
                        duration: .3,
                        ease: "power1.out"
                    })
            }
            ),
            l.addEventListener("mouseleave", () => {
                u = !1,
                    xe.to(o, {
                        scale: 0,
                        duration: .3,
                        ease: "power1.out"
                    })
            }
            ),
            l.addEventListener("mousemove", m => {
                f = m.pageX,
                    h = m.pageY
            }
            ),
            xe.ticker.add(() => {
                u && xe.to(o, {
                    x: f,
                    y: h,
                    xPercent: -10,
                    yPercent: -10,
                    duration: .5,
                    ease: "power1.out",
                    overwrite: "auto"
                })
            }
            )
    }
    function n() {
        const o = document.querySelector(".video-btn")
            , a = document.querySelector("#video-popup")
            , l = document.querySelector(".close-btn");
        if (!o || !a || !l) {
            console.warn("Video popup setup failed: missing required elements");
            return
        }
        o.addEventListener("click", () => {
            a.style.display = "flex",
                xe.fromTo(a, {
                    opacity: 0,
                    scale: .8
                }, {
                    opacity: 1,
                    scale: 1,
                    duration: .3,
                    ease: "power1.out"
                })
        }
        ),
            l.addEventListener("click", () => {
                xe.to(a, {
                    opacity: 0,
                    scale: .8,
                    duration: .3,
                    ease: "power1.out",
                    onComplete: () => {
                        a.style.display = "none"
                    }
                })
            }
            ),
            a.addEventListener("click", d => {
                d.target === a && xe.to(a, {
                    opacity: 0,
                    scale: .8,
                    duration: .3,
                    ease: "power1.out",
                    onComplete: () => {
                        a.style.display = "none"
                    }
                })
            }
            ),
            document.addEventListener("keydown", d => {
                d.key === "Escape" && a.style.display === "flex" && xe.to(a, {
                    opacity: 0,
                    scale: .8,
                    duration: .3,
                    ease: "power1.out",
                    onComplete: () => {
                        a.style.display = "none"
                    }
                })
            }
            )
    }
    n(),
        e(),
        s(),
        t(),
        i()
}
);
