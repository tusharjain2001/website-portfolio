import { titleCase } from '../lib/format'

// Card from the "Projects Found" frame: blue gradient tile with tag pills bottom-right.
// The sheet has no project imagery yet, so the project name sits on the tile.
// Only the sheet's Brand Name, Industry and tags columns are shown.
export default function ProjectCard({ project, tags }) {
  return (
    <article className="relative aspect-[432/434.2] w-full overflow-hidden">
      <div
        className="absolute inset-0 -scale-y-100"
        style={{
          backgroundImage:
            'linear-gradient(183.48deg, rgba(0,96,171,0.5) 12.62%, rgba(101,160,207,0.5) 48.87%)',
        }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-white to-white/0 to-[104.58%] opacity-68" />
      <div className="bg-grain absolute inset-0 opacity-25 mix-blend-overlay" />

      <div className="relative h-full p-5 sm:p-6">
        <h3 className="text-[26px] leading-tight font-semibold tracking-[-0.9px] text-[#06213a] sm:text-[30px]">
          {project.name}
        </h3>

        <ul className="absolute right-3 bottom-3 left-3 flex flex-wrap-reverse justify-end gap-2 sm:right-4 sm:bottom-[19px] sm:left-4 sm:gap-4">
          {tags.map((tag) => (
            <li
              key={tag}
              className="max-w-full truncate rounded-[31px] border border-white/30 bg-white/10 px-5 py-2 text-base leading-[22px] font-medium tracking-[-0.6px] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-[2px] sm:px-7 sm:py-2.5 sm:text-[20px]"
            >
              {titleCase(tag)}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
