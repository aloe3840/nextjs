//id를 받아와서 그 아이디로 DB에서 검색해서 보여줌
//기존의 내용을 먼저 보여줌
//수정하기 버튼을 누르면 수정하는 페이지로 POST요청을 할 거임
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";



export default async function EditPage({params}){
    //params.slug : adit/ 뒤에 입력한 url
    console.log(params.slug)
    //params.slug를 사용해서 DB에 검색을 하고
    //input의 기본값에 세팅한다

    let session = await getServerSession(authOptions);

    if(session){
        const db = (await connectDB).db('mydb');  
        let result = await db.collection('post').findOne({_id: ObjectId.createFromHexString(params.slug)});
        const resultIdString = result._id.toString();

        //로그인한 이메일이 글의 이메일과 동일한지 체크
        if(sesson.user?.email == result.email){
            return(
                <div className="write-container">
                    <h4>수정 페이지</h4>
                    <br/>
                    <form action="/api/post/edit" method="POST">
                        <input name="id" defaultValue={resultIdString} type="hidden"></input>
                        <input name="title" defaultValue={result.title}></input>
                        <input name="content" defaultValue={result.content}></input>
                        <button type="submit">수정하기</button>
                    </form>
                </div>
            )
        }else{
            <div> 글 작성자만 수정 가능합니다. </div>
        }
    }else{
        return(
            <div> 글 작성자만 수정 가능합니다. </div>
        )
    }
}



//get: 받아올 때
//post: 입력할 때 (또는 너무 길게 받아올 때)

//input태그의 name이 key값이 됨. (서버에서 받는 키 값)
//{id: '입력값0', title: '입력값1', content: '입력값2'}
