import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';

const BACKEND_URI = "http://localhost:3005/";
const requestOptions = {
    credentials : 'include',
    method : 'GET',
    headers: {'Content-Type': 'application/json' }
}

function Concerns(props) {

    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    }

    const rollno = sessionStorage.getItem("curr_roll");
    const [ queries,setQueries ] = useState([])

    useEffect(()=>{
        fetch(BACKEND_URI + "queries/?type=ta&roll="+rollno, requestOptions).then(response => {
            if (response.status != 200){
                return (
                    <div className='text-center'>
                        No queries found!
                    </div>
                );
            }
            return response.json()
        })
        .then(queries => setQueries(queries.data))
    }, [])

    if(rollno == null) {
        return (<p>
            Please Login First. 
            <button onClick={navigateToLogin} className='btn btn-primary'> 
                Go To Login 
            </button>
        </p>)
    }

    const headerStyle = {
        margin: '2% 5%',
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto auto auto',
        gap: '10px',
        alignItems: 'center'
    };

    const htext = {
        gridColumnStart: '1',
        gridColumnEnd: '6'
    }

    return (
    <div>
        <header style={headerStyle}>
            <h2 className='text-center' style={htext}> Students' Concerns </h2>
            <button className='btn btn-primary m-4' onClick={async (e) =>  {
                var res = await fetch(BACKEND_URI + "api/logout", requestOptions);
                if(res.status == 200) {
                    sessionStorage.removeItem("curr_roll");
                    navigateToLogin();
                }
            }}>Logout</button>
        </header>
        <div className='text-center'>
        {queries.map(element => 
            <table className='ta-item' key={element._id}><tbody>
                <tr><td><h4>Student Roll No: </h4></td><td><strong>{element.std_roll}</strong></td></tr>
                <tr><td><h4>Course Name: </h4></td><td><strong>{element.course_name}</strong></td></tr>
                <tr><td><h4>Question No: </h4></td><td><strong>{element.question_number}</strong></td></tr>
                <tr><td><h4>Student's Comment: </h4></td><td><textarea rows="5">{element.std_comment}</textarea></td></tr>
                <tr><td><h4>Your Response: </h4></td><td><textarea rows="5">{element.ta_comment}</textarea></td></tr>
            </tbody></table>
        )}
        </div>
        
    </div>);
}

export default Concerns;