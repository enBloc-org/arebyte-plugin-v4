import { useEffect, useState } from "react"

import "./FilterTags.css"

import { sendToBackground } from "@plasmohq/messaging"

import type { TagsData } from "~types/projectTypes"

interface FilterTagsProps {
  activeTags: TagsData[]
  setActiveTags: (tags: TagsData[]) => void
}

const FilterTags: React.FC<FilterTagsProps> = ({
  activeTags,
  setActiveTags
}) => {
  const [tags, setTags] = useState<TagsData[] | null>(null)
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

  const clickHander = (toggledTag: TagsData) => {
    const tagExists = activeTags.some(tag => tag.id === toggledTag.id)

    const updatedTags = tagExists
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
                onClick={() => clickHander(tag)}
              >
                {tag.name}
              </button>
            )
          })}

        {hasError && (
          <p className="message__error">Tags have not loaded...</p>
        )}
      </div>
      <button onClick={() => setActiveTags([])} className="button--clear">Clear Tags </button>
    </div>
  )
}

export default FilterTags
