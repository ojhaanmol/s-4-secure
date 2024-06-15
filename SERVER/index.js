const { generateRSAKeys, decrypt, symmetricDec, symmetricEnc } = require('./enc');
const express             = require('express');
const port                = 50001;

const { publicKey, privateKey } = generateRSAKeys();
const ServerPublicKey                = publicKey;
const ServerPrivateKey               = privateKey;
const app                       = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/',(request,response)=>{
    console.log("... request on /");
    console.log(new Date(),'\n')
    response.json({ServerPublicKey});
    console.log("            ... ",JSON.stringify({ServerPublicKey}));
    console.log("           ",new Date(),'\n')
})

app.post('/SecretTransfer',(request,response)=>{
    console.log("... request on /SecretTransfer got:",decrypt(request.body.envolope,ServerPrivateKey));
    console.log(new Date(),'\n')
    response.json( {data:symmetricEnc(JSON.stringify({message:"OK"}),23)});
    console.log(`            ... sending encrypted {message:"OK"}`);
    console.log("           ",new Date(),'\n')
})

app.listen(port,()=>{
    console.log("...application is running on port:",port);
})