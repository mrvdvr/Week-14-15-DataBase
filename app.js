const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'myproject';
const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});


// Use connect method to connect to the Server

    client.connect(function(err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
      
        const db = client.db(dbName);
      
        insertDocuments(db, function() {
            updateDocument(db, function() {
              removeDocument(db, function() {
                client.close();
              });
            });
          });
        });



const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection1 = db.collection('locations');
    // Insert some documents
    collection1.insertMany([
        {
            "Name" : "Abc",
            "short_name" : "a",
            "types" : "Amsterdam",
            "Country": "The Netherland",
            "Coordinates": 52.370216
        },
        {
            "Name" : "Def",
            "short_name" : "d",
            "types" : "Rotterdam",
            "Country": "The Netherland",
            "Coordinates": 51.9225
        },
        {
            "Name" : "Klm",
            "short_name" : "k",
            "types" : "Utrecht",
            "Country": "The Netherland",
            "Coordinates": 52.092876
        },
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });

  const collection2 = db.collection('title');
    // Insert some documents
    collection2.insertMany([
        {
            "Album" : "Family",
            "Location" : "Garden",
            "Member" : "Bird",
            "ViewCount": "126",
            "UploadDate": "1.1.2019",
            "PrivacyType": "Only friends"
        },
        {
            "Album" : "Wedding",
            "Location" : "Wedding Hall",
            "Member" : "Leo",
            "ViewCount": "250",
            "UploadDate": "10.10.2019",
            "PrivacyType": "All"
        },
        {
            "Album" : "SeaSide",
            "Location" : "Beach",
            "Member" : "Star",
            "ViewCount": "2000",
            "UploadDate": "4.4.2019",
            "PrivacyType": "Friens friend"
        },
        {
            "Album" : "Meeting",
            "Location" : "House",
            "Member" : "Turtle",
            "ViewCount": "26",
            "UploadDate": "31.12.2018",
            "PrivacyType": "Only friends"
        },
        {
            "Album" : "Winter",
            "Location" : "Mountain",
            "Member" : "Panda",
            "ViewCount": "50",
            "UploadDate": "1.2.2018",
            "PrivacyType": "All"
        },
    ], function(err, result) {
      assert.equal(err, null);
      assert.equal(5, result.result.n);
      assert.equal(5, result.ops.length);
      console.log("Inserted 5 titles into the collection2");
      callback(result);
    });

    const collection3 = db.collection('album');
    // Insert some documents
    collection3.insertMany([
        {
            "title" : "Star Wars",
            "Description" : "science fiction",
            "ViewCount": "223456789"
        },
        {
            "title" : "The Hunger Games",
            "Description" : "action",
            "ViewCount": "123456999"
        },
        {
            "title" : "The Martian",
            "Description" : "adventure",
            "ViewCount": "12345678"
        },
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 albums into the collection3");
        callback(result);
      });

      const collection4 = db.collection("member");
      // Insert some documents
      collection4.insertMany([
        {
          ID: "1122334455661",
          Name: 'john',
          PhoneNumber: "0612345678",
          Email: 'john@gmailcom',
          Address: 'amsterdam'
        },     
        {
            ID: "12345678912",
            Name: 'sally',
            PhoneNumber: "0622335678",
            Email: 'sally@gmailcom',
            Address: 'rotterdam'
        },
        {
            ID: "99887744556",
            Name: 'kate',
            PhoneNumber: "0656123123",
            Email: 'kate@gmailcom',
            Address: 'utrecht'
        },
        {
            ID: "44556633221",
            Name: 'sean',
            PhoneNumber: "0612345555",
            Email: 'sean@gmailcom',
            Address: 'zwolle'
        },
        {
            ID: "77889955223",
            Name: 'shu',
            PhoneNumber: "0685296314",
            Email: 'shu@gmailcom',
            Address: 'tiel'
        },
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(5, result.result.n);
        assert.equal(5, result.ops.length);
        console.log("Inserted 5 members into the collection4");
        callback(result);
      });
    }

    const updateDocument = function (db, callback) {
        const collection3 = db.collection("album");
        //update document where title is star wars, set title equal to interstellar
        collection3.updateOne(
        {
            title: "star wars"

        },
        {
            $set: {title: "interstellar"}
        },function (err, result) {
            assert.equal(err, null);
            assert.equal(0, result.result.n);
            console.log("updated");
            callback(result);
            
        });
    };

    const removeDocument = function(db, callback) {
        // Get the documents collection
        const collection2 = db.collection('title');
        // Delete document where a is 3
        collection2.deleteOne({ "Member" : "Bird" }, function(err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          console.log("Removed the document");
          callback(result);
        });    
      }

     