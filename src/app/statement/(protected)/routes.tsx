import { BarChart3, Boxes, LayoutDashboard, LifeBuoy, Package, Projector, Receipt, Settings } from "lucide-react";

export const sidebarItems = [
    {
      type: "title",
      text: "OVERVIEW",
    },
    {
      href: "/statement/dashboard",
      icon: <LayoutDashboard size={20} />,
      text: "Dashboard",
      active: 1,
    },
    {
      href: "/statement/account-statement",
      icon: <BarChart3 size={20} />,
      text: "Account Statement",
      active: 2,
    },
  
    {
      href: "/statement/loan-statement",
      icon: <Boxes size={20} />,
      text: "Loan Statement",
      // alert: "active",
      active: 3,
    },
  
    {
      href: "/statement/card-statement",
      icon: <LifeBuoy size={20} />,
      text: "Card Statement",
      active: 4,
    },
    {
      href: "/statement/swift-statement",
      icon: <Package size={20} />,
      text: "Swift Statement",
      active: 5,
    },
  
    {
      type: "title",
      text: "SETUP",
      hasMargin: true,
    },
    {
      href: "/statement/customer-setup",
      icon: <LayoutDashboard size={20} />,
      text: "Customer Setup",
      active: 1,
    },
    {
      href: "/statement/user-setup",
      icon: <BarChart3 size={20} />,
      text: "User Setup",
      active: 2,
    },
  
    {
      href: "/statement/template-setup",
      icon: <Boxes size={20} />,
      text: "Template Setup",
      active: 3,
    },
  
    {
      type: "title",
      text: "PROFILE",
    },
  
    {
      href: "/statement/user-management",
      icon: <Projector size={20} />,
      text: "Users Management",
      active: 7,
    },
  
    {
      href: "/statement/setting",
      icon: <Receipt size={20} />,
      text: "Settings",
      active: 8,
    },
    {
      href: "/statement/logout",
      icon: <Settings size={20} />,
      text: "Log out",
      active: 9,
    },
  ];