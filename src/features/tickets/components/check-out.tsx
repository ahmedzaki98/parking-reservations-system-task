import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/form/input";
import { Button } from "@/components/ui/button";
import { useCheckOut } from "@/features/tickets/api/create-check-out";

const schema = z.object({
  ticketId: z.string().min(1, "please enter the ticket ID"),
});

type FormSchema = z.infer<typeof schema>;

const CheckOutForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      ticketId: "",
    },
  });

  const checkOutMutation = useCheckOut(() => reset());

  const onSubmit = async (data: FormSchema) => {
    const id = data.ticketId;
    checkOutMutation.mutate({ id });
  };

  return (
    <div className="m-auto flex w-[95vw] flex-col md:w-full">
      <h2 className="text-primary mb-8 text-lg font-semibold">Add Check Out</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 p-4 w-full border border-border rounded-lg"
      >
        <label className="mb-2 block">Ticket ID</label>
        <Input
          type="text"
          name="ticketId"
          id="ticketId"
          placeholder="Enter Ticket ID"
          registration={register("ticketId")}
          className="border p-2 w-full"
        />
        {errors.ticketId && (
          <p className="text-red-500 text-sm">{errors.ticketId.message}</p>
        )}

        <div className="w-full mt-10 flex justify-end">
          <Button
            type="submit"
            disabled={checkOutMutation.isPending}
            className="min-w-36 bg-primary text-muted rounded-lg text-lg p-3"
          >
            Check Out
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckOutForm;
