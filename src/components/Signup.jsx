import { Card, Form, Button, Container, Alert } from "react-bootstrap";
import "./SignUp.css";
import { useAuth } from "../context/AuthContext"
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Signup = () => {
    const emailRef = useRef();
    const passRef = useRef();
    const confirmpassref = useRef();
    const [error, setError] = useState("")
    const [loading,setLoading]=useState(false)
    const { signup } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (passRef.current.value !== confirmpassref.current.value) {
            return setError("passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passRef.current.value)
        }
        catch(e){
            setError("Failed to create an account" + e)
        }
        setLoading(false)
    }

    return (
        <>
            <Container className="wrapper">
                <div className="w-100 card-container" >
                    <Card >
                        <h2 className="heading">Sign Up</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Card.Body>
                            <Form onSubmit={handleSubmit} >
                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" ref={emailRef} placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" ref={passRef} placeholder="Password" />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formBasicPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" ref={confirmpassref} placeholder="Password" />
                                </Form.Group>

                                <Button disabled={loading} variant="primary" type="submit" className="w-100" >
                                    Sign Up
                                </Button>
                            </Form>

                        </Card.Body>
                    </Card>

                    <div className="footer mt-2">Already have an account? <Link to={"/login"}>Log In</Link></div>
                </div>
            </Container>
        </>
    )
}
export default Signup