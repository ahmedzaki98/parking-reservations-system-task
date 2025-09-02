import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/form/input";
import { Button } from "@/components/ui/button";
import { useAddRushHour } from "../api/add-rush-hour";  
import { SelectInput } from "@/components/form/select";

// Zod schema for validation
const schema = z
  .object({
    weekDay: z
      .object({ label: z.string(), value: z.string() })
      .nullable()
      .refine((val) => val && val.value, { message: "please select a day" }),
    from: z.string().min(1, "please enter the time"),
    to: z.string().min(1, "please enter the time"),
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

const RushHourForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      weekDay: null,
      from: "",
      to: "",
    },
  });
  const addRushHourMutation = useAddRushHour(() => reset());

  const onSubmit = async (data: FormSchema) => {
    addRushHourMutation.mutate(data);
  };

  const weekDayOptions = [
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" },
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
  ];

  return (
    <div className="m-auto flex flex-col w-full">
      <h2 className="text-primary mb-8 text-lg font-semibold">
        Add Rush Hours
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 p-4 w-full border border-border rounded-lg"
      >
        <div>
          <label className="mb-2 block">Week Day</label>
          <Controller
            name="weekDay"
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                options={weekDayOptions}
                placeholder="Select a day"
                onChange={(val) => field.onChange(val)}
              />
            )}
          />
          {errors.weekDay && (
            <p className="text-red-500 text-sm">{errors.weekDay.message}</p>
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
            disabled={addRushHourMutation.isPending}
            className="min-w-36 bg-primary text-muted rounded-lg text-lg p-3"
          >
            Add Rush Hour
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RushHourForm;
