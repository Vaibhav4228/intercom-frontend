import { useEffect, useState } from "react";
import {
  Plus,

} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../stores";
import { getUserId } from "../../helper/getUserData";
import { showError, showSuccess } from "../../helper/toast-notification";
import Pagination from "../../components/admin/agent/Pagination";
import UploadDocumentModal from "../../components/admin/knowledgebase/UploadDocumentModal";
import { apiURL, apiVersion } from "../../config/get-env";
import KnowledgeBaseTable from "../../components/admin/knowledgebase/KnowledgeBaseTable";
import { getKnowledgeBases } from "../../stores/knowledgebaseSlice";


export default function KnowledgeBasePage() {

  const [open, setOpen] = useState(false);
  const userId = getUserId() as string


  function openCreate() {
    setOpen(true);
  }

  const dispatch = useDispatch<AppDispatch>();
  const { knowledgeBases, loading, pagination } = useSelector(
    (state: RootState) => state.knowledgeBase
  );


  const handlePageChange = (page: number) => {
    dispatch(
      getKnowledgeBases({
        userId,
        page,
        limit: 9,
      })
    );
  };



  useEffect(() => {
    dispatch(getKnowledgeBases({
      userId, page: 1,
      limit: 9,
    }));
  }, []);


  const handleUpload = async (formData: FormData) => {
    try {

      const response = await fetch(`${apiURL}/api/${apiVersion}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload document");
      }

      const data = await response.json();

      showSuccess("file uploaded successfully")
      console.log(data);

      dispatch(
      getKnowledgeBases({
        userId,
        page:1,
        limit: 9,
      })
    );

      setOpen(false);
    } catch (error) {
    showError("Failed to upload a file")
      console.error(error?.message);
    }
  };



  return (
    <>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Knowledgebase
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              uploaded documens
            </p>
          </div>

          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            <Plus className="w-4 h-4" />
            Upload a document
          </button>
        </div>

        {/* Cards */}

        <div className="">

          <KnowledgeBaseTable
            documents={knowledgeBases}

          />
        </div>

        <Pagination
          pagination={pagination}
          onPageChange={handlePageChange}
        />

      </div>


      <UploadDocumentModal
        open={open}
        userId={userId}
        onClose={() => setOpen(false)}
        onSubmit={handleUpload}
      />




    </>
  );
}

