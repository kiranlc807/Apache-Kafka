const { Kafka } = require('kafkajs');

// Define the Kafka broker
const kafka = new Kafka({
  clientId: 'my-kafka-app',
  brokers: ['localhost:9092'], // Update with your Kafka broker address
});

// Create a producer
const producer = kafka.producer();

// Function to send messages
async function sendMessage(topic, message) {
  await producer.connect();
  await producer.send({
    topic: topic,
    messages: [{ value: message }],
  });
  await producer.disconnect();
}

// Example usage
sendMessage('my-topic', 'Hi iam kafkaJS').catch(console.error);

//  .\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties
//  bin\windows\kafka-server-start.bat config\server.properties
