var request = require("request"); 

for(var i=0; i<1000; i++) request("https://linkareer.com/activity/21629", function(err, res) { console.log(i); });


