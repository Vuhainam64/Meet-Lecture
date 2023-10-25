import { NavLink } from "react-router-dom";
import { TbArrowBigLeftFilled } from "react-icons/tb";
import { ShowBoxs } from "../styles";
import { useEffect, useState } from "react";
import { getAllSlotByLecturerID } from "../../api";

export default function HomeLecturer({ id }) {
  const list = [
    {
      Location: "P.102",
      Time: "12:30 - 14:45",
      Date: "11/10/2023",
      Limit: "1/6",
      Status: "Private",
    },
    {
      Location: "P.203",
      Time: "15:00 - 17:15",
      Date: "09/10/2023",
      Limit: " 2/6",
      Status: "Public",
    },
    {
      Location: " P.391",
      Time: "7:30 - 9:15",
      Date: "04/10/2023",
      Limit: "4/6",
      Status: "Private",
    },
    {
      Location: "P.309",
      Time: "9:30 - 11:45",
      Date: "06/10/2023",
      Limit: "5/6",
      Status: "Private",
    },
    {
      Location: "P.105",
      Time: "9:30 - 11:45",
      Date: "07/10/2023",
      Limit: "6/6",
      Status: "Public",
    },
  ];
  const [datas, getDatas] = useState([]);
  const [bookingRooms, setBookingRooms] = useState([]);
  async function fetchData() {
    const response = await getAllSlotByLecturerID(parseInt(id))
      .then((data) => setBookingRooms(data))
      .catch((error) => console.log(error));
    console.log(datas);
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
