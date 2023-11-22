import { useEffect, useState } from "react";
import {
  getAllSlotByLecturerID,
  searchBookingById,
  searchStudentById,
  searchSubjectById,
  searchTeacherById,
} from "../../api";
import moment from "moment";
import { useSelector } from "react-redux";
import { BiSolidUser } from "react-icons/bi";

export default function ScheduleLecturer({ userId, chosePage }) {
  const [bookingRooms, setBookingRooms] = useState([]);
  const user = useSelector((state) => state.user?.user);
  const [subject, setSubject] = useState([]);
  const [showStudentTableLocation, setShowStudentTableLocation] = useState("");
  const [showStudent, setShowStudent] = useState([]);

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
    let result = [];
    const lecturerInfor = await searchTeacherById(parseInt(user?.id));
    lecturerInfor.subjectId.map(async (subject) => {
      const subjectInfor = await searchSubjectById(parseInt(subject));

      result.push(subjectInfor.subjectCode);
    });
    setSubject(result);
  }

  useEffect(() => {
    chosePage("");
    if (userId || refresh === true) fetchData();
    addObject();
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
  const handleShowStudent = async (infor) => {
    setShowStudent([]);
    setShowStudentTableLocation(parseInt(infor.id));
    let result = [];
    console.log("infor", infor);
    infor.bookingId.map(async (bookId) => {
      console.log("bookId", bookId);
      const bookedInfor = await searchBookingById(parseInt(bookId));
      console.log("bookedInfor", bookedInfor);
      const accountInfor = await searchStudentById(
        parseInt(bookedInfor.studentId)
      ).then((data) => setShowStudent((prev) => [...prev, data]));
    });
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
        <div className="flex flex-row gap-5">
          <div className="font-semibold">Main Subject:</div>{" "}
          {subject && subject.map((sub) => <span>{sub}</span>)}
        </div>
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
                    <td className="px-16 text-lg p-2 border-black flex items-center">
                      {info.bookingId?.length + "/" + info.limitBooking}
                      <button onClick={() => handleShowStudent(info)}>
                        <BiSolidUser />
                      </button>
                    </td>
                    {showStudentTableLocation === info.id && (
                      <div className="absolute flex flex-col bg-white rounded-md border-orange-500 border-2 p-5">
                        <span className="text-center font-bold pb-3 mt-[-1rem]">
                          Student participated
                        </span>
                        <button className="absolute right-3 top-0 text-2xl" onClick={()=>{setShowStudentTableLocation('');setShowStudent([])}}>
                          &times;
                        </button>
                        <table>
                          <thead>
                            <tr>
                              <th className="border-b-2 border-black border-r-2">
                                No.
                              </th>
                              <th className="border-b-2 border-black ">
                                FullName
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {showStudent &&
                              showStudent.map((stu, index) => (
                                <tr>
                                  <td className="px-5 border-black border-r-2">
                                    {index + 1}
                                  </td>
                                  <td className="px-5 border-black ">
                                    {stu.fullname}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
