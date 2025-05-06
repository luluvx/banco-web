import { Card, Col, Container, Row } from "react-bootstrap";
import Menu from "../components/Menu";
import { useEffect, useState } from "react";
import { CuentaService } from "../services/CuentaService";
import { Cuenta } from "../models/Cuenta";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { CardCuenta } from "../components/CuentaCard";
import { URLS } from "../navigation/CONSTANTS";
import BotonRedondo from "../components/BotonRedondo";

const Home = () => {
    const navigate = useNavigate()
    const [cuentas, setCuentas] = useState<Array<Cuenta>>([]);
    const { username } = useAuth()

    useAuth()

    useEffect(() => {
        getCuentaList()
    }, []);

    const getCuentaList = async () => {
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



    const crearNuevaCuenta = () => {
        new CuentaService()
            .createCuenta()
            .then((response) => {
                console.log("Cuenta creada: ", response);
                getCuentaList()
            })
            .catch((error) => {
                console.error("Error al crear la cuenta: ", error);
            });
    }

    return (
        <>
            <Menu />
            <Container className="container-principal mt-5 ">
                <Row className="mx-5 mt-3 justify-content-center">
                    <Col md={12}>
                        <Card
                            className="card-portal"
                            style={{ backgroundColor: "#f8f9f8", border: "none" }}
                        >
                            <Card.Body>
                                <Card.Title >Bienvenido</Card.Title>
                                <Card.Subtitle className=" mt-3 mb-2 text-muted text-capitalize">
                                    {username}
                                </Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-4 mb-5" style={{gap: "300px"}}>
                    <BotonRedondo
                        icono="bi-person-vcard"
                        onClick={crearNuevaCuenta}
                        texto="Crear Cuenta"

                    />
                    <BotonRedondo
                        icono="bi-cash-coin"
                        onClick={() => navigate(URLS.MOVIMIENTOS.CREATE)}
                        texto="Movimiento"
                    />
                    <BotonRedondo
                        icono="bi-cash-coin"
                        onClick={() => navigate(URLS.TRANSFERENCIAS.LIST)}
                        texto="Transferencias"
                    />



                </Row>
                <Row className="justify-content-center mt-3" >
                    {cuentas.map((cuenta) => (
                        <Col md={5} key={cuenta.id}>
                            <CardCuenta
                                id={cuenta.id}
                                numero_cuenta={cuenta.numero_cuenta}
                                saldo={cuenta.saldo}
                                onClick={() => navigate(URLS.MOVIMIENTOS.REDIRECT(cuenta.id.toString()))}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default Home;