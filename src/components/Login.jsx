import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useAuthValue } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setTimeActive } = useAuthValue();
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(()=>{
                if(!auth.currentUser.emailVerified){
                    sendEmailVerification(auth.currentUser)
                        .then(()=>{
                            setTimeActive(true);
                            navigate('/verify-email');
                        })
                        .catch(err=> alert(err.message));
                } else {
                    navigate("/");
                }
            })
            .catch(err => setError(err.message));
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
                            <Button variant="outline-dark">LOGIN</Button>
                        </div>
                    </Form>
                    <p className='mx-auto text-end pt-3'style={{ maxWidth: '400px', padding:"0 40px" }}>
                        <Link to="/register">회원가입</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default Login