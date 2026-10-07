import { useEffect, useState } from 'react'
import AllWork from './components/AllWork'
import Backdrop from './components/Backdrop'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import NoResults from './components/NoResults'
import SearchResults from './components/SearchResults'
import { categoryRows } from './data/categories'
import { searchByTerms, termKey } from './lib/search'

const categories = categoryRows.flat()
const categoryTerm = (c) => ({ type: 'category', label: c.label, keywords: c.keywords })

// Typed text that names a category ("branding") becomes that chip, so it isn't listed twice.
const toTerm = (label) => {
  const category = categories.find((c) => c.label.toLowerCase() === label.trim().toLowerCase())
  return category ? categoryTerm(category) : { type: 'tag', label: label.trim() }
}

// The submitted search lives in the URL (?tag=…&tag=…&category=…) so results can be
// shared and the browser back button returns to the hero.
function readSearchFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const tags = [...params.getAll('tag'), ...params.getAll('q')]
    .map((t) => t.trim())
    .filter(Boolean)
    .map(toTerm)
  const cats = params
    .getAll('category')
    .map((label) => categories.find((c) => c.label === label))
    .filter(Boolean)
    .map(categoryTerm)

  const terms = [...tags, ...cats]
  return terms.length ? terms : null
}

function writeSearchToUrl(terms) {
  const params = new URLSearchParams()
  for (const term of terms ?? []) params.append(term.type === 'category' ? 'category' : 'tag', term.label)
  const qs = params.toString()
  window.history.pushState(null, '', qs ? `?${qs}` : window.location.pathname)
}

const withTerm = (terms, term) => (terms.some((t) => termKey(t) === termKey(term)) ? terms : [...terms, term])
const withoutTerm = (terms, term) => terms.filter((t) => termKey(t) !== termKey(term))

export default function App() {
  const [search, setSearch] = useState(readSearchFromUrl) // submitted terms, or null on the hero
  const [terms, setTerms] = useState(() => search ?? []) // tags being picked on the hero
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onPopState = () => {
      const next = readSearchFromUrl()
      setSearch(next)
      if (next) setTerms(next)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const go = (next) => {
    setSearch(next)
    writeSearchToUrl(next)
    window.scrollTo({ top: 0 })
  }

  // Any text still in the input counts as one more tag.
  const submit = (pendingText) => {
    const text = pendingText.trim()
    const final = text ? withTerm(terms, toTerm(text)) : terms
    if (final.length === 0) return
    setTerms(final)
    setQuery('')
    go(final)
  }

  const clear = () => {
    setTerms([])
    setQuery('')
  }

  const home = () => {
    clear()
    go(null)
  }

  const results = search ? searchByTerms(search) : []
  const searchKey = search?.map(termKey).join('|')

  return (
    <>
      <section className="relative isolate flex min-h-dvh flex-col overflow-hidden">
        <Backdrop />
        <Navbar onHome={home} />

        <main className="relative flex flex-1 flex-col items-center justify-center pb-10 lg:pb-[107px]">
          {!search ? (
            <Hero
              query={query}
              onQueryChange={setQuery}
              terms={terms}
              onAddTerm={(term) => setTerms((prev) => withTerm(prev, toTerm(term.label)))}
              onRemoveTerm={(term) => setTerms((prev) => withoutTerm(prev, term))}
              onToggleCategory={(c) => {
                const term = categoryTerm(c)
                setTerms((prev) =>
                  prev.some((t) => termKey(t) === termKey(term)) ? withoutTerm(prev, term) : withTerm(prev, term),
                )
              }}
              onSubmit={submit}
              onClear={clear}
            />
          ) : results.length > 0 ? (
            <SearchResults key={searchKey} terms={search} results={results} onRefine={() => go(null)} />
          ) : (
            <NoResults key={searchKey} onRefine={() => go(null)} />
          )}
        </main>
      </section>

      <AllWork />
    </>
  )
}
