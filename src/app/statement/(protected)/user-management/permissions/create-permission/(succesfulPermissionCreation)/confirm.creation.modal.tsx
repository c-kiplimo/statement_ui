import React, { useState } from 'react'
import styles from './confirm.creation.module.css'
import VerticalInfoDescription from '@/src/components/atoms/text/vertical-info-description'
import { Modal } from 'antd'
import CreationSuccess from '../../(confirmsuccess)/creation.success'
import { useRouter } from 'next/navigation'
import ConfirmFail from '../../(confirmfailure)/confirm.failure'


type ConfirmCreationModalProps ={
    onCancel:()=>void
    permission:string;
    description:string;
}

const ConfirmCreationModal = ({onCancel, permission, description}:ConfirmCreationModalProps) => {
    const [open, setOpen] = useState(false);
    const router = useRouter()

    const handleCancel =()=>{
        onCancel();
    }
    const handleConfirm=()=>{
        setOpen(true);
    }
    const handleModalClose =()=>{
        setOpen(false);
    }
    const handleConfirmOk =()=>{
      router.push('/statement/user-management/')
    }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <VerticalInfoDescription title={'Confirm Permission Details'} titleStyle={{fontWeight:'700', fontSize:'25px'}}/>
        <VerticalInfoDescription title={'Please review the details below to ensure they are correct before submitting'}/>
      </div>
      <div className={styles.body}>
        <div className={styles.bodyTitle}>
        <VerticalInfoDescription title={'PERMISSIONS DETAILS'} titleStyle={{fontWeight:'500'}}/>
        </div>
        <div className={styles.bodyContent}>
            <div className={styles.permission}>
                <VerticalInfoDescription title={'Name:'} titleStyle={{color:'#6F7269'}}/>
                <VerticalInfoDescription title={permission} titleStyle={{fontWeight:'600'}}/>
            </div>
            <div className={styles.permission}>
            <VerticalInfoDescription title={'Description:'} titleStyle={{color:'#6F7269'}}/>
            <VerticalInfoDescription title={description} titleStyle={{fontWeight:'600'}}/>
            </div>
        </div>
        <div className={styles.buttons}>
            <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
            <button className={styles.confirmButton} onClick={handleConfirm}>Confirm</button>
        </div>
        
      </div>
      {/* Success Permission creation Modal */}
      <Modal
        open={open}
        onCancel={handleModalClose}
        footer={false}
        width={400}
      >
        <CreationSuccess title={'Permission Creation Successful.'} description={'The new permission has been successfully created.'} onClick={handleConfirmOk}/>
      </Modal>

      {/* Failure in permission creation Modal */}
      <Modal
        open={open}
        onCancel={handleModalClose}
        footer={false}
        width={350}
      >
        <ConfirmFail title={'Permission Creation Failed'} description={'There was an error submitting the new permission. Please try again'} onClick={handleModalClose}/>
      </Modal>
    </div>
  )
}

export default ConfirmCreationModal
