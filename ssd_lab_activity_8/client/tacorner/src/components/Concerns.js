import { useNavigate } from 'react-router-dom';

const BACKEND_URI = "http://localhost:3005/";

async function Feedback(props) {

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    }

    const rollno = sessionStorage.getItem("curr_roll");

    if(rollno == null) {
        return (<p>
            Please Login First. 
            <button onClick={navigateToLogin} className='btn btn-primary'> 
                Go To Login 
            </button>
        </p>)
    }

    // control comes here if email is not null.
    const requestOptions = {
        credentials : 'include',
        method : 'GET',
        headers: {'Content-Type': 'application/json' }
    };
    var queries = await fetch(BACKEND_URI + "queries/?type=ta&roll="+rollno, requestOptions);
    if(queries.status == 200) {
        console.log(queries)
    }
    return (
    <div>
        <button className='btn btn-primary m-4' onClick={async (e) =>  {
                var res = await fetch(BACKEND_URI + "api/logout", requestOptions);
                {/* alert((await res.json())["msg"]); */}

                if(res.status == 200) {
                    sessionStorage.removeItem("curr_roll");
                    navigateToLogin();
                }
            }}>Logout</button>
        <h2 className='text-center'> Students' Concerns </h2>
        
    </div>);
}

export default Feedback;