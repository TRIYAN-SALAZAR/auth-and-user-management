import fastify from "fastify"

const server = fastify({logger: true})

server.get("/", function(req, res){
    res.send({hello: "hello wordl"})
})

server.listen({port: 3000}, function(err, address){
    if(err) {
        fastify.log.error(err)
        process.exit(1)
    }

})