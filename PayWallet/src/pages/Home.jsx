import React, { useState } from "react"
import PageTitle from "../components/PageTitle"
import { useSelector } from "react-redux"

function Home() {

  const { user } = useSelector(state => state.users)
  const [showDetails, setShowDetails] = useState(false)

  const viewDetails = () => setShowDetails(!showDetails)

  return (
    <div className="flex mt-10">
      <div className="">
        {/* <div className="pl-12 mt-12">
          <PageTitle title={"WELCOME TO PAYWALLET"} />
        </div> */}
      <div className= " mt-12  uppercase border p-4 bg-blue-800 text-white  shadow-lg rounded-lg hover:bg-blue-500 "  onClick={viewDetails}>
          <div className="flex justify-between items-center gap-20 text-xl p-2">
            <div>
              <h1 className="">Account No.</h1>
            </div>
            <div>
              <h1>{user._id}</h1>
            </div>

          </div>
          <div className="flex justify-between items-center text-xl p-2">
            <div>
              <h1>Balance :</h1>
            </div>
            <div>
              <h1> $ {user.balance}</h1>
            </div>

          </div>
          
          

        </div>

      {showDetails && (
        <div className="  mt-4  uppercase border p-4 bg-blue-100 text-gray  shadow-lg rounded-lg">
          <div className="flex justify-between items-center text-xl p-2">
            <div>
              <h1 className="">First Name :</h1>
            </div>
            <div>
              <h1>{user.firstName}</h1>
            </div>

          </div>
          <div className="flex justify-between items-center text-xl p-2">
            <div>
              <h1>Last Name :</h1>
            </div>
            <div>
              <h1>{user.lastName}</h1>
            </div>

          </div>
          <div className="flex justify-between items-center text-xl p-2">
            <div>
              <h1>Mobile :</h1>
            </div>
            <div>
              <h1>{user.mobile}</h1>
            </div>

          </div>
          <div className="flex justify-between items-center text-xl p-2">
            <div>
              <h1>Email :</h1>
            </div>
            <div>
              <h1>{user.email}</h1>
            </div>

          </div>
          <div className="flex justify-between items-center text-xl p-2">
            <div>
              <h1>Verification ID type :</h1>
            </div>
            <div>
              <h1>{user.verificationType}</h1>
            </div>

          </div>
          <div className="flex justify-between items-center text-xl p-2">
            <div>
              <h1>Verification ID Number :</h1>
            </div>
            <div>
              <h1>{user.verificationNumber}</h1>
            </div>

          </div>

        </div>)}
      </div>
       


    </div>
      


    


  )
}

export default Home