const PREX = 'y-app'

const createEvent = (moduleName: string, keyName: string) => {
  return [PREX, moduleName, keyName].join('_')
}

const MODULE_POST = 'post'
export const postEvents = {
  setLocation: createEvent(MODULE_POST, 'setLocation')
}
