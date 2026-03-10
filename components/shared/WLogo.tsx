interface WLogoProps {
  sz?: number
  anim?: boolean
  glow?: boolean
}

export default function WLogo({ sz = 100, anim = false, glow = false }: WLogoProps) {
  const color = '#2B8FBF'
  return (
    <svg
      width={sz}
      height={sz * 0.75}
      viewBox="0 0 200 150"
      fill="none"
      style={
        glow
          ? { filter: `drop-shadow(0 0 30px ${color}A0) drop-shadow(0 0 60px ${color}60)` }
          : undefined
      }
    >
      <path
        d="M40 20 L80 130 L100 70 L120 130 L160 20"
        stroke={color}
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        style={
          anim
            ? {
                strokeDasharray: 500,
                strokeDashoffset: 500,
                animation: 'dSvg 2s ease-out forwards',
              }
            : undefined
        }
      />
      <path
        d="M25 20 L70 130 L100 50 L130 130 L175 20"
        stroke={color}
        strokeWidth="5"
        fill="none"
        opacity="0.4"
        style={
          anim
            ? {
                strokeDasharray: 600,
                strokeDashoffset: 600,
                animation: 'dSvg 2s ease-out 0.3s forwards',
              }
            : undefined
        }
      />
      <path
        d="M55 20 L85 130 L100 85 L115 130 L145 20"
        stroke={color}
        strokeWidth="3"
        fill="none"
        opacity="0.25"
        style={
          anim
            ? {
                strokeDasharray: 400,
                strokeDashoffset: 400,
                animation: 'dSvg 2s ease-out 0.6s forwards',
              }
            : undefined
        }
      />
    </svg>
  )
}
