import { useEffect, useState } from "react";
import { Movimiento } from "../models/Movimiento";
import { MovimientoService } from "../services/MovimientoService";
import Menu from "../components/Menu";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router";
import { useAuth } from "../hooks/useAuth";
import MovimientoCard from "../components/MovimientoCard";
import { CuentaService } from "../services/CuentaService";
import { Cuenta } from './../models/Cuenta';

const MovimientosList = () => {
    const { username } = useAuth()
    const { id } = useParams<{ id: string }>();
    const [movimientos, setMovimientos] = useState<Array<Movimiento>>([])
    const [cuenta, setCuenta] = useState<Cuenta>()

    useEffect(() => {
        getMovimientosList()
        getCuenta( id!)
    }, [])

    const getMovimientosList = async () => {
        new MovimientoService()
            .getMovimientosPorCuenta(id!)
            .then((response) => {
                console.log("Movimientos: ", response);
                setMovimientos(response);
            })
            .catch((error) => {
                console.error("Error al obtener los movimientos: ", error);
            });
    };

    const getCuenta = async (id: string) => {
        new CuentaService()
            .getCuenta(Number(id))
            .then((response) => {
                console.log("Cuenta: ", response);
                setCuenta(response);
            })
            .catch((error) => {
                console.error("Error al obtener la cuenta: ", error);
            });
    };




    return (
        <>
        <Menu />
        <Container className="mt-5">
            <Card className="text-left mb-4">
                <Card.Header className="fs-1 fw-bold">Movimientos de {username}</Card.Header>
                <Card.Body className="text-left">
                    <Card.Text className="text-left fs-5 fw-bold mb-1">Numuero deCuenta</Card.Text>
                    <Card.Text className="text-left">{cuenta?.numero_cuenta}</Card.Text>
                </Card.Body>
            </Card>
            <Card className="text-center">
                <Card.Body>
                    {movimientos.map((movimiento) => (
                        <MovimientoCard
                            key={movimiento.id}
                            movimiento={movimiento}
                            />
                    ))}
                </Card.Body>

            </Card>
        </Container>
        
        </>

    );
}
 
export default MovimientosList;