import React, { useState } from "react";
import "./ProfilePage.scss";
import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import AuthService from "../../services/auth.service";
const ProfilePage = () => {
    const currentUser = AuthService.getCurrentUser();
    return (
        <>
            <style>{'body {  background-color: #F4E9D6 }'}</style>
            <img src="/images/background.png" alt="background-logo" className="background-logo" />

            <Link to="/HomePage">
            <button className="close-button" >x</button>
            </Link>
           

            <div class="imagen-container">
                <img src="/images/profile.png" alt="Perfil" className="profile-image" />
            </div>

            <p className="username"></p>
        
            <p className="username">Settings</p>


            <Link to="/Loginpage" className="logout">
                <BiLogOut className="i" />
            </Link>

        </>
    );
};

export default ProfilePage;