"use client";

import { useEffect, useState, useRef } from "react";

export function useFloatingCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const clickedRef = useRef(false);
    const [linkHovered, setLinkHovered] = useState(false);
    const [mounted, setMounted] = useState(false);
    const positionRef = useRef({ x: 0, y: 0 });
    const circlePositionRef = useRef({ x: 0, y: 0 });
    const requestRef = useRef<number | null>(null);
    const tickRef = useRef<() => void>(() => {});

    // The tick only ever reads refs, so it's safe to set up once. Held in a
    // ref (rather than referencing a useCallback result recursively) so the
    // rAF loop can always reach the latest version without a self-reference.
    useEffect(() => {
        tickRef.current = () => {
            if (circleRef.current && dotRef.current) {
                circlePositionRef.current.x +=
                    (positionRef.current.x - circlePositionRef.current.x) * 0.25;
                circlePositionRef.current.y +=
                    (positionRef.current.y - circlePositionRef.current.y) * 0.25;
                circleRef.current.style.transform = `translate3d(${circlePositionRef.current.x}px, ${circlePositionRef.current.y}px, 0) translate(-50%, -50%) scale(${clickedRef.current ? 0.8 : 1})`;
                dotRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%)`;
            }
            // Always reschedule -- if refs weren't attached yet on this
            // frame, this keeps polling until they are instead of dying.
            requestRef.current = requestAnimationFrame(() => tickRef.current());
        };
    }, []);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        // Respect reduced-motion and keep the native cursor entirely.
        if (prefersReducedMotion) return;

        // Standard SSR-safe "client is ready" flag: renders null on the server
        // and first client pass, then reveals the cursor once mounted.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);

        const startLoop = () => {
            requestRef.current = requestAnimationFrame(() => tickRef.current());
        };

        const resetCursorPosition = (e?: MouseEvent) => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
                requestRef.current = null;
            }

            const x = e ? e.clientX : positionRef.current.x || window.innerWidth / 2;
            const y = e ? e.clientY : positionRef.current.y || window.innerHeight / 2;

            positionRef.current = { x, y };
            circlePositionRef.current = { x, y };

            if (dotRef.current)
                dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
            if (circleRef.current)
                circleRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${clickedRef.current ? 0.8 : 1})`;

            startLoop();
        };

        const initialX = window.innerWidth / 2;
        const initialY = window.innerHeight / 2;
        if (positionRef.current.x === 0 && positionRef.current.y === 0) {
            positionRef.current = { x: initialX, y: initialY };
        }
        circlePositionRef.current = {
            x: positionRef.current.x,
            y: positionRef.current.y,
        };

        if (dotRef.current)
            dotRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%)`;
        if (circleRef.current)
            circleRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%)`;

        const updatePosition = (e: MouseEvent) => {
            positionRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseDown = (e: MouseEvent) => {
            clickedRef.current = true;
            const dx = circlePositionRef.current.x - e.clientX;
            const dy = circlePositionRef.current.y - e.clientY;
            if (Math.sqrt(dx * dx + dy * dy) > 30) {
                resetCursorPosition(e);
            }
        };

        const handleMouseUp = () => {
            clickedRef.current = false;
        };

        // Event delegation so links/buttons added after mount (e.g. after a
        // client-side route change) are picked up without re-scanning the DOM.
        const handlePointerOver = (e: MouseEvent) => {
            if ((e.target as Element)?.closest?.("a, button")) {
                setLinkHovered(true);
            }
        };
        const handlePointerOut = (e: MouseEvent) => {
            if ((e.target as Element)?.closest?.("a, button")) {
                setLinkHovered(false);
            }
        };

        startLoop();

        window.addEventListener("mousemove", updatePosition);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("mouseover", handlePointerOver);
        document.addEventListener("mouseout", handlePointerOut);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            window.removeEventListener("mousemove", updatePosition);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseover", handlePointerOver);
            document.removeEventListener("mouseout", handlePointerOut);
        };
    }, []);

    return { dotRef, circleRef, linkHovered, mounted };
}
