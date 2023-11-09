import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useAuthValue } from '../context/AuthContext';

const Profile = () => {
     const { currentUser } = useAuthValue();
     const [verify, setVerify] = useState("미인증");
     const vry = () => {
          if (currentUser) {
               if (currentUser.emailVerified) {
                    setVerify("인증완료");
               }
          }
     }

     useEffect(() => {
          vry();
     })

     return (
          <Container className='pt-3'>
               <Row className='mt-5 pb-5'>
                    <h1 className='text-center pt-4 mb-5'>PROFILE</h1>
                    <p><strong>Email : </strong> {currentUser?.email} </p>
                    <p><strong>Email 인증 : </strong>
                         {verify}
                    </p>
               </Row>
          </Container>
     )
}

export default Profile