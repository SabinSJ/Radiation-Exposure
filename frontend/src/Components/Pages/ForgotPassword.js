import '../css/ForgotPassword.css';

function ForgotPassword()
{
    return(


        <div className="forgot-container">
           
            <h2>Recuperare parola</h2>

            <p>Introduceti adresa de email asociat contului dumneavoastra si noi va vom trimite un link de resetare a parolei.</p>

            <input type="text" placeholder="Adresa de email" name="uname" required/>

            <button className="forgotButton" type="submit">Recupereaza Parola</button>

        </div>

    )
}

export default ForgotPassword;