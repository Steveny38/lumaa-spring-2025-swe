import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const NavBar = () => {
        const auth  = useContext(AuthContext);
        
    return (!auth?.token? <div style={{position: "fixed", height: "2rem", borderBottom: "solid 1px #ccc", width:"100%", display: "flex", verticalAlign:"center", alignItems:"middle"}} >
        <Link to={'/register'}>Register</Link>
        <Link to={'/login'}>Login</Link>
    </div> : <div className="nav" >
        <Link to={'/task'} >Tasks</Link>
        <button onClick={() => auth?.signout()} >Logout</button>
    </div> );
}
 
export default NavBar;