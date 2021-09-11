import React, {useState} from "react";
import UserRegistration from "./user/UserRegistration";
import ChatViewer from "./chatViewer/ChatViewer";


const Home = () => {
  const [user, setUser] = useState({});
  const [defualtRoom, setDefualtRoom] = useState({});
  const isUserUndefined = user && user.userId ? false : true;
  
  function handleUserRegistration (user, defualtRoom)
  {
    setUser({...user})
    setDefualtRoom({...defualtRoom});
  }

  return(
    <div>
      
      {isUserUndefined ? 
          (
            <UserRegistration 
              handleRegistration = {(user, defualtRoom) => handleUserRegistration(user, defualtRoom)} 
            />
          )  
        :
          (
            <ChatViewer 
              user={user}
              defualtRoom={defualtRoom}
            />
          )
      }
      
    </div>
  )
}


export default Home;