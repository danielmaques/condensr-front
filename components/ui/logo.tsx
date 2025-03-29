import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex" aria-label="Condensr">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" width="28" height="28">
        {/* Main Logo Elements */}
        <g transform="translate(20, 0)">
          {/* Logo Icon - Represents Link Compression */}
          <g>
            {/* Left Chain Link */}
            <path d="M40,50 C40,36.2 29.8,25 16,25 C2.2,25 -8,36.2 -8,50 C-8,63.8 2.2,75 16,75 L26,75" 
                  fill="none" stroke="#3366CC" strokeWidth="12" strokeLinecap="round"/>
            
            {/* Right Chain Link (Smaller - Condensed) */}
            <path d="M60,50 C60,41.6 53.4,35 45,35 C36.6,35 30,41.6 30,50 C30,58.4 36.6,65 45,65 L52,65" 
                  fill="none" stroke="#1E88E5" strokeWidth="12" strokeLinecap="round"/>
          </g>
        </g>
      </svg>
    </Link>
  );
}
