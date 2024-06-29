'use client'
import { useEffect, useState } from 'react'
import './comment.css' 
//리액트 방식으로 새로고침 없이 state와 ajax요청 (fetch)


export default function Comment({boardId}){
    const [comment, setComment] = useState('');  //input에 입력한 내용
    const [commentList, setCommentList] = useState([]);  //보여줄 댓글들

    //commentList의 내용을 요청한다
    //페이지가 로딩될 때 commentList 요청 : useEffect => 로딩될 때, 언로딩될 때, 갱신될 때
    useEffect(()=>{
        //서버에 댓글리스트를 get요청해서 받아오기
        //받아온 인자를 setCommentList에 담는다
        fetch('/api/comment/list?id' + boardId)
        .then(res=>res.json())
        .then(result=>{
            setCommentList(result)
        })
    }, [])

    return(
        <div className="comment-container">
            <hr></hr>
            {
                commentList.length > 0 ? (
                    commentList.map((item, index)=>{
                        return(
                            <p key={index}>{item?.content}</p>
                        )
                    })
                ) : (
                    null
                )
            }

            <input onChange={(e)=>{setComment(e.target.value)}} id='comment-input'/> {/* 무언가 입력될 때마다 발동되는 함수 : onChange */}
            {/* 버튼이 클릭되면 /api/comment/new에 저장해달라고 요청 보내기 */}
            <button onClick={()=>{
                document.getElementById('comment-input').value = ''
                //서버에 body메시지를 보낼 땐 json문자열로 보내기
                fetch('/api/comment/new', {method:'POST', body:JSON.stringify({comment: comment, boardId: boardId})})  //댓글 내용 + 게시글 ID
                .then((res)=>{
                    if(res.status == 200){
                        return res.json()
                    }else{
                        return null;
                    }
                })
                .then((result)=>{
                    console.log(result)
                    //여기에서 state를 업데이트해서 화면반영
                    setComment('');
                    setCommentList(prev => [...prev, result])  //prev : 이전값 (기본값), 새댓글 추가한거임

                })
            }}>댓글 입력</button>
        </div>
    )
}