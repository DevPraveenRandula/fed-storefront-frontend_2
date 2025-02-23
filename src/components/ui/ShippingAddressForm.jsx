import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {loadStripe} from '@stripe/stripe-js';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { useCreateOrderMutation } from "@/lib/api";
import { toast } from "sonner";

// const stripePromise = loadStripe("pk_test_51QvN5EJ4LAdMXozejhKyQHNhelqNeOVdLGTTQqr7YMdtf0OCA8Fh07d03Oc65aYbbPG6C3TjAyakDQ4w8F1yquIG00ccwsfvdD");
// process.env.React_STRIPE_PUBLIC_KEY


const formSchema = z.object({
  line_1: z.string().min(1),
  line_2: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zip_code: z.string().min(1),
  phone: z.string().refine(
    (value) => {
      // This regex checks for a basic international phone number format
      return /^\+?[1-9]\d{1,14}$/.test(value);
    },
    {
      message: "Invalid phone number format",
    }
  ),
});

const ShippingAddressForm = ({ cart }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const [createOrder, { isLoading, isError, data }] = useCreateOrderMutation();
  const navigate = useNavigate();
  // console.log(cart);

  async function handleSubmit(values) {
    try {
      const response = await createOrder({
        items: cart,
        shippingAddress: {
          line_1: values.line_1,
          line_2: values.line_2,
          city: values.city,
          state: values.state,
          zip_code: values.zip_code,
          phone: values.phone,
        },
      }).unwrap();

      toast.success("Checkout successful");
      navigate("/shop/payment");
    } catch (error) {
      console.error("Error creating order: ", error);
      toast.error("Failed to process order. Please try again.");
    }
  }


  // Payment Integration Implementation
  // const handlePayment = async () => {
  //   const stripe = await stripePromise;
  //   try {
  //     const response = await fetch("/api/create-checkout-session", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ items: cart }),
  //     });
  //     const session = await response.json();
  //     await stripe.redirectToCheckout({ sessionId: session.id });
  //   } catch (error) {
  //     console.error("Error processing payment: ", error);
  //     toast.error("Payment failed. Try again later.");
  //   }
  // };


  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            <FormField
              control={form.control}
              name="line_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Line 1</FormLabel>
                  <FormControl>
                    <Input placeholder="16/1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="line_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Line 2</FormLabel>
                  <FormControl>
                    <Input placeholder="Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Kadawatha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State/Province</FormLabel>
                  <FormControl>
                    <Input placeholder="Wester Province" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="11850" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+94702700100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4">
            <Button  type="submit">Proceed to Payment</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShippingAddressForm;
