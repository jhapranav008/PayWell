import React, { useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import {Table} from "antd"
import TransferfundModel from '../components/TransferfundModel'
import { AllTransactionsByUser } from '../apicalls/transactions'
import { useSelector } from 'react-redux';
import moment from "moment"
import DepositeModal from '../components/DepositeModal'

function Transactions() {

    const [showTransferFundModel, setShowTransferFundModel] = useState(false)
    const [showDepositeModal, setShowDepositeModal] = useState(false)
    const [data, setData] = useState();
    const {user} = useSelector(state=>state.users)

    const getData = async () => {
        try {
            const response = await AllTransactionsByUser();
            if(response.success){
                setData(response.data)
                console.log(data)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    useEffect(() => {
        getData();
    },[])

    const col = [
        {
            title: "Date",
            dataIndex: "date",
            render: (text, record) => {
                return moment(record.createdAt).format("DD-MM_YYY hh:mm:ss A")
            }
        },
        {
            title: "Transaction ID",
            dataIndex: "_id"
        },
        {
            title: "Amount",
            dataIndex: "amount"
        },
        {
            title: "Type",
            dataIndex: "type",
            render: (text, record) => {
                // return record.sender._id === user._id ? "Debited" : "Credited" 
                if(record.sender._id === user._id){
                    return <p className='text-red-700'>Debited</p>
                }else{
                    return <p className='text-green-600'>Credited</p>
                }
            }
        },
        {
            title: "Reference Account",
            dataIndex: "",
            render: (text, record) => {
                return record.sender === user._id ? <div>
                    <h1 className='text-sm'>
                        {record.receiver.firstName} {record.receiver.lastName} 
                    </h1>
                </div> : <div>
                    <h1 className='text-sm'>
                        {record.sender.firstName} {record.sender.lastName} 
                    </h1>
                </div>
            },
        },
        {
            title: "Reference",
            dataIndex: "reference"
        },
        {
            title: "Status",
            dataIndex: "status"
        },
    ]
  return (
    <div>
        <div className="flex justify-between px-0 py-2">
        <PageTitle title = {"Transactions"} />

        <div className="flex justify-center gap-4 ">
        <button className=' rounded-sm px-3 py-2 text-xl  hover:bg-blue-300' onClick={() => setShowDepositeModal(true)}>Deposit</button>
        <button className=' rounded-sm px-3 py-2 text-xl bg-blue-100 hover:bg-blue-300' onClick={() => setShowTransferFundModel(true)}>Transfer</button>
        </div>
        
    </div>
    <div >
    <Table columns={col}  className='mt-8 border' dataSource={data}/>

    {showTransferFundModel && (
        <TransferfundModel 
         showTransferFundModel={showTransferFundModel}
         setShowTransferFundModel={setShowTransferFundModel}
        />
    )}

    {showDepositeModal && (
        <DepositeModal 
        showDepositeModal={showDepositeModal}
        setShowDepositeModal={setShowDepositeModal}
        />
    )}
    </div>
    
    
    </div>
    
  )
}

export default Transactions