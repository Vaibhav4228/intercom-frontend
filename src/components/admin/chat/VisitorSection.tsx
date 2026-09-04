import React from "react";

interface VisitorSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function VisitorSection({
  title,
  children,
}: VisitorSectionProps) {
  return (
    <section className="border-b border-slate-800">

      {/* Header */}

      <div className="px-6 pt-6 pb-3">

        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          {title}
        </h3>

      </div>

      {/* Content */}

      <div>
        {children}
      </div>

    </section>
  );
}