const dynamoose = require("../lib");
const dynamooseOld = require("dynamoose");

// dynamooseOld.AWS.config.update({
// 	"accessKeyId": "AKID",
// 	"secretAccessKey": "SECRET",
// 	"region": "us-east-1"
// });
// dynamooseOld.local();
//
// const Cat = dynamooseOld.model("Cat101", { "id": Number, "name": String });
//
// // console.log(Object.getPrototypeOf(Cat));
// // Cat();
// // console.log(Cat instanceof dynamoose.model);
// const kitty = new Cat({ "id": 1, name: 'Zildjian' });
// const kittyB = Cat({ "id": 1, name: 'Zildjian' });
// kitty.save().then((res) => console.log(typeof res)).catch((err) => console.error(err));
// kittyB.save().then((res) => console.log(typeof res)).catch((err) => console.error(err));





const sdk = dynamoose.aws.sdk; // require("aws-sdk");
sdk.config.update({
	"accessKeyId": "AKID",
	"secretAccessKey": "SECRET",
	"region": "us-east-1"
});
const ddb = new dynamoose.aws.sdk.DynamoDB({"endpoint": "http://localhost:8000"});
dynamoose.aws.ddb.set(ddb);

const Cat = new dynamoose.model("Cat200", {"id": Number, "name": String}, {"create": false});

async function main() {
	const res1 = await (new Cat({"id": 1, "name": "Charlie"}).save());
	const res2 = await Cat.Model.get(1);
	// const res2 = await Cat.Model.model.prototype.get.bind(Cat.Model)(1);

	console.log(res1);
	console.log(res2);

	console.log(JSON.stringify(await ddb.scan({"TableName": "Cat200"}).promise(), null, 4));
}
main();
