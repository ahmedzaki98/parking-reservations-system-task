import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../button";
import { Table } from "@tanstack/react-table";

type PaginationProps<TData> = {
  table: Table<TData>;
};

const Pagination = <TData,>({ table }: PaginationProps<TData>) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <Button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="px-3 py-1 border rounded-lg disabled:opacity-50"
      >
        <ChevronLeftIcon className="size-4" />
        Previous
      </Button>

      <span className="text-muted-foreground">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </span>

      <Button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="px-3 py-1 border rounded-lg disabled:opacity-50"
      >
        Next
        <ChevronRightIcon className="size-4" />
      </Button>
    </div>
  );
};

export default Pagination;
