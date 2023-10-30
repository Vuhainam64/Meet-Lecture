
import { ShowBoxs } from "./index";
import { useEffect, useState } from "react";
import { getAllSlotByLecturerID } from "../../api";

export default function HomeLecturer({ id }) {
  const [bookingRooms, setBookingRooms] = useState([]);
  const [refresh, setRefresh] = useState(false);
  async function fetchData() {
    const response = await getAllSlotByLecturerID(parseInt(id))
      .then((data) => setBookingRooms(data.filter(slot=>slot.status!=="Unactive"&&slot.status!=="Finish")))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    if(id||refresh===true)
    fetchData();
    console.log("booking room");
    console.log(bookingRooms);
    setRefresh(false);
  }, [id,refresh]);
  return (
    <div className="w-full h-ull flex flex-col justify-center items-start gap-5">
      <div className="w-[90%] mx-[5%]">
        <ShowBoxs
          childArray={bookingRooms}
          setRefresh={setRefresh}
          role="Lecturer"
        ></ShowBoxs>
      </div>
    </div>
  );
}
