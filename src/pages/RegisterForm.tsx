import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { RegisterRequest } from "../models/dto/RegisterRequest"
import { AuthService } from "../services/AuthService"
import { URLS } from "../navigation/CONSTANTS"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"

type Inputs = {
    nombre: string,
    apellido: string,
    username: string,
    password: string,
    ci: string,
}


const RegisterForm = () => {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)
        const register: RegisterRequest = {
            nombre: data.nombre,
            apellido: data.apellido,
            username: data.username,
            password: data.password,
            ci: data.ci,
        }
        new AuthService()
            .register(register.nombre, register.apellido, register.username, register.password, register.ci)
            .then((response) => {
                console.log("Register succesful: ", response);

                navigate(URLS.LOGIN);
            })
    }

    return (
        <>
            <Container className="mt-5 ">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Register</Card.Title>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group className="mb-3" controlId="nombre">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register("nombre", { required: true })}
                                            isInvalid={!!errors.nombre}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="apellido">
                                        <Form.Label>Apellido</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register("apellido", { required: true })}
                                            isInvalid={!!errors.apellido}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </Form.Group>
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
                                    <Form.Group className="mb-3" controlId="ci">
                                        <Form.Label>CI</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register("ci", { required: true })}
                                            isInvalid={!!errors.ci}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Register
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default RegisterForm;