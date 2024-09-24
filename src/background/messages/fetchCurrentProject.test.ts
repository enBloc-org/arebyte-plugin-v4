import { describe, expect, it, jest } from "@jest/globals"
import fetchMock from "jest-fetch-mock"

import type { PlasmoMessaging } from "@plasmohq/messaging"

import handler from "./fetchCurrentProject"
import { ProjectResponse } from "~types/projectTypes"

fetchMock.enableMocks()

describe("fetchCurrentProject", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it("returns a project object to the front from our api", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: {
          id: 5,
          title: "Minimal Rituals",
          description: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "Minimal Rituals is an exhibition that blurs the boundaries between humans, animals, and machines, and invites us to consider the ways in which technology can be used to reconnect with ourselves and each other through the mineral computation that surrounds us. Featuring a curated selection of works by Latin American artists, the exhibition celebrates the delicate encounters and serendipitous rituals that unfold at our fingertips while navigating the web."
                }
              ]
            },
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "The artists in Minimal Rituals employ various mediums such as video, AI, sound, writing, and performance to transport us to alternate worlds where technology and ritual merge to create new forms of connection and community. By embracing the potential of technology to foster meaningful connections, the exhibition challenges us to reflect on how we can use technology to create a more interconnected and sustainable future."
                }
              ]
            },
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "–"
                }
              ]
            },
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "As I type these words, I am struck by a sense of wonder: where am I when I go online? Is my location defined by my physical body or my intangible thoughts and experiences? Where are we when we connect through the screen? While these questions may seem simplistic in the context of technological advancements and ubiquitous internet access, they hold a deeper conversation about the nature of self."
                }
              ]
            },
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "Drawing on the reflections of artist Fabiane M. Borges and anthropologist Eduardo Viveiros de Castro, we can explore the connection between technological innovation and shamanic ritual practices, particularly within the context of indigenous knowledge. The union of techno and shamanism can be approached from three perspectives:"
                }
              ]
            },
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "The techno of shamanism, where shamanism is seen as a technology for knowledge production, encompassing the construction of stories, mythologies, medicine, data collection, artifact creation, and the creation of modes of existence; the shamanism of technology, which involves the pursuit of shamanic powers through the use of technology, incorporating theories such as parallel universes, strings, and other concepts that align with shamanic ontology; and the combination of these two fields of knowledge, historically obstructed by religious and colonial forces, such as the Church and later, science, during the transition from the Middle Ages to the Renaissance (M. Borges, 2015)."
                }
              ]
            },
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "The name of this exhibition was borrowed from the hand poke tattoo and ritual project by artist Vera Primavera."
                }
              ]
            }
          ],
          launch_date: "2024-10-02",
          createdAt: "2024-09-20T12:46:16.034Z",
          updatedAt: "2024-09-20T12:46:24.665Z",
          publishedAt: "2024-09-20T12:46:24.664Z"
        },
        meta: {}
      })
    )

    const req: PlasmoMessaging.Request = {
      name: "fetchCurrentProject"
    }

    const res: PlasmoMessaging.Response = {
      send: jest.fn((object:ProjectResponse) => object)
    }

    await handler(req, res)

    expect(fetch).toHaveBeenCalled()
    expect(res.send).toHaveBeenCalled()
  })
})
