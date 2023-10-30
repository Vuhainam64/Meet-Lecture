import { Navigate, Route, Routes } from "react-router-dom";
import { Student, Login, Admin, Lecturer } from "./pages";
import { CreateSlotLecturer } from "./components/lecturer";
import { auth, db } from "./config/firebase.config";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SET_USER } from "./context/actions/userActions";

function App() {
  const user = useSelector((state) => state.user?.user);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        setDoc(doc(db, "user", userCred?.uid), userCred?.providerData[0]).then(
          () => {
            //dispatch the action to store
            dispatch(SET_USER(userCred?.providerData[0]));
          }
        );
      } else {
      }
    });

    setInterval(() => {
      setIsLoading(false);
    }, 500);

    //clean up the listener evvvent
    return () => unsubscribe();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
          Loading....
        </div>
      ) : (
        <div className="bg-white h-full">
          <Routes>
            {!user ? (
              <>
                <Route path="/login/*" element={<Login />} />
                <Route path="*" element={<Navigate to={"/login"} />} />
              </>
            ) : (
              <>
                <Route path="/Student/*" element={<Student />} />
                <Route path="/Admin/*" element={<Admin />} />
                <Route path="/Lecturer/*" element={<Lecturer />} />
                <Route path="*" element={<Navigate to="/Student" />} />
              </>
            )}
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
