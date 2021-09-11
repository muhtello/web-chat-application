//import React, {Component} from "react";
import React from "react";
import clsx from 'clsx';
//import {relativeDate} from "relative-date";
import "./message-viewer.css";

const MessageViewer = (props) => {
  const messages = props.messages;
  const currentUser = props.currentUser;
  return(
    <div >
      {
        messages && messages.length > 0 &&
        messages.map((msg, index) => {
          const text =   msg.message;
          const leftSide = currentUser === msg.fromUser ? true : false;

          return(
            <div className={
              clsx(
                "message-wrapper",
                {"message-wrapper-right": !leftSide},
                {"message-wrapper-left": leftSide}
              )}
              key={index}
              >
              <div className={
              clsx(
                {"message-content-wrapper-right": !leftSide},
                {"message-content-wrapper-left": leftSide}
              )}>

                <span className="message-content-span"> 
                  {text}
                </span>
              </div>
              <div className="message-metadata">
                <span className= "message-metadata-author">
                  {msg.fromUser}
                </span>
                <span className="message-metadata-timestamp">
                  {msg.time}
                </span>
              </div>
            </div>
          )
        })
      }
    </div>
  )

}


export default MessageViewer;