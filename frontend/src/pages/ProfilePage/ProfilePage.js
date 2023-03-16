import React, { useState } from "react";
import "./ProfilePage.scss";
import { BiLogOut } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import Header from "../../components/Header" ;
import AuthService from "../../services/auth.service";
const ProfilePage = () => {
    const currentUser = AuthService.getCurrentUser();
    return (
        <>
        <Header/>
            <style>{'body {  background-color: #F4E9D6 }'}</style>
            <img src="/images/background.png" alt="background-logo" className="background-logo" />

            <div class="imagen-container">
                <img src="/images/profile.png" alt="Perfil" className="profile-image" />
            </div>

            {/* <p className="username"> {currentUser ? currentUser.username : ''}</p> */}


            <p className="username">Settings</p>


            <Link to="/Loginpage" className="logout">
                <BiLogOut className="i" />
            </Link>

        </>
    );
};

export default ProfilePage;