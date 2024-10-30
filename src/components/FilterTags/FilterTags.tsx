import { useEffect, useState } from "react"

import "./FilterTags.css"

import { sendToBackground } from "@plasmohq/messaging"

import type { TagData } from "~types/projectTypes"

interface FilterTagsProps {
  activeTags: TagData[]
  setActiveTags: (tags: TagData[]) => void
}

const FilterTags: React.FC<FilterTagsProps> = ({
  activeTags,
  setActiveTags
}) => {
  const [tags, setTags] = useState<TagData[] | null>(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const fetchTags = async () => {
      const { data, error } = await sendToBackground({
        name: "fetchFilterTags"
      })
      if (error) {
        setHasError(true)
      } else {
        setTags(data)
      }
    }
    fetchTags()
  }, [])

  const clickHandler = (toggledTag: TagData) => {
    const isTagActive = activeTags.some(
      tag => tag.id === toggledTag.id
    )

    const updatedTags = isTagActive
      ? activeTags.filter(tag => tag.id !== toggledTag.id)
      : [...activeTags, toggledTag]

    setActiveTags(updatedTags)
  }

  return (
    <div className="flex flex-column gap">
      <div className="flex tags-container">
        {tags &&
          tags.map(tag => {
            return (
              <button
                key={tag.id}
                className={`button--filter ${activeTags.some(activeTag => activeTag.id === tag.id) ? "button--filter__active" : ""}`}
                onClick={() => clickHandler(tag)}
              >
                {tag.name}
              </button>
            )
          })}

        {hasError && (
          <p className="message__error">Tags have not loaded...</p>
        )}
      </div>
      {activeTags.length > 0 && (
        <button
          onClick={() => setActiveTags([])}
          className="button--clear"
        >
          Clear Tags{" "}
        </button>
      )}
    </div>
  )
}

export default FilterTags
