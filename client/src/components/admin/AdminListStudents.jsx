export default function AdminListStudents({ lectureName }) {
  const studentList = [
    {
      Name: "Nguyen Trong Tai",
      ID: "SE173001",
      DateOfBirth: "12/10/1985",
      Username: "TaiNt5",
      Password: "0123456789",
      Email: "TaiNt5@fpt.edu.vn",
    },
    {
      Name: "Lai Duc Hung",
      ID: "SE173002",
      DateOfBirth: "25/09/1988",
      Username: "HungLd",
      Password: "hung7984651",
      Email: "HungLd@fpt.edu.vn",
    },
    {
      Name: "Kieu Trong Khanh",
      ID: "SE173003",
      DateOfBirth: "15/06/1979",
      Username: "KhanhKt",
      Password: "abcKhanh789",
      Email: "KhanhKt@fpt.edu.vn",
    },
    {
      Name: "Vo Thi Thanh Van",
      ID: "SE173004",
      DateOfBirth: "10/05/1989",
      Username: "VanVTT",
      Password: "vanvothithanh123",
      Email: "VanVTT@fpt.edu.vn",
    },
    {
      Name: "Nguyen The Hoang",
      ID: "SE173005",
      DateOfBirth: "07/12/1984",
      Username: "HoangNT",
      Password: "hoangnguyenthe",
      Email: "HoangNT@fpt.edu.vn",
    },
    {
      Name: "Nguyen Minh Sang",
      ID: "SE173006",
      DateOfBirth: "19/11/1991",
      Username: "Sangnm5",
      Password: "sang321654",
      Email: "SangNM5@fpt.edu.vn",
    },
  ];
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5 py-5">
      <div className="w-[90%] mx-auto flex flex-col gap-10 py-10 pb-20">
        <div>
          <span className="font-bold text-3xl underline">List of Students</span>
        </div>
        <div className="">
          <form className="flex flex-row gap-10 px-10">
            <input
              placeholder="Name"
              className="bg-gray-100 placeholder:text-gray-300 rounded-3xl placeholder:font-semibold w-[20%] text-center p-2"
            ></input>
            <input
              placeholder="ID"
              className="bg-gray-100 placeholder:text-gray-300 rounded-3xl placeholder:font-semibold w-[5%] text-center p-2"
            ></input>
            <input
              placeholder="Username"
              className="bg-gray-100 placeholder:text-gray-300 rounded-3xl placeholder:font-semibold w-[15%] text-center p-2"
            ></input>
            <input
              placeholder="Password"
              className="bg-gray-100 placeholder:text-gray-300 rounded-3xl placeholder:font-semibold w-[15%] text-center p-2"
            ></input>
            <input
              placeholder="Email"
              className="bg-gray-100 placeholder:text-gray-300 rounded-3xl placeholder:font-semibold w-[20%] text-center p-2"
            ></input>
            <button className="bg-orange-400 text-white rounded-3xl w-fit px-5">
              Search
            </button>
          </form>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-xl p-3 font-semibold bg-gray-300 border-black border-r-2">
                No.
              </th>
              <th className="text-xl p-3 font-semibold bg-gray-300 border-black border-r-2">
                Name
              </th>
              <th className="text-xl p-3 font-semibold bg-gray-300 border-black border-r-2">
                ID
              </th>
              <th className="text-xl p-3 font-semibold bg-gray-300 border-black border-r-2">
                Date of Birth
              </th>
              <th className="text-xl p-3 font-semibold bg-gray-300 border-black border-r-2">
                Username
              </th>
              <th className="text-xl p-3 font-semibold bg-gray-300 border-black border-r-2">
                Password
              </th>
              <th className="text-xl p-3 font-semibold bg-gray-300 border-black ">
                Email
              </th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {studentList ? (
              studentList.map((info, index) => (
                <tr className="bg-gray-200">
                  <td className="text-center font-medium text-lg p-2 border-black border-r-2">
                    {index + 1}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-r-2">
                    {info.Name}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-r-2">
                    {info.ID}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-r-2">
                    {info.DateOfBirth}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-r-2">
                    {info.Username}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-r-2">
                    {info.Password}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-r-2">
                    {info.Email}
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-r-2">
                    <button className="  text-gray-500">Update</button>
                  </td>
                  <td className="text-center font-medium text-lg p-2 border-black border-r-2">
                    <button className="  text-red-500">Delete</button>
                  </td>
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
