import { useNavigate } from "react-router-dom"
import { RegisterUser } from "../apicalls/users" 
import React from "react";
import { Col, Form, Row, message } from "antd";

export default function Register() {

    const navigate = useNavigate()

    const onFinish = async (values) => {
      
        try {
            const response = await RegisterUser(values)
            
        if(response.success){
          
            message.success(response.message)
            navigate("/signin");
        }else{
            message.error(response.message)
        }
        
        } catch (error) {
            message.error(error.message);
        }
        
    } 


    return (
      <>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className=" flex justify-center pt-10">
            <svg
              width="50"
              height="56"
              viewBox="0 0 50 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                fill="black"
              />
            </svg>
          </div>
  
          <h2 className=" text-center text-2xl pt-2 font-bold leading-9 tracking-tight text-gray-900">
            Enter your Details here
          </h2>
        </div>
        <div className="m-10 w-90 h-100 justify-center  p-20 flex">
          <div className="">
            <Form layout="vertical" onFinish={onFinish}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="First Name" name="firstName">
                    <input
                      type="text"
                      className="block w-full sm:py-2 px-1.5 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last Name" name="lastName">
                    <input
                      type="text"
                      className="block w-full sm:py-2 px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email" name="email">
                    <input
                      type="text"
                      className="block w-full sm:py-2 px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Mobile" name="mobile">
                    <input
                      type="text"
                      className="block w-full sm:py-2 px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Verification Type" name="verificationType">
                    <select
                      className="block w-full sm:py-2 px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value=""></option>
                      <option value="0">Aadhar Card</option>
                      <option value="1">Pan Card</option>
                      <option value="2">Driving License</option>
                      <option value="3">Passport</option>
                    </select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Verification Number"
                    name="verificationNumber"
                  >
                    <input
                      type="text"
                      className="block w-full sm:py-2 px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Address" name="address">
                    <textarea
                      className="block w-full sm:py-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></textarea>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Password" name="password">
                    <input
                      type="password"
                      className="block w-full sm:py-2 px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Confirm Password" name="confirmPassword">
                    <input
                      type="password"
                      className="block w-full sm:py-2 px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="flex w-50 justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </Form>
            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <button
                className="font-semibold leading-6 text-blue-700 hover:text-indigo-500"
                onClick={() => navigate("/signin")}
              >
                Sign In here
              </button>
            </p>
          </div>
        </div>
      </>
    );
  }
  
