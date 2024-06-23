//글 작성할 때 이메일도 같이 기록하게 해서
//수정과 삭제할 때도 같은 이메일로 로그인 했을 때만 
//수정 및 삭제할 수 있게 변경

import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"

export default async function WritePage(){
    //글 작성하기 전에 session을 검사해서
    //로그인 중이면 원래 return띄워주고 
    //로그인 안 돼 있으면 로그인 필요하다고 return띄워주기
    let session = await getServerSession(authOptions); 
    console.log('글 작성 세션 로그인 정보: ', session)

    if(session){     
        return(
            <div className="write-container">
                <h4>글 작성 페이지</h4>
                {/* /api/post/new에 POST요청 */}
                <br/>
                <form action="/api/post/new" method="POST">
                    <input name="title" placeholder="제목을 입력하세요"></input>
                    <input name="content" placeholder="내용을 입력하세요"></input>
                    <button type="submit">POST 요청 버튼</button>
                </form>

                <br/>

                {/* /api/test에 GET요청 */}
                <form action="/api/test" method="GET">
                    <button type="submit">GET 요청 버튼</button>
                </form>
            </div>
    )
    }else{
        return(
            <div>로그인이 필요해요</div>
        )  
    }

}

//서버 통신 방식 (간단하게 URL을 통해서 메시지를 주고받자 REST API)
//rest api 종류 : get, post, delete, put --> 요청하면 응답줌
//get요청 : 서버에 데이터를 요청할 때
//post요청 : 서버에 데이터를 전송할 때 (보안, 길다)