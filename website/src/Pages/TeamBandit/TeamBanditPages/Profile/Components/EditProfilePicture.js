import {useState, React} from 'react';

import { toast } from 'react-toastify';

import Button from '@mui/material/Button';

const EditProfilePicture = ({organizerInfo, setOrganizerChange}) => {
  const [file, setFile] = useState(null);
  
  const onFileChange = (e) => {
    setFile(e.target.files[0]); 
  }

    const updateProfilePicture = async e => {
      e.preventDefault();
      try {
          const formData = new FormData();
          formData.append("avatar", file);

          const myHeaders = new Headers();
          myHeaders.append("token", localStorage.token);

          const response = await fetch(`${process.env.REACT_APP_BASEURL}/fileuploads/organizerAvatar`, {method: "PUT", body: formData, headers: myHeaders});

          toast.success(await response.json());
          setOrganizerChange(true);
      } catch (error) {
          console.error(error.message);
          toast.error("Failed to update profile picture!");
      }
    };

    const deleteProfilePicture = async e => {
      try {

        const response = await fetch(`${process.env.REACT_APP_BASEURL}/fileuploads/deleteOrganizerProfilePicture`, {
              method: "PUT",
              headers: { token: localStorage.token }
          });

          const resp = await response.json();

          toast.success(resp);
          setOrganizerChange(true);
      } catch (error) {
          console.error(error.message);
          toast.error("Failed to delete profile picture!");
      }
    };

    return (
      <div>
        <form onSubmit={updateProfilePicture} encType="multipart/form-data">
          <input type="file" accept="images/*" name="avatar" onChange={onFileChange}/>
          <Button type="submit" variant="outlined">Upload</Button>
          <Button variant="outlined" onClick={() => deleteProfilePicture()}>Delete Current Profile Picture</Button>
        </form>
      </div>
    );
}

export default EditProfilePicture