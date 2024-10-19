import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../firebase" // Adjust the path as needed
import { signInWithEmailAndPassword } from "firebase/auth"
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

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate("/dashboard") // Adjust the route based on your app's structure
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="account-pages my-5 pt-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>
            <Card className="overflow-hidden loginform">
              <CardBody className="pt-0">
                <h3 className="text-center">
                  <Link to="/" className="d-block auth-logo">
                    <img
                      src={logoDark}
                      alt=""
                      height="190"
                      className="auth-logo-dark"
                    />
                  </Link>
                </h3>
                <div className="p-3">
                  <h4 className=" font-size-18 mb-1 text-center">
                    Welcome Back!
                  </h4>
                  <p className=" text-center">Sign in to continue.</p>
                  <Form
                    className="form-horizontal mt-4"
                    onSubmit={handleSubmit}
                  >
                    {error && <Alert color="danger">{error}</Alert>}
                    <div className="mb-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        name="email"
                        className="form-control form-input"
                        placeholder="Enter email"
                        type="email"
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        name="password"
                        className="form-control form-input"
                        placeholder="Enter Password"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="mb-3 row mt-4">
                      <div className="col-12 text-end">
                        <button
                          className="btn loginbtn btn-primary w-md waves-effect waves-light "
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                    </div>
                    <div className="mb-0 row">
                      <div className="col-12 mt-4 text-center">
                        <p className=" mb-0 font-size-14">
                          Don't have an account?{" "}
                          <Link to="/register" className="text-primary">
                            {" "}
                            Register{" "}
                          </Link>
                        </p>
                      </div>
                    </div>
                  </Form>
                </div>
              </CardBody>
            </Card>
            <div className="mt-5 text-center">
              <p>© {new Date().getFullYear()} Russain Shop</p>
            </div>
          </Col>
        </Row>
      </Container>
      <style jsx>{`
        .account-pages {
          // background-color: #121212; /* Dark background */
          min-height: 100vh; /* Full height */
        }

        .loginform {
          background-color: #0b1c2c; /* Dark background */
          color: white;
        }
        .form-input {
          background-color: #1f2431; /* Input background */
          color: white; /* Input text color */
          border: 1px solid #ddd; /* Input border */
        }
        .form-input:focus {
          border-color: #992123; /* Border color on focus */

          outline: none; /* No outline */
        }

        .loginbtn {
          background-color: #0998a8;
          color: white; /* Muted text color */
        }
        .text-primary {
           {
            color: #0998a8 !important; /* Muted text color */
          }
        }
      `}</style>
    </div>
  )
}

export default Login
