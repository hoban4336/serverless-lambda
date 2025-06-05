const { TeamsActivityHandler } = require('botbuilder');
const keyValue = require('./key-value.json');

class MyBot extends TeamsActivityHandler {
    async onMessage(context, next) {
        const userInput = context.activity.text.trim();
        if (keyValue[userInput]) {
            // 이미지 URL이면 카드로, 텍스트면 그대로 응답
            if (keyValue[userInput].startsWith('http')) {
                await context.sendActivity({
                    attachments: [{
                        contentType: 'application/vnd.microsoft.card.hero',
                        content: {
                            images: [{ url: keyValue[userInput] }]
                        }
                    }]
                });
            } else {
                await context.sendActivity(keyValue[userInput]);
            }
        } else {
            await context.sendActivity('등록되지 않은 키입니다.');
        }
        await next();
    }
}
module.exports.MyBot = MyBot;