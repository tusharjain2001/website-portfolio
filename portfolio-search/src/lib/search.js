import { projects } from '../data/projects.js'

export const normalize = (text) => text.toLowerCase().replace(/\s+/g, ' ').trim()

// A tag matches when every word of the query appears in it,
// so "logo design" matches "minimalist logo design" and "logo" matches "botanical logo".
export function tagMatches(tag, query) {
  const words = normalize(query).split(' ').filter(Boolean)
  if (words.length === 0) return false
  const value = normalize(tag)
  return words.every((word) => value.includes(word))
}

// Only the sheet's Industry and tags columns are searched.
const searchableTags = (project) => [...project.tags, project.industry]

// Every unique tag (case-insensitive) with the projects that use it.
const tagIndex = (() => {
  const index = new Map()
  for (const project of projects) {
    for (const tag of searchableTags(project)) {
      const key = normalize(tag)
      if (!index.has(key)) index.set(key, { tag, projects: [] })
      index.get(key).projects.push(project.name)
    }
  }
  return [...index.values()]
})()

// A search term is either typed/suggested text ({ type: 'tag', label })
// or a category chip ({ type: 'category', label, keywords }).
export const termKey = (term) => `${term.type}:${normalize(term.label)}`

const words = (text) => normalize(text).replace(/[^a-z0-9 ]/g, ' ').split(' ').filter(Boolean)
const sameWord = (a, b) => a === b || a === `${b}s` || b === `${a}s`

// A selected term matches a tag when each of its words is a whole word of the tag
// (plurals allowed): "branding" matches "physiotherapy branding", "app" doesn't match "appointment".
function termMatchesTag(label, tag) {
  const tagWords = words(tag)
  return words(label).every((w) => tagWords.some((t) => sameWord(w, t)))
}

// Returns the project tag that satisfies the term, or null.
// Chips and typed text share the same rule, so "Branding" gives the same projects either way.
function matchTerm(project, term) {
  const candidates = searchableTags(project)
  const phrases = term.type === 'category' ? (term.keywords ?? [term.label]) : [term.label]
  return (
    candidates.find((tag) => phrases.some((phrase) => normalize(tag) === normalize(phrase))) ??
    candidates.find((tag) => phrases.some((phrase) => termMatchesTag(phrase, tag))) ??
    null
  )
}

// Projects matching ALL terms, so each extra tag narrows the results.
export function searchByTerms(terms) {
  if (terms.length === 0) return []

  return projects.flatMap((project) => {
    const matchedTags = terms.map((term) => matchTerm(project, term))
    return matchedTags.every(Boolean) ? [{ project, matchedTags }] : []
  })
}

// Suggestions for the text being typed. Counts reflect the tags already selected,
// and tags that would leave nothing to show are skipped.
export function suggestTags(query, selected = [], limit = 6) {
  const q = normalize(query)
  if (!q) return []

  const taken = new Set(selected.map(termKey))
  return tagIndex
    .filter(({ tag }) => tagMatches(tag, q) && !taken.has(termKey({ type: 'tag', label: tag })))
    .map(({ tag }) => ({ tag, count: searchByTerms([...selected, { type: 'tag', label: tag }]).length }))
    .filter(({ count }) => count > 0)
    .sort((a, b) => {
      // Exact match first, then tags starting with the query, then most results.
      const rank = (t) => (normalize(t) === q ? 0 : normalize(t).startsWith(q) ? 1 : 2)
      return rank(a.tag) - rank(b.tag) || b.count - a.count || a.tag.localeCompare(b.tag)
    })
    .slice(0, limit)
}
