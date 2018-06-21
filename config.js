const privateConfig = require('./privateConfig');  //Private config is just a config file with same keys not to upload to git because it contains sensitive information (passwords, api keys, etc). You just need to create a "privateConfig.js" or replace the keys in this files that use "private_config" variable.

const config = {
    cloudFlare: {
        Email : privateConfig.cloudFlare.Email,
        APIKey : privateConfig.cloudFlare.APIKey,
        dnsZoneId : privateConfig.cloudFlare.dnsZoneId,
        dnsEntryId: privateConfig.cloudFlare.dnsEntryId,
        dnsEntryName : privateConfig.cloudFlare.dnsEntryName
    }
}

module.exports = config;