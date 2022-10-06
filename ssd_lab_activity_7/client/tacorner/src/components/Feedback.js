import { useNavigate } from 'react-router-dom';

const BACKEND_URI = "http://localhost:3005/api/";

function Feedback(props) {

    // const img_link = "https://i.ibb.co/0mR0RTc/user.jpg";

    const data = [["key1", "value1"], ["key2", "value2"], ["key3", "value3"]];

    const tableStyle = {
        width:'fit-content',
        margin: 'auto',
        border: '1px solid black'
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
    return (<div>
        <button className='btn btn-primary m-4' onClick={async (e) =>  {
                const requestOptions = {
                    credentials : 'include',
                    method : 'GET',
                    headers: {'Content-Type': 'application/json' }
                };
                var res = await fetch(BACKEND_URI + "logout", requestOptions);
                {/* alert((await res.json())["msg"]); */}

                if(res.status == 200) {
                    sessionStorage.removeItem("curr_email");
                    navigateToLogin();
                }
            }}>Logout</button>
        <h2 className='text-center'> Welcome, {rollno} </h2>
        <div className='text-center'>
            {/* <img className="img-thumbnail w-25 h-25 m-4" src={img_link} alt="" /> */}
            <table style={tableStyle}>
                {data.map(row => 
                <tr key={row[0]}>
                    <td style={{border:"1px solid black"}}>{row[0]}</td>
                    <td style={{border:"1px solid black"}}>{row[1]}</td>
                </tr>
                )}
            </table>
        </div>
    </div>);
}

export default Feedback;