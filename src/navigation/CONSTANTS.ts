export const URLS = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    MOVIMIENTOS: {
        LIST: '/cuentas/:id/movimientos',
        CREATE: '/movimientos/create',
        REDIRECT: (id: string) => {
            return `/cuentas/${id}/movimientos`
        }
    },
    BENEFICIARIOS: {
        LIST: '/beneficiarios',
        CREATE: '/beneficiarios/create',
        EDIT: '/beneficiarios/:id',
        UPDATE: (id: string) => {
            return `/beneficiarios/${id}`
        }

    },
    TRANSFERENCIAS: {
        LIST: '/transferencias',
        CREATE: '/transferencias/:id/create',
        EDIT: '/transferencias/:id',
        INSERT: (id: string) => {
            return `/transferencias/${id}/create`
        }
    }
};
