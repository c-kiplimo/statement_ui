import {
  AccountStatementIcon,
  CardStatementIcon,
  DashboardIcon,
  DevelopmentIcon,
  LoanStatementIcon,
  SwiftStatementIcon,
} from "../components/widgets/sidebar/custom.icon";
import { SideNavItem, SideNavMenu } from "../types/sidebar.types";

export const MenuData: SideNavMenu = {
  section: "DASHBOARD",
  menu: [
    {
      title: "Dashboard",
      path: "/statement/dashboard",
      icon: DashboardIcon,
      opened: false,
    },
    {
      title: "Account Statement",
      path: "/statement/account-statement",
      icon: AccountStatementIcon,
      opened: false,
    },
    {
      title: "Loan Statement",
      path: "/statement/loan",
      icon: LoanStatementIcon,
      hasSubMenu: true,
      opened: false,
      submenuItems: [
        {
          title: "Cards",
          path: "/path",
          opened: false,
        },
        {
          title: "Template",
          path: "/path",
          opened: false,
        },
        {
          title: "Widget",
          path: "/path",
          opened: false,
        },
      ],
    },
    {
      title: "Swift Statement",
      path: "/statement/swift-statement",
      icon: CardStatementIcon,
      opened: false,
    },
    {
      title: "Account Setup",
      path: "/statement/account-setup",
      icon: SwiftStatementIcon,
      opened: false,
    },

    {
      title: "Development",
      path: "/statement/dev",
      icon: DevelopmentIcon,
      opened: false,
    },
  ],
};

export const SideNavItemsData: SideNavMenu[] = [
  {
    section: "DASHBOARD",
    menu: [
      {
        title: "Account Statement",
        path: "/docs",
        icon: DashboardIcon,
        opened: false,
      },
      {
        title: "Loan Statement",
        path: "/docs/buttons",
        icon: LoanStatementIcon,
        hasSubMenu: true,
        opened: false,
        submenuItems: [
          {
            title: "Cards",
            path: "/path",
            opened: false,
          },
          {
            title: "Template",
            path: "/path",
            opened: false,
          },
          {
            title: "Widget",
            path: "/path",
            opened: false,
          },
        ],
      },
      {
        title: "Account Statement",
        path: "/docs",
        icon: DashboardIcon,
        opened: false,
      },
      {
        title: "Account Statement",
        path: "/docs",
        icon: DashboardIcon,
        opened: false,
      },
    ],
  },

  {
    section: "OVERVIEW",
    menu: [
      {
        title: "Account Statement",
        path: "/docs",
        icon: DashboardIcon,
        opened: false,
      },
      {
        title: "Loan Statement",
        path: "/docs/buttons",
        icon: LoanStatementIcon,
        hasSubMenu: true,
        opened: false,
        submenuItems: [
          {
            title: "Cards",
            path: "/path",
            opened: false,
          },
          {
            title: "Template",
            path: "/path",
            opened: false,
          },
          {
            title: "Widget",
            path: "/path",
            opened: false,
          },
        ],
      },
      {
        title: "Account Statement",
        path: "/docs",
        icon: DashboardIcon,
        opened: false,
      },
      {
        title: "Account Statement",
        path: "/docs",
        icon: DashboardIcon,
        opened: false,
      },
    ],
  },
];
