import { useNavigate, useParams } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Menu from "../components/Menu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { BeneficiarioRequest } from "../models/dto/BeneficiarioRequest";
import { BeneficiarioService } from "../services/BeneficiarioService";
import { URLS } from "../navigation/CONSTANTS";
import { useEffect } from "react";

type Inputs = {
    nombre: string;
    numero_cuenta: number;
}

const BeneficiarioForm = () => {
    const navigate = useNavigate()
    useAuth()
    const { id } = useParams<{ id: string }>();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log("Datos del formulario: ", data);
        const beneficiario: BeneficiarioRequest = {
            nombre: data.nombre,
            numero_cuenta: data.numero_cuenta,
        };
        if (id) {
            updateBeneficiario(beneficiario, id);
        } else {
            insertBeneficiario(beneficiario);
        }
    }

    const insertBeneficiario = (beneficiario: BeneficiarioRequest) => {
        new BeneficiarioService()
            .createBeneficiario(beneficiario)
            .then((response) => {
                console.log("Beneficiario creado: ", response);
                navigate(URLS.BENEFICIARIOS.LIST)
            })
            .catch((error) => {
                console.error("Error al crear el beneficiario: ", error);
            });
    }

    const updateBeneficiario = (beneficiario: BeneficiarioRequest, id: string) => {
        new BeneficiarioService()
            .updateBeneficiario(beneficiario, id)
            .then((response) => {
                console.log("Beneficiario actualizado: ", response);
                navigate(URLS.BENEFICIARIOS.LIST)
            })
            .catch((error) => {
                console.error("Error al actualizar el beneficiario: ", error);
            });
    }
    const loadBeneficiario = async () => {
        new BeneficiarioService()
            .getBeneficiario(id!)
            .then((response) => {
                reset({
                    nombre: response.nombre,
                    numero_cuenta: response.numero_cuenta,
                })
            })
            .catch((error) => {
                console.error("Error al obtener el beneficiario: ", error);
            });
    }

    useEffect(() => {
        if(!id){
            return
        }
        loadBeneficiario()
    }
    , [id])

    return (
        <>
            <Menu />
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Formulario Beneficiario</Card.Title>
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

                                    <Form.Group className="mb-3" controlId="numero_cuenta">
                                        <Form.Label>Número de cuenta</Form.Label>
                                        <Form.Control
                                            type="number"
                                            {...register("numero_cuenta", { required: true })}
                                            isInvalid={!!errors.numero_cuenta}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Guardar
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

export default BeneficiarioForm;