import { Modal, Form } from 'antd'
import React, { useState } from 'react'
import StripeCheckout from "react-stripe-checkout"

function DepositeModal({
    showDepositeModal,
    setShowDepositeModal,
    reloadData
}

) {

    const [form] = Form.useForm()
    const onToken = (token) => {
        console.log(token)
    }

    return (
        <Modal
            title="Deposit Funds"
            open={showDepositeModal}
            onCancel={() => setShowDepositeModal(false)}
            footer={null}
        >
            <Form layout='vertical' form={form} >

                <div className=' flex gap-4 items-center'>
                    <Form.Item label="Amount" name="amount" className='w-full' rules={[{
                        required: true,
                        message: "Please enter Amount"
                    }]}>
                        <input type="Number" className='w-full' />
                    </Form.Item>
                </div>

                <div className='flex justify-end items-center gap-2 '>
                    <div className='flex justify-end items-center gap-3'>
                        <button className=' rounded-md px-5 py-2 mt-1 text-xl bg-blue-600 text-white hover:bg-black  ' type='button' onClick={() => setShowDepositeModal(false)} >Cancel</button>

                    </div>
                    <StripeCheckout
                        token={onToken}
                        currency='USD'
                        amount={form.getFieldValue("amount")*100}
                        
                        stripeKey="pk_test_51PaBmw2LnfwKgfpJJ2rew9TmfM2g00p9pLL4b8WdXELZHaSXrovZXMtofVgW8qRuiJkZebY6gDCAB7j9w5m5eCOB00g91e0Fwd"
                        
                    >
                        <div className='flex justify-end items-center gap-3'>
                            <button className=' rounded-md px-5 py-2 mt-1 text-xl bg-blue-600 text-white  ' type='button' >Deposit</button>

                        </div>
                    </StripeCheckout>

                </div>



            </Form>

        </Modal>
    )
}

export default DepositeModal