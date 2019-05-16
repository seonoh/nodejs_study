const request = require('request');
const bodyParser = require('body-parser');
const appVersion = '';
let wenwoToken = '';
let wenwoUuid = '';
let os = '';
let wenwoUserId = '';
let firstQuestionId = '';

function RegisterResultModel(token, uuid, os, userId) {
    this.token = token;
    this.uuid = uuid;
    this.os = os;
    this.userId = userId;
}


// 디바이스 등록 mobile/v1/devices -> 앱버전 받아오기 -> 메인(질문답변)
request.post('http://10.150.201.91:3000/mobile/v1/devices', {
    json: {

        "os-type": "1",
        "store-type": "apk",
        "app-version": "0.15.3"
    }
}, (err, res, body) => {
    if (err) {
        console.error(err);
        return
    } else {

        console.log('statusCode : ' + res.statusCode);


        registerModel = new RegisterResultModel(body['wenwo-token'], body['wenwo-uuid'], body['os'], body['wenwo-user-id']);

        console.log("wenwoToken ==> " + registerModel.token);
        console.log("wenwoUuid ==> " + registerModel.uuid);
        console.log("os ==> " + registerModel.os);
        console.log("wenwoUserId ==> " + registerModel.userId);

        if (res.statusCode == 200) {


            request(`http://10.150.201.91:3000/api/v1/versions?version=0`, function (err, res) {

                const data = res.toJSON;
                const headers = {
                    'wenwo-token': wenwoToken
                }

                const notAdoptedQuestionOptions = {
                    url: `http://10.150.201.91:3000/api/v2/questions/not-adopted?order=0&page=0`,
                    method: 'GET',
                    header: headers
                }

                request(notAdoptedQuestionOptions, function (err, res) {
                    if (err) {
                        console.log(err);

                    } else {

                        firstQuestionId = JSON.parse(res.body)["questions"][0]["question-id"];
                        console.log(JSON.parse(res.body));
                        console.log(`first question ID===> ${firstQuestionId}`);

                        const questionDetailOptions = {
                            url: `http://10.150.201.91:3000/mobile/questions/${firstQuestionId}?last-question-answer-id=0`,
                            method: 'GET',
                            header: headers
                        }

                        request(questionDetailOptions,function(err,res){
                            let data = JSON.parse(res.body);

                            console.log(`questionDetail RESPONSE ==>>>> ${res.body}`);
                        })


                    }
                })
            });

        } else {
            console.log(`ERROR =====>>> ${err}`);
        }

    }

});





