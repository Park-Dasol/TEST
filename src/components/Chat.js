import React from 'react';
import dayjs from 'dayjs'
import 'dayjs/locale/ko'

function ChatRoom({chat}) {

  dayjs.locale('ko')

  const dateStyle = {
    color:"grey",
    fontSize:"12px", 
    width:"max-content", 
    whiteSpace:"nowrap",
    paddingBottom:"3px",
    margin:"0 3px",
  }
  const opponentContentStyle = {
    color:'#303030', 
    textAlign:"start", 
    fontSize:"15px",
    padding :"8px",
    backgroundColor:"white", 
    borderRadius : "0 12px 12px", 
    whiteSpace:"pre-wrap",
    maxWidth:"264px"
  }
  const userContentStyle = {
    color:'white', 
    textAlign:"start", 
    fontSize:"15px",
    padding :"8px",
    backgroundColor:"#8A74FF", 
    borderRadius : "12px", 
    whiteSpace:"pre-wrap",
    maxWidth:"264px"
  }


  if (chat.user_id === 1) {
    return (
      <>
      {chat.date? (<div style={{display:"flex",margin:"10px 0",  justifyContent:"center", alignItems:"center"}}>
      <div style={{color:"white", backgroundColor:"#C8C8CD", width:"120px", height:"20px", fontSize:"12px", borderRadius:"12px"}}>{dayjs(chat.created_at).format('YYYY년 MM월 DD일')}</div>
      </div>):''}
      <div style={{display:"flex", justifyContent:"flex-end",padding:"5px 15px 5px 15px", alignItems:"end"}}>
        <div style={dateStyle}>{dayjs(chat.created_at).format('A h:mm')}</div>
        <div style={userContentStyle} onClick={() => navigator.clipboard.writeText(chat.msg.content)}>
          {chat.msg.content.replace(/\\n/g, '\n')}
        </div>
      </div>
      </>
    )
  }
  if (chat.msg.mtype !=="photo") {
    return (
      <>
      {chat.date? (<div style={{display:"flex",margin:"10px 0",  justifyContent:"center", alignItems:"center"}}>
      <div style={{color:"white", backgroundColor:"#C8C8CD", width:"120px", height:"20px", fontSize:"12px", borderRadius:"12px"}}>{dayjs(chat.created_at).format('YYYY년 MM월 DD일')}</div>
      </div>):''}
        <div style={{display:"flex", padding:"5px 15px 5px 15px"}}>
          {/* 사진 */}
          <div>
            <img src={chat.photo_url} style={{width: "40px", height:"40px", borderRadius:"12px"}}/>
          </div>  
          {/* 이름, 챗 */}
          <div style={{display:"flex", backgroundColor:"transparent", alignItems:"end",padding:"0 5px"}}>
            <div style={{display:"flex",  flexDirection:"column",alignItems:"start"}}>
              <div style={{color:"#B4B3B7", fontSize:"12px", backgroundColor:"transparent"}}>
                {chat.user_name}
              </div>
              <div style={opponentContentStyle} onClick={() => navigator.clipboard.writeText(chat.msg.content)}>
                {chat?.msg.content.replace(/\\n/g, '\n')}
              </div>
            </div>
            <div style={dateStyle}>{dayjs(chat.created_at).format('A h:mm')}</div>
          </div>
        </div>
      </>
    )
  }

  return null
}





export default ChatRoom;
