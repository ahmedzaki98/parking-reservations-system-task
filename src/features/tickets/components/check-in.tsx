import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useGateOptions from "../hooks/use-get-gates";
import useZoneByGateOptions from "../hooks/use-zone-options";
import { getSubscriptionView } from "@/features/subscription/api/view";
import { useMutation } from "@tanstack/react-query";
import ShowToast from "@/components/ui/toast";
import { useCheckIn } from "../api/create-check-in";
import { Input } from "@/components/form/input";
import { Button } from "@/components/ui/button";
import { SelectInput } from "@/components/form/select";

const schema = z
  .object({
    gateId: z
      .object({ label: z.string(), value: z.string() })
      .nullable()
      .refine((val) => val && val.value, { message: "please select gate" }),
    zoneId: z
      .object({ label: z.string(), value: z.string() })
      .nullable()
      .refine((val) => val && val.value, { message: "please select zone" }),
    type: z.enum(["visitor", "subscriber"]),
    subscriptionId: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "subscriber" && !data.subscriptionId) {
      ctx.addIssue({
        path: ["subscriptionId"],
        code: z.ZodIssueCode.custom,
        message: "Subscription ID required for subscriber",
      });
    }
  });
type FormSchema = z.infer<typeof schema>;

const CheckInForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      gateId: null,
      zoneId: null,
      type: "visitor",
      subscriptionId: "",
    },
  });

  const selectedGate = watch("gateId")?.value;
  const selectedType = watch("type");

  const { gatesOptions } = useGateOptions();
  const { zonesOptions } = useZoneByGateOptions(selectedGate);

  const validateSubscriptionId = useMutation({
    mutationFn: (id: string) => getSubscriptionView(id),
  });

  const checkInMutation = useCheckIn(() => reset());

  const onSubmit = async (data: FormSchema) => {
    const payload = {
      gateId: data.gateId?.value,
      zoneId: data.zoneId?.value,
      type: data.type,
      subscriptionId: data.subscriptionId || "",
    };
    if (data.type === "subscriber" && data.subscriptionId) {
      try {
        await validateSubscriptionId.mutateAsync(data.subscriptionId);
      } catch {
        ShowToast({ type: "error", message: "Invalid subscription ID" });
        return;
      }
    }
    checkInMutation.mutate(payload);
  };

  return (
    <div className="m-auto flex flex-col w-full">
      <h2 className="text-primary mb-8 text-lg font-semibold">Add Check In</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 p-4 w-full border border-border rounded-lg"
      >
        {/* Gate Select */}
        <div>
          <label className="mb-2 block">Gate</label>
          <Controller
            name="gateId"
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                options={gatesOptions}
                placeholder="Select Gate"
                onChange={(val) => {
                  field.onChange(val);
                  setValue("zoneId", null);
                }}
              />
            )}
          />
          {errors.gateId && (
            <p className="text-red-500 text-sm">{errors.gateId.message}</p>
          )}
        </div>

        {/* Zone Select */}
        <div>
          <label className="mb-2 block">
            Zone /
            <span className="text-[12px] italic text-muted-foreground">
              please select gate first
            </span>
          </label>
          <Controller
            name="zoneId"
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                options={zonesOptions}
                placeholder="Select Zone"
                onChange={(val) => field.onChange(val)}
                disabled={!selectedGate}
              />
            )}
          />
          {errors.zoneId && (
            <p className="text-red-500 text-sm">{errors.zoneId.message}</p>
          )}
        </div>

        {/* Type Radio */}
        <div>
          <label className="mb-2 block">Type</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <Input
                className="size-3.5"
                type="radio"
                value="visitor"
                registration={register("type")}
              />
              Visitor
            </label>
            <label className="flex items-center gap-1">
              <Input
                className="size-3.5"
                type="radio"
                value="subscriber"
                registration={register("type")}
              />
              Subscriber
            </label>
          </div>
          {errors.type && <p className="text-red-500">{errors.type.message}</p>}
        </div>

        {selectedType === "subscriber" && (
          <div>
            <label className="mb-2 block">Subscription ID</label>
            <Input
              type="text"
              name="subscriptionId"
              placeholder="Enter Subscription ID"
              registration={register("subscriptionId")}
              className="border p-2 w-full"
            />
            {errors.subscriptionId && (
              <p className="text-red-500 text-sm">
                {errors.subscriptionId.message}
              </p>
            )}
          </div>
        )}

        <div className="w-full mt-10 flex justify-end">
          <Button
            type="submit"
            disabled={checkInMutation.isPending}
            className="min-w-36 bg-primary text-muted rounded-lg text-lg p-3"
          >
            Check In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CheckInForm;
