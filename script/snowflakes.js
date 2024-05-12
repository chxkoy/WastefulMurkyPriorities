const axios = require('axios');
const moment = require('moment-timezone');

module.exports.config = {
  name: 'snow',
  version: '1.0.0',
  role: 0,
  hasPrefix: false,
  aliases: ['snow', 'snowai'],
  description: "An AI command powered by Snowflakes AI",
  usage: "snow [prompt]",
  credits: 'churchill',//modified by joshua Apostol
  cooldown: 3,
};

module.exports.run = async function({ api, event, args }) {
  const input = args.join(' ');
  const timeString = moment.tz('Asia/Manila').format('LLL');

  if (!input) {
    api.sendMessage(`Please provide a question/query.`, event.threadID, event.messageID);
    return;
  }

  api.sendMessage(`🔍 | Searching for Snowflakes AI response....`, event.threadID, event.messageID);

  try {
    const { data } = await axios.get(`https://hashier-api-snowflake.vercel.app/api/snowflake?ask=${encodeURIComponent(input)}`);
    if (data.response) {
      api.sendMessage(`${data.response}\n\n${timeString}\n\nThis Automated Bot website Was Created by vixeenn, kindly dm if you have any questions.\n› https://facebook.com/xenvrnslol`, event.threadID, event.messageID);
    } else {
      api.sendMessage('No response found.', event.threadID, event.messageID);
    }
  } catch (error) {
    api.sendMessage('An error occurred while processing your request.', event.threadID, event.messageID);
  }
};