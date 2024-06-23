// use client : 클라이언트 컴포넌트
// use server : 기본 컴포넌트

//서버 컴포넌트에선 form 태그로 데이터 전송
//클라이언트 컴포넌트에선 fetch로 데이터 전송

export default function Register(){
    return(
        <div className="signup-page">
            <h3 style={{marginLeft: '15px', marginTop: '15px', marginBottom: '20px'}}>회원가입 페이지</h3>
            <form method="POST" action="/api/auth/signup">
                <input name="name" type="text" placeholder="이름을 입력하세요"/>
                <input name="email" type="text" placeholder="이메일을 입력하세요"/>
                <input name="password" type="password" placeholder="비밀번호를 입력하세요"/>
                <button type="submit" style={{marginLeft: '15px', backgroundColor: 'black',  color: 'white', padding: '5px', borderRadius: '5px'}}>
                    회원가입
                </button>
            </form>
        </div>
    )
}

//input태그의 name속성으로 key값 생성
//input태그의 입력값을 통해 해당 키의 value값이 생성됨