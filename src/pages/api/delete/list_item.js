import { connectDB } from "@/util/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";


// --> /api/dedlete/list_item 으로 요청이 들어오면 동작할 함수
export default async function handler(req, res){
    console.log(req.body);

    if(req.method === 'DELETE'){
        try{
            let {id, email} = req.body;
            let session = await getServerSession(req, res, authOptions) //현재 로그인 정보

            //admin을 가상의 관리자 이메일이라고 해보기. 관리자는 무조건 가능하게
            if(session?.user?.email === email || session?.user?.email === 'admin@admin.com'){
                const db = (await connectDB).db('mydb');  
                let result = await db.collection('post').deleteOne({_id: ObjectId.createFromHexString(id)});
                res.status(200).json({msg: '삭제 완료'});
            }else{
                //요청오류실수 400
                res.status(400).json({error: '삭제는 글 작성자만 할 수 있습니다.'})
            }
        }catch(error){
            //서버기능오류 (500)
            res.status(500).json({msg: '서버기능오류 ' + error})
        }
    }else{
        //클라이언트 실수오류 (405)
        res.status(405).json({msg: 'DELETE 요청만 처리합니다'})
    }
}


//mongodb에서 제공하는 함수

//find().toArray -> 다 가져오기
//findOne() -> 하나만 가져오기
//updateOne() -> 하나만 수정해
//deleteOne() -> 하나만 삭제해