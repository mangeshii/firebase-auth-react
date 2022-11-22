import { useState } from "react";
import { Card, Button, Container, Alert } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext";
import "./style.css"

const Dashboard = () => {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogOut = async () => {
        setError("")
        try {
            await logout()
            navigate("/login")
        }
        catch (e) {
            setError('Failed to log out' + error)
        }
    }
    return (
        <>
            <Container className="wrapper">
                <div className="w-100 card-container" >
                    <Card >
                        <h2 className="heading">Profile</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Card.Body>
                            <div className="mb-3" >
                                <strong>Email: </strong>{currentUser.email}

                            </div>
                            <Link to="/update-profile" className="btn btn-primary w-100">Update Profile</Link>
                        </Card.Body>
                    </Card>
                    <div className="btn-wrapper">
                        <Button className="logout-btn" variant="link" onClick={handleLogOut}>Log Out</Button>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Dashboard
