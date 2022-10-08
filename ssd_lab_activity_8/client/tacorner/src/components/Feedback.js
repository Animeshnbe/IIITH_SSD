import { useNavigate } from 'react-router-dom';

const BACKEND_URI = "http://localhost:3005/";

function Feedback(props) {

    // const img_link = "https://i.ibb.co/0mR0RTc/user.jpg";

    const data = [["key1", "value1"], ["key2", "value2"], ["key3", "value3"]];

    const headerStyle = {
        width:'fit-content',
        margin: 'auto',
        display: 'flex'
    };

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
    var queries = fetch(BACKEND_URI + "queries/?type=student&roll="+rollno, requestOptions);
    if(queries.status == 200) {
        console.log(queries)
    }
    return (
    <div>
        <main style={headerStyle}>
        
        <h2 className='text-center'> Feedbacks </h2>
        <button className='btn btn-primary m-3' onClick={async (e) =>  {
                var res = await fetch(BACKEND_URI + "api/logout", requestOptions);
                {/* alert((await res.json())["msg"]); */}

                if(res.status == 200) {
                    sessionStorage.removeItem("curr_roll");
                    navigateToLogin();
                }
            }}>Add New Query</button>
        <button className='btn btn-primary m-4' onClick={async (e) =>  {
            var res = await fetch(BACKEND_URI + "api/logout", requestOptions);
            {/* alert((await res.json())["msg"]); */}

            if(res.status == 200) {
                sessionStorage.removeItem("curr_roll");
                navigateToLogin();
            }
        }}>Logout</button>
        </main>
        <div className='text-center'>
            <div className='query'>
            {/* <img className="img-thumbnail w-25 h-25 m-4" src={img_link} alt="" /> */}
            
            </div>
        </div>
    </div>);
}

export default Feedback;