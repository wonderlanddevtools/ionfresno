// Minimal analog clock widget for dark backgrounds
"use client";

import { useEffect, useState, startTransition } from "react";

interface ModernClockProps {
    background?: string;
    handColor?: string;
    tickColor?: string;
    size?: number;
    showTicks?: boolean;
    style?: React.CSSProperties;
}

/**
 * Modern Analog Clock Widget
 * 
 * A minimal analog clock designed for dark backgrounds with customizable styling.
 * Perfect for dashboard widgets with clean, modern aesthetics.
 */
export function ModernClock({
    background = "rgba(0, 0, 0, 0.1)",
    handColor = "#ffffff",
    tickColor = "#888888",
    size = 180,
    showTicks = true,
    style,
}: ModernClockProps) {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            startTransition(() => setNow(new Date()));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const w = size;
    const h = size;
    const center = size / 2;
    const radius = center - 8;

    const sec = now.getSeconds();
    const min = now.getMinutes();
    const hour = now.getHours() % 12;

    const secAngle = (sec / 60) * 360;
    const minAngle = ((min + sec / 60) / 60) * 360;
    const hourAngle = ((hour + min / 60) / 12) * 360;

    function hand(
        length: number,
        width: number,
        angle: number,
        color: string,
        opacity = 1
    ) {
        const rad = ((angle - 90) * Math.PI) / 180;
        const x2 = center + length * Math.cos(rad);
        const y2 = center + length * Math.sin(rad);
        return (
            <line
                x1={center}
                y1={center}
                x2={x2}
                y2={y2}
                stroke={color}
                strokeWidth={width}
                strokeLinecap="round"
                opacity={opacity}
            />
        );
    }

    function renderTicks() {
        if (!showTicks) return null;
        const ticks = [];
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * 2 * Math.PI;
            const x1 = center + (radius - 6) * Math.cos(angle);
            const y1 = center + (radius - 6) * Math.sin(angle);
            const x2 = center + radius * Math.cos(angle);
            const y2 = center + radius * Math.sin(angle);
            ticks.push(
                <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={tickColor}
                    strokeWidth={2}
                    opacity={0.7}
                />
            );
        }
        return ticks;
    }

    return (
        <div
            className="w-full h-full flex items-center justify-center"
            style={{
                ...style,
                background,
                borderRadius: "50%",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
        >
            <svg
                width={w}
                height={h}
                viewBox={`0 0 ${w} ${h}`}
                style={{ display: "block" }}
                aria-label="Modern analog clock"
                role="img"
            >
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="transparent"
                    stroke="none"
                />
                {renderTicks()}
                {hand(radius * 0.5, 4, hourAngle, handColor)}
                {hand(radius * 0.7, 3, minAngle, handColor)}
                {hand(radius * 0.85, 1.5, secAngle, handColor, 0.5)}
                <circle cx={center} cy={center} r={3} fill={handColor} />
            </svg>
        </div>
    );
}

export default ModernClock;
