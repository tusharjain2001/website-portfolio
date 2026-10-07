import { useEffect, useState } from 'react'
import AllWork from './components/AllWork'
import Backdrop from './components/Backdrop'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import NoResults from './components/NoResults'
import SearchResults from './components/SearchResults'
import { categoryRows } from './data/categories'
import { projectsByService, searchProjects } from './lib/search'

// The active search lives in the URL (?q=… or ?category=…) so results can be
// shared and the browser back button returns to the hero.
function readSearchFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const q = params.get('q')?.trim()
  if (q) return { type: 'text', label: q }

  const categoryLabel = params.get('category')
  const category = categoryRows.flat().find((c) => c.label === categoryLabel)
  if (category) return { type: 'category', label: category.label, service: category.service }

  return null
}

function writeSearchToUrl(search) {
  const params = new URLSearchParams()
  if (search?.type === 'text') params.set('q', search.label)
  if (search?.type === 'category') params.set('category', search.label)
  const qs = params.toString()
  window.history.pushState(null, '', qs ? `?${qs}` : window.location.pathname)
}

export default function App() {
  const [search, setSearch] = useState(readSearchFromUrl)
  const [query, setQuery] = useState(() => (search?.type === 'text' ? search.label : ''))

  useEffect(() => {
    const onPopState = () => {
      const next = readSearchFromUrl()
      setSearch(next)
      setQuery(next?.type === 'text' ? next.label : '')
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const go = (next) => {
    setSearch(next)
    writeSearchToUrl(next)
    window.scrollTo({ top: 0 })
  }

  const reset = () => {
    setQuery('')
    go(null)
  }

  const results = !search
    ? []
    : search.type === 'category'
      ? projectsByService(search.service)
      : searchProjects(search.label)

  return (
    <>
      <section className="relative isolate flex min-h-dvh flex-col overflow-hidden">
        <Backdrop />
        <Navbar onHome={reset} />

        <main className="relative flex flex-1 flex-col items-center justify-center pb-10 lg:pb-[107px]">
          {!search ? (
            <Hero
              query={query}
              onQueryChange={setQuery}
              onSearch={(q) => go({ type: 'text', label: q })}
              onCategory={(c) => go({ type: 'category', label: c.label, service: c.service })}
            />
          ) : results.length > 0 ? (
            <SearchResults key={search.label} label={search.label} results={results} onReset={reset} />
          ) : (
            <NoResults key={search.label} onReset={reset} />
          )}
        </main>
      </section>

      <AllWork />
    </>
  )
}
