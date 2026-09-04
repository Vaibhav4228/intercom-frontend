import { ChevronLeft, ChevronRight } from "lucide-react";
import { type Pagination } from "../../../stores/agentSlice";
interface PaginationProps {
  pagination: Pagination | null;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pagination,
  onPageChange,
}: PaginationProps) {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { page, totalPages, hasNext, hasPrev } = pagination;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-8 flex items-center justify-between border-t border-slate-800 pt-6">
      <p className="text-sm text-slate-400">
        Page{" "}
        <span className="font-semibold text-white">{page}</span> of{" "}
        <span className="font-semibold text-white">{totalPages}</span>
      </p>

      <div className="flex items-center gap-2">
        <button
          disabled={!hasPrev}
          onClick={() => onPageChange(page - 1)}
          className="flex items-center gap-1 rounded-lg border border-slate-700 px-3 py-2 text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </button>

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`h-10 w-10 rounded-lg text-sm font-medium transition
              ${
                page === p
                  ? "bg-indigo-600 text-white"
                  : "border border-slate-700 text-slate-300 hover:bg-slate-800"
              }`}
          >
            {p}
          </button>
        ))}

        <button
          disabled={!hasNext}
          onClick={() => onPageChange(page + 1)}
          className="flex items-center gap-1 rounded-lg border border-slate-700 px-3 py-2 text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}