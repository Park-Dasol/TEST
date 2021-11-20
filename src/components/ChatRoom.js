import dayjs from 'dayjs';
import React , { useState, useEffect , useCallback, useMemo, useContext } from 'react';
import {MdChevronLeft, MdArrowBack, MdArrowUpward} from 'react-icons/md'
import Chat from './Chat'
import './style.css'
// import { useDateContext } from '../dateContext';

function ChatRoom() {
  dayjs.locale('ko')
  const [chat, setChat] = useState([])
  const [userInput, setUserInput] = useState('')
 

  useEffect(() => {
    async function getChat() {
      await fetch("http://test.vanillabridge.com/test_data")
      .then((response) => response.json())
      .then((response) => {
        const result = response.sort(function(a, b) {
          return new Date(a.created_at) - new Date(b.created_at)
        })
        for (let res in result) {
          if (parseInt(res) ===0) {result[res].date = true}
          if (res > 0) {
            if(dayjs(result[res].created_at).format('YYYY:MM:DD') != dayjs(result[res-1].created_at).format('YYYY:MM:DD')) {
              result[res].date = true
            }
            else {
              result[res].date = false
             }
          } 
        }
        setChat(result)
      })
    }
    getChat()
  }, [])

  const onSubmitForm = useCallback((e) => {
    if (!userInput) return
    e.preventDefault();
    console.log('submit')
    const newChat = {
      id: 122344,
      user_id: 1,
      user_name: "소개녀",
      photo_url: "https://photo.vanillabridge.com/app_photos/agent_woman.jpg",
      created_at: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      msg: {
        mtype: "text",
        content: userInput,
      }
    }
    setChat(prevState => [...prevState, newChat])
    setUserInput('')
    const chatList = document.querySelector('.scroll')
    chatList.scrollTo(0,chatList.scrollHeight + 100)
  }, [userInput])

  const onChangeInput = useCallback( async (e) => {
    setUserInput(e.target.value)
  }, [userInput])


  const onKeyPressChat = useCallback((e)=> {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSubmitForm(e)
    }
  }, [onSubmitForm])

  return (
    <div>
     <div style={{width: "360px", height :"720px", position : "relative"}}>
       {/* 네비게이터 */}
       <div style={{width: "100%", height :"60px",backgroundColor: "white", display:"flex", justifyContent:"start", alignItems:"center",}}>
        <MdChevronLeft style={{color:"black", marginLeft:"10px", color:"#8c8b8d"}}/>
       </div>
       {/* 챗목록 */}

      <div className="scroll">
        {chat?.map((c)=>{
          return <Chat chat={c} key={c.id}/>})
        }
      </div>
      {/* 입력창 */}
      <div style={{width: "100%", height :"60px", position :"absolute", bottom: 0, backgroundColor: "white", display:"flex", alignItems:"center"}}>
        <form onSubmit={onSubmitForm} style={{maxHeight : "40px",margin : "7px 12px", border : "1px solid #EDEDF0", borderRadius:"12px", backgroundColor:"#FAFAFA", display:"flex", fontSize:"0", alignItems:"center", width:"100%"}}>
          <textarea rows="1" onKeyPress={onKeyPressChat} placeholder="메시지" style={{paddingLeft:"10px", fontSize :"15px", lineHeight:"2", display:"flex", justifyContent:"bottom", borderRadius:"12px", height:"30px", border: "none", resize:"none",width: `calc(100% - 31px)`, outline:"none", backgroundColor:"#FAFAFA"}} value={userInput} onChange={onChangeInput}></textarea>
          <button style={{border:"none",margin:"3px", borderRadius:"50%",width:"25px", height:"25px", backgroundColor:"#8A74FF", color:"white", display:userInput.length ?"inline-block":"none"}}><MdArrowUpward/></button>
        </form>
      </div>
     </div>
    </div>
  );
}



export default ChatRoom;
