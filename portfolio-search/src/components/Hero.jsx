import { categoryRows } from '../data/categories'
import ScrollHint from './ScrollHint'
import SearchBar from './SearchBar'

export default function Hero({ query, onQueryChange, onSearch, onCategory }) {
  return (
    <>
      <div className="flex w-full max-w-[1505px] animate-fade-up flex-col items-center gap-14 px-4 py-16 sm:gap-20">
        <div className="flex w-full flex-col items-center text-center">
          <p className="text-gradient-brand text-base leading-[48px] font-semibold tracking-[-0.72px] uppercase sm:text-[24px]">
            Welcome to our portfolio
          </p>
          <div className="flex w-full flex-col items-center gap-8 sm:gap-11">
            <h1 className="text-[34px] leading-[1.2] font-semibold tracking-[-1.8px] sm:text-5xl lg:text-[60px] lg:leading-[102px]">
              What are you looking for? We’ll find it.
            </h1>
            <SearchBar value={query} onChange={onQueryChange} onSubmit={onSearch} />
          </div>
        </div>

        <ul aria-label="Browse by category" className="flex w-full flex-col gap-3 sm:gap-[25px]">
          {categoryRows.map((row, i) => (
            <li key={i}>
              <ul className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                {row.map((category) => (
                  <li key={category.label}>
                    <button
                      type="button"
                      onClick={() => onCategory(category)}
                      className="rounded-[37px] border border-chip/15 bg-[rgba(24,62,94,0.18)] px-4 py-1.5 text-base leading-[31px] tracking-[-0.72px] whitespace-nowrap text-chip transition hover:border-brand-blue/50 hover:bg-[rgba(24,62,94,0.4)] hover:text-white sm:px-5 sm:py-2 sm:text-[24px]"
                    >
                      {category.label}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <ScrollHint className="absolute right-6 bottom-8 hidden text-white/72 md:inline-flex xl:right-auto xl:bottom-[49px] xl:left-[calc(75%+44px)]">
        Scroll down to view our portfolio
      </ScrollHint>
    </>
  )
}
