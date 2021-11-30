import "../css/UserProfile.css"
import React, {Component} from "react"
import AuthenticationService from "../api/AuthenticationService"
import ClipLoader from "react-spinners/ClipLoader";
import Switch from "react-switch";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlacesAutocomplete, {geocodeByAddress,getLatLng,} from 'react-places-autocomplete';

import happy_user from '../images/happy-user.png';

class UserProfile extends Component{

    constructor(props){
        super(props)
        this.state = {
            userData: [],
            loading: false,
            checked:false,
            passwordVerified: false,
            address: '',

            username:'',
            address:''
        }

        this.handleClick= this.handleClick.bind(this);
        this.verifyPassword = this.verifyPassword.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeData = this.changeData.bind(this);
        this.onInputchange = this.onInputchange.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }
    

    componentDidMount()
    {

        //setTimeout(() => {
            this.setState({loading:true})
        //}, 5000);

        AuthenticationService.getUserData(sessionStorage.getItem("USER_SESSION_NAME"))
        .then(response => {
            if(response.status === 200){
                this.setState({userData : Object.values(response.data) })
                this.setState({loading:false})
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

    getData(){
        return (
            <div className="container-profile">

                <div className="left-col">
                    <img className="user-profile-image" src={happy_user} alt="happyUser"/>
                    
                    <div className="user-fullname">
                        {this.state.userData[7]} {this.state.userData[1]}
                    </div>
                    
                    <div className="change-password-text">Editati datele</div>

                    <label className="switch">
                        <Switch checked={this.state.checked} onChange={this.handleClick} />
                    </label>
                </div>

                {
                window.innerWidth <= 1200
                
                ?
                <hr class="dot_line"></hr>

                :

                <div className="vertical-line"></div>
                }

                <div className="row">
                    <div className="col-title">
                        <h5>Nume utilizator:</h5>
                    </div>
                    
                    <div className="profile-col-text-secondary">
                        {this.state.userData[3]}
                    </div>
                </div>

                <div className="row">
                    <div className="col-title">
                        <h5>Nume:</h5>
                    </div>
                    
                    <div className="profile-col-text-secondary">
                        {this.state.userData[7]}
                    </div>
                </div>

                <div className="row">
                    <div className="col-title">
                        <h5>Prenume:</h5>
                    </div>
                    
                    <div className="profile-col-text-secondary">
                        {this.state.userData[1]}
                    </div>
                </div>

                <div className="row">
                    <div className="col-title">
                        <h5>Adresa:</h5>
                    </div>
                    
                    <div className="profile-col-text-secondary">
                        {this.state.userData[2]}
                    </div>
                </div>

                

            </div>
        )
    }

    onInputchange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }

    changeData() {
        AuthenticationService.changeUserData(this.state.userData[3],this.state.firstName,this.state.lastName,this.state.address).then(response => {

        if(response.status === 200)
        {
            if(this.state.isUserEditing)
            {
                this.setState({isUserEditing: false})
                window.location.reload();
            }else{
                this.setState({isUserEditing: true})
            }
        }

        }).catch(error => {
            console.log(error.response)
            })
    }

    handleClick() {
        if(this.state.isUserEditing)
        {
            this.setState({isUserEditing: false})
            this.setState({checked:false})
        }else{
            this.setState({isUserEditing: true})
        }
    }

    handleChange(checked){
        this.setState({checked});
    }

    handleValue = address =>{
        this.setState({address});
    }

    handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(this.setState({address}))
            .catch(error => console.error('Error', error));
    }

    verifyPassword(){
        AuthenticationService.verifyPassword(this.state.userData[3],this.state.password).then(response =>{
            
            if(response.status === 200 && response.data === "OK")
            {
                this.setState({passwordVerified:true})
            }
            
        }).catch(error => {
            toast.error("Introdu parola corecta!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }

    changePassword()
    {
        AuthenticationService.changeUserPassword(this.state.userData[3],this.state.password).then(response=>{
            if(response.status === 200 && response.data === "OK")
            {
                this.setState({passwordVerified:false})

                toast.success('Parola a fost schimbata cu success!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }).catch(error => {
            toast.error('Requestul nu s-a putut realiza', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }

    editData(){

        return (
            <div className="edit-container-profile">

                <div className="editing-left-col">
                    <img className="user-profile-image" src={happy_user} alt="happyUser"/>
                    
                    <div className="user-fullname">
                        {this.state.userData[7]} {this.state.userData[1]}
                    </div>

                    <div className="change-password-text">Editati datele</div>

                    <label className="switch">
                        <Switch checked={this.state.isUserEditing} onChange={this.handleClick} />
                    </label>

                    <div className="change-password-text">Schimba Parola</div>
                    
                    <label className="switch">
                        <Switch checked={this.state.checked} onChange={this.handleChange} />
                    </label>
                </div>

                {
                window.innerWidth <= 1200
                
                ?
                <hr class="dot_line"></hr>
                
                :

                <div className="vertical-line"></div>
                }

                <div className="editing-row">
                        <div className="col-title">
                            <h5>Nume utilizator:</h5>
                        </div>
                        
                        <div className="profile-col-text-secondary">
                            {this.state.userData[3]}
                        </div>
                </div>

                    <div className="editing-row">
                        <label><b>Nume</b></label>

                        <input
                            name="lastName"
                            type="text"
                            placeholder= "Introduceti numele de familie"
                            onChange={this.onInputchange}
                        />
                    </div>

                    <div className="editing-row">
                        <label><b>Prenume</b></label>

                        <input
                            name="firstName"
                            type="text"
                            placeholder= 'Introduceti pronumele'
                            onChange={this.onInputchange}
                        />
                    </div>

                    <div className="editing-row">
                        <label><b>Adresa</b></label>
                            
                        <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleValue}
                        onSelect={this.handleSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input
                                {...getInputProps({
                                    placeholder: 'Cautati locatia curenta',
                                    className: 'location-search-input',
                                })}
                                />
                                <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                    );
                                })}
                                </div>
                            </div>
                            )}
                        </PlacesAutocomplete>


                    </div>

                    {this.state.checked && 

                    <div className="pwd-editing-row">
                        <label><b>Parola</b></label>

                        <input
                            name="password"
                            type="password"
                            onChange={this.onInputchange}
                        />

                    </div> }
                    
                    {this.state.checked && !this.state.passwordVerified &&
                    <button className="verify-btn" type="submit" onClick={this.verifyPassword}>Verifica</button> }
                    
                    {this.state.checked && this.state.passwordVerified &&
                    <button className="change-password-btn" type="submit" onClick={this.changePassword}>Schimba parola</button> }
                    
                    <button className="save-changes-btn" type="submit" onClick={this.changeData}>Salveaza schimbarile</button>

            </div>
        )
    }

    render(){

        return(
            <>

            <ToastContainer />

            {this.state.loading ?
            
            <ClipLoader
            as="span"
            variant="warning"
            size="50px"
            role="status"
            aria-hidden="true"
            animation="grow"
            color="orange"/>

            : 
            
            this.getData()

            &&

            this.state.isUserEditing ?

            this.editData()

            :

            this.getData()
            
            }

            </>
        );
    }

}

export default UserProfile