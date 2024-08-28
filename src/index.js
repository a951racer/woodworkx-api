import dotenv from 'dotenv';
import configureMongoose from './config/mongoose.js'
import configureExpress from './config/express.js'

dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';


const db = configureMongoose();
const app = configureExpress();

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port`)
);

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 4800
    app.listen(PORT, () =>
        console.log(`your server is running on port ${PORT}`)
    );
}

export default app;

//console.log(`Server running on port: ${PORT}`)
