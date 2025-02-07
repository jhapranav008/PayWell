import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function DefaultLayout({ children }) {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false)
    const { user } = useSelector(state => state.users)
    const userMenu = [
        {
            title: "Home",
            icon: <i className="ri-home-5-line"></i>,
            onClick: () => navigate("/"),
            path: "/"
        },
        {
            title: "Transactions",
            icon: <i className="ri-bank-line"></i>,
            onClick: () => navigate("/transactions"),
            path: "/transactions"
        },
        {
            title: "Requests",
            icon: <i className="ri-hand-heart-line"></i>,
            onClick: () => navigate("/requests"),
            path: "/requests"
        },
        {
            title: "Profile",
            icon: <i className="ri-profile-line"></i>,
            onClick: () => navigate("/profile"),
            path: "/profile"
        },
        {
            title: "Logout",
            icon: <i className="ri-logout-box-line"></i>,
            onClick: () => {

                localStorage.removeItem("token")
                navigate("/signin")


            },
            path: "/logout"
        },


    ]

    const adminMenu = [
        {
            title: "Home",
            icon: <i className="ri-home-5-line"></i>,
            onClick: () => navigate("/"),
            path: "/"
        },
        {
            title: "Users",
            icon: <i className="ri-user-2-line"></i>,
            onClick: () => navigate("/users"),
            path: "/users"
        },
        {
            title: "Transactions",
            icon: <i class="ri-bank-line"></i>,
            onClick: () => navigate("/transactions"),
            path: "/transactions"
        },
        {
            title: "Requests",
            icon: <i className="ri-hand-heart-line"></i>,
            onClick: () => navigate("/requests"),
            path: "/requests"
        },
        {
            title: "Profile",
            icon: <i className="ri-profile-line"></i>,
            onClick: () => navigate("/profile"),
            path: "/profile"
        },
        {
            title: "Logout",
            icon: <i className="ri-logout-box-line"></i>,
            onClick: () => {
                localStorage.removeItem("token");
                navigate("/signin")
            },
            path: "/logout"
        },


    ]

    const menuToRender = user?.isAdmin ? adminMenu : userMenu;

    return (
        <div className='w-full h-screen flex p-1 gap-4' id='layout'>
            <div className='bg-blue-900  h-screen rounded-lg p-4 flex items-center' id='sidebar'>
                <div id='menu' className='flex flex-col gap-8 w-full'>
                    {menuToRender.map((item) => {
                        const isActive = window.location.pathname === item.path;
                        return (
                            <div className={` text-white flex gap-2 text-xl pl-2 items-center cursor-pointer ${isActive ? "border-2 border-white p-2" : ""}`}
                             onClick={item.onClick}
                            >
                                {item.icon}
                                {!collapsed && <h1 className='text-white px-1'>{item.title}</h1>}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className=" w-full">
                <div className='bg-blue-900 p-4 py-6 rounded w-full flex justify-between items-center'>
                    <div>
                        {!collapsed && <i className="ri-close-fill text-white text-2xl cursor-pointer" onClick={() => { setCollapsed(!collapsed) }}></i>}
                        {collapsed && <i className="ri-menu-line  text-white text-2xl cursor-pointer" onClick={() => { setCollapsed(!collapsed) }}></i>}
                    </div>
                    <div>
                        <h1 className='text-white  text-3xl font-bold'>Pay Wallet</h1>
                    </div>
                    <div className=' text-white text-lg underline'>
                        {user?.firstName} {user?.lastName}
                    </div>
                </div>
                <div className='p-4'>{children}</div>
            </div>

        </div>
    )
}

export default DefaultLayout