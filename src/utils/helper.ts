export const getInitialColumnVisibility = (
  roles: ("admin" | "employee")[],
  columns: Record<string, boolean>,
  keysToDisable: string[],
  CurrentRole: "admin" | "employee" | null | undefined
) => {
  const columnsUpdate = { ...columns };

  if (CurrentRole && roles.includes(CurrentRole)) {
    for (const key of keysToDisable) {
      columnsUpdate[key] = false;
    }
  }

  return columnsUpdate;
};

export function removeEmptyKeys<
  T extends Record<
    string,
    string | number | boolean | null | undefined | unknown
  >
>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
  ) as Partial<T>;
}

export const selectStyle = {
  // border: error ? "1px solid #FF4D4F" : "1px solid #0F598A",
  backgroundColor: "black",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  color: "white",
  height: 36,
};
export const singleValueStyle = {
  padding: "8px",
  color: "white",
};
export const optionStyle = {
  color: "white",
  backgroundColor: "black",
  ":hover": {
    backgroundColor: "white",
    color: "black",
  },
};
