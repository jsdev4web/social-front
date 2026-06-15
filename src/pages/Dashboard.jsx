import { useNavigate, useLocation } from "react-router";
import Sidebar from "./Sidebar";

function Dashboard() {
  const navigate = useNavigate();

  // URL params THIS functionality pulls current user to url
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const id = queryParams.get("id");
  const name = queryParams.get("name");
  //console.log(name)
    
  return (
    <>
        <Sidebar></Sidebar>
    </>
  );
}

export default Dashboard;