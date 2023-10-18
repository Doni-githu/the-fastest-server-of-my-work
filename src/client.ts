import * as redis from "redis"

const client = redis.createClient({
    url: 'redis://127.0.0.1:6379'
})

client.on('error', (error) => {
    console.error(error)
})

export default client