let express = require('express')

const app = express();

app.get('/', (req, res) => {
	res.status(200).send({
		success: 'true',
	})
});

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`)
});