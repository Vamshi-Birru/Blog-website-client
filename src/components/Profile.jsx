import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../Services/api';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import '../index.css';
import Home from './Home';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/index';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import LogoutIcon from '@mui/icons-material/Logout';

const Profile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setuser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserDetails()
      .then(data => {
        setuser(data?.user)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err)
        setLoading(false);
      })
  })

  const handleChange = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("userId");
    navigate("/");
    Swal.fire({
      title: 'Logout successfully',
      icon: 'success',
      toast: true,
      timer: 3000,
      position: 'bottom-left',
      timerProgressBar: true,
      showConfirmButton: false
    });
  }

  return (
    <>
      <Typography textAlign={'center'} variant='h3' fontFamily={'quicksand'} padding={1}>
       <AccountBoxRoundedIcon fontSize='large' style={{ fontSize: 60 }}/>  Profile 
      </Typography>
      <div>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
          </Box>
        ) : (
          user && <>
            <div class="container h-50 mt-3 mb-5">
              <div class="row d-flex justify-content-center align-items-center">
                <div class="col col-lg-6 ">
                  <div class="card " className='shadow'>
                    <div class="row g-0" >
                      <div class="col-md-4 gradient-custom text-center text-white">
                        <img src="https://cdn.dribbble.com/users/100142/screenshots/2965203/rocket-dribbble.png"
                          alt="Avatar" class="img-fluid mb-3" />
                      </div>
                      <div class="col">
                        <div class="card-body mt-4">
                          <h6>Name : {user.name}</h6>
                          <hr class="mt-0 mb-4" />
                          <div class="row pt-1">
                          <div style={{ display: 'flex', alignItems: 'center' }}>
  <h6 style={{ margin: 0, marginRight: '8px' }}>Email:</h6>
  <p className="text-muted" style={{ margin: 0 }}>{user.email}</p>
</div>

                            <div class="row-6 pt-3 mb-2 ">
                              <Button variant="contained"sx={{
        borderColor: '#00B890', 
        color: 'white', 
        backgroundColor:'#00B890',
        ':hover': {
          borderColor: '#00B890',
          backgroundColor: 'white',
          color: '#00B890' 
        }
      }} onClick={handleChange}><LogoutIcon/>Logout</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {' '}
            {user.posts.map((post, index) => (
              <Home
                title={post.title}
                date={new Date(`${post.date}`).toLocaleDateString()}
                description={post.description}
                id={post._id}
                image={post.image}
                location={post.location}
                user={user._id}
                name={user.name}
              />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default Profile