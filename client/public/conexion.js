const { MongoClient } = require('mongodb');

class MongoDBConnection {
  constructor(uri, database) {
    this.uri = uri;
    this.database = database;
    this.client = null;
    this.db = null;
  }

  async connect() {
    try {
      this.client = await MongoClient.connect(this.uri);
      this.db = this.client.db(this.database);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.log('Failed to connect to MongoDB:', error);
    }
  }

  disconnect() {
    try {
      this.client.close();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.log('Failed to disconnect from MongoDB:', error);
    }
  }

  async insertData(collectionName, data) {
    try {
      const collection = this.db.collection(collectionName);
      const result = await collection.insertOne(data);
      console.log('Data inserted:', result);
    } catch (error) {
      console.log('Failed to insert data:', error);
    }
  }
  async getData(collectionName, filter) {
    try {
      const collection = this.db.collection(collectionName);
      const result = await collection.find(filter).toArray();
      console.log('Retrieved data:', result);
      return result;
    } catch (error) {
      console.log('Failed to retrieve data:', error);
      return [];
    }
  }
}

module.exports = MongoDBConnection;
