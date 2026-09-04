import { User, Mail } from "lucide-react";
import type { ICustomer } from "../../../stores/customerSlice";


interface LeadTableProps {
  customers: ICustomer[];
}

export default function LeadTable({ customers }: LeadTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <table className="min-w-full divide-y divide-slate-800">
        <thead className="bg-slate-950">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              Customer
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
              Email
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800">
          {customers.map((customer) => (
            <tr
              key={customer._id}
              className="transition hover:bg-slate-800/40"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600/10 text-indigo-400">
                    <User className="h-5 w-5" />
                  </div>

                  <span className="font-medium text-white">
                    {customer.firstName} {customer.lastName}
                  </span>
                </div>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <Mail className="h-4 w-4" />
                  <span>{customer.email}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}