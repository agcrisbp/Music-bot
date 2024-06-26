const { EmbedBuilder } = require('discord.js');
const { Translate } = require('../../translate');

module.exports = async (queue) => {
    if (queue.metadata.lyricsThread) {
        queue.metadata.lyricsThread.delete();
        queue.setMetadata({
            channel: queue.metadata.channel
        });
    }
    
    if (queue.metadata.message && queue.metadata.channel && queue.metadata.message.channel.id === queue.metadata.channel.id) {
        try {
            await queue.metadata.message.delete();
        } catch (error) {
        }
    }

    (async () => {
        const embed = new EmbedBuilder()
        .setAuthor({ name: await Translate(`Disconnected from the voice channel, clearing the queue! <❌>`)})
        .setColor('#2f3136');

        const message = await queue.metadata.channel.send({ embeds: [embed] });
        setTimeout(() => {
            message.delete();
        }, 1000);
    })()
}
