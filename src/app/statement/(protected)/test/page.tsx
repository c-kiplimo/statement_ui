"use client"

import { Button, Modal, message, Form, Steps, Input, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Step } = Steps;

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [visible, setVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        <PlusOutlined />
        Step by step form creation
      </Button>
      <Modal
        title="Step by step form"
        width={800}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form
          onFinish={async (values) => {
            console.log(values);
            await waitTime(1000);
            setVisible(false);
            message.success('Submitted successfully');
          }}
          validateMessages={{ required: 'This is required' }}
          layout="vertical"
        >
          <Steps current={currentStep}>
            <Step title="Create an experiment" />
            <Step title="Setting parameters" />
            <Step title="Publish experiment" />
          </Steps>

          <div style={{ marginTop: 16 }}>
            {currentStep === 0 && (
              <>
                <Form.Item name="name" label="Experiment name" rules={[{ required: true }]}>
                  <Input placeholder="Please enter name" />
                </Form.Item>
                <Form.Item name="date" label="Date" rules={[{ required: true }]}>
                  <DatePicker />
                </Form.Item>
              </>
            )}
            {currentStep === 1 && (
              <>
                {/* Fields for step 2 */}
              </>
            )}
            {currentStep === 2 && (
              <>
                {/* Fields for step 3 */}
              </>
            )}
          </div>

          <div style={{ marginTop: 16 }}>
            {currentStep > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={handlePrev}>
                Previous
              </Button>
            )}
            {currentStep < 2 && (
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            )}
            {currentStep === 2 && (
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            )}
          </div>
        </Form>
      </Modal>
    </>
  );
};
