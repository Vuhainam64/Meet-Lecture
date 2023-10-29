import { Link ,useParams} from "react-router-dom";
import { TbArrowBigLeftFilled } from "react-icons/tb";
import { ShowBoxs } from "./index";
import { useEffect, useState } from "react";
import { getAllSlotByLecturerID } from "../../api";

export default function Booking() {
  const { lecturerId } = useParams();
  const [bookingRooms, setBookingRooms] = useState([]);
  async function fetchData(id) {
    const response = await getAllSlotByLecturerID(parseInt(id))
      .then((data) => setBookingRooms(data.filter(slot=>slot.mode!=="Private")))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    if(lecturerId)
    fetchData(lecturerId);
    console.log("booking room");
    console.log(bookingRooms);
  }, [lecturerId]);
  return (
    <div className="w-full bg-white flex flex-col justify-center items-start gap-5">
      <Link className="h-[10%]  font-bold flex flex-row gap-5 items-center" to={`/student`}>
        <span className="text-4xl">
          <TbArrowBigLeftFilled />
        </span>{" "}
        <span className="text-2xl underline">Home</span>
      </Link>
      <div className="w-[90%] mx-[5%] h-full bg-white">
        <ShowBoxs childArray={bookingRooms}></ShowBoxs>
      </div>
    </div>
  );
}
