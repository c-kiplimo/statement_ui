import React from 'react';
import styles from './create.permission.module.css';
import VerticalInfoDescription from '@/src/components/atoms/text/vertical-info-description';
import { Form, FormProps, Input } from 'antd';

type PermissionFieldTypes = {
  permission?: string;
  description?: string;
};

const CreatePermissionForm = () => {
  const handleOnFinish: FormProps<PermissionFieldTypes>['onFinish'] = (values) => {
    console.log(values);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <VerticalInfoDescription title={'Create Permission'} titleStyle={{fontWeight:'700', fontSize:'25px'}}/>
        <Form className={styles.form} onFinish={handleOnFinish}>
          <div className={styles.labelContainer}>
            <label htmlFor="permission" className="bodyr">
              Permission Name
            </label>
            <Form.Item
              name="permission"
              className={styles.formitem}
              rules={[{ required: true, message: 'Please enter the permission name' }]}
            >
              <Input
                type="text"
                placeholder="Enter Name"
                className={styles.input}
              />
            </Form.Item>
          </div>

          <div className={styles.labelContainer}>
            <label htmlFor="description" className="bodyr">
              Description
            </label>
            <Form.Item name="description" className={styles.formitem}>
              <Input
                type="text"
                placeholder="Enter Description"
                className={styles.input}
              />
            </Form.Item>
          </div>
          <button type='submit' className={`${styles.button} bodyr`}>
            Complete
          </button>
        </Form>
      </div>
    </div>
  );
}

export default CreatePermissionForm;
