var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors())
app.get('/data',function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'app',
        password: 'Sales123@',
        server: 'sales-solution.database.windows.net', 
        database: 'eurdb' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from tblObject', function (err, data) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(data.recordset);
            
        });
    });
});

var server = app.listen(8090, function () {
    console.log('Server is running on 8090 port...');
});