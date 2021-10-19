/**
 * https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-voiceStateUpdate
 */

import { VoiceState } from "discord.js";
import { updateVoiceChatPermissions } from "..";

const execute = (oldState: VoiceState, newState: VoiceState) => {
  // If user joins voice
  if (oldState.channel === null && newState.channel) {
    updateVoiceChatPermissions(oldState.id, oldState.guild, "join");
  }

  // If user leaves voice
  if (oldState.channel && newState.channel === null) {
    updateVoiceChatPermissions(oldState.id, oldState.guild, "leave");
  }
};

module.exports = {
  name: "voiceStateUpdate",
  execute,
};
