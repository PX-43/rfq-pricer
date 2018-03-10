const CONN_RESET = 'ECONNRESET';
const CONN_ABORTED = 'ECONNABORTED';

export const hasClientDisconnected = err => {
    return err.code === CONN_RESET || err.code === CONN_ABORTED;
};
