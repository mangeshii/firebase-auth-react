import { Card, Form, Button, Container, Alert } from "react-bootstrap";
import { useRef,useState} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

const ForgotPassword=()=>{
    const emailRef = useRef();
    const [error, setError] = useState("")
    const [message,setMessage]=useState("")
    const [loading, setLoading] = useState(false)
    const { resetPassword } = useAuth()


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions')
        }
        catch (e) {
            setError("Failed to reset" + e)
        }
        setLoading(false)
    }

    return(
        <>
        <Container className="wrapper">
                <div className="w-100 card-container" >
                    <Card >
                        <h2 className="heading hdr">Password Reset</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" ref={emailRef} placeholder="Enter email" />
                                </Form.Group>

                                <Button disabled={loading}  variant="primary" type="submit" className="w-100" >
                                    Reset Password
                                </Button>
                                <div className="forgot-password hdr mt-2">
                                    <Link to="/login">Log In</Link>
                                </div>
                            </Form>

                        </Card.Body>
                    </Card>

                    <div className="footer mt-2 hdr">Need an account? <Link to={"/signup"}>Sign Up</Link></div>
                </div>
            </Container>
        </>
    )
}
export default ForgotPassword