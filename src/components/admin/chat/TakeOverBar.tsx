import { Headphones } from "lucide-react";

export default function TakeOverBar() {
  return (
    <div className="border-t border-slate-800 bg-slate-950 p-3">

      <button className="flex h-10 w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 font-medium text-white transition hover:bg-indigo-500">

        <Headphones size={18} />

         Take over the chat

      </button>

    </div>
  );
}