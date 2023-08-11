import * as mineflayer from 'mineflayer'
import * as autoEat from 'mineflayer-auto-eat'

import { parseConfig } from './Utils.js'
import MongoCache, { client } from './MongoCache.js'

const config = parseConfig()

async function connect () {
  await client.connect()
}
connect()

const bot = mineflayer.createBot({ ...config, profilesFolder: (cache) => new MongoCache(cache) })
bot.loadPlugin(autoEat.plugin)

bot.on('spawn', () => {
  console.log('Spawned in.')
})

bot.on('message', (message) => {
  console.log(message.toAnsi())
})

bot.on('err', (err) => {
  console.log(err)
  process.exit(1)
})
