import Comment from "@/app/components/comment/comment";
import { connectDB } from "@/util/db";
import { ObjectId } from "mongodb";

//디테일 페이지를 여러개 만들거임 ex. detail1, detail2
//slug : 내가 이동한 url의 값. []안에 넣고 싶은 걸 넣으면됨. 그냥 slug넣음


//[폴더] : 동적 route(URL)
//어떤 항목에 대해 열린 페이지인지 알아야 상세내용을 보여줌
//url마다 다른 내용이 보여야하기 때문에 params로 매개변수를 받아옴
export default async function DetailPage({params}){
    const db = (await connectDB).db('mydb'); 
    let result = await db.collection('post').findOne({_id: ObjectId.createFromHexString(params.slug)})
    //findOne: 하나만 가져옴
    
    console.log(params)
    console.log(result)

    return(
        <div>
            <h4>{result.title}</h4>
            <p>{result.content}</p>
            <Comment boardId={result?._id.toString()}/>  {/* 보안문자로 안넘어가서 문자열로 바꿔서 props로 넘김 */}
        </div>
    )
}
