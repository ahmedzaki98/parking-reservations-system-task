
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
