import { IoSettingsOutline, IoLogOutOutline, IoPerson, IoMenu } from "react-icons/io5";
const Navbar = () => {
  return (
    <div className="navbar px-8 rounded-3xl bg-turquoise-green text-primary-content">
      <div className="navbar-start">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <IoMenu className="h-10 w-8" />
          </div>
        </button>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-2xl">khaataFlow</a>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-lg dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">
                  <IoPerson />
                </span>
              </a>
            </li>
            <li>
              <a className="justify-between">
                Settings
                <span className="badge">
                  <IoSettingsOutline />
                </span>
              </a>
            </li>
            <li>
              <a className="justify-between">
                Logout
                <span className="badge">
                  <IoLogOutOutline />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

    </div>
  )
}

export default Navbar