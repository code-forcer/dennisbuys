// Decorative desert-dusk Las Vegas skyline used behind the hero content.
// Pure SVG so it never 404s and needs no external assets — swap it out
// for real photography later by following the note in Hero.tsx.
export function HeroSkyline() {
  return (
    <svg
      viewBox="0 0 1440 560"
      preserveAspectRatio="xMidYMax slice"
      className="hero-skyline-svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0f04" />
          <stop offset="55%" stopColor="#261606" />
          <stop offset="100%" stopColor="#0ea4ff" />
        </linearGradient>
        <linearGradient id="sunGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000080" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#000080" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#261606" stopOpacity="0" />
          <stop offset="100%" stopColor="#1a0f04" stopOpacity="1" />
        </linearGradient>
      </defs>

      <rect width="1440" height="560" fill="url(#sky)" />

      {/* horizon glow */}
      <ellipse cx="1080" cy="430" rx="420" ry="220" fill="url(#sunGlow)" />

      {/* far mountains */}
      <path
        d="M0,420 L120,360 L230,410 L340,330 L460,400 L620,320 L760,410 L900,350 L1040,405 L1180,340 L1320,400 L1440,360 L1440,560 L0,560 Z"
        fill="#2c1a08"
        opacity="0.6"
      />

      {/* strip skyline silhouette */}
      <g fill="#170d04">
        <rect x="40" y="360" width="46" height="160" />
        <rect x="96" y="400" width="30" height="120" />
        <rect x="140" y="330" width="54" height="190" />
        <rect x="206" y="420" width="34" height="100" />
        <rect x="252" y="300" width="40" height="220" />
        <polygon points="252,300 272,270 292,300" />
        <rect x="304" y="380" width="60" height="140" />
        <rect x="376" y="410" width="28" height="110" />
        <rect x="960" y="390" width="36" height="130" />
        <rect x="1004" y="350" width="50" height="170" />
        <rect x="1064" y="405" width="30" height="115" />
        <rect x="1104" y="320" width="46" height="200" />
        <circle cx="1127" cy="300" r="16" />
        <rect x="1160" y="370" width="58" height="150" />
        <rect x="1228" y="400" width="32" height="120" />
        <rect x="1270" y="340" width="44" height="180" />
        <rect x="1324" y="390" width="36" height="130" />
        <rect x="1370" y="415" width="26" height="105" />
      </g>

      {/* lit windows */}
      <g fill="#fbe311" opacity="0.55">
        <rect x="50" y="380" width="4" height="6" />
        <rect x="62" y="400" width="4" height="6" />
        <rect x="50" y="420" width="4" height="6" />
        <rect x="74" y="440" width="4" height="6" />
        <rect x="150" y="360" width="4" height="6" />
        <rect x="164" y="390" width="4" height="6" />
        <rect x="178" y="420" width="4" height="6" />
        <rect x="150" y="450" width="4" height="6" />
        <rect x="264" y="330" width="4" height="6" />
        <rect x="276" y="360" width="4" height="6" />
        <rect x="264" y="390" width="4" height="6" />
        <rect x="1014" y="380" width="4" height="6" />
        <rect x="1028" y="410" width="4" height="6" />
        <rect x="1114" y="350" width="4" height="6" />
        <rect x="1128" y="380" width="4" height="6" />
        <rect x="1114" y="410" width="4" height="6" />
        <rect x="1170" y="400" width="4" height="6" />
        <rect x="1184" y="430" width="4" height="6" />
        <rect x="1280" y="370" width="4" height="6" />
        <rect x="1294" y="400" width="4" height="6" />
      </g>
      <g fill="#d3f00a" opacity="0.4">
        <rect x="316" y="410" width="4" height="6" />
        <rect x="330" y="440" width="4" height="6" />
        <rect x="972" y="420" width="4" height="6" />
        <rect x="1336" y="420" width="4" height="6" />
      </g>

      {/* foreground fade so text stays legible */}
      <rect x="0" y="460" width="1440" height="100" fill="url(#fade)" />
    </svg>
  );
}
