/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Ticket } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { api } from "~/trpc/react";
const TicketCard = ({ ticket }: { ticket: Ticket }) => {
  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);
  const addToOrder = api.orders.addToOrder.useMutation();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(value);
    if (value === "0") {
      return;
    } else {
      addToOrder.mutate({ quntity: +value, ticketId: ticket.id });
      setOpen(false);
    }
  };

  useEffect(() => {
    if (ticket.quantity === 0) {
      setValue("0");
    }
  }, [ticket.quantity]);
  return (
    <>
      <Dialog onOpenChange={(b) => setOpen(b)} open={open}>
        <DialogTrigger asChild>
          <div
            key={ticket.id}
            className="relative mb-2 flex w-full cursor-pointer flex-col  rounded-lg  p-2 transition-all bg-white/60 hover:bg-white/50"
          >
            <h2 className="text-xl">{ticket.name}</h2>
            <span className="text-2xl font-bold text-green-500">
              ${ticket.price}
            </span>
            <small className="">{ticket.quantity} left.</small>
            <Badge
              className={cn(
                "absolute right-0 top-0",
                ticket.availability === "AVAILABLE" && "bg-green-500",
                ticket.availability === "SOLD_OUT" && "bg-red-500",
                ticket.availability === "RESERVED" && "bg-yellow-500",
                ticket.availability === "PENDING" && "bg-orange-500",
              )}
            >
              {ticket.availability}
            </Badge>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>{ticket.name}</DialogTitle>

              <div className=" mb-2 flex w-full flex-col p-2 ">
                <div className="mb-3 flex items-end gap-2">
                  <span className="text-2xl font-bold text-green-500">
                    ${ticket.price}
                  </span>
                  <small className="">{ticket.quantity} left.</small>
                </div>
                <Badge
                  className={cn(
                    "w-fit",
                    ticket.availability === "AVAILABLE" && "bg-green-500",
                    ticket.availability === "SOLD_OUT" && "bg-red-500",
                    ticket.availability === "RESERVED" && "bg-yellow-500",
                    ticket.availability === "PENDING" && "bg-orange-500",
                  )}
                >
                  {ticket.availability}
                </Badge>
              </div>
            </DialogHeader>

            <div className="flex items-center justify-between gap-4 py-4">
              <div>
                <Label htmlFor="q" className="text-right">
                  How many tickets?
                </Label>
                <DialogDescription>
                  choose how many tickets you want to buy below.
                </DialogDescription>
              </div>
              <Select
                defaultValue={`${1}`}
                value={value}
                onValueChange={(v) => setValue(v)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {(ticket.availability === "SOLD_OUT" ||
                      ticket.availability === "RESERVED") && (
                      <SelectLabel>"no tickets left."</SelectLabel>
                    )}
                    {Array.from(
                      { length: ticket.quantity },
                      (v, i) => i + 1,
                    ).map((i) => (
                      <SelectItem key={i} value={`${i}`}>
                        {i}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button
                disabled={
                  ticket.availability === "SOLD_OUT" ||
                  ticket.availability === "RESERVED" ||
                  addToOrder.isPending
                }
                type="submit"
              >
                Buy
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TicketCard;
