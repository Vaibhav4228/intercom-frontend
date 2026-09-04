import { FileText, Trash2, Download } from "lucide-react";

export interface KnowledgeBase {
  _id: string;
  fileName: string;
  userId: string;
}

interface KnowledgeBaseTableProps {
  documents: KnowledgeBase[];

}

export default function KnowledgeBaseTable({
  documents,
  
}: KnowledgeBaseTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <table className="w-full">
        <thead className="border-b border-slate-800 bg-slate-950">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">
              Document
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">
              User ID
            </th>

            <th className="px-6 py-4 text-right text-sm font-medium text-slate-400">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {documents.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                className="px-6 py-12 text-center text-slate-500"
              >
                No uploaded documents.
              </td>
            </tr>
          ) : (
            documents.map((doc) => (
              <tr
                key={doc._id}
                className="border-b border-slate-800 transition hover:bg-slate-800/40 last:border-0"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-indigo-600/20 p-2">
                      <FileText className="h-5 w-5 text-indigo-400" />
                    </div>

                    <div>
                      <p className="font-medium text-white">
                        {doc.fileName}
                      </p>

                      <p className="text-xs text-slate-500">
                        {doc._id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-slate-400">
                  {doc.userId}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                  

                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}