export default function Schedule() {
  const scheduleInfors = [
    {
      Lecturer: "Nguyen Trong Tai",
      Course: "SWP391",
      Location: "P.203",
      Date: "09/10/2003",
      Time: "15:00-17:15",
    },
    {
      Lecturer: "Kieu Trong Khanh",
      Course: "PRJ391",
      Location: "P.137",
      Date: "10/10/2003",
      Time: "09:30-11:45",
    },
    {
      Lecturer: "Lai Duc Hung",
      Course: "SWR302",
      Location: "P.311",
      Date: "13/10/2003",
      Time: "07:30-09:15",
    },
    {
      Lecturer: "Nguyen The Hoang",
      Course: "SWR302",
      Location: "P.220",
      Date: "14/10/2003",
      Time: "15:00-17:15",
    },
    {
      Lecturer: "Nguyen Trong Tai",
      Course: "SWP391",
      Location: "P.203",
      Date: "09/10/2003",
      Time: "15:00-17:15",
    },
    {
      Lecturer: "Kieu Trong Khanh",
      Course: "PRJ391",
      Location: "P.137",
      Date: "10/10/2003",
      Time: "09:30-11:45",
    },
    {
      Lecturer: "Lai Duc Hung",
      Course: "SWR302",
      Location: "P.311",
      Date: "13/10/2003",
      Time: "07:30-09:15",
    },
    {
      Lecturer: "Nguyen The Hoang",
      Course: "SWR302",
      Location: "P.220",
      Date: "14/10/2003",
      Time: "15:00-17:15",
    },
  ];
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5 py-5">
      <div className="w-[90%] mx-auto flex flex-col gap-10 py-10 pb-20">
        <div>
          <span className="font-bold text-3xl underline">Schedule</span>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-xl font-medium border-b-2 border-black border-r-2">No.</th>
              <th className="text-xl font-medium border-b-2 border-black border-r-2">Lecturer</th>
              <th className="text-xl font-medium border-b-2 border-black border-r-2">Course</th>
              <th className="text-xl font-medium border-b-2 border-black border-r-2">Location</th>
              <th className="text-xl font-medium border-b-2 border-black ">Time</th>
            </tr>
          </thead>
          <tbody>
            {scheduleInfors ? (
              scheduleInfors.map((info, index) => (
                <tr className="">
                  <td className="text-center text-lg p-2 border-black border-r-2">{index+1}</td>
                  <td className="text-center text-lg p-2 border-black border-r-2">{info.Lecturer}</td>
                  <td className="text-center text-lg p-2 border-black border-r-2">{info.Course}</td>
                  <td className="text-center text-lg p-2 border-black border-r-2">{info.Location}</td>
                  <td className="text-center text-lg p-2 border-black ">{info.Date+", "+info.Time}</td>
                </tr>
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
