import Image from "next/image";
import { connectDB } from "./util/db";

export default async function Home() {
  const client = await connectDB; //오래 걸리는 작업은 건너뛰고 다음 코드 실행 (-> await으로 기다리게 만들어줌)
  const db = (await connectDB).db('mydb');  //문자열 안에는 데이터베이스 이름
  let result = await db.collection('post').find().toArray();
  console.log(result)

  return (
    <div>
      <p>{result[0]?.title}</p>
      <p>{result[0]?.content}</p>
    </div> 
  );
}

//layout.js: page.js를 감싸고 있는 main페이지
//app/page.js: Home페이지
//global.css: latout.js에 연결된 css
//page.module.css: page.js에 연결된 css

//app폴더가 기본경로 'http://localhost:3000'
//http://localhost:3000/list --> app폴더에 list폴더 만들고 page.js파일
