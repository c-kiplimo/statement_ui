import React from "react";
const InputField = ({ type, placeholder, className, id, name }: any) => {
  return (
    <input
      className={className}
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
    />
  );
};

const InputFieldWithLabel = ({ label, type, name, id, placeholder }: any) => {
  return (
    <div className="text-left">
      <label htmlFor="postalCode">{label}</label>
      <InputField
        type={type}
        name={name}
        placeholder={placeholder}
        id={id}
        className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
      />
    </div>
  );
};

export default InputField;

export { InputFieldWithLabel };

// import React from 'react';
// import './index.css';
// import { Form, Input, Button } from 'antd';
// import type { FormItemProps } from 'antd';

// const MyFormItemContext = React.createContext<(string | number)[]>([]);

// interface MyFormItemGroupProps {
//   prefix: string | number | (string | number)[];
//   children: React.ReactNode;
// }

// function toArr(str: string | number | (string | number)[]): (string | number)[] {
//   return Array.isArray(str) ? str : [str];
// }

// const MyFormItemGroup = ({ prefix, children }: MyFormItemGroupProps) => {
//   const prefixPath = React.useContext(MyFormItemContext);
//   const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);

//   return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
// };

// const MyFormItem = ({ name, ...props }: FormItemProps) => {
//   const prefixPath = React.useContext(MyFormItemContext);
//   const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

//   return <Form.Item name={concatName} {...props} />;
// };

// const App: React.FC = () => {
//   const onFinish = (value: object) => {
//     console.log(value);
//   };

//   return (
//     <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
//       <MyFormItemGroup prefix={['user']}>
//         <MyFormItemGroup prefix={['name']}>
//           <MyFormItem name="firstName" label="First Name">
//             <Input />
//           </MyFormItem>
//           <MyFormItem name="lastName" label="Last Name">
//             <Input />
//           </MyFormItem>
//         </MyFormItemGroup>

//         <MyFormItem name="age" label="Age">
//           <Input />
//         </MyFormItem>
//       </MyFormItemGroup>

//       <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//     </Form>
//   );
// };

// export default App;
