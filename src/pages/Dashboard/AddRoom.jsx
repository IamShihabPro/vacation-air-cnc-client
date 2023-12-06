import React, { useContext, useState } from 'react';
import AddRoomForm from '../../components/Forms/AddRoomForm';
import { imageUpload } from '../../api/utils';
import { AuthContext } from '../../providers/AuthProvider';
import { addRoom } from '../../api/rooms';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AddRoom = () => {

    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image')
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      })


    //handle form submit
    const handleSubmit = event =>{
        event.preventDefault()

        setLoading(true)

        const form = event.target
        const location = form.location.value
        const title = form.title.value

        const from = dates.startDate
        const to = dates.endDate

        const price = form.price.value
        const guests = form.total_guest.value
        const bedrooms = form.bedrooms.value
        const bathrooms = form.bathrooms.value
        const description = form.description.value
        const category = form.category.value

        const image = form.image.files[0]

        setUploadButtonText('Uploading...')
        // upload image
        imageUpload(image)
        .then(data=>{
            // console.log(data);
            const roomData = {
                image: data.data.display_url,
                location, title, price: parseFloat(price), 
                guests, bedrooms, bathrooms, description, category, from, to,
                host:{
                    name: user?.displayName,
                    image: user?.photoURL,
                    email: user?.email,
                }
            }

            // post room data to the server
            addRoom(roomData)
            .then(data =>{
                console.log(data)
                setUploadButtonText('Uploaded!')
                setLoading(false)
                toast.success('Room Added!')
                navigate('/dashboard/my-listings')
            })
            .catch(err=>{
                console.log(err);
            })

            // console.log(roomData);

            setLoading(false)
        })
        .catch(err=>{
            console.log(err);
            setLoading(false)
        })
    
    }

    // handle image change
    const handleImageChange = image => {
        setUploadButtonText(image.name)
    }

    const handleDates = ranges=>{
        setDates(ranges.selection)
    }

    
    return (
        <div>
            <AddRoomForm handleSubmit={handleSubmit} loading={loading} uploadButtonText={uploadButtonText} handleImageChange={handleImageChange} dates={dates} handleDates={handleDates} ></AddRoomForm>
        </div>
    );
};

export default AddRoom;