import React from 'react'
import './CreateAccountPage.scss';
import { useForm } from 'react-hook-form'
import AuthService from '../../services/auth.service';
import { Link } from 'react-router-dom';

const CreateAccountPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    AuthService.register(data.name, data.username, data.email, data.password)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };


  return (
    <>

      <form className="container" onSubmit={handleSubmit(onSubmit)}>

        <h1 className='title'>Create an Account</h1>

        <div className="form-control ">
          <label htmlFor="firstname">Name</label>
          <input className='space' placeholder="Username" {...register('name', { required: true })} />

          {/* {errors.name && <span>write your full name</span>} */}

        </div>
        <div className="form-control ">
          <label htmlFor="firstname">Username</label>
          <input className='space' placeholder="Username" {...register('username', { required: true })} />

          {/* {errors.name && <span>write your full name</span>} */}

        </div>
        <div className="form-control ">
          <label for="email">Email</label>
          <input className='space' placeholder="Email" {...register('email', { required: true })} />


        </div>
        <div className="form-control ">
          <label for="pasword">Password</label>
          <input className='space' placeholder="Password" {...register('password', { required: true })} />
        </div>

        <img src="/images/tomato2.png" alt="background-tomato" className="background-tomato" />
        <div>
          <Link to="/HomePage">
            <button className='last' type="submit" >Register</button>
          </Link>
        </div>


      </form>

    </>

  )

}

export default CreateAccountPage;
