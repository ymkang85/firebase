import React, { useState, useEffect } from 'react'
import { Container, Row, Col, FormGroup, FormControl, Button, ListGroup } from 'react-bootstrap';
import { db } from '../firebase';
import { addDoc, deleteDoc, getDocs, updateDoc, collection, doc } from 'firebase/firestore';

const Bbs = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState('');
    const [id, setId] = useState("");
    const [val, setVal] = useState([]);
    const [show, setShow] = useState(false);

    const value = collection(db, "demodb");

    useEffect(() => {
        const getData = async () => {
            const res = await getDocs(value);
            setVal(res.docs.map(rs => ({ ...rs.data(), id: rs.id })))
        }
        getData();
    })

    const handleCreate = async () => {
        await addDoc(value, { title, content })
        setTitle('');
        setContent('');
    }

    const handleDelete = async (id) => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            const delId = doc(db, "demodb", id);
            await deleteDoc(delId);
        }
    }

    const handleUpdate = async () => {
        const updateId = doc(db, "demodb", id);
        await updateDoc(updateId, { title, content })
        setShow(false);
        setTitle("");
        setContent("");
        setId("");
    }
    const handleEdit = (id, title, content) => {
        setTitle(title)
        setContent(content)
        setId(id)
        setShow(true);
    }
    return (
        <Container className="mt-5 pt-5">
            <Row className="mb-5 pb-3">
                <Col>
                    <FormGroup>
                        <FormControl type="text" onChange={(e) => setTitle(e.target.value)} placeholder='제목' className="mb-3" value={title} />
                        <FormControl as="textarea" onChange={(e) => setContent(e.target.value)} placeholder='내용' rows={3} className="mb-3" value={content} />
                        {!show ? <Button variant="secondary" id="inputG" onClick={handleCreate} className="d-block">전송</Button> : <Button variant="danger" className="d-block" onClick={handleUpdate}> 수정 </Button> }
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListGroup as="ol" numbered>
                        {
                            val.map((values, index) =>
                                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start p-3">
                                    <Row>
                                        <Col md="10" className="ps-3 ">
                                            <h5>{values.title}</h5>
                                            <p>{values.content}</p>
                                        </Col>
                                        <Col md="2" className="btn-box text-end align-self-center">
                                            <Button variant="danger m-2" onClick={() => handleDelete(values.id)}>삭제</Button>
                                            <Button variant="warning m-2" onClick={() => handleEdit(values.id, values.title, values.content)}>수정</Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                        }
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}

export default Bbs