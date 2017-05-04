import { isString, isObject, cloneDeep } from 'lodash'

export function getModel(path, model) {
  return isString(path) ? path.split('.').reduce((obj, key) => isObject(obj) && obj[key], model) : model
}

export function setModel(path, value, model) {
  const paths = path.split('.')
  const len = paths.length
  const m = cloneDeep(model)
  paths.reduce((obj, key, i) => {
    if (i + 1 === len) {
      obj[key] = value
      return obj[key]
    }
    if (!obj[key]) {
      obj[key] = isNaN(parseInt(paths[i + 1])) ? {} : []
    }
    return obj[key] ? obj[key] : isNaN(parseInt(key)) ? {} : []
  }, m)
  return m
}
