'use client'

import React, { useMemo, useId } from 'react'


interface CrumbedHighlightProps {
    children: React.ReactNode
    color?: string
    className?: string
}

export const CrumbledHighlight: React.FC<CrumbedHighlightProps> = ({
    children,
    color = '#fde68a', // Default to a light yellow color
    className = '',
}) => {
    const id = useId()
    const maskId = `crumbled-mask-${id}`
    const filterId = `crumbled-filter-${id}`

    const path = useMemo(() => generateCrumbledPath(), [])

    return (
        <span className={`relative inline-block ${className}`}>
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <defs>
                    <filter id={filterId}>
                        <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
                    </filter>
                    <mask id={maskId}>
                        <path d={path} fill="white" filter={`url(#${filterId})`} />
                    </mask>
                </defs>
                <rect width="100" height="100" fill={color} mask={`url(#${maskId})`} />
            </svg>
            <span className="relative z-10">{children}</span>
        </span>
    )
}

function generateCrumbledPath(): string {
    const segments = 20
    const variance = 5
    let d = `M0,100 L0,20`

    for (let i = 1; i <= segments; i++) {
        const x = (i / segments) * 100
        const y = 20 + Math.random() * variance
        d += ` L${x},${y}`
    }

    d += ` L100,20 L100,100 Z`
    return d
}

