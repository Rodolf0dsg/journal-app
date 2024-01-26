
export const getEnvironments = () => {

    //se cargan las variables de entornos antes de retornarlas
    // import.meta.env;

    return {
        ...import.meta.env,
    }
}
