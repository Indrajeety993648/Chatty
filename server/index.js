const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/your-database-name', {  
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((err)=>{
    console.log('Failed to connect to MongoDB', err);
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port 5000');
});

