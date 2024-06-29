import { connectDB } from "@/util/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";


// /api/comment/new로 요청하면 받을 api서버
export default async function handler(req, res){

    //post방식으로 요청이 들어오면
    if(req.method == 'POST'){
        console.log(req.body)

        let reqObject = JSON.parse(req.body);
        console.log(reqObject)
        // res.status(200).json({msg: '받았음'})

        //로그인 안 돼 있으면 session이 null나옴
        let session = await getServerSession(req, res, authOptions)
        console.log(session)

        //댓글을 DB에 저장
        //1. 댓글 내용 저장 2. 게시글 ID  3.사용자의 이메일 
        //mydb데이터베이스 안에 comment라는 컬렉션(폴더)로 저장

        if(session !== null){
            //로그인 상태가 맞으면
            let intserItem = {
                content: reqObject.comment,
                parent: ObjectId.createFromHexString(reqObject.boardId),
                email: session.user?.email
            }

            //inserOne으로 넣을 거임
            try{
                const db = (await connectDB).db('mydb');
                let result = await db.collection('comment').insertOne(intserItem);
    
                res.status(200).json(intserItem)
            }catch(error){
                console.log('댓글입력실패', error)
                res.status(500).json({error: error})
            }
            }else{
                res.status(400).json({error: '로그인이 안되어있습니다.'})
            }
    }}