import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { signInWithEmailAndPassword, sendEmailVerification, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthValue } from '../context/AuthContext';

const mystyle = {
    normal : {
        width:"calc(100% - 63px", 
        display:"flex", 
        color:"#fff", 
        justifyContent:"center", 
        alignItems:"center", 
        cursor:"pointer",
        backgroundColor:"#4285f4"        
    },
    hover:{
        backgroundColor : "#3367d6"
    }
}

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [hover, setHover] = useState(false);
    const { setTimeActive } = useAuthValue();
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(()=>{
                if(!auth.currentUser.emailVerified){
                    sendEmailVerification(auth.currentUser)
                        .then(()=>{
                            setTimeActive(true)
                            navigate('/verify-email')
                        })
                        .catch(err=> alert(err.message))
                } else {
                    navigate("/");
                }
            })
            .catch(err => setError(err.message));
    }

    // google popup
    const handleGoogleSignin = () =>{
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
            .then(()=>navigate("/"))
            .catch((err)=>alert(err.message))
    }

    return (
        <Container>
            <Row className='justify-content-md-center mt-5'>
                <Col>
                    <h1 className='text-center mt-5 mb-3'>회원로그인</h1>
                    {error && <div className='text-center text-danger'>{error}</div>}
                    <Form onSubmit={login} className='justify-content-center mt-5 mx-auto' style={{ maxWidth: '400px', border: '1px solid #ddd', borderRadius: "10px", backgroundColor: "#efefef", padding: "40px" }}>
                        <Form.Group className='mb-3' controlId='userid'>
                            <Form.Label>이메일</Form.Label>
                            <Form.Control type="email" placeholder='name@example.com' value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId='userpass'>
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control type="password" placeholder='비밀번호' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </Form.Group>
                        <div className='text-center mt-4'>
                            <Button type="submit" variant="outline-dark">LOGIN</Button>
                        </div>
                    </Form>
                    <p className='mx-auto text-end pt-3'style={{ maxWidth: '400px', padding:"0 40px" }}>
                        <Link to="/register">회원가입</Link>
                    </p>
                </Col>
            </Row>

            <div className='d-flex justify-content-md-center mt-5 mx-auto' style={{maxWidth:"400px", border:"2px solid #4285f4"}}>
                <div style={{width:"63px", height:"50px", background:"url(images/google.png) no-repeat 10px center", backgroundSize:"40px" }}></div>
                <div style={{...mystyle.normal, ...( hover ? mystyle.hover : null )}} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onClick={handleGoogleSignin}>sign in with Google</div>
            </div>
        </Container>
    )
}

export default Login