const passwordDelete = encodeURIComponent(process.env.MONGO_PASS);
const dbName = encodeURIComponent(process.env.DB_NAME);
const userName = encodeURIComponent(process.env.USER_NAME);
const uri = `mongodb+srv://${userName}:${passwordDelete}@cluster0.vftzb.mongodb.net/${dbName}?retryWrites=true&w=majority`;

module.exports = {
  uri: uri.toString(),
};
