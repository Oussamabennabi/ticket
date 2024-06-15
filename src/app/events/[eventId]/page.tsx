"use client"
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useParams } from "next/navigation"
import TicketList from "~/app/_components/tickets-list"
import { api } from "~/trpc/react"

const TicketPage = () => {
  const p= useParams<{eventId:string}>()
  const tickets = api.events.getAllTicketsByEvent.useQuery(p.eventId)
  console.log(tickets)
  return (
    <div className="flex  flex-[.5] h-full flex-col gap-2  rounded-lg bg-neutral-100">
      {tickets.data&&
        <TicketList tickets={tickets.data}/>
      }
    </div>
  )
}

export default TicketPage