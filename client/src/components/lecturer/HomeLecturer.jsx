import { NavLink } from "react-router-dom";
import { TbArrowBigLeftFilled } from "react-icons/tb";
import { ShowBoxs } from "./index";
import { useEffect, useState } from "react";
import { getAllSlotByLecturerID } from "../../api";

export default function HomeLecturer({ id }) {
  const [bookingRooms, setBookingRooms] = useState([]);
  async function fetchData() {
    const response = await getAllSlotByLecturerID(parseInt(id))
      .then((data) => setBookingRooms(data))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    if(id)
    fetchData();
    console.log("booking room");
    console.log(bookingRooms);
  }, [id]);
  return (
    <div className="w-full h-ull flex flex-col justify-center items-start gap-5">
      <div className="w-[90%] mx-[5%]">
        <ShowBoxs
          childArray={bookingRooms}
          role="Lecturer"
        ></ShowBoxs>
      </div>
    </div>
  );
}
