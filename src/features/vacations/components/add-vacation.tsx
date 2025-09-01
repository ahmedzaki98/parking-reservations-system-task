import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/form/input";
import { Button } from "@/components/ui/button";
import { useAddVacation } from "../api/add-vacation";

// Zod schema for validation
const schema = z
  .object({
    name: z.string().min(1, "please enter the name"),
    from: z.string().min(1, "please select a time"),
    to: z.string().min(1, "please select a time"),
  })
  .refine(
    (data) => {
      const toMinutes = (time: string) => {
        const [h, m] = time.split(":").map(Number);
        return h * 60 + m;
      };
      return toMinutes(data.to) > toMinutes(data.from);
    },
    {
      message: "'To' time must be after 'From' time",
      path: ["to"],
    }
  );

export type FormSchema = z.infer<typeof schema>;

const AddVacationForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      from: "",
      to: "",
    },
  });
  const addAddVacationMutation = useAddVacation(() => reset());

  const onSubmit = async (data: FormSchema) => {
    addAddVacationMutation.mutate(data);
  };

  return (
    <div className="m-auto flex flex-col w-full">
      <h2 className="text-primary mb-8 text-lg font-semibold">Add Vacations</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 p-4 w-full border border-border rounded-lg"
      >
        <div>
          <label className="mb-2 block">Name</label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Vacation Name"
            registration={register("name")}
            className="border p-2 w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block">From</label>
          <Controller
            name="from"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="from"
                type="time"
                placeholder="08:00"
                step={60}
              />
            )}
          />
          {errors.from && (
            <p className="text-red-500 text-sm">{errors.from.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block">To</label>
          <Controller
            name="to"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="to"
                type="time"
                placeholder="10:00"
                step={60}
              />
            )}
          />
          {errors.to && (
            <p className="text-red-500 text-sm">{errors.to.message}</p>
          )}
        </div>
        <div className="w-full mt-10 flex justify-end">
          <Button
            type="submit"
            disabled={addAddVacationMutation.isPending}
            className="min-w-36 bg-primary text-muted rounded-lg text-lg p-3"
          >
            Add Vacation
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddVacationForm;
