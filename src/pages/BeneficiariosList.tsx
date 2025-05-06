import { useEffect, useState } from "react";
import { Beneficiario } from '../models/Beneficiario';
import { BeneficiarioService } from "../services/BeneficiarioService";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import { URLS } from "../navigation/CONSTANTS";
import { BeneficiarioCard } from "../components/BeneficiarioCard";

const BeneficiariosList = () => {
    const { username } = useAuth()
    const navigate = useNavigate()
    const [beneficiarios, setBeneficiarios] = useState<Array<Beneficiario>>([])

    useEffect(() => {
        getBeneficiariosList()
    }
        , [])

    const getBeneficiariosList = async () => {
        new BeneficiarioService()
            .getBeneficiarios()
            .then((response) => {
                console.log("Beneficiarios: ", response);
                setBeneficiarios(response);
            })
            .catch((error) => {
                console.error("Error al obtener los beneficiarios: ", error);
            });
    };

    const deleteBeneficiario = (id: string) => () => {
        const confirmation = window.confirm("¿Estás seguro de que deseas eliminar este beneficiario?");
        if (!confirmation) return;

        new BeneficiarioService()
            .deleteBeneficiario(id)
            .then(() => {
                getBeneficiariosList()
            })
            .catch((error) => {
                console.error("Error al eliminar el beneficiario: ", error);
            });
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={7}>
                    <h1 className="fs-1 fw-bold" style={{color: "white"}}>Beneficiarios de {username}</h1>
                </Col>
                <Col md={5}>
                    <Button variant="primary" onClick={() => navigate(URLS.BENEFICIARIOS.CREATE)}>
                        Crear Beneficiarios
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-center mt-3">
                {beneficiarios.map((beneficiario) => (
                    <Col md={4} key={beneficiario.id}>
                        <BeneficiarioCard
                            beneficiario={beneficiario}
                            onDelete={deleteBeneficiario(beneficiario.id.toString())}
                            onEdit={() => navigate(URLS.BENEFICIARIOS.UPDATE(beneficiario.id.toString()))}
                            onTransferencia={() => navigate(URLS.TRANSFERENCIAS.INSERT(beneficiario.id.toString()))}
                            nombre={beneficiario.nombre}
                            numero_cuenta={beneficiario.numero_cuenta}
                        />
                    </Col>
                ))}
            </Row>
        </Container>

    );
}
export default BeneficiariosList;