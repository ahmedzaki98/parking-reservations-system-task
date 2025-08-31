import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../button";

const Pagination = ({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <Button
        onClick={() => setPage(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="px-3 py-1 border rounded-lg disabled:opacity-50"
      >
        <ChevronLeftIcon className="size-4" />
        Previous
      </Button>

      <span className="text-muted-foreground">
        Page {page} of {totalPages}
      </span>

      <Button
        onClick={() => setPage(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        className="px-3 py-1 border rounded-lg disabled:opacity-50"
      >
        Next
        <ChevronRightIcon className="size-4" />
      </Button>
    </div>
  );
};

export default Pagination;
