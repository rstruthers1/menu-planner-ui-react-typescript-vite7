import {Outlet} from 'react-router-dom';
import Header from "./components/Header.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {


    return (
        <>
            <Header/>
            <ToastContainer/>
            <div>
                <Outlet/>
            </div>
        </>
    )
}

export default App
