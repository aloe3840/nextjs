
/* 
    /api/post/new로 요청하면 이 서버 파일이 실행된다
*/

import { connectDB } from "@/app/util/db";

export default async function writeHandler(req, res){
    //POST요청에는 body라는 곳에 데이터를 담아보냄 (req.body에 input에 입력한 것들이 있음)
    console.log(req.body)

    if(req.method == 'POST'){
        //body에 담긴 값들을 꺼내고 비어있지 않으면 mongodb에 insertOne입력
        //요청한 페이지로 돌려보내기 (302, 'URL')
        let {title, content} = req.body
        if(title && content){
            try{
                //이 코드를 실행
                const db = (await connectDB).db('mydb');  
                let result = await db.collection('post').insertOne({title, content})
                return res.redirect(302, '/list')  //끝나면 /list페이지로 이동시키기
            }catch(error){
                //에러 나면 이쪽으로 이동
                console.log('Database Error: ' + error)
                return res.status(500).json({error: '서버기능 오류'})
            }
        }else{
            //빈칸으로 입력해서 요청했을 때 (사용자 실수)
            return res.status(400).json({error: '빈칸은 허용되지 않습니다'})
        }
    }else{
        return res.status(405).json({error: 'Method Not Allowed'})
    }
}