import { titleCase } from '../lib/format'
import dashedLine from '../assets/dashed-line.svg'
import ProjectCard from './ProjectCard'
import ScrollHint from './ScrollHint'

const Rule = () => (
  <img alt="" src={dashedLine} width="1920" height="1" className="pointer-events-none h-px w-full object-cover" />
)

export default function SearchResults({ label, results, onReset }) {
  return (
    <div className="flex w-full animate-fade-up flex-col items-center py-16">
      <h1 className="px-4 text-center text-2xl leading-[1.6] tracking-[-0.96px] text-soft sm:text-[32px] sm:leading-[64px]">
        Search Results for {titleCase(label)}...
      </h1>
      <button
        type="button"
        onClick={onReset}
        className="mt-1 text-base text-brand-blue underline-offset-4 transition hover:underline"
      >
        ← New search
      </button>

      <div className="mt-8 w-full">
        <Rule />
        <ul className="flex snap-x snap-mandatory justify-center-safe gap-4 overflow-x-auto px-4 [scrollbar-width:none]">
          {results.map(({ project, matchedTags }) => {
            // "Tag 02" in the design = the tag that matched, then the industry tag.
            const matched = matchedTags[0]
            const tags = matched && matched !== project.industry ? [matched, project.industry] : [project.industry]
            return (
              <li key={project.id} className="w-[min(78vw,432px)] shrink-0 snap-center lg:w-[min(432px,calc((100vw-80px)/4))]">
                <ProjectCard project={project} tags={tags} />
              </li>
            )
          })}
        </ul>
        <Rule />
      </div>

      <ScrollHint className="mt-[38px] text-white">Scroll down to view more projects</ScrollHint>
    </div>
  )
}
