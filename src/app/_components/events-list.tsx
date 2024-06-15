/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import React from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { api } from "~/trpc/server";

const EventsList = async () => {
  const events = await api.events.getAllEvents();
  return (
    <ScrollArea className="flex h-full flex-[.5] pr-5 flex-col gap-2 rounded-lg bg-neutral-100">
      {events.map((event) => (
        <Link key={event.id} href={"/events/" + event.id}>
          <div className=" mb-2  flex w-full cursor-pointer rounded-lg bg-white p-2 transition-all hover:bg-white/60">
            {/* time */}
            <div className="max-w-32 p-2 ">{event.date.toLocaleString()}</div>
            <div className="flex flex-col items-start gap-1">
              <h3 className="text-xl font-bold">{event.name}</h3>
              <p className="text-gray-600">{event.location}</p>
              <p className="truncate text-gray-500">{event.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </ScrollArea>
  );
};

export default EventsList;
