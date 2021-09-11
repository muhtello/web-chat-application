
import React, {useState, useEffect} from 'react';
import uuid from "react-uuid";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText  from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import avatarImage from "./628298_anonym_avatar_default_head_person_icon.png"
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Collapse from '@material-ui/core/Collapse';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    color: "white"
  },
  listItem: {
    backgroundColor: "#525050",
    
    paddingLeft: theme.spacing(4),
    marginBottom: 10
  },
  firstItem: {
    margin: theme.spacing(2, 5, 0, 0),
    display: "flex,",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#90a4ae"
  },
  materialIcons: {
    verticalAlign: "1px" 
  },

  chipRoot: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    '& > *': {
      margin: theme.spacing(0.1),
    },
  }


}));

export default function UsersRoomViewer(props)
{
  const {user, rooms, usersInRoom, requestJoinMsg, userAsAdmin} = props;

  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState([]);
  
  useEffect(() => {
    //const currentRequest = requestJoinMsg;
    if (user.userId === requestJoinMsg.toUser.userId)
      setNotification(prevState => [...prevState, requestJoinMsg]);
      //setNotification([...notification, requestJoinMsg]);
    // else
    // setNotification([]);

  }, [user.userId, requestJoinMsg.toUser.userId]);

  const classes = useStyles();

  function handleSelectedRoom (room, toUser){
    const requestJoinMsg = {
      fromUser: user,
      toUser: toUser,
      nameRoom: room.nameRoom,
      roomId: room.roomId
    }
    
    props.handleRequest(requestJoinMsg)
  }

  function handleExceptRequest(req){
    
    props.handleExceptRequest({roomId: req.roomId, nameRoom: req.nameRoom});
    handleDeleteChip(req.roomId);
  }

  function handleDeleteChip(id){
    setNotification(
      (notification) => notification.filter((n) => n.roomId !== id ))
    ;

  }

  return(
    <div className={classes.root}>
      <List component="nav" aria-label="list users">
        <ListItem className={classes.firstItem} >
          
            <ListItemIcon >
              <Badge badgeContent={notification.length} color="secondary">
                <NotificationsIcon 
                  color = "action"
                  onClick = {()=>  setOpen(!open)}
                />
              </Badge>
            </ListItemIcon>
          
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {notification && notification.length > 0 && notification.map((n) => {
            const fromUser = n.fromUser.username;
            const nameRoom = n.nameRoom;
            const text = `
              ${fromUser} wants to add you on ${nameRoom} room
            `;
            
            return (
              <div className={classes.chipRoot} key={uuid()}>
                <li>
                  <Chip
                    label={text}
                    clickable
                    onDelete={(id) => handleDeleteChip(n.roomId)}
                    onClick = {(req) => handleExceptRequest({roomId: n.roomId, nameRoom: n.nameRoom})}
                    //variant="outlined"
                    color="primary"
                    size="small"
                  />
                </li>
              </div>
            )
          })}

        </Collapse>
        {usersInRoom && usersInRoom.length > 0 && usersInRoom.map ((u, index) => 
            {
              return(
                <RenderUsers
                  key={u.userId}
                  user = {user}
                  userAsAdmin = {userAsAdmin}
                  userInRoom = {u}
                  rooms = {rooms}
                  handleSelectedRoom = {(room, touser) => handleSelectedRoom(room, touser)}
                />
              )
            
            }
          )
        }

      </List>
    </div>
  )
}


function RenderUsers (props)
{
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const {userInRoom, user, rooms, userAsAdmin} = props;
  const options = rooms;
  const ITEM_HEIGHT = 48;
  const displayName = 
    user.userId === userInRoom.userId ? 
    user.username + " (you)" : userInRoom.username
  ;

  function handleSelectedRoom(option, userInRoom){
    setAnchorEl(null);
    props.handleSelectedRoom(option, userInRoom)
  }

  return(
    <div className={classes.listItemClass}>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={avatarImage}/>
        </ListItemAvatar>
        <ListItemText  primary={displayName} />
        {user.userId !== userInRoom.userId &&
          <ListItemSecondaryAction>
            <ListItemIcon>
            { userAsAdmin.userId === user.userId &&
                (
                  <IconButton edge="end" 
                    onClick = {(e) => console.log(e)} //TODO delete user
                  >
                    <DeleteIcon />
                  </IconButton>
                )
            }
            <IconButton edge="end" onClick = {(e) =>setAnchorEl(e.currentTarget)}>
              <AddCircleOutlineTwoToneIcon />
            </IconButton>
            <Menu
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}
              anchorEl={anchorEl}
              //keepMounted
              open={open}
              onClose = {() => setAnchorEl(null)}
            >
              { options && options.map((option) => {
                    const disabled = option.nameRoom === "Public" ? true: false;
                    return(
                      <MenuItem key={uuid()}
                        disabled = {disabled}
                        onClick = {(e) => handleSelectedRoom(option, userInRoom)}
                      >
                        {option.nameRoom}
                      </MenuItem>
                    )
                  }
                )
                 
              }
            </Menu>
            </ListItemIcon>
          </ListItemSecondaryAction>
        } 
      </ListItem>
      <Divider  light/>
    </div>
  )
}

