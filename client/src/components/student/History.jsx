import { ShowBoxs } from "../styles";

export default function History({ lectureName }) {
  const bookingRooms = [
    {
      Location: "P.102",
      Course: "SWP391",
      Time: "12:30 - 14:45",
      Date: "11/10/2023",
      Finish: true,
      Status: "Feedback",
    },
    {
      Location: "P.203",
      Course: "DBI202",
      Time: "15:00 - 17:15",
      Date: "09/10/2023",
      Finish: true,
      Status: "Feedback",
    },
    {
      Location: " P.391",
      Course: "ISC301",
      Time: "7:30 - 9:15",
      Date: "04/10/2023",
      Finish: true,
      Status: "Feedback",
    },
    {
      Location: "P.309",
      Course: "SWP391",
      Time: "9:30 - 11:45",
      Date: "06/10/2023",
      Finish: true,
      Status: "Feedback",
    },
    {
      Location: "P.105",
      Course: "PRJ301",
      Time: "9:30 - 11:45",
      Date: "07/10/2023",
      Finish: true,
      Status: "Feedback",
    },
  ];
  return (
    <div className="w-full h-ull flex flex-col justify-center items-start gap-5">
      <div className="w-[90%] mx-[5%]">
        <ShowBoxs childArray={bookingRooms} lectureName="Chua co"></ShowBoxs>
      </div>
    </div>
  );
}
