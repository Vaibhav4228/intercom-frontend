
import TestChatWindow from "../../components/admin/chat/TestChatWindow";
import { getAgents, type IAgent } from "../../stores/agentSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../stores";
import { useEffect, useState } from "react";
import { getUserId } from "../../helper/getUserData";

export default function TestAgentPage() {


    

    const userId=getUserId() as string
    const dispatch = useDispatch<AppDispatch>();
    const { agents, loading, pagination } = useSelector(
        (state: RootState) => state.agent
    );

    useEffect(() => {
        dispatch(getAgents({
            userId, page: 1,
            limit: 9,
        }));
    }, []);


    const [selectedAgent, setSelectedAgent] = useState("");

    return (
        <>
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">
                            Test Agent
                        </h1>
                        <p className="mt-1 text-sm text-slate-400">
                            Check an agent if it works as expected
                        </p>
                    </div>

                </div>

                {/* Cards */}


                <div className="h-[calc(100vh-120px)] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 flex">

                    <div className="flex-1 min-w-0">
                        {selectedAgent ?
                        <TestChatWindow agentId={selectedAgent} /> : ""}
                    </div>

                    <div className="">
                        
                        <label className="mb-2 block text-sm font-medium text-slate-300">
                            AI Agent
                        </label>

                        <select
                            value={selectedAgent}
                            onChange={(e) => setSelectedAgent(e.target.value)}
                            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        >
                            <option value="">Select an agent</option>

                            {agents.map((agent: IAgent) => (
                                <option key={agent._id} value={agent._id}>
                                    {agent.name}
                                </option>
                            ))}
                        </select>

                    </div>

                </div>




            </div>



        </>
    );
}

