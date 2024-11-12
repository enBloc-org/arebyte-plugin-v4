import { useEffect, useState } from "react"

import "./ExplorePage.css"

import { useErrorBoundary } from "react-error-boundary"

import { sendToBackground } from "@plasmohq/messaging"

import BurgerMenu from "~components/BurgerMenu/BurgerMenu"
import FilterTags from "~components/FilterTags/FilterTags"
import Footer from "~components/Footer/Footer"
import PaginationNav from "~components/PaginationNav/PaginationNav"
import ProjectCard from "~components/ProjectCards/ProjectCard"
import WithLoading from "~components/WithLoading/WithLoading"
import type { Meta } from "~types/baseTypes"
import { TagData, type ProjectData } from "~types/projectTypes"

export default function ExplorePage() {
  const [projects, setProjects] = useState<ProjectData[]>()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageCount, setPageCount] = useState<number>(1)
  const { showBoundary } = useErrorBoundary()
  const [activeTags, setActiveTags] = useState<TagData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchAllProjects = async () => {
      setIsLoading(true)
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
      setIsLoading(false)
    }
    fetchAllProjects()
  }, [pageNumber, activeTags, setActiveTags])

  return (
    <div className="explore-page page">
      <BurgerMenu />
      <main className="explore-main">
        <FilterTags
          activeTags={activeTags}
          setActiveTags={setActiveTags}
        />
        <WithLoading isLoading={isLoading}>
          <div className="explore-section">
            <h2 className="text-lg">EXPLORE</h2>
            {projects && (
              <div className="gap margin-top-sm explore-page--card-container">
                {projects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>
        </WithLoading>
      </main>
      <div>
        <PaginationNav
          pageNumber={pageNumber}
          pageCount={pageCount}
          setterFunction={setPageNumber}
        />
        <Footer />
      </div>
    </div>
  )
}
