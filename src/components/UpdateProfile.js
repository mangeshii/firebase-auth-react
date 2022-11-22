import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Button, Container, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext"


const UpdateProfile = () => {
    const emailRef = useRef();
    const passRef = useRef();
    const confirmpassref = useRef();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { currentUser,updateEmail,updatePassword } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (passRef.current.value !== confirmpassref.current.value) {
            return setError("passwords do not match")
        }

        const promises=[]
        setLoading(true)
        setError("")
        
        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passRef.current.value ){
            promises.push(updatePassword(passRef.current.value))
        }
        
        Promise.all(promises)
        .then(()=>{
            navigate("/")
        })
        .catch((e)=>{
            setError("Failed to update account"+ e)
        })
        .finally(()=>{
            setLoading(false)
        })
    }

    return (
        <>
            <Container className="wrapper">
                <div className="w-100 card-container" >
                    <Card >
                        <h2 className="heading hdr">Update Profile</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Card.Body>
                            <Form onSubmit={handleSubmit} >
                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passRef}  placeholder="Leave blank to keep the same" />
                                </Form.Group>
                                
                                <Form.Group className="mb-4" controlId="formBasicPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" ref={confirmpassref}  placeholder="Leave blank to keep the same" />
                                </Form.Group>

                                <Button disabled={loading} variant="primary" type="submit" className="w-100" >
                                    Update 
                                </Button>
                            </Form>

                        </Card.Body>
                    </Card>

                    <div className="footer mt-2 hdr"><Link to={"/"}>Cancel </Link></div>
                </div>
            </Container>
        </>
    )
}
export default UpdateProfile