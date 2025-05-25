const config = {
    API_AUTH_URL: process.env.REACT_APP_API_AUTH_URL || 'http://127.0.0.1:8000',
    API_EVAL_URL: process.env.REACT_APP_API_EVAL_URL || 'http://127.0.0.1:8001',
    API_FILE_URL: process.env.REACT_APP_API_FILE_URL || 'http://127.0.0.1:8002'
};

export default config;