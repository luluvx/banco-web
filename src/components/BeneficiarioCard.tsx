import { Button, Card } from "react-bootstrap";
import { Beneficiario } from "../models/Beneficiario";


type BeneficiarioCardProps = {
    beneficiario: Beneficiario;
    nombre: string;
    numero_cuenta: number;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onTransferencia: (id: number) => void;
}
export const BeneficiarioCard = ({ beneficiario, onEdit, onDelete, onTransferencia }: BeneficiarioCardProps) => {


    return (
        <Card className="beneficiario-card text-center" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">{beneficiario.nombre}</Card.Subtitle>
                <Card.Text className="fw-bold mb-2">Numero de cuenta</Card.Text>
                <Card.Text>{beneficiario.numero_cuenta}</Card.Text>
                <Button variant="outline-primary" onClick={() => onEdit?.(beneficiario.id)}>
                    Edit Beneficiario
                </Button>{" "}
                <Button variant="danger" onClick={() => onDelete?.(beneficiario.id)}>
                    Eliminar
                </Button>{" "}
                <Button variant="warning" onClick={() => onTransferencia?.(beneficiario.id)}>
                    Transferencia
                </Button>{" "}
            </Card.Body>
        </Card>
    );
}