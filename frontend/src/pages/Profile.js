import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, update } from '../actions/userActions';
import { appHistory } from '../App';
function Profile(props){
    const [modal,setModal] = useState(false);
    const [modal1,setModal1] = useState(false);
    const [modal2,setModal2] = useState(false);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [newpass,setNewpass] = useState('');
    // const history = useHistory();
    // const isFocused = useIsFocused();   
     const dispatch = useDispatch();
    
    var userSignin = useSelector(state=>state.userSignin);
    const {userInfo} = userSignin;
  
    const handleLogout = (e) =>{
        // e.preventDefault();
        dispatch(logout());
        appHistory.push('/');
        window.location.reload();
        // appHistory.goBack();
    }
    const updateHandler = (e) =>{
        e.preventDefault();
        if(password === userInfo.password && !newpass)
            dispatch(update({userId:userInfo._id,email,name,password}));
        else if(password === userInfo.password && newpass){
            dispatch(update({userId:userInfo._id,email,name,newpass})); 
        } 
        else{
            setModal2(true);
        }
        if(modal){
            setModal(false);
        }
        
        if(modal1){
            setModal1(false);
        }
        // appHistory.push('/profile');
        // appHistory.goBack();
        // window.location.reload(false);
    }
    const openmodal = (userInfo) =>{
        setModal(true);
        setName(userInfo.name);
        setEmail(userInfo.email);
        setPassword(userInfo.password);
    }
    const openmodal1 = (userInfo) =>{
        setModal1(true);
        setPassword(userInfo.password);
    }
    useEffect(()=>{
        if(userInfo){

        }
        return ()=>{

        };
    },[userInfo])

    return<div className="main">
    <div className="prof-bg-img">
        <svg width="1000" height="1000" viewBox="0 0 1546 1408" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="773" cy="704" rx="773" ry="704" fill="url(#paint0_radial)" fill-opacity="0.28"/>
            <defs>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(397 186.5) rotate(44.6191) scale(1435.81 1576.54)">
            <stop stop-color="#3103EB"/>
            <stop offset="1" stop-color="#EB07F0" stop-opacity="0.54"/>
            </radialGradient>
            </defs>
            </svg>
    </div>
<header>
    <div className="header-nav-prof">
        <Link to="/" href="#">Home</Link>
        <Link to="/#about" href="#about">About</Link>
        <Link to="/#features" href="#features">Features</Link>
        <a href="#" onClick={handleLogout}>Logout</a>
    </div>
</header>
{!modal?<div></div>:<div className="divi-container">
            <span onClick={()=>setModal(false)} className="close">&#x2716;</span>
               <h1>Update</h1>
                <form onSubmit={updateHandler}>
                    <div className="product-container">
                    <div>
                        <input type="text" name="name" value={name}  required onChange={(e)=>setName(e.target.value)}></input>
                        <label>Username</label>
                    </div>
                    <div>
                        <input type="email" name="email" value={email} required onChange={(e)=>setEmail(e.target.value)}></input>
                        <label>Email</label>
                    </div>
                   
                    <input type="submit" value="Update"></input>
                    </div>
                </form>
            </div>}
    {!modal1?<div></div>:<div className="divi-container">
            <span onClick={()=>setModal1(false)} className="close">&#x2716;</span>
               <h1>Change Password</h1>
                <form onSubmit={updateHandler}>
                    <div className="product-container">
                    <div>
                        <input type="password" name="name"  required onChange={(e)=>setPassword(e.target.value)}></input>
                        <label>Old Password</label>
                    </div>
                    {modal2?<div>
                            <span>Password didn't match</span>
                        </div>:<div></div>
                        
                    }
                   
                    <div>
                        <input type="password" name="email" required onChange={(e)=>setNewpass(e.target.value)}></input>
                        <label>New Password</label>
                    </div>
                   
                    <input type="submit" value="Update"></input>
                    </div>
                </form>
            </div>}
    <div className="container-2">
        <div className="update_but" onClick={()=>openmodal(userInfo)}>
            <i className="fas fa-user-edit"></i>
        </div>
        <div className="left-prof">
            <div className="prof-container">
                <div className="prof-img">

                </div>
               
            </div>
            
            <div className="prof-info">
                {!name?<div className="Username">{userInfo.name}</div>:<div className="Username">{name}</div>}
                {!email?<div className="prof-email">{userInfo.email}</div>:<div className="prof-email">{email}</div>}
            </div>
        </div>
        <div className="right-prof">
            <div className="host" id="host">
                <h2>Host</h2>
                <div className="host_cont">Host a video chat</div>
            </div>
            <div className="host" id="join">
                <h2>Join</h2>
                <div className="host_cont">Join a chat room</div>
            </div>
            <div className="host" id="retrive">
                <h2>Retrive</h2>
                <div className="host_cont">Retrive your saved videos</div>
            </div>
            <div className="host" id="change_pass" onClick={()=>openmodal1(userInfo)}>
                <h2>Password</h2>
                <div className="host_cont">Change your password</div>
            </div>
        </div>
       
    </div>
   
</div>
}

export default Profile;