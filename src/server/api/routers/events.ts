import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const eventsRouter = createTRPCRouter({
  getAllTicketsByEvent: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.ticket.findMany({
      where: {
        eventId: input
      }
    })
  }),


  getAllEvents: publicProcedure.query(({ ctx }) => {
    return ctx.db.event.findMany({include:{Ticket:true}})
  }),


});