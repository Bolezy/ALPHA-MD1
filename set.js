const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0dEZWFlNDl4NFBrMEgrR2JVc3RWSmRpYWxTeUw2UENKdEcyWitQdXBsbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidXdBQVFWVmk2WXNWTHZhWjlqMDRHWXRVbmVHS253WEVYUGk3REZvTGFYST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjT2FaL1Z0RDZ2WlROU2IxU0doZEp1RWpoR2xEZENocGtKeExvNE53VjBNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmU2dpZU1GZXVleFdGODFYaUxqd3ZwOW9pNVdJRWIwZjdpQWlUa0VBemtnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllQb1Uzb3N1UDhVM2NUdVdDZXNISHV2Y28vZjdvY2gyKzJiRWtEdnppMlU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhDd3lObFk0WUlPVTlSUTVpMTFPOFBMV1NCaWxLNWYzUDZFUXRqOGs1MlE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0M1QURTNE1oenA0emNBWGtZS0FiVXBkVUpqNUxqZkdlMEJDN0VMbERFRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieXRmLy9vSTlodlBxSFVJd1NhT3pxQlFoQ1BMbzlYdnZCUC84SlFJRXhIaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpCQkJLZ0hDcTJoeDQ4MlA5emdGeWJJU1FnTEg3bzhRM1kzQzlsK09ocFRFdituSDdhdk9iR29zR3VnZmdIOHF4T2FXdXdpSkpTOE4zdzRhdk5FeWdnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjA4LCJhZHZTZWNyZXRLZXkiOiJlZmY5ODlBUUYxcEFMUjNBNnM4bHVpK25nekNmUGdxL2wzb3dwK0dubWR3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJlREg0WjJWNFE5ZXB3bzNTYy1nU05nIiwicGhvbmVJZCI6IjM2ZDk2MWJlLTQ0NjgtNGY5OS1hZjhjLTI1ZjExZjA2ZWM0MCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2RzNkeUJxRVNpbzhqcFlEUzBQYzZqVnl3TUE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWkRad3JiOU5sSnJZWUFQUkxPcEQ4eERFWnJBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ikg1Sk1TRzk4IiwibWUiOnsiaWQiOiIyMzQ4MTM4MzkyNzcwOjY2QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKV3UvSU1GRVBmVjVyWUdHQzhnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJCb1JDcEhyMkpTdTlPSGkydXR3NTJXdHMzelYrM2hweFhJb2JJZTF6TVJjPSIsImFjY291bnRTaWduYXR1cmUiOiJOUk5KYjJ0eTRWd0tCN2hPdFYvMUloOTB0d09uVldtNHF5SmExdk0wcVU5a0owWnhDZHIzOEp5UzJra2N6WDh2TnlRVHh3MXJraHF1TlVtOGZEMFRBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTTd4M2xIMDhoc043VTN4bVF5cFRZbmdiUCtuazd1bjZIUWJlZ293Uzhqdi9VeCtxMXRoYWpHVTg1VDAvUEp4cFFzYXByR0tTNzkzeUwwWHpONUdXanc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTM4MzkyNzcwOjY2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFhRVFxUjY5aVVydlRoNHRycmNPZGxyYk44MWZ0NGFjVnlLR3lIdGN6RVgifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNTU0MTEyNCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMQWEifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "BOLEXY ",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2348138392770",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "no",,
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'recording',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
