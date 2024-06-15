"use client"
import { z } from "zod"
import { api } from "~/trpc/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "enter a valid email.",
  }),
  address: z.string().min(2, {
    message: "enter a valid address.",
  }),
})
const Checkout = () => {
  const items = api.orders.getAllOrdersItems.useQuery()
  const router = useRouter()
  const mutate = api.orders.createOrder.useMutation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      address:"",
      email:""
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate.mutate({
      username: values.username,
      address:values.address,
      email:values.email
    })
    router.replace("/events")
  }
  return (
    <div className="md:flex-row flex-col container flex items-start justify-between gap-16 p-6">
      {/* info */}
      <div className="flex-1 w-full order-1 md:order-2">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="ousama" {...field} />
              </FormControl>
        
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="oussama@g.com" {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Street 123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
      </div>
      {/* items */}
      <div className="flex-1 w-full md:flex-[.5]">
        <h2>Tickets Summary</h2>
        <hr />
        {items.isLoading&&<Loader2 className="animate-spin"/>}
        {items.data&&items.data.length>=0&&items.data.map(item=>(<div
            key={item.id}
            className="relative mb-2 flex w-full cursor-pointer flex-col  rounded-lg bg-white p-2 transition-all hover:bg-white/60"
          >
            <h2 className="text-xl">{item.tiket.name}</h2>
            <span className="text-2xl font-bold text-green-500">
              ${item.tiket.price}
            </span>
            
          </div>))}
      </div>
    </div>
  )
}

export default Checkout