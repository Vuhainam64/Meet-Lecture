import { useState } from "react";
import { Footer, Header } from "../layout";
import {AdminCreate, AdminListLecturer, AdminListStudents} from "../components/admin";

function Admin() { 
  const [page,chosePage]=useState('Create')
  return (
    <div className="bg-white h-full">
      <Header />
      <div className="min-h-[80%] flex flex-col bg-white">
        <div className="flex flex-row h-[10%]">
          <button className={` w-40 h-14 ${page==='Create'?"bg-orange-300":"bg-gray-300"}`} onClick={()=>chosePage('Create')}>Create</button>
          <button className={` w-40 h-14 ${page==='Lecturer'?"bg-orange-300":"bg-gray-300"}`} onClick={()=>chosePage('Lecturer')}>Lecturer</button>
          <button className={` w-40 h-14 ${page==='Student'?"bg-orange-300":"bg-gray-300"}`} onClick={()=>chosePage('Student')}>Student</button>
        </div>
        <div className="h-[90%]">
            <AdminListStudents/>
  
        </div>
      </div>
    </div>
  );
}

export default Admin;
