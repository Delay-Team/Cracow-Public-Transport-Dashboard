let express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');

const app = express();
const statisticsRouter = require('./routes/statistics');
app.use(cors());

app.get('/', (req, res) => {
	res.status(200).send({
		success: 'true',
	})
});

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`)
});

mongoose.connect("mongodb+srv://readonly:rQRctvuq8N9Kj7cP@cluster0-rajui.azure.mongodb.net/my-db?retryWrites=true&w=majority", { useNewUrlParser: true });

app.use('/statistics', statisticsRouter);

