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

function Header({ notifications, clickToRead }) {
  const [notificationsList, setNotificationList] = useState(notifications);
  const [notificationOpen, setNotificationOpen] = useState(false);
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
  const splitString = (value) => {
    const result = value.split("Location");
    return result;
  };
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
        <div
          onClick={() =>
            setNotificationOpen((notificationOpen) => !notificationOpen)
          }
        >
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
      {notificationOpen && (
        <div className="absolute right-0 -bottom-[360%] flex-col bg-gray-300 w-[24rem] h-[15rem] flex overflow-y-scroll ">
          <div className="w-full pl-5 p-3 text-xl font-semibold">
            Notifications
          </div>
          <div className="wrap whitespace-pre-wrap bg-gray flex flex-col px-5 gap-3 bg-gray-300 pb-5">
            {notificationsList &&
              notificationsList.map((infor, index) => (
                <div key={index} className="px-3 bg-amber-500 py-2">
                  <span>{splitString(infor.title)[0]}</span>
                  <span>
                    Location {splitString(infor.title)[1]} 
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
