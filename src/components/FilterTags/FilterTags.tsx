import { useEffect, useState } from "react"

import "./FilterTags.css"

import { sendToBackground } from "@plasmohq/messaging"

import useStore from "~store/store"

const FilterTags = () => {
  const tags = useStore.use.tags()
  const setTags = useStore.use.setTags()
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

  return (
    <div className="flex tags-container">
      {tags &&
        tags.map(tag => {
          return (
            <button key={tag.id} className="button--filter">
              {tag.name}
            </button>
          )
        })}
      {hasError && (
        <p className="message__error">Tags have not loaded...</p>
      )}
    </div>
  )
}

export default FilterTags
