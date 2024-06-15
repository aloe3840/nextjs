import Link from "next/link";
import { connectDB } from "../util/db";

export default async function ListPage(){
    const db = (await connectDB).db('mydb');  
    let result = await db.collection('post').find().toArray();

    return(
        <div className="list-bg">
            {
            result && result.length > 0 ? result.map((item, index)=>{
                return(
                    <div key={index} className="list-item">
                        <Link href={'/detail/' + item._id}>
                            <h4>{item.title}</h4>
                            <p>{item.content}</p>
                        </Link>
                    </div>
                )
            }) : null
        }
        </div>
    )
}