import { useId, useState } from 'react'
import searchIcon from '../assets/search-icon.svg'
import { suggestTags } from '../lib/search'
import Highlight from './Highlight'

export default function SearchBar({ value, onChange, onSubmit }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const listId = useId()

  const suggestions = suggestTags(value)
  const showList = open && suggestions.length > 0

  const submit = (query) => {
    if (!query.trim()) return
    setOpen(false)
    setActive(-1)
    onSubmit(query.trim())
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' && suggestions.length) {
      e.preventDefault()
      setOpen(true)
      setActive((i) => (i + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp' && suggestions.length) {
      e.preventDefault()
      setActive((i) => (i <= 0 ? suggestions.length - 1 : i - 1))
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault()
        submit(showList && active >= 0 ? suggestions[active].tag : value)
      }}
      className="relative w-full max-w-[1020px]"
    >
      <div className="flex items-center gap-3 rounded-[50px] border border-white/12 bg-[rgba(215,215,215,0.04)] py-2 pr-2 pl-5 transition-colors focus-within:border-brand-blue/60 sm:py-3 sm:pr-[15px] sm:pl-[30px]">
        <label htmlFor="project-search" className="sr-only">
          Search projects by tag
        </label>
        <input
          id="project-search"
          type="text"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showList && active >= 0 ? `${listId}-${active}` : undefined}
          autoComplete="off"
          placeholder="Search projects here.."
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setOpen(true)
            setActive(-1)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={handleKeyDown}
          className="h-12 min-w-0 flex-1 bg-transparent text-xl tracking-[-0.96px] text-white placeholder:text-placeholder focus:outline-none sm:h-16 sm:text-[32px]"
        />
        <button
          type="submit"
          aria-label="Search"
          className="flex size-11 shrink-0 items-center justify-center rounded-full transition hover:brightness-110 sm:size-[53px]"
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
          {suggestions.map(({ tag, projects }, i) => (
            <li
              key={tag}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              // mousedown fires before the input's blur, so the click isn't lost
              onMouseDown={(e) => {
                e.preventDefault()
                onChange(tag)
                submit(tag)
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
                {projects.length} {projects.length === 1 ? 'project' : 'projects'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}
