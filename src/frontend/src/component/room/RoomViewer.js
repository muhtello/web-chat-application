import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';





const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.main,
  },
  container: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    margin: 0,
    '& > *': {
      paddingLeft: theme.spacing(0.5),
      paddingTop: theme.spacing(0.7)
    },
  },
 
}));

export default function RoomViewer(props){
  const classes = useStyles();
  const {rooms, selectedIndex} = props;
  const [openInput, setOpenInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function  handleClose(){

    setOpenInput(false);
    props.handleNewRoom(inputValue);
  }

  return (
    <div  className = {classes.root}>
      <div className = {classes.container}>
       <ButtonGroup
        size="small" 
        variant="contained" 
        color="primary" 
        disableElevation
        
      >
        {rooms && rooms.map((ro, index) => {
              const unreadedMsg = ro.unreadedMsg;
              const variant = index === selectedIndex ? "contained" : "outlined";
              return(
                <Button 
                  key={ro.roomId}
                  onClick = {(e) => props.handleSwtichRoom(index)}
                  color="primary" 
                  variant={variant}
                >
                  <Badge
                    badgeContent={unreadedMsg}
                    anchorOrigin={
                      {
                        vertical: 'top',
                        horizontal: 'left',
                      }
                    }
                    color="secondary"
                  >
                    <Typography>
                      {ro.nameRoom}
                    </Typography>
                  </Badge>
                </Button>
              )
            }
        
          )
        }
        <IconButton color="primary" onClick = {(e) => setOpenInput(true)}>
          <AddCircleOutlineTwoToneIcon 
            
          />
        </IconButton>
      </ButtonGroup>
      </div> 
      <div>
      <Dialog
        open={openInput}
      >
        <DialogContent>
          <TextField 
            label="name"
            onChange = {(e) => setInputValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenInput(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleClose()} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  )
}