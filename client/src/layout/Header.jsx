import { useSelector } from "react-redux";
import { Avatar } from "../assets";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

function Header() {
  const user = useSelector((state) => state.user?.user);
  return (
    <div className="flex w-full bg-orange-400 h-20 items-center relative">
      <div className="mx-10 uppercase text-white w-full">meet lecturer</div>
      {user && (
        <div className="absolute bottom-0 right-0 text-white flex items-baseline space-x-2">
          <div>User name</div>
          <img src={Avatar} alt="avatar" className="w-10 rounded-full" />
          <Link to={"/calendar"}>
            <AiOutlineCalendar className="text-4xl" />
          </Link>
          <div>
            <IoMdNotificationsOutline className="text-4xl " />
          </div>
          <div>
            <MdLogout className="text-4xl" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
