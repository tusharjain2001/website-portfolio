import logoMark from '../assets/logo-mark.svg'
import logoWordmark from '../assets/logo-wordmark.svg'

const links = [
  { label: 'Featured', href: '#all-work' },
  { label: 'All Work', href: '#all-work' },
  { label: 'Clients', href: '#all-work' },
]

export default function Navbar({ onHome }) {
  return (
    <header className="relative z-20 flex items-center justify-between border-b border-white/10 pl-4 sm:pl-10 xl:pl-[120px]">
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault()
          onHome()
        }}
        aria-label="Godesyn home"
        className="relative block h-[28.3px] w-[170px] shrink-0"
      >
        {/* The mark is exported as a mask shape; Figma paints it white. */}
        <span
          className="absolute top-0 left-0 h-[28.296px] w-[30.188px] bg-white"
          style={{ mask: `url("${logoMark}") center / 100% 100% no-repeat` }}
        />
        <img alt="" src={logoWordmark} width="132.96" height="23.58" className="absolute top-[2.36px] left-[37.04px]" />
      </a>

      <nav className="flex items-center gap-[70px] border-l border-white/10 py-6 pr-4 pl-6 sm:pr-10 sm:pl-10 xl:px-[120px]">
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="hidden text-[20px] font-bold tracking-[-0.6px] text-white transition-opacity hover:opacity-70 lg:block"
          >
            {label}
          </a>
        ))}
        <a
          href="#contact"
          className="border-gradient-brand rounded-full px-5 py-2 text-base font-semibold whitespace-nowrap text-white transition-opacity hover:opacity-85 sm:px-8 sm:py-3 sm:text-[24px]"
        >
          Get in Touch
        </a>
      </nav>
    </header>
  )
}
