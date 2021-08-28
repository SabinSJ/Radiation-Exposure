import '../css/Signup.css';

function Signup()
{
    return(


        <div className="container">
           
            <h2>Inregistrare</h2>

            <label><b>Nume</b></label>
            <input type="text" placeholder="" name="uname" required/>

            <label><b>Prenume</b></label>
            <input type="text" placeholder="" name="uname" required/>

            <label><b>Adresa de email</b></label>
            <input type="text" placeholder="" name="uname" required/>

            <label><b>Parola</b></label>
            <input type="password" placeholder="" name="pwd" required/>

            <button className="loginButton" type="submit">Creeaza cont</button>

        </div>

    )
}

export default Signup;