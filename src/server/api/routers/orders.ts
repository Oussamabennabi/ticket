import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ordersRouter = createTRPCRouter({


  addToOrder: publicProcedure.input(z.object({
    quntity: z.number(),
    ticketId: z.string()
  })).mutation(({ ctx, input }) => {
    return ctx.db.ticketOrder.create({
      data: {
        quantity: input.quntity,
        ticketId: input.ticketId,
      },
    })
  }),
  createOrder: publicProcedure.input(z.object({
    username: z.string(),
      address:z.string(),
      email:z.string()
  })).mutation(async ({ ctx,input }) => {
    // get all the tocket orders
    const ticketsOrder = await ctx.db.ticketOrder.findMany({ include: { tiket: { include: { event: true } } } })
    if (ticketsOrder.length <= 0) throw new TRPCError({ code: "NOT_FOUND", message: "there is no items yet please add to your cart" })
    console.log(ticketsOrder)
    return ctx.db.order.create({
      data: {

        address:input.address,
        username:input.username,
        email:input.email,
        ticketOrder:{
          connect:ticketsOrder.map(t=>({id:t.id}))
        }

      }
    })
  }),
  getAllOrdersItems: publicProcedure.query(({ ctx }) => {
    return ctx.db.ticketOrder.findMany({
      include: {
        tiket: true
      }

    })
  }),


  getAllOrders: publicProcedure.query(({ ctx }) => {
    return ctx.db.order.findMany({
      include: {
        ticketOrder: true
      }
    })
  }),


});