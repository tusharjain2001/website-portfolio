import { useId, useRef, useState } from 'react'
import searchIcon from '../assets/search-icon.svg'
import { titleCase } from '../lib/format'
import { suggestTags, termKey } from '../lib/search'
import Highlight from './Highlight'

// Multi-tag search: picking a suggestion (or pressing Enter) turns the text into a
// tag pill and clears the input for the next one. The search button runs the search.
export default function SearchBar({ value, onChange, terms, onAddTerm, onRemoveTerm, onSubmit }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const inputRef = useRef(null)
  const listId = useId()

  const suggestions = suggestTags(value, terms)
  const showList = open && suggestions.length > 0

  const addTag = (label) => {
    onAddTerm({ type: 'tag', label: label.trim() })
    onChange('')
    setActive(-1)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' && suggestions.length) {
      e.preventDefault()
      setOpen(true)
      setActive((i) => (i + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp' && suggestions.length) {
      e.preventDefault()
      setActive((i) => (i <= 0 ? suggestions.length - 1 : i - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (showList && active >= 0) addTag(suggestions[active].tag)
      else if (value.trim()) addTag(value)
      else if (terms.length) onSubmit('')
    } else if (e.key === 'Backspace' && !value && terms.length) {
      onRemoveTerm(terms[terms.length - 1])
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div role="search" className="relative w-full max-w-[1020px]">
      <div
        onClick={() => inputRef.current?.focus()}
        className="flex cursor-text items-center gap-3 rounded-[50px] border border-white/12 bg-[rgba(215,215,215,0.04)] py-2 pr-2 pl-5 transition-colors focus-within:border-brand-blue/60 sm:py-3 sm:pr-[15px] sm:pl-[30px]"
      >
        <ul className="flex min-w-0 flex-1 flex-wrap items-center gap-2" aria-label="Selected tags">
          {terms.map((term) => (
            <li key={termKey(term)}>
              <span className="flex items-center gap-1.5 rounded-full border border-brand-blue/40 bg-brand-blue/15 py-1 pr-1.5 pl-3.5 text-base text-white sm:text-lg">
                {titleCase(term.label)}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemoveTerm(term)
                    inputRef.current?.focus()
                  }}
                  aria-label={`Remove ${term.label}`}
                  className="flex size-6 items-center justify-center rounded-full text-chip transition hover:bg-white/10 hover:text-white"
                >
                  <svg aria-hidden="true" viewBox="0 0 12 12" className="size-2.5" stroke="currentColor" strokeWidth="1.6">
                    <path d="M2 2l8 8M10 2l-8 8" strokeLinecap="round" />
                  </svg>
                </button>
              </span>
            </li>
          ))}
          <li className="min-w-[140px] flex-1">
            <label htmlFor="project-search" className="sr-only">
              Search projects by tag
            </label>
            <input
              ref={inputRef}
              id="project-search"
              type="text"
              role="combobox"
              aria-expanded={showList}
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={showList && active >= 0 ? `${listId}-${active}` : undefined}
              autoComplete="off"
              placeholder={terms.length ? 'Add another tag..' : 'Search projects here..'}
              value={value}
              onChange={(e) => {
                onChange(e.target.value)
                setOpen(true)
                setActive(-1)
              }}
              onFocus={() => setOpen(true)}
              onBlur={() => setOpen(false)}
              onKeyDown={handleKeyDown}
              className="h-12 w-full bg-transparent text-xl tracking-[-0.96px] text-white placeholder:text-placeholder focus:outline-none sm:h-16 sm:text-[32px]"
            />
          </li>
        </ul>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            if (value.trim() || terms.length) onSubmit(value)
            else inputRef.current?.focus()
          }}
          aria-label="Search"
          className="flex size-11 shrink-0 items-center justify-center self-center rounded-full transition hover:brightness-110 sm:size-[53px]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), linear-gradient(55.98deg, #65a0cf 20.15%, #ff988d 79.85%)',
          }}
        >
          <img alt="" src={searchIcon} width="21.005" height="21.0001" />
        </button>
      </div>

      {showList && (
        <ul
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-full z-30 mt-3 overflow-hidden rounded-[28px] border border-white/10 bg-[#050d16]/95 p-2 text-left shadow-2xl shadow-black/60 backdrop-blur-xl"
        >
          {suggestions.map(({ tag, count }, i) => (
            <li
              key={tag}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              // mousedown fires before the input's blur, so the click isn't lost
              onMouseDown={(e) => {
                e.preventDefault()
                addTag(tag)
              }}
              onMouseEnter={() => setActive(i)}
              className={`flex cursor-pointer items-center justify-between gap-4 rounded-[20px] px-5 py-3 text-lg text-soft ${
                i === active ? 'bg-white/[0.06] text-white' : ''
              }`}
            >
              <span>
                <Highlight text={tag} query={value} />
              </span>
              <span className="shrink-0 text-sm text-chip">
                {count} {count === 1 ? 'project' : 'projects'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
