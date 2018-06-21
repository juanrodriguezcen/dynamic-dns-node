const axios = require('axios');
const config = require('./config');


const cloudFlareHeaders = {
    headers: {
        'Content-Type': 'application/json',
        'X-Auth-Key': config.cloudFlare.APIKey,
        'X-Auth-Email': config.cloudFlare.Email
    }
}

async function updateDNS(){
    //Get the current ip and the ip that is stored in cloudflare so we can compare them
    let currentIPPromise = (axios.get('https://api.ipify.org?format=json'));
    let currentCFIPPromise = (axios.get( 'https://api.cloudflare.com/client/v4/zones/' + config.cloudFlare.dnsZoneId + '/dns_records/' + config.cloudFlare.dnsEntryId, cloudFlareHeaders));

    let currentIP = (await currentIPPromise).data.ip;
    let currentCFIP= (await currentCFIPPromise).data.result.content;

    //If the ip changed, we update it in Cloudflare
    if(currentIP != currentCFIP){
        await axios.put('https://api.cloudflare.com/client/v4/zones/' + config.cloudFlare.dnsZoneId + '/dns_records/' + config.cloudFlare.dnsEntryId, 
                        { 'type': 'A',  'name': config.cloudFlare.dnsEntryName, 'content': currentIP, 'ttl': 120}, 
                        cloudFlareHeaders);
        
    }

    return { oldIP : currentCFIP, newIP : currentIP}
}

(async () => {
    let result = await updateDNS();
    if(result.oldIP != result.newIP){
        console.log('IP was updated from ' + result.oldIP + ' to ' + result.newIP);
    }else{
        console.log('IP hasn\'t changed: ' + result.oldIP);
    }
})();


