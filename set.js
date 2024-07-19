const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU1BlREhPTGNtVEJyWXl1WkM0RVR5SWFqWmdkdnp1dFByVCtRQ3AydHdIVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS2RNRlovRkl4eHlVT0NaM2w3Um1MaklxNnJTNFRORkNRMER6S2VUUGVpST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4QjVZbU1LTmRHSCtGaDlRSVhxSGpOUFFzODl2L3ZFTC9DbFg2RlV0YjBzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrV0Q4dHpiT200aUpWOENYNUQ4S0ppYmE5MnRsOHZkRnpPd0sreWxvK3pBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdOa1FRaTJXN2N1RDZBTjFDeCs1emFVODlENy9UQmEweHB4dUFjeHN3M2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhCcGE4aU1pUXNHZ3c0dHhLTHNDa24zbXpLNkJZRmF1OEM2RllQR0lLRGc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUhyVFFRaTZCUFhXb0FkeWdzQUtjUmNHN0dqOEFUMWovT2pMcGR0ckdFbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoielBwZGpoVy9NOFhYbWE5NDRIU3ZCL0hiMTBYWWp4WWFqaTJCb202QUp6Zz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii9qeUQ2dWtRZWl0a1U0US80eG5CRlQwWDh4QnNpQktPTU0xMmp0TGVvWFl6Q0dubVZObUxocnZSYWxxK2xGV1N2WlRCYWF1VXhWWnh2a29wd3lBaWd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI2LCJhZHZTZWNyZXRLZXkiOiJpUlVkWHRJZzJrZzdOSVF3M2hYSVBqOG4rZW5KYmhvNkZJQWxhSTdPRlFVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJqVTZ2TDVSYlFZQzNUYXp6S3JGQlNnIiwicGhvbmVJZCI6ImNiOGUxZDNiLTVmMjMtNDNkNS1hNjdiLTYwODFlNTU5YjY3OSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwQVNaOXdZR2k0bjR6WlIrZURoNW5kRVdhM1U9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUGh0dnVLQ2FqWXhwK29lelBpUitQaUZUQXVRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlBQRTc4NTI4IiwibWUiOnsiaWQiOiIyNzc0NzgxNTMyNjoyMkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT1c2NTVBQ0VLbW02YlFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQTJoUndPNEI5MWdmNTNGVEJEekNtVWVTeHRaZmZ4UVU5dldpYkM0MlhHMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoianV3Z2U3aDJGZjdRYjFGL2k5eWQ4ZEdsQng4Yjh1a0syODRieWJwZW5FUWJzYnVJdW5wVjFEcW12c2RvZHdGeDBubzZieXNKRXBsZGx1T2FiZDJUQ3c9PSIsImRldmljZVNpZ25hdHVyZSI6IktsM0xsWUd0MEYyelE4QUk4UmRpYmRISEtRRjRpT1Y4dDErbkh6MXNiUU84SXpBc3lsNGpwUEJsNlR6bEdJeXZta3ZMOXliYWMvaUlvdFNXTm9yVWh3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjc3NDc4MTUzMjY6MjJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUU5vVWNEdUFmZFlIK2R4VXdROHdwbEhrc2JXWDM4VUZQYjFvbXd1Tmx4dCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMTM4OTg3OH0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "katakuri",
    NUMERO_OWNER : process.env.OWNER_NUM || "27747815326",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
