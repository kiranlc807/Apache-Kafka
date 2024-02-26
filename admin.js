const {kafka} = require("./client");

async function init(){
    const admin = kafka.admin();
    console.log('Admin connecting....');
    admin.connect();
    console.log("Admin Connecction Success");

    console.log("creating topic");
    await admin.createTopics({
        topics: [{
            topic: 'new-topic',
            numPartitions:2
        }]
    })
    console.log("topic created success");
    await admin.disconnect();
}

init();