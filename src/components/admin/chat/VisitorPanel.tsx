
import VisitorProfile from "./VisitorProfile";


export default function VisitorPanel() {
  return (
    <aside className="flex h-full w-full flex-col bg-slate-950">

      {/* Scrollable */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">

        {/* ================= PROFILE ================= */}

        <VisitorProfile />

        {/* ================= COLLECTED FIELDS ================= */}

  
     

      </div>

    </aside>
  );
}