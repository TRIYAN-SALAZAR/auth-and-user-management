import fastify from "fastify"

const server = fastify({logger: true})

server.get("/", async (request, reply) => {
    reply.send({message: "Hello World", version: "1.0.0", author: "TRIYAN-SALAZAR", description: "API REST con Fastify"})
})

server.listen({port: 3000}, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    
    console.log(`Server listening on ${address}`)
})

// testing commit with sign

export default server