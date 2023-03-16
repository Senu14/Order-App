
import React from 'react';
import { useForm } from 'react-hook-form';
import "./ContactPages.scss"
import { TbPhoneCall } from 'react-icons/tb';
import { FaFacebookSquare } from 'react-icons/fa';
import { GrInstagram } from  'react-icons/gr';
import Header from '../../components/Header';

const ContactPages = ()=> {
     const { register, handleSubmit, formState: { errors } } = useForm();
     const onSubmit = data => console.log(data);
     
     return (
<>
<form className='holy-control' onSubmit={handleSubmit(onsubmit)}>
     {/* <div className="Componant"> */}
<Header/>
<img src="/images/background.png" alt="background-logo" className="background-logo3" />
<h1 className='title'>Contact Us</h1>

        <label>Name</label>
        <input type="text" placeholder="Username" className="user" {...register('username',{required:true})} />
        <label>Email</label>
        <input type="email" placeholder="Email"  className="user" {...register('email',{required:true})} />
        <label>Message</label>
        <textarea placeholder="Write your message" cols="20" rows="4"  {...register('your message',{required:true})}/>
        <input type="submit" className='knap' value="Send" />

<footer>
    <div className='socialM'>
       <div className='FB'><i><TbPhoneCall /></i> </div>
       <div className='FB'><i><FaFacebookSquare /></i></div> 
       <div className='FB'><i><GrInstagram /></i></div>
    </div>
</footer>
{/* </div> */}
</form>
</>

     )
}

export default ContactPages;
