# discord-voice-manager

Need help? Here's our discord server: https://discord.gg/z3XDGYnbBC

## Use cases

- "As a server owner, I want to limit the access to people based on if they are in a voice channel."

## How to use

- [Invite the bot to your server](https://discord.com/oauth2/authorize?client_id=899822513993961524&scope=bot&permissions=268436480)
- Create a role called `IN VC`
- For the channels you want to limit access to, deny "Send Messages" for `everyone`, and grant "Send Messages" to the `IN VC` role. You can do more permissions, but this is the simplest.
- Move the `VC Manager` role above the `IN VC` role ie ![img](https://cdn.everything.moe/uploads/FsrjJShAnctOqOHd.gif)

## Development

### Future work

#### Features

- [ ] Custom `IN VC` role
- [ ] Custom role per voice channel
- [ ] Allow a role to grant `IN VC` role manually to user
- [ ] Deny list of people who can get the role
- [ ] Optional config, welcome user to channel with a message in that channel
- [ ] Optional config, log voice join/leaves to a specified channel
- [ ] Idea: create recordings? (Dunno how useful this would be, maybe for meetings?)

#### KTLO

- [ ] Dockerize
- [ ] Deploy to AWS Fargate

### Deployment

```bash
git clone https://github.com/RyoshiKayo/discord-voice-manager.git && cd discord-voice-manager
# Install node modules
npm i
# Compile typescipt to JS
tsc
# Update config
# Exit by pressing ESC, then type ":x" to save or ":q!" to quit
vim .env
# Run the bot headless
pm2 start dist/index.js
# Check for any errors
pm2 status
pm2 logs 0
```
