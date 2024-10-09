import { useEffect, useState } from "react"

import "./ExplorePage.css"

import { sendToBackground } from "@plasmohq/messaging"

import BurgerMenu from "~components/BurgerMenu/BurgerMenu"
import FilterTags from "~components/FilterTags/FilterTags"
import Footer from "~components/Footer/Footer"
import ProjectCard from "~components/ProjectCards/ProjectCard"
import type { AllProjectResponse } from "~types/projectTypes"

export default function ExplorePage() {
  const [projects, setProjects] = useState<AllProjectResponse>()

  useEffect(() => {
    const fetchAllProjects = async () => {
      const response = await sendToBackground({
        name: "fetchAllProjects"
      })
      setProjects(response)
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
              {projects.data.map(project => (
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
