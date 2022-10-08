import { useEffect,useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const BACKEND_URI = "http://localhost:3005/";
const requestOptions = {
    credentials : 'include',
    method : 'GET',
    headers: {'Content-Type': 'application/json' }
};
const rollno = sessionStorage.getItem("curr_roll");

function User() {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
    }

    const navigateToAdd = () => {
        navigate('/student/addQuery');
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
        gridColumnEnd: '5'
    }

    if(rollno == null) {
        return (<p>
            Please Login First. 
            <button onClick={navigateToLogin} className='btn btn-primary'> 
                Go To Login 
            </button>
        </p>)
    }
    return (
        <div>
            <header style={headerStyle}>
                <h2 className='text-center' style={htext}> Feedbacks </h2>
                <button className='btn btn-primary m-3' onClick={(e) =>  {
                        navigateToAdd();
                    }}>Add New Query</button>
                <button className='btn btn-primary m-4' onClick={async (e) =>  {
                    var res = await fetch(BACKEND_URI + "api/logout", requestOptions);
                    if(res.status == 200) {
                        sessionStorage.removeItem("curr_roll");
                        navigateToLogin();
                    }
                }}>Logout</button>
            </header>
            <Outlet />
        </div>
    );
}

function Feedback(props) {

    const [ queries,setQueries ] = useState([])

    useEffect(()=>{
        fetch(BACKEND_URI + "queries/?type=student&roll="+rollno, requestOptions).then(response => {
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

    return (
            <div className='text-center'>
                {queries.map(element => 
                    <div className='query-item' key={element._id}>
                        <h4>Exam Name: <strong>{element.exam_name}</strong></h4>
                        <h4 style={{textAlign:"end"}}>Course Name: <strong>{element.course_name}</strong></h4>
                        <h4>Question No: <strong>{element.question_number}</strong></h4>
                        <h4 style={{textAlign:"end"}}>TA's Roll: <strong>{element.ta_roll}</strong></h4>
                        <h4>Your Comment: </h4><textarea rows="5">{element.std_comment}</textarea>
                        <h4>TA's Response: </h4><textarea rows="5">{element.ta_comment}</textarea>
                    </div>
                )}
            </div>
    );
    
}

function AddQuery() {
    return (
        <form method="POST" action={BACKEND_URI+"queries/"}>
            <label for="ename"><strong>Exam Name: </strong></label>
            <input type="text" placeholder="Which exam is it?" name="ename" required />
            <label for="cname"><strong>Course Name: </strong></label>
            <input type="text" placeholder="Which course is it?" name="cname" required />
            <label for="qno"><strong>Question No.:</strong></label>
            <input type="number" placeholder="Enter Question no." name="qno" required />
            <label for="ta"><strong>TA's Name:</strong></label>
            <input type="text" placeholder="Enter TA" name="ta" required />
            <label for="comments"><strong>Comments:</strong></label>
            <textarea name="comments" required />
            <span class="error"></span>
            <button type="submit">Post</button>
        </form>
    );
}

export { User, Feedback, AddQuery };