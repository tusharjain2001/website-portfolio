import { categoryRows } from '../data/categories'
import { searchByTerms, termKey } from '../lib/search'
import ScrollHint from './ScrollHint'
import SearchBar from './SearchBar'

export default function Hero({ query, onQueryChange, terms, onAddTerm, onRemoveTerm, onToggleCategory, onSubmit, onClear }) {
  const selected = new Set(terms.map(termKey))
  const matchCount = searchByTerms(terms).length

  return (
    <>
      <div className="flex w-full max-w-[1505px] animate-fade-up flex-col items-center gap-10 px-4 py-16 sm:gap-14">
        <div className="flex w-full flex-col items-center text-center">
          <p className="text-gradient-brand text-base leading-[48px] font-semibold tracking-[-0.72px] uppercase sm:text-[24px]">
            Welcome to our portfolio
          </p>
          <div className="flex w-full flex-col items-center gap-8 sm:gap-11">
            <h1 className="text-[34px] leading-[1.2] font-semibold tracking-[-1.8px] sm:text-5xl lg:text-[60px] lg:leading-[102px]">
              What are you looking for? We’ll find it.
            </h1>
            <SearchBar
              value={query}
              onChange={onQueryChange}
              terms={terms}
              onAddTerm={onAddTerm}
              onRemoveTerm={onRemoveTerm}
              onSubmit={onSubmit}
            />
          </div>

          {/* Reserved height so the chips don't jump when the summary appears. */}
          <p aria-live="polite" className="mt-4 h-6 text-base text-chip sm:text-lg">
            {terms.length > 0 && (
              <>
                {matchCount} {matchCount === 1 ? 'project matches' : 'projects match'} {terms.length > 1 && 'all tags'}
                <span className="mx-2 text-white/20">·</span>
                <button type="button" onClick={onClear} className="text-brand-blue underline-offset-4 hover:underline">
                  Clear all
                </button>
              </>
            )}
          </p>
        </div>

        <ul aria-label="Browse by category" className="flex w-full flex-col gap-3 sm:gap-[25px]">
          {categoryRows.map((row, i) => (
            <li key={i}>
              <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {row.map((category) => {
                  const isOn = selected.has(termKey({ type: 'category', label: category.label }))
                  return (
                    <li key={category.label}>
                      <button
                        type="button"
                        aria-pressed={isOn}
                        onClick={() => onToggleCategory(category)}
                        className={`rounded-[37px] border px-4 py-1.5 text-base leading-[31px] tracking-[-0.72px] whitespace-nowrap transition sm:px-5 sm:py-2 sm:text-[24px] ${
                          isOn
                            ? 'border-brand-blue/70 bg-brand-blue/20 text-white'
                            : 'border-chip/15 bg-[rgba(24,62,94,0.18)] text-chip hover:border-brand-blue/50 hover:bg-[rgba(24,62,94,0.4)] hover:text-white'
                        }`}
                      >
                        {category.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <ScrollHint className="absolute right-6 bottom-8 hidden whitespace-nowrap text-white/72 md:inline-flex xl:right-16 xl:bottom-[49px]">
        Scroll down to view our portfolio
      </ScrollHint>
    </>
  )
}
