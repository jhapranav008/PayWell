import React, { useEffect} from 'react'
import { GetUserInfo } from '../apicalls/users';
import { message } from "antd"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/usersSlice';
import DefaultLayout from './DefaultLayout';

function ProtectedRoute(props) {
     
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector(state=>state.users)

    const getData = async () => {
      
      try {
        const response = await GetUserInfo();
      if(response.success){
        dispatch(SetUser(response.data))
      }else{
        message.error(error.message)
        navigate("/signin")
      }
      } catch (error) {
        message.error(error.message)
        navigate("/signin")
      }
    }
  
  
    useEffect(() => {
      if(localStorage.getItem("token")){
        if(!user){
          getData()
        }
        
      }else{
        navigate("/signin")
      }
      
    },[])
  return (
   user &&  <div> 
    <DefaultLayout>
    {props.children}
    </DefaultLayout>
     
     </div>
  )
}

export default ProtectedRoute