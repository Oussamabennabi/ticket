/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Ticket } from "@prisma/client";
import React from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import TicketCard from "./ticket-card";

const TicketList = ({ tickets }: { tickets: Ticket[] }) => {
  return (
    <ScrollArea className="h-full pr-5">
      {tickets.map((ticket) => (
        <TicketCard ticket={ticket} key={ticket.id}/>
      ))}
    </ScrollArea>
  );
};

export default TicketList;
