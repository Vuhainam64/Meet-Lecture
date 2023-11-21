import { useEffect, useState } from "react";
import {
  getAllSlotByLecturerID,
  searchSubjectById,
  searchTeacherById,
} from "../../api";
import moment from "moment";
import { useSelector } from "react-redux";

export default function ScheduleLecturer({ userId, chosePage }) {
  const [bookingRooms, setBookingRooms] = useState([]);
  const user = useSelector((state) => state.user?.user);
  const [subject, setSubject] = useState([]);

  const [refresh, setRefresh] = useState(false);
  async function fetchData() {
    const response = await getAllSlotByLecturerID(parseInt(userId))
      .then((data) =>
        setBookingRooms(
          data.filter(
            (slot) => slot.status !== "Unactive" && slot.status !== "Finish"
          )
        )
      )
      .catch((error) => console.log(error));
  }
  async function addObject() {
    const lecturerInfor = await searchTeacherById(parseInt(user?.id));
    lecturerInfor.subjectId.map(async (subject) => {
      const subjectInfor = await searchSubjectById(parseInt(subject));
      setSubject((prev) => [...prev, subjectInfor.subjectCode]);
    });
  }

  useEffect(() => {
    chosePage("");
    addObject();
    if (userId || refresh === true) fetchData();
    console.log("booking room");
    console.log(bookingRooms);
    setRefresh(false);
  }, [userId, refresh]);

  //sort
  const compareDateAndTime = (a, b) => {
    const dateA = moment(a.startDatetime);
    const dateB = moment(b.startDatetime);
    if (dateA.isBefore(dateB)) return -1;
    if (dateA.isAfter(dateB)) return 1;
    return 0;
  };

  //này là đã sorted
  const sortedBookingRooms = [...bookingRooms].sort(compareDateAndTime);

  console.log(sortedBookingRooms);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5 py-5">
      <div className="w-[90%] mx-auto flex flex-col gap-10 py-10 pb-20">
        <div>
          <span className="font-bold text-3xl underline">Schedule</span>
        </div>
        <div>Main Subject:</div>{" "}
        {subject.map((sub) => (
          <span>{sub}</span>
        ))}
        <div className="w-full flex justify-center items-center">
          <table className="w-fit">
            <thead>
              <tr>
                <th className="text-xl font-medium border-b-2 border-black border-r-2">
                  No.
                </th>
                <th className="text-xl font-medium border-b-2 border-black border-r-2">
                  Location
                </th>
                <th className="text-xl font-medium border-b-2 border-black  border-r-2">
                  Time
                </th>
                <th className="text-xl font-medium border-b-2 border-black ">
                  Numbers
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedBookingRooms &&
                sortedBookingRooms.map((info, index) => (
                  <tr className="" key={index}>
                    <td className="text-center px-16 text-lg p-2 border-black border-r-2">
                      {index + 1}
                    </td>
                    <td className="text-center px-16 text-lg p-2 border-black border-r-2">
                      {info.location}
                    </td>
                    <td className="text-center px-16 text-lg p-2 border-black  border-r-2">
                      {moment(info.startDatetime).format("DD/MM/YYYY") +
                        " , " +
                        moment(info.startDatetime).format("HH:mm") +
                        "-" +
                        moment(info.endDatetime).format("HH:mm")}
                    </td>
                    <td className="text-center px-16 text-lg p-2 border-black ">
                      {info.bookingId?.length + "/" + info.limitBooking}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
