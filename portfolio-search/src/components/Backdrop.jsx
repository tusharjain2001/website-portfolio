import glow1 from '../assets/glow-1.svg'
import glow2 from '../assets/glow-2.svg'
import texture from '../assets/texture.png'

// Shared background of the Hero / Projects Found / Projects not found frames:
// dark gradient, two soft blue-coral glows, and a fade at the top behind the nav.
export default function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-page absolute inset-0 opacity-89" />

      {[
        { src: glow1, top: 131.71 },
        { src: glow2, top: 62.63 },
      ].map(({ src, top }) => (
        <div
          key={top}
          className="absolute flex size-[830.294px] items-center justify-center"
          style={{ top, left: 'calc(50% - 406.8px)' }}
        >
          <div className="flex-none -scale-y-100 -rotate-90">
            <img alt="" src={src} width="830.294" height="830.294" className="block max-w-none opacity-22 blur-[60px]" />
          </div>
        </div>
      ))}

      <img
        alt=""
        src={texture}
        className="absolute top-0 left-1/2 h-[533px] w-full min-w-[1920px] -translate-x-1/2 -scale-y-100 object-cover opacity-47"
      />
    </div>
  )
}
