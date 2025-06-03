
interface LogoProps {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}

export const Logo = ({ size = "md", variant = "light" }: LogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-12 h-12"
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizeClasses[size]} relative`}>
        {/* Outer circle with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
        {/* Inner circle */}
        <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
          {/* Flow lines icon */}
          <svg 
            viewBox="0 0 24 24" 
            className="w-1/2 h-1/2 text-blue-600"
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5"
          >
            <path d="M3 12h18M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="7" cy="12" r="1" fill="currentColor"/>
            <circle cx="17" cy="12" r="1" fill="currentColor"/>
          </svg>
        </div>
      </div>
      <span className={`font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent ${textSizes[size]}`}>
        TaskFlows
      </span>
    </div>
  );
};
