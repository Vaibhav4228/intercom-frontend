import { useEffect, useState } from "react";
import {
  Plus,

} from "lucide-react";
import AgentCard, { type Agent } from "../../components/admin/agent/AgentCard";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../stores";
import { getAgents } from "../../stores/agentSlice";
import AgentModal, { type AgentFormValues } from "../../components/admin/agent/AgentModal";
import { getUserId } from "../../helper/getUserData";
import { makeHttpReq } from "../../helper/makeHttpReq";
import { showError, showSuccess } from "../../helper/toast-notification";
import Pagination from "../../components/admin/agent/Pagination";


export default function AgentsPage() {

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Agent | null>(null);
  const userId = getUserId() as string


  function openCreate() {
    setEditing(null);
    setOpen(true);
  }

  const dispatch = useDispatch<AppDispatch>();
  const { agents, loading, pagination } = useSelector(
    (state: RootState) => state.agent
  );

  
   const handlePageChange = (page: number) => {
    dispatch(
      getAgents({
        userId,
        page,
        limit: 9,
      })
    );
  };



  useEffect(() => {
    dispatch(getAgents({
      userId, page: 1,
      limit: 9,
    }));
  }, []);




  const handleCreateOrUpdateAgent = async (data: AgentFormValues) => {
    try {

      if (editing) {
        const res = await makeHttpReq(
          "PUT",
          `agents/${editing._id}`,
          data
        );

        showSuccess((res as Error)?.message)
      } else {

        const res = await makeHttpReq("POST", "agents", data);
        showSuccess((res as Error)?.message)
        setOpen(false);

      }

      dispatch(getAgents({
        userId, page: 1,
        limit: 9,
      }));
    } catch (error) {
      showError('failed to create a user')
    }


  };

  return (
    <>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              AI Agents
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Create and manage AI agents for your workspace.
            </p>
          </div>

          <button
            onClick={openCreate}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
          >
            <Plus className="w-4 h-4" />
            New Agent
          </button>
        </div>

        {/* Cards */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">


          {agents.map((agent) => (
            <AgentCard
              key={agent._id}
              agent={agent}
              onEdit={(agent) => {
                setEditing(agent);
                setOpen(true);
              }}
            />
          ))}
        </div>

          <Pagination
          pagination={pagination}
          onPageChange={handlePageChange}
        />

      </div>

      {/* Modal */}
      <AgentModal
        editing={!!editing}
        defaultValues={editing as Agent}
        userId={userId as string}
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleCreateOrUpdateAgent}
      />




    </>
  );
}

