import Link from "next/link";
import { connectDB } from "../../util/db";
import ListItem from "./listItem";

export default async function ListPage(){
    const db = (await connectDB).db('mydb');  
    let result = await db.collection('post').find().toArray();

    //_id를 문자열로 변환
    result = result.map(item => ({
        ...item,
        _id: item._id.toString(),
    }))

    return(
        <div className="list-bg">
            <ListItem result={result}/>
        </div>
    )
}

//삭제하기 버튼을 누르면 state를 변경해서 화면을 갱신
//page.js의 기본값은 'use server' : 서버 컴포넌트
//onClick, useState, ... 사용하려면 : 클라이언트 컴포넌트 'use client' 를 써야함
//클라이언트 함수가 필요한 부분은 컴포넌트로 분리  --> client가 보안에 취약함. 권장하지 않음