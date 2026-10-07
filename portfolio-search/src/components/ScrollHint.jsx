import arrow from '../assets/arrow-down.svg'

export default function ScrollHint({ children, className = '' }) {
  return (
    <a
      href="#all-work"
      className={`inline-flex items-center gap-[15px] text-lg leading-[34px] font-medium tracking-[-0.72px] transition-opacity hover:opacity-80 sm:text-[24px] ${className}`}
    >
      {children}
      <img alt="" src={arrow} width="17" height="14.7279" className="rotate-90" />
    </a>
  )
}
