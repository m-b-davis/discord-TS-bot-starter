import {
  Client,
  TextChannel,
} from 'discord.js';

export async function findTargetChannel(
  client: Client,
  targetChannelId: string
) {
  const target = client.channels.cache.get(targetChannelId);

  if (!target) {
    const message = `Unable to locate channel with ID ${targetChannelId}`;
    throw new Error(message);
  }

  if (target?.type !== 'GUILD_TEXT') {
    const message = `Target channel is of the wrong type - got type ${target.type} for channel ID ${targetChannelId}`;
    throw new Error(message);
  }

  return target as TextChannel;
}
