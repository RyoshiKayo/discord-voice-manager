import { Client, Guild, Intents, Role } from "discord.js";
import { config } from "dotenv";
import fs from "fs";
config();

const TOKEN = process.env.DISCORD_BOT_TOKEN;
if (!TOKEN) throw new Error(`TOKEN must be set`);

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

const EVENT_DIR = `${__dirname}/events`;

const eventFiles = fs
  .readdirSync(EVENT_DIR)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`${EVENT_DIR}/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(TOKEN);

export const updateVoiceChatPermissions = (
  userId: string,
  guild: Guild,
  state: "join" | "leave"
) => {
  const vcRole = getVoiceChannelRoleForGuild(guild);

  if (vcRole) {
    let guildMember = guild.members.cache.get(userId);

    if (guildMember) {
      const guildMemberName = guildMember.nickname || guildMember.displayName;

      if (state === "join") {
        guildMember.roles.add(vcRole);
        console.log(
          `Gave "${guildMemberName}" (${guildMember.id}) the "IN VC" role in "${guild.name}" (${guild.id})`
        );
      } else if (state === "leave") {
        guildMember.roles.remove(vcRole);
        console.log(
          `Removed "IN VC" role from ${guildMemberName} (${guildMember.id}) in "${guild.name}" (${guild.id})`
        );
      }
    } else {
      console.error(
        `Failed to get guild member ${userId} in ${guild.name} (${guild.id})`
      );
    }
  }
};

const getVoiceChannelRoleForGuild = (guild: Guild): Role | undefined => {
  return guild.roles.cache
    .filter((role: Role) => role.name === "IN VC")
    .first();
};
