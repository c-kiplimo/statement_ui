import { CardData } from "@/src/components/atoms/cards/infoCard";

export const carPhysicaldData: CardData = [
  [
    {
      title: "Id Number",
      description: "1526272822929",
    },
    {
      title: "Customer Type",
      description: "1526272822929",
    },
  ],
  [
    {
      title: "Passport Number",
      description: "300898254",
    },
    {
      title: "Segment",
      description: "Government",
    },
  ],
  [
    {
      title: "Customer Names",
      description: "Motus Business",
    },
  ],
];

export const items = [
  {
    title: "Check Details",
    description: "Customer details",
  },
  {
    title: "OTP Delivery Option",
    description: "Select delivery option",
  },
  {
    title: "OTP Details",
    description: "Confirm with OTP",
  },
];

export const userProfileData = [
  {
    title: "Delivery option",
    description: "Select delivery option",
  },
  {
    title: "Authorization code",
    description: "Confirm authorization code",
  },
];

export const userManagementData = [
  {
    title: "Create Role",
    description: "Description",
  },
  {
    title: "Permissions",
    description: "Description",
  },
];

export const options = [
  {
    value: "1",
    label: "United States",
  },
  {
    value: "2",
    label: "Canada ",
  },
  {
    value: "3",
    label: "United Kingdom",
  },
  {
    value: "4",
    label: "Australia",
  },
  {
    value: "5",
    label: "Germany",
  },
];

export const optionSelect = [
  "KES | 132314245",
  "USD |  1198039827",
  "EUR | 1309948473",
];

export const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Chinese Score",
    dataIndex: "chinese",
    sorter: {
      compare: (a: any, b: any) => a.chinese - b.chinese,
      multiple: 3,
    },
  },
  {
    title: "Math Score",
    dataIndex: "math",
    sorter: {
      compare: (a: any, b: any) => a.math - b.math,
      multiple: 2,
    },
  },
  {
    title: "English Score",
    dataIndex: "english",
    sorter: {
      compare: (a: any, b: any) => a.english - b.english,
      multiple: 1,
    },
  },
];

export const data = [
  {
    key: "1",
    name: "John Brown",
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: "2",
    name: "Jim Green",
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: "3",
    name: "Joe Black",
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    key: "4",
    name: "Jim Red",
    chinese: 88,
    math: 99,
    english: 89,
  },
];

export type CheckboxItem = {
  id: string;
  label: string;
  checked: boolean;
};

export const checkboxData: { [group: string]: CheckboxItem[] } = {
  Account: [
    { id: "accountStatement", label: "Account Statement", checked: false },
    { id: "statementDownload", label: "Statement Download", checked: false },
    { id: "accountOverview", label: "Account Overview", checked: false },
    { id: "configureAccount", label: "Configure Account", checked: false },
  ],
  Loan: [
    { id: "loanStatement", label: "Loan Statement", checked: false },
    { id: "LoanOverview", label: "Loan Overview", checked: false },
    {
      id: "loanStatementDownload",
      label: "Loan Statement Download",
      checked: false,
    },
    { id: "loanSchedule", label: "Loan Schedule", checked: false },
  ],
  MT940: [
    { id: "loanStatement", label: "Loan Statement", checked: false },
    { id: "LoanOverview", label: "Loan Overview", checked: false },
    {
      id: "loanStatementDownload",
      label: "Loan Statement",
      checked: false,
    },
    { id: "loanSchedule", label: "Loan Schedule", checked: false },
  ],
  Card: [
    { id: "cardStatement", label: "Card Statement", checked: false },
    { id: "cardOverview", label: "Card Overview", checked: false },
    {
      id: "cardStatementDownload",
      label: "Card Statement Download",
      checked: false,
    },
    { id: "cardSchedule", label: "Card Schedule", checked: false },
  ],
};
