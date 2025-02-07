import React, { useState, useEffect } from 'react'
import { Tabs, Table, message } from 'antd'
import PageTitle from '../components/PageTitle'
import RequestModal from '../components/RequestModal'
import { GetAllRequestsByUser, UpdateRequestStatus } from '../apicalls/requests'
import { useSelector } from 'react-redux'
import moment from 'moment'

const { TabPane } = Tabs

function Requests() {


    const [showRequestModal, setShowRequestModal] = useState(false)
    const [data, setData] = useState([]);
    const { user } = useSelector(state => state.users)


    const getData = async () => {
        try {
            const response = await GetAllRequestsByUser();
            if (response.success) {

                const sendData = response.data.filter((item) => item.sender._id === user._id)
                const receivedData = response.data.filter((item) => item.receiver._id === user._id)
                setData({
                    sent: sendData,
                    received: receivedData

                })
                console.log(data.sent)

            }
        } catch (error) {
            message.error(error.message)
        }
    }

    

    const updateStatus = async (record, status) => {
        try {
            const response = await UpdateRequestStatus({
                ...record,
                status
            })
            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                message.error(response.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    const columns = [
        {
            title: "Request ID",
            dataIndex: "_id"
        },
        {
            title: "Sender",
            dataIndex: "sender",
            render(sender) {
                return sender.firstName + " " + sender.lastName
            }
        },
        {
            title: "Receiver",
            dataIndex: "receiver",
            render(receiver) {
                return receiver.firstName + " " + receiver.lastName
            }
        },
        {
            title: "Amount",
            dataIndex: "amount",
        },
        {
            title: "Description",
            dataIndex: "description",
        },
        {
            title: "Date",
            dataIndex: "date",
            render(text, record) {
                return moment(record.createAt).format("DD-MM-YYYY hh:mm:ss A")
            }
        },
        {
            title: "Status",
            dataIndex: "status"
        },
        {
            title: "Action",
            dataIndex: "action",
            render(text, record) {
                if (record.status === "pending" && record.receiver._id === user._id) {
                    return <div className='flex  gap-4'>
                        <h1 className='text-sm underline text-red-600 cursor-pointer'
                            onClick={  () => {

                                updateStatus(record, "rejected");
                                
                            }}
                        >Reject</h1>
                        <h1 className='text-sm underline text-green-500 cursor-pointer'
                            onClick={  () => {
                                updateStatus(record, "accepted")
                            
                            }}
                        >Accept </h1>

                    </div>
                }
            }
        }
    ]

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <div className='flex justify-between mt-4'>
                <PageTitle title={"Requests"} />
                <button className='rounded-lg py-2 px-4 bg-blue-700 text-white text-xl' onClick={() => setShowRequestModal(true)}> Request</button>
            </div>

            {/* <Table columns={columns}  className='mt-8 border' dataSource={data.sent}/> */}
            <div className='mt-4 '>
                <Tabs defaultActiveKey='1'>
                <TabPane tab="Received" key="1">
                        <Table columns={columns} className='mt-8 border' dataSource={data.received} />

                    </TabPane>
                    <TabPane tab="Sent" key="2">
                        <Table columns={columns} className='mt-8 border' dataSource={data.sent} />

                    </TabPane>
                </Tabs>
            </div>
            {showRequestModal && (
                <RequestModal
                    showRequestModal={showRequestModal}
                    setShowRequestModal={setShowRequestModal}
                />
            )}

        </div>
    )
}

export default Requests