import { useNavigate } from "react-router-dom"

function Home(){

    function Btn({to, text, bg, color, fontSize}){
        const navigate = useNavigate();

         const buttonStyle = {
                backgroundColor: bg,
                color: color,
                fontSize: fontSize + "px"
            };

        return(
            <button style={buttonStyle} onClick={() => navigate(to)}>
                {text}
            </button>
        )
    }

    return(
        <>
            <h1>X - Social </h1>
            <p>Sign up to Join or Login</p>
            <div className="logSign">
                <Btn to="/signup" text="Signup" color="white" bg="blue" fontSize={24}/>
                <Btn to="/login" text="Login" color="white" bg="blue" fontSize={24}/>
            </div>

        </>

    )
}

export default Home;