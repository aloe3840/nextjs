import { connectDB } from "@/app/util/db";
import { ObjectId } from "mongodb";


// --> /api/dedlete/list_item 으로 요청이 들어오면 동작할 함수
export default async function handler(req, res){
    console.log(req.body);
    let {id} = req.body;

    if(req.method === 'DELETE'){
        try{
            const db = (await connectDB).db('mydb');  
            let result = await db.collection('post').deleteOne({_id: ObjectId.createFromHexString(id)});
            res.status(200).json({msg: '삭제 완료'});
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