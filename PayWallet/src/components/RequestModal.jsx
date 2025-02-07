import React, { useState } from 'react'
import { Modal, Form, message } from 'antd'

import { VerifyAccount } from '../apicalls/transactions';
import { useSelector } from 'react-redux';
import { SendRequest } from '../apicalls/requests';


function RequestModal({
    showRequestModal,
    setShowRequestModal
}) {

    const [isVerified, setIsVerified] = useState("");
    const [receiverName, setReceiverName] = useState("")
    const [form] = Form.useForm()
    const { user } = useSelector(state => state.users)
    // const [receiverName, setReceiverName] = useState("")

    const onFinish = async (values) => {
        try {
            const payload = {
                ...values,
                sender: user._id,
                status: "success",
                description: values.description|| "No Description"
            }

            const response = await SendRequest(payload);
            if (response.success) {
                setShowRequestModal(false);
                message.success(response.message)
            } else (
                message.error(response.message)
            )
        } catch (error) {
            message.error(error.message)
        }
    }



    const verifyAccount = async () => {
        try {
            const response = await VerifyAccount({
                receiver: form.getFieldValue("receiver")

            })



            if (response.success) {
                setIsVerified("true");
                const receiver = response.data;
                setReceiverName(receiver.firstName)

            } else {
                setIsVerified("false")
            }


        } catch (error) {
            setIsVerified("false")
        }
    }



    return (
        <div>
            <Modal
                title="Request Funds"
                open={showRequestModal}
                onCancel={() => setShowRequestModal(false)}
                footer={null}
            >

                <Form layout='vertical' form={form} onFinish={onFinish}>

                    <div className=' flex gap-4 items-center'>
                        <Form.Item label="Account Number" name="receiver" className='w-full'>
                            <input type="text" className='w-full' />
                        </Form.Item>
                        <button className=' rounded-md px-5 py-2 mt-1 text-xl text-white  bg-blue-600 hover:bg-blue-500' type='button' onClick={verifyAccount}>Verify</button>
                    </div>
                    <div>
                        {isVerified === "true" && (
                            <div className='bg-green-600 p-2 mb-2 rounded-md text-white'>
                                <h1 className='text-sm'>Account Verified {receiverName} </h1>
                            </div>
                        )}
                        {isVerified === "false" && (
                            <div className='bg-red-600 p-2 mb-2 rounded-md text-white'>
                                <h1 className='text-sm'>Invalid Account </h1>
                            </div>
                        )}

                        <Form.Item label="Amount" name="amount"
                            rules={[
                                {
                                    required: true,
                                    message: "Please Input your amount"
                                }
                            ]}>
                            <input type='number' className='w-full' max={user.balance} />
                        </Form.Item>

                        <Form.Item label="Description" name="description" >
                            <textarea name="description" id="" className='w-full'></textarea>
                        </Form.Item>


                    </div>

                    <div className='flex justify-end items-center gap-3'>
                        <button className=' rounded-md px-5 py-2 mt-1 text-xl text-black hover:bg-blue-600 hover:text-white  ' type='button' onClick={() => setShowRequestModal(false)} >Cancel</button>
                        {isVerified && (
                            <button className=' rounded-md px-5 py-2 mt-1 text-xl text-white  bg-blue-600 hover:bg-blue-500' type='submit' >Request</button>
                        )}

                    </div>






                </Form>

            </Modal>
        </div>
    )
}

export default RequestModal