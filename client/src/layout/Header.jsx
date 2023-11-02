import { useSelector } from "react-redux";
import { Avatar } from "../assets";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { signOutAction } from "../ultils/helpers";
import { buttonClick } from "../animations";
import { getAllNotification } from "../api";
import { useEffect, useState } from "react";

function Header() {
  const [notificationsList, setNotificationList] = useState();
  const [refresh, setRefresh] = useState(true);
  const user = useSelector((state) => state.user?.user);
  const userId = user?.id;
  const fetchData = async () => {
    const response = await getAllNotification()
      .then((data) =>
        setNotificationList(
          data.filter((mess) => mess.slot.lecturerId === parseInt(userId))
        )
      )
      .catch(console.log("error"));
  };
  useEffect(() => {
    console.log("hello");
    if (refresh === true) {
      fetchData();
      setRefresh(false);
    }
  }, [refresh]);
  console.log(notificationsList);
  return (
    <div className="flex w-full bg-orange-400 h-[10%] items-center relative">
      <div className="mx-10 uppercase text-white w-full">meet lecturer</div>
      {/* {user && ( */}
      <div className="absolute bottom-0 right-0 text-white flex items-center space-x-2 gap-5 pr-5 pb-3">
        <div>{user.fullname}</div>
        <img src={Avatar} alt="avatar" className="w-10 rounded-full" />
        <Link to={`/${user.role}/Schedule`}>
          <AiOutlineCalendar className="text-4xl" />
        </Link>
        <div>
          <IoMdNotificationsOutline className="text-4xl " />
        </div>
        <div
          {...buttonClick}
          onClick={signOutAction}
          className="cursor-pointer"
        >
          <MdLogout className="text-4xl" />
        </div>
      </div>
      {/* )} */}
      <div className="absolute right-0 bottom-0 flex flex-col bg-white">
        <div>Notifications</div>
        <div>
          {/* {notificationsList &&
            notificationsList.map((infor,index) => <div key={index}>hello</div>)} */}
        </div>
      </div>
    </div>
  );
}

export default Header;
