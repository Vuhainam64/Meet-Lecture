import { useState } from "react";
import { Footer, Header } from "../layout";

function Student() {
  const [page,chosePage]=useState('Home')
  return (
    <div className="bg-white h-full">
      <Header />
      <div className="h-[80%] flex flex-col">
        <div className="flex flex-row h-[10%]">
          <button className={` w-40 ${page==='Home'?"bg-orange-300":"bg-gray-300"}`} onClick={()=>chosePage('Home')}>Home</button>
          <button className={` w-40 ${page==='Pending'?"bg-orange-300":"bg-gray-300"}`} onClick={()=>chosePage('Pending')}>Pending</button>
          <button className={` w-40 ${page==='Request'?"bg-orange-300":"bg-gray-300"}`} onClick={()=>chosePage('Request')}>Request</button>
          <button className={` w-40 ${page==='History'?"bg-orange-300":"bg-gray-300"}`} onClick={()=>chosePage('History')}>History</button>
        </div>
        <div className="h-[90%]">
          
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Student;
