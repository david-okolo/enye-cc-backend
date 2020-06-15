require('dotenv').config();
import app from './app';

const port = process.env.PORT || 3000;

app.start({
    port,
    playground: '/graphql',
    endpoint: '/graphql'
}, () => {
    console.log(`Server started on port ${port}`)
});