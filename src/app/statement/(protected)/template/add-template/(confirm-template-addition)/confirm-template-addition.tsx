import React from 'react'

type Props ={
    onCancel:(e:any)=>void;
    onConfirm:()=>void;
    title?:string;
    description?:string;
}

const ConfirmTemplateAddition = ({onCancel, onConfirm, title,description}:Props) => {
  return (
    <div className='flex flex-col justify-center items-center p-9'>
        <div className='flex flex-col justify-center items-center gap-10'>
            <div className='flex flex-col justify-center items-center gap-1 sm:w-[341px]'>
                <span className={`h6m text-[#1A2600]`}>Confirm Template Addition</span>
                <span className={`bodyr text-[#6F7269] text-center`}>Are you sure you want to add the template 'Bank Statement Summary' to your collection? </span>
            </div>

            <div className='flex flex-row justify-center items-center gap-10'>
                <button className='flex items-center px-8 py-2 h-10 border rounded border-[#E6E6E6] text-[#6F7269]' onClick={onCancel}>Cancel</button>
                <button className='flex items-center px-8 py-2 h-10 border rounded bg-[#84BD00] text-[#FFFFFF]' onClick={onConfirm}>Confirm</button>
            </div>

        </div>

    </div>
  )
}

export default ConfirmTemplateAddition








