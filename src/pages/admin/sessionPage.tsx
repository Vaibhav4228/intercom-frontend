

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../stores";
import { getUserId } from "../../helper/getUserData";
import { getSessions } from "../../stores/sessionSlice";
import SessionTable from "../../components/admin/session/SessionTable";
import Pagination from "../../components/admin/agent/Pagination";
export default function SessionPage() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    sessions,
    loading,
    pagination,
  } = useSelector(
    (state: RootState) => state.session
  );


  const handlePageChange = (page: number) => {
    dispatch(
      getSessions({
        page,
        limit: 9,
      })
    );
  };


  useEffect(() => {
    dispatch(
      getSessions({
        page: 1,
        limit: 9,
      })
    );
  }, [dispatch]);


  return (
    <>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Sessions
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Manage agent conversations and sessions
            </p>
          </div>
        </div>


        {/* Table */}
        <div>
          <SessionTable
            sessions={sessions}
          />
        </div>


        {/* Pagination */}
        <Pagination
          pagination={pagination}
          onPageChange={handlePageChange}
        />

      </div>
    </>
  );
}