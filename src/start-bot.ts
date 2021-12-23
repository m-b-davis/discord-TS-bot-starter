import { ApplicationCommandManager, Client, GuildApplicationCommandManager, Intents } from 'discord.js';
import { findTargetChannel } from './utils/discord.utils';
import { getDiscordEnvironmentVariables } from './utils/environment.utils';

// Go to a channel on your discord server and look at the url, e.g:
// https://discord.com/channels/887077195963592725/900423734211538954
// Here, 887077195963592725 is the GUILD_ID and 900423734211538954 is the CHANNEL_ID
const TARGET_GUILD_ID = '887077195963592725'
const TARGET_CHANNEL_ID = '900423734211538954';

export const enum MyCommands {
  MyTestCommand = 'test',
}

export async function startClient() {
  const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  });

  const { token } = getDiscordEnvironmentVariables();

  try {
    // Log bot in
    await client.login(token);

    // When bot has been initialised, register commands
    await registerCommands(client);

    // Add a handler for when the bot is ready
    client.on('ready', async () => {
      // Get channel
      try {
        const channel = await findTargetChannel(client, TARGET_CHANNEL_ID);
        // Send a message to channel
        await channel.send({
          content: 'Hello world',
        });

      } catch (error) {
        console.error(`Failed to get target channel with id ${TARGET_CHANNEL_ID}`, error);
      }
    });

    client.on('interactionCreate', async (interaction) => {
      // This is when any interaction happens - i.e a user sends a message or calls a /command
      console.log(`Interaction started`);

      if (!interaction.isCommand()) {
        return;
      }

      // Handle a command
      switch (interaction.commandName) {
        case MyCommands.MyTestCommand: {
          const content = `Hello ${interaction.user.username}. You called /${MyCommands.MyTestCommand}`;
          await interaction.reply({ content });
          console.log(`Replied with ${content}`);
        }
      }
    });

  } catch (error) {
    console.error('Bot failed to login!', error);
  }
}

// Registers a test command which can be called in a channel with /test
async function registerCommands(client: Client) {
  const guildId = TARGET_GUILD_ID;
  const guild = client.guilds.cache.get(guildId); 
  
  let commands: ApplicationCommandManager | GuildApplicationCommandManager;

  // Get the commands object, this is either guild or global commands
  if (guild) {
    console.log('Adding to guild commands');
    commands = guild.commands;
  } else {
    console.log('Adding to global commands');
    commands = client.application?.commands!;
  }

  // Create the test command
  await commands.create({
    name: MyCommands.MyTestCommand,
    description: "Test command",
  })
}
