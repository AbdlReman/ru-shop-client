import React, { useState } from "react"
import { auth } from "../../firebase" // Adjust the path as needed
import { createUserWithEmailAndPassword } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import {
  Alert,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap"
import logoDark from "../../assets/images/logo-dark.png"

const Register = () => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setSuccess(true)
      setTimeout(() => navigate("/login"), 2000)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="account-pages my-5 pt-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="overflow-hidden">
              <CardBody className="pt-0">
                <h3 className="text-center mt-5 mb-4">
                  <Link to="/" className="d-block auth-logo">
                    <img
                      src={logoDark}
                      alt=""
                      height="30"
                      className="auth-logo-dark"
                    />
                  </Link>
                </h3>
                <div className="p-3">
                  <h4 className="text-muted font-size-18 mb-1 text-center">
                    Free Register
                  </h4>
                  <p className="text-muted text-center">
                    Get your free account now.
                  </p>
                  <Form
                    className="form-horizontal mt-4"
                    onSubmit={handleSubmit}
                  >
                    {success && (
                      <Alert color="success">
                        Register User Successfully. Redirecting...
                      </Alert>
                    )}
                    {error && <Alert color="danger">{error}</Alert>}

                    <div className="mb-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter email"
                        type="email"
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        name="username"
                        className="form-control"
                        placeholder="Enter username"
                        type="text"
                        onChange={e => setUsername(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter Password"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="mb-3 row mt-4">
                      <div className="col-12 text-end">
                        <button
                          className="btn btn-primary w-md waves-effect waves-light"
                          type="submit"
                        >
                          Register
                        </button>
                      </div>
                    </div>
                    <div className="mb-0 row">
                      <div className="col-12 mt-4 text-center">
                        <p className="text-muted mb-0 font-size-14">
                          By registering you agree to the{" "}
                          <Link to="#" className="text-primary">
                            Terms of Use
                          </Link>
                        </p>
                      </div>
                    </div>
                  </Form>
                </div>
              </CardBody>
            </Card>
            <div className="mt-5 text-center">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-primary">
                  {" "}
                  Login{" "}
                </Link>{" "}
              </p>
              © {new Date().getFullYear()} Your App Name
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Register
