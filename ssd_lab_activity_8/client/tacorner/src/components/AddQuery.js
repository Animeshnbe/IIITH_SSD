const BACKEND_URI = "http://localhost:3005/";

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

export default AddQuery;