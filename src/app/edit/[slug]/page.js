//id를 받아와서 그 아이디로 DB에서 검색해서 보여줌
//기존의 내용을 먼저 보여줌
//수정하기 버튼을 누르면 수정하는 페이지로 POST요청을 할 거임
import { connectDB } from "@/app/util/db";
import { ObjectId } from "mongodb";



export default async function EditPage({params}){
    //params.slug : adit/ 뒤에 입력한 url
    console.log(params.slug)
    //params.slug를 사용해서 DB에 검색을 하고
    //input의 기본값에 세팅한다
    const db = (await connectDB).db('mydb');  
    let result = await db.collection('post').findOne({_id: ObjectId.createFromHexString(params.slug)});
    //find.toArray: 전체 가져오기   findOne: 하나 가져오기
    console.log(result)

    return(
        <div className="write-container">
            <h4>수정 페이지</h4>
            <br/>
            <form action="/api/post/edit" method="POST">
                <input name="id" defaultValue={result._id} type="hidden"></input>
                <input name="title" defaultValue={result.title}></input>
                <input name="content" defaultValue={result.content}></input>
                <button type="submit">수정하기</button>
            </form>
        </div>
    )
}

//get: 받아올 때
//post: 입력할 때 (또는 너무 길게 받아올 때)

//input태그의 name이 key값이 됨. (서버에서 받는 키 값)
//{id: '입력값0', title: '입력값1', content: '입력값2'}
