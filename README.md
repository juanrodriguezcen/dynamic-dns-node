# Dynamic DNS solution using node.js and Cloudflare

If like me you have an internet connection with dynamic ip (mine changes every 12 hours), and you want to remotely access to a device in your home (computer, NAS, server, etc), you need some sort of dynamic DNS solution. The general idea is to be constantly changing when the ip changes and update a (sub)domain of your choice.   

This scripts assumes that your domain is handled by Cloudflare's DNS, if you have it elsewhere, you can easily migrate it and get all the benefits from Cloudflare (CDN, HTTPs, etc), if you don't know the service, check it out, it's worth it. The node.js script checks the current ip using a public service (https://www.ipify.org/) and compares it with the ip address stored in Cloudflare, if they are different, the A DNS entry is updated. 

# How to use it

1. Download the code and do "npm install" to install dependencies
2. Create a privateConfig.js file with the following content:

```
const config = {}

config.cloudFlare = {}
config.cloudFlare.Email = 'johndoe@gmail.com'; // email used to login to Cloudflare
config.cloudFlare.APIKey = 'xxxxxxxxxxxxxxxxxxxxxxxxx'; // Cloudflare's api key
config.cloudFlare.dnsZoneId = 'xxxxxxxxxxxxxxxxxxxxxxxxx'; //Cloudflare's dns zone id
config.cloudFlare.dnsEntryId = 'xxxxxxxxxxxxxxxxxxxxxxxxx'; //Cloudflare's dns entry id
config.cloudFlare.dnsEntryName = 'home.your-domain.com'; // A dns entry that you would be updating

module.exports = config;
```

3. Set it up as a cron to run once a minute