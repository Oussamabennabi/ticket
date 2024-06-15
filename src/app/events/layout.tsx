"use client"
import { Button } from "~/components/ui/button";
import EventsList from "../_components/events-list";
import Link from "next/link";

export default  function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main className=" min-h-screen p-4  bg-neutral-100">
      <div className="flex items-center justify-between container">
      <h2 className="text-center text-5xl font-bold">Browse Events</h2>
      <Link href={"/checkout"}>
<Button >Checkout</Button>
      </Link>
      </div>
    <hr />
      <section className="md:flex-row flex-col mt-10 container flex w-full items-start gap-5 h-[calc(100vh-200px)] justify-center">
        <EventsList />
          {children}
      </section>
    </main>
  );
}
