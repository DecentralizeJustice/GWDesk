import { startNode } from '@/assets/util/nodeUtils/nodeUtil.js'

async function firstNodeStartup () {
  const results = await startNode()
  return results
}
export {
  firstNodeStartup
}
