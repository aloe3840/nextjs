'use client'

import handler from "@/pages/api/test"
import Link from "next/link"
import { useState } from "react"

//맨 위에 use client가 적혀있어야 onClick이나 useState 등 사용 가능


//클라이언트 컴포넌트 분리
//DB에서 받아온 result값을 useState로 관리
export default function ListItem({result}){
    //받아온 데이터를 state로 변경 (화면 갱신을 위해)
    //변수는 바꿔도 화면이 바뀌지 않음. state는 화면에 바로 갱신됨
    const [listData, setListDate] = useState(result)

    return(
        <>
        {
            listData && listData.length > 0 ? listData.map((item, index)=>{
            return(
                <div key={index} className="list-item">
                    <Link href={'/detail/' + item._id}>
                        <h4>{item.title}</h4>
                        <p>{item.content}</p>
                    </Link>
                    <Link href={'/edit/' + item._id}>✏ 수정</Link>
                    <span onClick={()=>{
                        fetch('/api/delete/list_item', {
                            method: 'DELETE', 
                            headers: {'Content-Type': 'application/json'},  //내가 보내는 타입이 json타입이다!
                            body: JSON.stringify({id:item._id, email: item.email})
                        })
                        .then((res)=>{  //fetch로 요청해서 then으로 받아옴(fetch도 use client있어야함)
                            //fetch가 완료되면 실행할 코드 (res)에는 서버응답이 담겨있음
                            //use client에서 consoloe.log하면 웹페이지 f12에서 확인가능 (다른 애들은 터미널로 확인함)
                            if(res.status == 200){
                                //200이 성공하면 state변경
                                //기존의 listData에서 item._id가 일치하는 것을 찾아 filter
                                //filter() : 입력한 값을 배열에서 찾아 걸러줌
                                setListDate(prev => prev.filter((i)=>i._id !== item._id));  //중괄호 생략하면 return도 생략가능
                                return res.json();  //then에서 return하면 다음 then의 매개변수로 옮겨감
                            }else if(res.status == 400){
                                alert('글 작성자만 삭제할 수 있습니다.')
                                return res.json()
                            }
                        })  
                        .then((resJson)=>{
                            console.log(resJson)
                        })
                        .catch((error)=>{
                            console.log(error)   //fetch나 then을 하다 에러가 발생하면 에러출력
                        })
                    }}> 🗑 삭제</span>
                </div>
                )
            }) : null
        }
        </>
    )
}