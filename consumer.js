const { Kafka } = require('kafkajs');

// Define the Kafka broker
const kafka = new Kafka({
  clientId: 'my-kafka-app',
  brokers: ['localhost:9092'] // Update with your Kafka broker address
});

// Create a consumer
const consumer = kafka.consumer({ groupId: 'my-group' });

// Function to consume messages
async function consumeMessages(topic) {
  await consumer.connect();
  await consumer.subscribe({ topic: topic ,fromBeginning: true});
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(message.value.toString());
    },
  });
}

// Example usage
consumeMessages('my-topic').catch(console.error);
