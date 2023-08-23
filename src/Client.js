import * as mineflayer from 'mineflayer'
import * as autoEat from 'mineflayer-auto-eat'

import { parseConfig } from './Utils.js'
import MongoCache, { client } from './MongoCache.js'

const config = parseConfig()

async function connect () {
  await client.connect()
}
connect()

for (const username of config.accounts) {
  const bot = mineflayer.createBot({ 
    ...config.options,
    username,
    profilesFolder: (cache) => new MongoCache(cache),
    onMsaCode: (code) => console.log(`${username} needs to be authenticated at https://microsoft.com/link with code ${code.user_code}`)
  })
  bot.loadPlugin(autoEat.plugin)

  bot.on('kicked', (reason) => {
    const msg = JSON.parse(reason);
		let message = msg.text;
		if (msg.extra) {
			msg.extra.forEach((obj) => {
				message += obj.text.replace(/[\n\t\r]/g, '');
			});
		}
		console.log(`[${bot.username}] I got kicked from the server.\nReason: ${message}`);
  })

  bot.on('spawn', () => {
    console.log(`[${bot.username}] Spawned in.`)
  })

  bot.on('message', (message) => {
    console.log(`[${bot.username}] ${message.toAnsi()}`)
  })

  bot.on('err', (err) => {
    console.log(`[${bot.username}] ${JSON.stringify(err)}`)
    process.exit(1)
  })

}
