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

// Every unique tag (case-insensitive) with the projects that use it.
const tagIndex = (() => {
  const index = new Map()
  for (const project of projects) {
    for (const tag of project.tags) {
      const key = normalize(tag)
      if (!index.has(key)) index.set(key, { tag, projects: [] })
      index.get(key).projects.push(project.name)
    }
  }
  return [...index.values()]
})()

// Free-text search over each project's tags and service names.
export function searchProjects(query) {
  if (!normalize(query)) return []

  return projects
    .map((project) => ({
      project,
      matchedTags: [...project.tags, ...project.services].filter((tag) => tagMatches(tag, query)),
    }))
    .filter(({ matchedTags }) => matchedTags.length > 0)
    .sort((a, b) => b.matchedTags.length - a.matchedTags.length)
}

// Exact filter by service column, used by the category chips.
export function projectsByService(service) {
  return projects
    .filter((project) => project.services.includes(service))
    .map((project) => ({ project, matchedTags: [service] }))
}

export function suggestTags(query, limit = 6) {
  const q = normalize(query)
  if (!q) return []

  return tagIndex
    .filter(({ tag }) => tagMatches(tag, q))
    .sort((a, b) => {
      // Exact match first, then tags starting with the query, then most-used.
      const rank = (t) => (normalize(t) === q ? 0 : normalize(t).startsWith(q) ? 1 : 2)
      return rank(a.tag) - rank(b.tag) || b.projects.length - a.projects.length || a.tag.localeCompare(b.tag)
    })
    .slice(0, limit)
}
