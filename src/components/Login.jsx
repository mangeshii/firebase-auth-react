import { Card, Form, Button, Container, Alert } from "react-bootstrap";
import "./SignUp.css";
import { useAuth } from "../context/AuthContext"
import { useRef, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";

const LogIn = () => {
    const emailRef = useRef();
    const passRef = useRef();
    const [error, setError] = useState("")
    const [loading,setLoading]=useState(false)
    const { login } = useAuth()
    const navigate=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passRef.current.value)
            navigate("/")
        }
        catch(e){
            setError("Failed to sign in" + e)
        }
        setLoading(false)
    }

    return (
        <>
            <Container className="wrapper">
                <div className="w-100 card-container" >
                    <Card >
                        <h2 className="heading">Log In</h2>
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

                                <Button disabled={loading} variant="primary" type="submit" className="w-100" >
                                    Log In
                                </Button>
                            </Form>

                        </Card.Body>
                    </Card>

                    <div className="footer mt-2">Need an account? <Link to={"/signup"}>Sign Up</Link></div>
                </div>
            </Container>
        </>
    )
}
export default LogIn