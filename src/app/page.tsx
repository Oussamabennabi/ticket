"use client"
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import TicketCard from "./_components/ticket-card";
import { ScrollArea } from "~/components/ui/scroll-area";

export default  function Home() {
    const data =  api.events.getAllEvents.useQuery()
  return (
    <>
      <ScrollArea className=" min-h-screen bg-neutral-100  ">
        <div className="container pt-4 flex items-center justify-between">
          <h2 className="text-center sm:text-5xl text-2xl font-bold ">Events</h2>
          <Link href={"/checkout"}>
            <Button>Checkout</Button>
          </Link>
        </div>
        <hr />
        <section className="container px-2 mt-10 flex  w-full flex-col items-start justify-center gap-5 md:flex-row">
          <Accordion type="single" collapsible className="w-full">
                {data.data?data.data.map(event=>(
            <AccordionItem value={event.id} key={event.id} >
              <AccordionTrigger>
              <div className=" mb-2  flex w-full cursor-pointer rounded-lg  p-2 transition-all ">
            {/* time */}
            <div className="max-w-32 p-2 ">{event.date.toLocaleString()}</div>
            <div className="flex flex-col items-start gap-1">
              <h3 className="text-xl font-bold">{event.name}</h3>
              <p className="text-gray-600">{event.location}</p>
              <p className="truncate text-gray-500">{event.description}</p>
            </div>
          </div>
              </AccordionTrigger>
              <AccordionContent>
                <ScrollArea role="list" className="max-h-80 my-4">
                    {event.Ticket&&event.Ticket.length>=0&&event.Ticket.map(t=>(
                        <TicketCard key={t.id} ticket={t}/>
                    ))}
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>

                )):""}
          </Accordion>
        </section>
      </ScrollArea>
    </>
  );
}
