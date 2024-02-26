const {kafka} = require("./client");

// Create a consumer
const consumer = kafka.consumer({ groupId: 'user-1' });

// Function to consume messages
async function consumeMessages() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'new-topic' ,fromBeginning: true});
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(message.value.toString(),`Topic:${topic} Part:${partition}`);
    },
  });
}

// Example usage
consumeMessages().catch(console.error);
