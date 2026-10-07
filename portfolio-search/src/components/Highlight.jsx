import { normalize } from '../lib/search'

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export default function Highlight({ text, query }) {
  const words = normalize(query).split(' ').filter(Boolean)
  if (words.length === 0) return text

  const pattern = new RegExp(`(${words.map(escapeRegExp).join('|')})`, 'gi')
  return text.split(pattern).map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="bg-transparent font-semibold text-white">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}
