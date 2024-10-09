import "./FilterTags.css"

const FilterTags = () => {
  return (
    <div className="flex tags-container">
      {tags.map(tag => {
        return (
          <button
            key={tag.id}
            className="button--primary filter-button"
          >
            {tag.name}
          </button>
        )
      })}
    </div>
  )
}

export default FilterTags

const tags = [
  { id: 1, name: "Realism" },
  { id: 2, name: "Digital Painting" },
  { id: 3, name: "3D Modeling" },
  { id: 4, name: "Fantasy" },
  { id: 5, name: "AI" },
  { id: 6, name: "Adobe Photoshop" },
  { id: 7, name: "High-Fi" },
  { id: 8, name: "Lo-Fi" },
  { id: 9, name: "Western" }
]
