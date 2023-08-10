export function parseConfig(someConfig) {
  const unparsedConfig = someConfig ?? process.env.MINEFLAYER_CONFIG
  if (unparsedConfig.constructor !== String || unparsedConfig.length === 0 ) {
    throw Error('Environmental Variable \'MINEFLAYER_CONFIG\' must be a string.')
  }
  
  const config = JSON.parse(unparsedConfig)
  console.log(`Mineflayer Config: ${JSON.stringify(config)}`)
  if (Object.keys(config).length === 0) {
    throw Error('MINEFLAYER_CONFIG is empty.')
  }

  return config
}
