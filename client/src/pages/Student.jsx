import { useEffect, useState } from "react";
import { Header } from "../layout";
import { Body, Booking, Feedback } from "../components/student";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllNotification } from "../api";

function Student() {
  const user = useSelector((state) => state.user?.user);
  const userId = user?.id;
  const [notifications, setNotifications] = useState([]);
  console.log(userId);

  async function fetchData() {
    const response = await getAllNotification()
      .then((data) =>
        setNotifications(
          data.filter(
            (noti) =>
              noti?.booking?.studentId === user?.id && noti?.isRead === false
          )
        )
      )
      .catch((error) => console.log(error));
    console.log(notifications);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white h-full">
      <Header notifications={notifications} />
      <Routes>
        <Route path="*" element={<Body userId={userId} />} />
        <Route path="Feedback/:infor" element={<Feedback userId={userId} />} />
        <Route
          path="Booking/:lecturerId"
          element={<Booking userId={userId} />}
        />
      </Routes>
    </div>
  );
}

export default Student;
