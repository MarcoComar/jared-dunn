'use strict'

const Slack = require('slack');

module.export.run = async (data) => {
    const dataObject = JSON.parse (data.body);

    let response = {
        statusCode: 200,
        body : {},
        headers : {'X-Slack-No-Retry' : 1}
    }

    try {
        if ( !('X-Slack-Retry-Num' in data.headers) )
        {
            switch (dataObject.type) {
                case 'url_verification':
                    response.body = verifyCall (dataObject);
                    break;
                case 'event_callback':
    
                    if (!dataObject.event.thread_ts){
                        const params = {
                            token: 'xoxb-598197867219-1878732584834-VponSE5ppP7M0P8md6GDgEyT',
                            channel: dataObject.event.channel,
                            text: 'Hello, can you specify URL with error?',
                            thread_ts: dataObject.event.ts
                        }
        
                        Slack.chat.postMessage( params );
                    }
    
                    response.body = {ok: true}
    
                    break;
                    
                }
        }
    }
    catch ( err ) {

    }
    finally {
        return response;
    }
}

function verifyCall (data) {
    if ( data.token == 'ZK92Xhy12K6PFBVWLmvrTIsw') {
        return data.challenge;
    }
    else {
        throw 'Verification fail';
    }
}