import { useEffect, useState } from "react"

import "./ExplorePage.css"

import { useErrorBoundary } from "react-error-boundary"

import { sendToBackground } from "@plasmohq/messaging"

import BurgerMenu from "~components/BurgerMenu/BurgerMenu"
import FilterTags from "~components/FilterTags/FilterTags"
import Footer from "~components/Footer/Footer"
import ProjectCard from "~components/ProjectCards/ProjectCard"
import type { AllProjectResponse } from "~types/projectTypes"

export default function ExplorePage() {
  const [projects, setProjects] =
    useState<AllProjectResponse["data"]>()
  const { showBoundary } = useErrorBoundary()

  useEffect(() => {
    const fetchAllProjects = async () => {
      const { data, error } = await sendToBackground({
        name: "fetchAllProjects"
      })

      if (error) showBoundary(error)
      setProjects(data)
    }
    fetchAllProjects()
  }, [])

  return (
    <div className="explore-page page">
      <BurgerMenu />
      <main className="grid">
        <FilterTags />
        <div className="explore-section">
          <h2 className="text-lg">EXPLORE</h2>
          {projects && (
            <div className="flex gap margin-top-sm explore-card-container">
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
