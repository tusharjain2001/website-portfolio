import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

// Target of the "Scroll down to view…" hints until the full landing page is built.
export default function AllWork() {
  return (
    <section id="all-work" className="bg-page scroll-mt-4 border-t border-white/10 px-4 py-20 sm:px-10 xl:px-[120px]">
      <p className="text-gradient-brand text-base leading-[48px] font-semibold tracking-[-0.72px] uppercase sm:text-[24px]">
        All work
      </p>
      <h2 className="text-3xl font-semibold tracking-[-1.2px] sm:text-[44px]">Our portfolio</h2>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} tags={[project.industry]} />
          </li>
        ))}
      </ul>
    </section>
  )
}
