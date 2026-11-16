import { Link } from "react-router-dom";

type LogoProps = {
  /** Show the "Medicare Made Simple" tagline under the wordmark. */
  tagline?: boolean;
  className?: string;
};

/**
 * The standard YourMedGuy lockup: gradient blue tile with a white "M",
 * wordmark, and tagline. Used in the header and footer so the mark is
 * identical everywhere.
 */
const Logo = ({ tagline = true, className = "" }: LogoProps) => (
  <Link to="/" className={`flex items-center gap-2.5 min-w-0 group ${className}`} aria-label="YourMedGuy home">
    <span className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-[11px] bg-gradient-to-br from-brandblue to-brandblue-dark text-white font-extrabold text-lg sm:text-xl flex items-center justify-center shadow-sm">
      M
    </span>
    <span className="min-w-0 leading-tight">
      <span className="block text-[17px] sm:text-lg font-bold text-ink tracking-tight truncate group-hover:text-brandblue transition-colors">
        YourMedGuy
      </span>
      {tagline && (
        <span className="block text-xs text-mute font-medium">Medicare Made Simple</span>
      )}
    </span>
  </Link>
);

export default Logo;
