import React, { useState, useEffect } from 'react';
import { Container, Row, Col, FormControl, Button, FormGroup } from 'react-bootstrap';
import { db } from "../firebase";
import { addDoc, deleteDoc, getDoc, collection, updateDoc, doc } from 'firebase/firestore';

const Bbs = () => {
    const [title, setTitle]= useState("");
    const [content, setContent] = useState("");
    const [id, setId] = useState("");

    const value = collection(db, "demodb");

    const handleCreate = async () =>{    
        await addDoc(value, { title, content });
        setTitle('');
        setContent('');
    }

    return (
        <Container className='mt-5 pt-5'>
            <Row className='mb-5 pb-3'>
                <Col md="6">
                    <FormGroup>
                        <FormControl type='text' onChange={(e)=>setTitle(e.target.value)} placeholder='제목' className='mb-3' value={title} />
                        <FormControl as='textarea' onChange={(e)=>setContent(e.target.value)} placeholder='내용' rows={3} className='mb-3' value={content} />
                        <Button variant='secondary' id="inputG" onClick={handleCreate} className='d-block'>전송</Button>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                
            </Row>
        </Container>
    )
}

export default Bbs