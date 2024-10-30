import { useEffect, useState } from "react"

import "./ExplorePage.css"

import { useErrorBoundary } from "react-error-boundary"

import { sendToBackground } from "@plasmohq/messaging"

import BurgerMenu from "~components/BurgerMenu/BurgerMenu"
import FilterTags from "~components/FilterTags/FilterTags"
import Footer from "~components/Footer/Footer"
import PaginationNav from "~components/PaginationNav/PaginationNav"
import ProjectCard from "~components/ProjectCards/ProjectCard"
import type { Meta } from "~types/baseTypes"
import { TagsData, type ProjectData } from "~types/projectTypes"

export default function ExplorePage() {
  const [projects, setProjects] = useState<ProjectData[]>()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>(1)
  const { showBoundary } = useErrorBoundary()
  const [activeTags, setActiveTags] = useState<TagsData[]>([])

  useEffect(() => {
    const fetchAllProjects = async () => {
      const {
        data,
        error,
        meta
      }: { data: ProjectData[]; error: string | null; meta: Meta } =
        await sendToBackground({
          name: "fetchAllProjects",
          body: { page: pageNumber, tags: activeTags }
        })

      if (error) showBoundary(error)

      setPageCount(meta.pagination.pageCount)
      setProjects(data)
    }
    fetchAllProjects()
  }, [pageNumber, activeTags, setActiveTags])

  return (
    <div className="explore-page page">
      <BurgerMenu />
      <main className="grid">
        <FilterTags
          activeTags={activeTags}
          setActiveTags={setActiveTags}
        />
        <div className="explore-section">
          <h2 className="text-lg">EXPLORE</h2>
          {projects && (
            <div className="flex gap margin-top-sm explore-card-container">
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
          <PaginationNav
            pageNumber={pageNumber}
            pageCount={pageCount}
            setterFunction={setPageNumber}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
