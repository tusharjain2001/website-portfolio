import ScrollHint from './ScrollHint'

export default function NoResults({ onRefine }) {
  return (
    <>
      <div className="flex animate-fade-up flex-col items-center px-4 text-center">
        <h1 className="max-w-[781px] text-2xl leading-[1.6] tracking-[-0.96px] text-soft sm:text-[32px] sm:leading-[64px]">
          Oops! No results found for your search.
        </h1>
        <button
          type="button"
          onClick={onRefine}
          className="mt-2 text-base text-brand-blue underline-offset-4 transition hover:underline"
        >
          ← Change your tags
        </button>
      </div>

      <ScrollHint className="absolute bottom-[152px] left-1/2 -translate-x-1/2 whitespace-nowrap text-white">
        Scroll down to view our portfolio
      </ScrollHint>
    </>
  )
}
