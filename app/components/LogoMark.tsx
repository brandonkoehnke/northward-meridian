export default function LogoMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      className="h-8 w-8 text-[var(--accent)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="20"
        cy="20"
        r="16"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M20 4V36"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M8 20H32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M20 8L24 17H16L20 8Z"
        fill="currentColor"
      />
    </svg>
  );
}