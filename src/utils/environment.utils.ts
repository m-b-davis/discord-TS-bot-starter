
type DiscordEnvironmentVariables = {
  DISCORD_TOKEN: string;
  DISCORD_PREFIX: string;
  DISCORD_SUPPORT_SERVER_INVITE: string;
};

const environmentVariables = process.env;


export function getDiscordEnvironmentVariables() {
  const { DISCORD_PREFIX, DISCORD_SUPPORT_SERVER_INVITE, DISCORD_TOKEN } = environmentVariables as DiscordEnvironmentVariables;

  return {
    prefix: DISCORD_PREFIX,
    supportServerInvite: DISCORD_SUPPORT_SERVER_INVITE,
    token: DISCORD_TOKEN,
  };
}
