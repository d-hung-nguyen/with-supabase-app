export function LogoIncentive({
  className,
  size = 24,
}: {
  className?: string
  size?: number
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 120 120"
      className={className}
      style={{ width: size, height: size }}
    >
      {/* Star/Award shape representing achievement */}
      <path
        fill="url(#incentive_svg__star)"
        d="M60 10 L72 38 L100 38 L78 56 L85 84 L60 70 L35 84 L42 56 L20 38 L48 38 Z"
      />

      {/* Trophy cup representing rewards */}
      <path
        fill="url(#incentive_svg__trophy)"
        d="M45 50 L45 65 Q45 70 50 70 L70 70 Q75 70 75 65 L75 50 M40 45 L80 45 Q85 45 85 50 L85 55 Q85 60 80 60 L40 60 Q35 60 35 55 L35 50 Q35 45 40 45"
      />

      {/* Growth arrow representing progress */}
      <path
        fill="url(#incentive_svg__growth)"
        d="M25 95 L35 85 L45 90 L55 80 L65 85 L75 75 L85 80 L95 70 L95 80 L85 80 Z"
        opacity="0.8"
      />

      {/* Dollar sign representing monetary incentives */}
      <circle cx="90" cy="30" r="12" fill="url(#incentive_svg__money)" />
      <path
        fill="white"
        d="M87 25 L87 35 M93 25 L93 35 M85 28 Q85 26 87 26 L91 26 Q93 26 93 28 Q93 30 91 30 L89 30 Q87 30 87 32 Q87 34 89 34 L93 34 Q95 34 95 32"
        stroke="white"
        strokeWidth="1.5"
        fillRule="evenodd"
      />

      <defs>
        <linearGradient
          id="incentive_svg__star"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFA500" />
        </linearGradient>

        <linearGradient
          id="incentive_svg__trophy"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#C0C0C0" />
          <stop offset="50%" stopColor="#E6E6FA" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>

        <linearGradient
          id="incentive_svg__growth"
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#32CD32" />
          <stop offset="100%" stopColor="#228B22" />
        </linearGradient>

        <linearGradient
          id="incentive_svg__money"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#4CAF50" />
          <stop offset="100%" stopColor="#2E7D32" />
        </linearGradient>
      </defs>
    </svg>
  )
}
