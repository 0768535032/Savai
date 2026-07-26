type Props = {
  className?: string;
  showWord?: boolean;
};

export default function Logo({ className = '', showWord = true }: Props) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 56 56" className="h-9 w-9 shrink-0" aria-hidden="true">
        <path
          d="M20 14 Q12 14 12 22 Q12 30 20 30 L36 30 Q44 30 44 38 Q44 46 36 46"
          stroke="currentColor"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M32 10 A12 12 0 0 1 44 22"
          stroke="#C65D3C"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      {showWord && (
        <span className="font-display text-xl font-medium tracking-tight">
          Savai<span className="text-terracotta">.</span>
        </span>
      )}
    </div>
  );
}
