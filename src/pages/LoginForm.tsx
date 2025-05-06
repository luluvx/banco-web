import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { LoginRequest } from "../models/dto/LoginRequest";
import { AuthService } from "../services/AuthService";
import { URLS } from "../navigation/CONSTANTS";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import Menu from "../components/Menu";

type Inputs = {
    username: string,
    password: string,
};

const LoginForm = () => {
    const navigate = useNavigate();
    const { doLogin } = useAuth()


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const login: LoginRequest = {
            username: data.username,
            password: data.password,
        };

        new AuthService()
            .login(login.username, login.password)
            .then((response) => {
                console.log("Login successful", response)
                doLogin({
                    access_token: response.access,
                    refresh_token: response.refresh,
                    username: login.username
                })
                navigate(URLS.HOME);
            });
    };

    return (
        <>
            <Menu />
            <Container className="mt-5 ">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Login</Card.Title>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group className="mb-3" controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register("username", { required: true })}
                                            isInvalid={!!errors.username}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            {...register("password", { required: true })}
                                            isInvalid={!!errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Iniciar sesión
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>

    );
};

export default LoginForm;
