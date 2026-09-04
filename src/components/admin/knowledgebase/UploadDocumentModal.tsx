import { X, Upload, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export interface UploadDocumentFormValues {
  userId: string;
  file: FileList;
}

interface UploadDocumentModalProps {
  userId: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void> | void;
}

export default function UploadDocumentModal({
  userId,
  open,
  onClose,
  onSubmit,
}: UploadDocumentModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UploadDocumentFormValues>({
    defaultValues: {
      userId,
    },
  });

  useEffect(() => {
    reset({
      userId,
    });
  }, [userId, reset]);

  const handleFormSubmit = async (data: UploadDocumentFormValues) => {
    const formData = new FormData();

    formData.append("userId", data.userId);
    formData.append("file", data.file[0]);

    await onSubmit(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <h2 className="text-lg font-semibold text-white">
            Upload Document
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {/* Body */}
          <div className="space-y-5 p-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">
                Select Document
              </label>

              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt,.md"
                {...register("file", {
                  required: "Please select a document.",
                })}
                className="block w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-500"
              />

              <p className="text-xs text-slate-500">
                Supported formats: PDF, DOC, DOCX, TXT, MD
              </p>

              {errors.file && (
                <p className="text-xs text-red-400">
                  {errors.file.message}
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
                  Uploading...
                </>
              ) : (
                <>
                  Upload Document
                  <Upload className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}