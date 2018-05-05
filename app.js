const express = require('express'),
      bodyParser = require('body-parser'),
      app = express();

const PropertyPayloadModule = require('./property_payload_module'),
      ppm = new PropertyPayloadModule();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
app.use((err, req, res, next) => {
  // Invalid JSON syntax
  if (err instanceof SyntaxError && err.status === 400) {
    res.status(400).json({error: "Could not decode request: JSON parsing failed"});
    return;  
  }

  // CORS - only for local dev purposes!!
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // res.setHeader('Access-Control-Allow-Credentials', true);
  // next();
});

app.post('/', (req, res, next) => {
  try {
    let payload = ppm.examineJSON(req.body);
    let propertyItems = ppm.filterPayload(payload);
    let newResObj = ppm.constructJSONData(propertyItems);
    console.log('the newResObj: ' + JSON.stringify(newResObj));

    res.status(200).json(newResObj);
  } catch (error) {
    res.status(400).json({error: "Could not decode request: JSON parsing failed"});
  }
  
});

app.get('/', (req, res, next) => {
  const message = 'Welcome to Hometrack API service'; 
  res.json({message: message});
});


app.listen(process.env.PORT  || 3000, () => console.log('Server listening on port 3000'));