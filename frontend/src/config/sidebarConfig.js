export const sidebarItems = {
  SUPER_ADMIN: [
    { label: "Dashboard", path: "/dashboard", icon: "MdDashboard", permission: "view_reports" },
    { label: "Users", path: "/users", icon: "MdPeople", permission: "manage_users" },
    { label: "Attendance", path: "/attendance", icon: "MdAccessTime", permission: "approve_attendance" },
    { label: "Payroll", path: "/payroll", icon: "MdAttachMoney", permission: "run_payroll" },
    { label: "Settings", path: "/settings", icon: "MdSettings", permission: "manage_org" },
    {
      label: "Add Employee",
      path: "/add-employee",
      permission: "ADD_USER"
    } 
  ],

  HR_ADMIN: [
    { label: "Dashboard", path: "/dashboard", icon: "MdDashboard", permission: "view_reports" },
    { label: "Users", path: "/users", icon: "MdPeople", permission: "manage_employee_profiles" },
    { label: "Attendance", path: "/attendance", icon: "MdAccessTime", permission: "approve_attendance" },
    { label: "Payroll", path: "/payroll", icon: "MdAttachMoney", permission: "generate_payslips" },
    {
      label: "Add Employee",
      path: "/add-employee",
      permission: "ADD_USER"
    }
  ],

  PAYROLL_ADMIN: [
    { label: "Dashboard", path: "/dashboard", icon: "MdDashboard", permission: "view_reports" },
    { label: "Payroll", path: "/payroll", icon: "MdAttachMoney", permission: "run_payroll" },
    { label: "Reports", path: "/reports", icon: "MdAssessment", permission: "view_reports" },
  ],

  MANAGER: [
    { label: "Dashboard", path: "/dashboard", icon: "MdDashboard", permission: "view_self" },
    { label: "Attendance", path: "/attendance", icon: "MdAccessTime", permission: "approve_attendance" },
    { label: "Team", path: "/team", icon: "MdGroup", permission: "approve_leave" },
  ],

  EMPLOYEE: [
    { label: "Dashboard", path: "/dashboard", icon: "MdDashboard", permission: "view_self" },
    { label: "Attendance", path: "/attendance", icon: "MdAccessTime", permission: "view_self" },
    { label: "Profile", path: "/profile", icon: "MdPerson", permission: "view_self" },
  ],
};
