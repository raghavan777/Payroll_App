import { MdPeople, MdAttachMoney, MdAccessTime, MdAnalytics } from "react-icons/md";

export default function Dashboard() {
  const cards = [
    { title: "Employees", value: "256", icon: <MdPeople />, color: "bg-indigo-500" },
    { title: "Monthly Payroll", value: "$192k", icon: <MdAttachMoney />, color: "bg-violet-500" },
    { title: "Attendance Rate", value: "94%", icon: <MdAccessTime />, color: "bg-fuchsia-500" },
    { title: "Tax Filings", value: "On Track", icon: <MdAnalytics />, color: "bg-purple-500" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <div key={i} className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4 hover:shadow-lg transition">
            <div className={`p-3 ${c.color} text-white rounded-lg`}>
              {c.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{c.title}</p>
              <p className="text-xl font-semibold">{c.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
