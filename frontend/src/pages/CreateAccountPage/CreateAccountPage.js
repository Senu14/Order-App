import React from 'react'
import './CreateAccountPage.scss';
import { useForm } from 'react-hook-form'
import Header from '../../components/Header';

const CreateAccountPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <>

      <form className="container" onSubmit={handleSubmit(onsubmit)}>
        <Header />


        <h1 className='title'>Create an Account</h1>

        <div className="form-control ">
          <label for="firstname">Name</label>
          <input className='space' placeholder="Username" {...register('name', { required: true })} />

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


        <div>
          <button className='last' type="submit" >Register</button>
        </div>

      </form>
    </>

  )

}

export default CreateAccountPage;
