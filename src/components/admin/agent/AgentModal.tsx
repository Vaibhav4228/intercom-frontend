import { X, ArrowRight, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export interface AgentFormValues {
    userId:string
  name: string;
  category: string;
  goal: string;
  persona: string;
  companyContext: string;
}

interface AgentModalProps {
    userId:string
  open: boolean;
  editing?: boolean;
  defaultValues?: Partial<AgentFormValues>;
  onClose: () => void;
  onSubmit: (data: AgentFormValues) => Promise<void> | void;
}

export default function AgentModal({
    userId,
  open,
  editing = false,
  defaultValues,
  onClose,
  onSubmit,
}: AgentModalProps) {
    

  const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
} = useForm<AgentFormValues>({
  defaultValues: {
    userId,
    name: "",
    category: "",
    goal: "",
    persona: "",
    companyContext: "",
  },
});

useEffect(() => {
  reset({
    userId,
    name: defaultValues?.name ?? "",
    category: defaultValues?.category ?? "",
    goal: defaultValues?.goal ?? "",
    persona: defaultValues?.persona ?? "",
    companyContext: defaultValues?.companyContext ?? "",
  });
}, [defaultValues, userId, reset]);

  const handleFormSubmit = async (data: AgentFormValues) => {
    await onSubmit(data);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <h2 className="text-lg font-semibold text-white">
            {editing ? "Edit Agent" : "Create Agent"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-1 flex-col"
        >
          {/* Body */}
          <div className="flex-1 overflow-y-auto space-y-5 p-6">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">
                Name
              </label>

              <input
                type="text"
                placeholder="Enter agent name"
                {...register("name", {
                  required: "Agent name is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters",
                  },
                })}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-white placeholder:text-sm placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />

              {errors.name && (
                <p className="text-xs text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">
                Category
              </label>

              <input
                type="text"
                placeholder="Support, Sales, Marketing..."
                {...register("category", {
                  required: "Category is required",
                })}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-white placeholder:text-sm placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />

              {errors.category && (
                <p className="text-xs text-red-400">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Goal */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">
                Goal
              </label>

              <textarea
                rows={1.5}
                placeholder="What is this agent trying to achieve?"
                {...register("goal", {
                  required: "Goal is required",
                  minLength: {
                    value: 10,
                    message: "Please provide a more detailed goal",
                  },
                })}
                className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white placeholder:text-sm placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />

              {errors.goal && (
                <p className="text-xs text-red-400">
                  {errors.goal.message}
                </p>
              )}
            </div>

            {/* Persona */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">
                Persona
              </label>

              <textarea
                rows={1.5}
                placeholder="Describe the agent's personality"
                {...register("persona", {
                  required: "Persona is required",
                  minLength: {
                    value: 10,
                    message: "Please provide more details",
                  },
                })}
                className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white placeholder:text-sm placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />

              {errors.persona && (
                <p className="text-xs text-red-400">
                  {errors.persona.message}
                </p>
              )}
            </div>

            {/* Company Context */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">
                Company Context
              </label>

              <textarea
                rows={1.5}
                placeholder="Describe your company, products, customers..."
                {...register("companyContext", {
                  required: "Company context is required",
                  minLength: {
                    value: 20,
                    message: "Please provide more company information",
                  },
                })}
                className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white placeholder:text-sm placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />

              {errors.companyContext && (
                <p className="text-xs text-red-400">
                  {errors.companyContext.message}
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-slate-800 px-6 py-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 transition hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  {editing ? "Saving..." : "Creating..."}
                </>
              ) : (
                <>
                  {editing ? "Save Changes" : "Create Agent"}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}