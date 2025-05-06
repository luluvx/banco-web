import {  useEffect, useState } from "react";
import { Cuenta } from "../models/Cuenta";
import { useNavigate } from "react-router";
import { CuentaService } from "../services/CuentaService";
import { SubmitHandler, useForm } from "react-hook-form";
import Menu from "../components/Menu";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { Movimiento } from "../models/Movimiento";
import { MovimientoService } from "../services/MovimientoService";
import { URLS } from "../navigation/CONSTANTS";
import { useAuth } from "../hooks/useAuth";

type Inputs = {
    cuenta_id: number;
    tipo: "ingreso" | "egreso";
    monto: number;
};

const MovimientoForm = () => {
    useAuth()
    const [cuentas, setCuentas] = useState<Array<Cuenta>>()
    const navigate = useNavigate()

    useEffect(() => {
        getCuentasList()
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
            });
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();


    const onSubmit: SubmitHandler<Inputs> = (data) => {

        console.log(data)

        const movimiento : Movimiento = {
            cuenta_id: data.cuenta_id,
            tipo: data.tipo,
            monto: data.monto,
        }
        new MovimientoService()
            .createMovimiento(movimiento)
            .then((response) => {
                console.log("Movimiento creado: ", response);
                navigate(URLS.HOME)
            })
            .catch((error) => {
                console.error("Error al crear el movimiento: ", error);
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
                                <Card.Title>Crear Movimiento</Card.Title>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group className="mb-3" controlId="cuenta_id">
                                        <Form.Label>Cuenta</Form.Label>
                                        <Form.Select
                                            {...register("cuenta_id", { required: true })}
                                            isInvalid={!!errors.cuenta_id}
                                        >
                                            <option value="">Seleccione una cuenta</option>
                                            {cuentas?.map((cuenta) => (
                                                <option key={cuenta.id} value={cuenta.id}>
                                                    {cuenta.user.first_name} {cuenta.user.last_name} - {cuenta.saldo}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Este campo es requerido
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="tipo">
                                        <Form.Label>Tipo</Form.Label>
                                        <Form.Select
                                            {...register("tipo", { required: true })}
                                            isInvalid={!!errors.tipo}
                                        >
                                            <option value="">Seleccione un tipo</option>
                                            <option value="ingreso">Ingreso</option>
                                            <option value="egreso">Egreso</option>
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

                                    <button type="submit" className="btn btn-primary">Crear Movimiento</button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>

    );
}

export default MovimientoForm;