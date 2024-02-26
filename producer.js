const {kafka} = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Create a producer
const producer = kafka.producer();

// Function to send messages
async function sendMessage() {
  await producer.connect();
  rl.setPrompt('> ');
  rl.prompt();
  rl.on('line',async function(line){
    const [name , role] = line.split(' ');
    await producer.send({
      topic: 'new-topic',
      messages: [{
         partition:role.toLocaleLowerCase()==='dev'?0:1,
         key:"loc-update",
         value: JSON.stringify({name: name,  role: role}) 
        }],
    });
  }).on("close",async()=>{
    await producer.disconnect();
  })
}

// Example usage
sendMessage().catch(console.error);

//  .\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
//  bin\windows\kafka-server-start.bat config\server.properties
