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

    function toggleBack(){
        
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
    // toggleBack()
    const [ tas,setTas ] = useState([])

    const navigate = useNavigate();
    const navigateToDb = () => {
        navigate('/student');
    }

    useEffect(()=>{
        fetch(BACKEND_URI + "api", requestOptions).then(response => {
            if (response.status != 200){
                return (
                    <div className='text-center'>
                        No TAs found!
                    </div>
                );
            }
            return response.json()
        })
        .then(tas => {
            setTas(tas.data)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = {}
        let obj = new FormData(e.target)
        obj.forEach((val,key) => {
            data[key] = val;
        })
        var req = fetch(BACKEND_URI + "queries/", {
            credentials : 'include',
            method : 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        req.then(res => {
            console.log(res)
            if (res.status == 200){
                console.log("Meow")
                navigateToDb();
            }
            else
                window.location.reload();
        })
    }

    return (
        <form id="newQuery" onSubmit={handleSubmit}>
            <table><tbody>
                <tr>
                    <td><label htmlFor="exam_name"><strong>Exam Name: </strong></label></td>
                    <td><input type="text" placeholder="Which exam is it?" name="exam_name" required /></td>
                </tr>
                <tr>
                    <td><label htmlFor="course_name"><strong>Course Name: </strong></label></td>
                    <td><input type="text" placeholder="Which course is it?" name="course_name" required /></td>
                </tr>
                <tr>
                    <td><label htmlFor="question_number"><strong>Question No.:</strong></label></td>
                    <td><input type="number" placeholder="Enter Question no." name="question_number" required /></td>
                </tr>
                <tr>
                    <td><label htmlFor="ta_roll"><strong>TA's Name:</strong></label></td>
                    <td><select name="ta_roll" required>
                            {tas.map(element => 
                                <option value={element.rollno} key={element._id}>{element.rollno}</option>
                            )}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="comments"><strong>Comments:</strong></label></td>
                    <td><textarea rows="5" name="comments" /></td>
                </tr>
                <tr>
                    <td><span className="error"></span></td>
                    <td><button type="submit">Post</button></td>
                </tr>
            </tbody></table>
        </form>
    );
}

export { User, Feedback, AddQuery };