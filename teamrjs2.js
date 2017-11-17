var fs=require('fs');
var shuffle=require('shuffle-array');
var writeStream = fs.createWriteStream("teams.txt");
var prompt = require('prompt');

prompt.start();
  prompt.get(['FileName', 'TeamSize'], function (err, result) {
    if (err) { return onErr(err); }

    var contents = fs.readFileSync(result.FileName);
    var jsonContent = JSON.parse(contents);
    console.log('User Input Received');
    aspirantsCount = jsonContent.aspirants.length;
    console.log(aspirantsCount);
    teamSize = result.TeamSize;

    if ( teamSize == parseInt(teamSize,10) && teamSize > 0 && teamSize < aspirantsCount){
        var mod = aspirantsCount % teamSize;
        var team = 1;
        var temp = teamSize;
        var count = 0;
        remList = jsonContent.aspirants;        
        if (mod != 0){
            console.log("Cannot divide equally!!! \nDo you want to continue???\ny/n");
                prompt.get('input', function (err, result) {
                if (err) { return onErr(err);}
                if (result.input.toLowerCase() == "y"){
                    while(count < aspirantsCount){
                        if (temp == teamSize){
                            var i = Math.floor(Math.random() * remList.length);
                            var person = remList[i];
                            writeStream.write(`\nTeam ${team}`);
                            if( mod != 0 ){
                            writeStream.write(Object.keys(person).join(" "));
                            remList.splice(i, 1);
                            mod -= 1;
                            count += 1;
                            }
                            temp = 0;
                            team += 1;
                        }
                        var i = Math.floor(Math.random() * remList.length);
                        var person = remList[i];
                        writeStream.write(Object.keys(person).join(" "));
                        remList.splice(i, 1);                        
                        temp += 1;
                        count += 1;
                    }
                }
                else{
                    console.log("Thank you!!!")
                }
            });
        }
        else{
            while(count < aspirantsCount){
                var i = Math.floor(Math.random() * remList.length);
                var person = remList[i];
                if (temp == teamSize){
                    writeStream.write(`\r\nTeam ${team}\r\n`);
                    temp = 0;
                    team += 1;
                }
                writeStream.write(Object.keys(person).join(" ")+"\r\n");
                temp += 1;
                count += 1;
                remList.splice(i, 1);
            }
        }
    }
    else{
        console.log(`Enter integers between 1 and ${aspirantsCount}`);
    }
});
