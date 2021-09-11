import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";



const UserRegistration = (prop) => {

  const [inputValue, setInputValue] = useState("");
 
  function requestNewRegistration()
  {
    const url = "http://localhost:8080/user/login"
    axios.post(url , {
      username: inputValue
    }).then(res => {
      const user = res.data.user;
      const defualtRoom = res.data.roomChat;
      console.log(defualtRoom);
      prop.handleRegistration(user, defualtRoom)
    })
    .catch((err) => {
      console.log(err);
      alert("the services are not available for now. pleae try later");
      setInputValue("");
    });
    
  }

  
  return (
    <div 
    style={
      {
        position: 'absolute', 
        left: '50%', 
        top: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: "pink",
        padding: 10,
      }
    }
    >
      <TextField
        label="enter your name" 
        variant="outlined"  
        fullWidth
        onChange = {(e) => setInputValue(e.target.value)}
        value = {inputValue}
      />
      <Button
        variant="outlined" 
        onClick = {() => requestNewRegistration()}
      >
        enter to chat
      </Button>
    </div>
  )


}

export default UserRegistration;