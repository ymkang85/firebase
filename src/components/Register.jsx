import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useAuthValue } from '../context/AuthContext';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { setTimeActive } = useAuthValue();
  const navigate = useNavigate();

  const validatePassword = () => {
    let isValid = true;
    if (password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        isValid = false;
        setError("비밀번호가 틀렸습니다. ");
      }
    }
    return isValid;
  }

  const register = e => {
    e.preventDefault();
    setError('');
    if (validatePassword()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              setTimeActive(true)
              navigate("/verify-email")
            })
            .catch((err) => alert(err.message))
        })
        .catch((err) => setError(err.message))
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col>
          <h1 className='text-center mt-5 mb-3'>회원가입</h1>
          {error && <div className='text-center text-danger'>{error}</div>}
          <Form onSubmit={register} className='justify-content-center mt-5 mx-auto' style={{ maxWidth: '400px', border: '1px solid #ddd', borderRadius: "10px", backgroundColor: "#efefef", padding: "40px" }}>
            <Form.Group className='mb-3' controlId='userid'>
              <Form.Label>이메일</Form.Label>
              <Form.Control type="email" placeholder='name@example.com' value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='userpass'>
              <Form.Label>비밀번호</Form.Label>
              <Form.Control type="password" placeholder='비밀번호' value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className='mb-3' controlId='reuserpass'>
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control type="password" placeholder='비밀번호 확인' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Group>
            <div className='text-center mt-4'>
              <Button type="submit" variant="outline-dark">REGISTER</Button>
            </div>
          </Form>
          <p className='mx-auto text-end pt-3' style={{maxWidth:'400px', padding:"0 40px"}}>
            <Link to="/login">회원로그인</Link>
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default Register