module.exports = function () {
    return {
        input: "specs/openapi.yaml",
        operations: {
            codegen: {
                output: "src/generated",
                type: "fastify"
            }
        }
    }
}