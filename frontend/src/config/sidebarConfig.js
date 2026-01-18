export const sidebarItems = {
  SUPER_ADMIN: [
<<<<<<< HEAD
    { path: "/dashboard", label: "Dashboard", icon: "MdDashboard" },
    { path: "/users", label: "User Management", icon: "MdPeople" },
    { path: "/tax-slab", label: "Tax Slab", icon: "MdPayments" },
    { path: "/statutory", label: "Statutory Config", icon: "MdGavel" },
    { path: "/run-payroll", label: "Run Payroll", icon: "MdAttachMoney" },
    { path: "/add-employee", label: "Add Employee", icon: "MdPersonAdd"}
  ],

  HR_ADMIN: [
    { path: "/dashboard", label: "Dashboard", icon: "MdDashboard" },
    { path: "/run-payroll", label: "Run Payroll", icon: "MdAttachMoney" }
  ],

  PAYROLL_ADMIN: [
    { path: "/dashboard", label: "Dashboard", icon: "MdDashboard" },
    { path: "/run-payroll", label: "Run Payroll", icon: "MdAttachMoney" },
    { path: "/payroll-history", label: "Payroll History", icon: "MdHistory" }
  ],

  EMPLOYEE: [
    { path: "/dashboard", label: "Dashboard", icon: "MdDashboard" },
    { path: "/payroll-history", label: "Payroll History", icon: "MdHistory" }
  ]
=======
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
>>>>>>> ef5b7a3be67d05549acb3cc4e113e2c20a71ccf9
};
