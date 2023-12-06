import React, { useContext } from 'react';
import AvatarImg  from '../../../assets/images/placeholder.jpg'
import { AuthContext } from '../../../providers/AuthProvider';
const Avatar = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            <img src={user && user.photoURL ? user.photoURL : AvatarImg} className='rounded-full' alt="prifile" width='30' height='30' />
        </div>
    );
};

export default Avatar;