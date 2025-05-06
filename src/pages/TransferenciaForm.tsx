import { useNavigate, useParams } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Cuenta } from "../models/Cuenta";
import { useEffect, useState } from "react";
import { CuentaService } from "../services/CuentaService";
import { SubmitHandler, useForm } from "react-hook-form";
import Menu from "../components/Menu";
import {  Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { BeneficiarioService } from "../services/BeneficiarioService";
import { TransferenciaService } from "../services/TransferenciaService";
import { URLS } from "../navigation/CONSTANTS";

type Inputs = {
    cuenta_origen_id: number;
    beneficiario_id: number;
    monto: number;
};

const TransferenciaForm = () => {
    useAuth()
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [cuentas, setCuentas] = useState<Array<Cuenta>>([])
    const [nombreBeneficiario, setNombreBeneficiario] = useState("")
    const [error, setError] = useState('')

    useEffect(() => {
        getCuentasList()
        loadBeneficiario()
    }, [])

    const getCuentasList = async () => {
        new CuentaService()
            .getCuentas()
            .then((response) => {
                console.log("Cuentas: ", response);
                setCuentas(response);
            })
            .catch((error) => {
                console.error("Error al obtener las cuentas: ", error);
                // Manejo de errores

                if(error.response) {
                    setError(error.response.data.error)
                }
                
            });
    };

    const loadBeneficiario = async () => {
        new BeneficiarioService()
            .getBeneficiario(id!)
            .then((response) => {
                console.log("Beneficiario: ", response);
                setNombreBeneficiario(response.nombre)
            })
    }


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data)

        const transferencia = {
            cuenta_origen_id: data.cuenta_origen_id,
            beneficiario_id: Number(id),
            monto: data.monto,
        }

        new TransferenciaService()
            .createTransferencia(transferencia)
            .then((response) => {
                console.log("Transferencia creada: ", response);
                navigate(URLS.HOME)
            })
            .catch((error) => {
                console.error("Error completo:", error);
                console.log("Error backend:", error.response?.data?.error);
                setError(error.response?.data?.error)
            });
    }



    return (
        <>
            <Menu />
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card className="p-4">
                            <Card.Body>
                                <h1>Transferencia</h1>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Beneficiario</Form.Label>
                                        <Form.Control type="text" value={nombreBeneficiario} disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="cuenta_origen_id">
                                        <Form.Label>Cuenta Origen</Form.Label>
                                        <Form.Select {...register("cuenta_origen_id", { required: true })}
                                            isInvalid={!!errors.cuenta_origen_id}
                                        >
                                            <option value="">Seleccione una cuenta</option>
                                            {cuentas.map((cuenta) => (
                                                <option key={cuenta.id} value={cuenta.id}>
                                                    {cuenta.user.first_name + " - " + cuenta.numero_cuenta}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="monto">
                                        <Form.Label>Monto</Form.Label>
                                        <Form.Control
                                            type="number"
                                            {...register("monto", { required: true })}
                                            isInvalid={!!errors.monto}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    {error && <Alert variant="danger">{error}</Alert>}
                                    <Button variant="primary" type="submit">
                                        Transferir
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

export default TransferenciaForm;