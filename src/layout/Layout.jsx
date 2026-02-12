import { NavLink, Outlet } from "react-router-dom"
import { useState } from "react"
import {
    FiHome,
    FiUsers,
    FiEdit,
    FiMenu
} from "react-icons/fi"

export default function Layout() {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="dashboard">

            <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

                <div className="top">
                    {!collapsed && <h2 className="logo">Admin Panel</h2>}
                    <FiMenu
                        className="menu-btn"
                        onClick={() => setCollapsed(!collapsed)}
                    />
                </div>

                <nav className="menu">

                    <NavLink to="/" end>
                        <FiHome />
                        {!collapsed && <span>Dashboard</span>}
                    </NavLink>

                    <NavLink to="/designers">
                        <FiUsers />
                        {!collapsed && <span>Designers</span>}
                    </NavLink>

                    <NavLink to="/editor">
                        <FiEdit />
                        {!collapsed && <span>Editor</span>}
                    </NavLink>
                </nav>
            </aside>
            <main className="content">
                <Outlet />
            </main>
        </div>
    )
}