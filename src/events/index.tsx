const EVENT_PREX = 'y'

const createEvent = (moduleName: string, keyName: string) => {
  return [EVENT_PREX, moduleName, keyName].join('_')
}

const MODULE_POST = 'post'
export const postEvents = {
  setLocation: createEvent(MODULE_POST, 'setLocation'),
  addPost: createEvent(MODULE_POST, 'addPost')
}
