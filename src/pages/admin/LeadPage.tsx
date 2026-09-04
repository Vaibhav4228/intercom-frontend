import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../stores";
import Pagination from "../../components/admin/agent/Pagination";
import { getUserId } from "../../helper/getUserData";
import { getCustomers } from "../../stores/customerSlice";
import LeadCard from "../../components/admin/lead/LeadTable";
import LeadTable from "../../components/admin/lead/LeadTable";


export default function LeadPage() {


  const userId = getUserId() as string

  const dispatch = useDispatch<AppDispatch>();
  const { customers, loading, pagination } = useSelector(
    (state: RootState) => state.customer
  );

  
   const handlePageChange = (page: number) => {
    dispatch(
      getCustomers({
        userId,
        page,
        limit: 9,
      })
    );
  };



  useEffect(() => {
    dispatch(getCustomers({
      userId, page: 1,
      limit: 9,
    }));
  }, []);





  return (
    <>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
             Leads
            </h1>
            <p className="mt-1 text-sm text-slate-400">
             Leads Track by the agent
            </p>
          </div>

        </div>

        {/* Cards */}

        <div className="">

            <LeadTable
              customers={customers}
              
            />
        </div>

          <Pagination
          pagination={pagination}
          onPageChange={handlePageChange}
        />

      </div>

      

    </>
  );
}

