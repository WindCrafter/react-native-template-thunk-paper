import {TypedDataMediaChatHistory, TypedMediaLocal, TypedMediaModal} from "models/chat.model";
import { Device } from "constants/system/device.constant";

const pickHelper = function (_object: any, _PickArray: string[]) {
  let ALLOW_VARIABLE: any = {};
  for (let query_string in _object) {
    if (_PickArray.indexOf(query_string) > -1) {
      ALLOW_VARIABLE = {...ALLOW_VARIABLE, ...{[query_string]: _object[query_string]}};
    }
  }
  return ALLOW_VARIABLE;
}

/**
 * Removes fields with an 'id' field that equals ''.
 * This function was created to prevent entities to be sent to
 * the server with an empty id and thus resulting in a 500.
 *
 * @param entity Object to clean.
 */
export function cleanEntityHelper(entity: any) {
  const keysToKeep = Object.keys(entity).filter(k => !(entity[k] instanceof Object) || (entity[k]['id'] !== '' && entity[k]['id'] !== -1));
  return pickHelper(entity, keysToKeep);
}

/**
 * Jamviet.com check if this object is empty
 * @param object
 * @returns
 */
export function isEmptyObjectHelper(object: any) {
  try {
    // @ts-ignore
    for (const property in object) {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
}

/**
 * ZipEnter parse string json
 * @param value
 */
export function parseJsonHelper(value: string | any) {
  try {
    return JSON.parse(value);
  } catch (ex) {
    return undefined;
  }
}

export const convertDataMediaToDataMediaModalHelper = (objDataMedia: TypedDataMediaChatHistory | TypedMediaLocal): TypedMediaModal => {
  let mediaMetaObject;
  try {
    mediaMetaObject = JSON.parse(objDataMedia.media_meta)
  } catch (error) {
    console.log(error, "Error _shkdf_s")
    console.log(objDataMedia)
  }
  let ratio: number = 1;
  if (mediaMetaObject?.resolution) {
    const arrSize = mediaMetaObject?.resolution.split("x");
    ratio = arrSize[0] / arrSize[1];
  }

  return {
    url: objDataMedia.media_url,
    height: ratio > Device.ratio ? Device.width / ratio : Device.heightScreen,
    width: ratio > Device.ratio ? Device.width : Device.heightScreen * ratio,
    type: objDataMedia.media_type
  }
}

export function removeObjectsWithMatchingFieldHelper(arr, fieldName, valuesToRemove) {
  return arr.filter(item => !valuesToRemove.includes(item[fieldName]));
}

export function createArrayWithCountHelper(count: number) {
  return Array.from({length: count}, (_, index) => index + 1);
}


/**
 * Return filter to save to history ...
 * @param stringQuery Object to URL query function
 * @returns
 */
export function buildEndUrlHelper(stringQuery: any) {
  if (stringQuery === void 0) return '?search='
  const params = []
  for (let key in stringQuery) {
    let nameofquery = String(key || '').trim()
    let valueofquery = String(stringQuery[key] || '').trim()
    //@ts-ignore
    if (key !== '') params.push({key: nameofquery, value: valueofquery})
  }
  if (params.length > 0) {
    return '?' + params.map(({key, value}) => `${key}=${value}`).join('&')
  }

  return '?search='
}

export function createArrayOfObjectsTypedMissionHelper(count) {
  const result: any[] = [];

  for (let i = 0; i < count; i++) {
    result.push({
      missions: [],
      gift: {
        gift_type: 'coin',
        number_coin: '0'
      },
    });
  }
  return result;
}

export function getTypeHelper(obj: any) {
  if (obj === true || obj === false) {
    return obj;
  } else if (typeof obj === "string") {
    return obj === "" ? "empty string" : "string";
  } else if (typeof obj === "number") {
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.length === 0 ? "empty array" : "array";
  } else if (typeof obj === "object" && obj !== null) {
    return Object.keys(obj).length === 0 ? "empty object" : "object";
  }
  return typeof obj
}

export function getTypeOfAttributesHelper(inputObject: object) {
  if (typeof inputObject === "object") {
    if (Array.isArray(inputObject)) {
      return 'array'
    } else {
      const result = {};
      for (const key in inputObject) {
        if (inputObject.hasOwnProperty(key)) {
          result[key] = getTypeHelper(inputObject[key]);
        }
      }
      return result;
    }
  } else return typeof inputObject

}

export function getValueByPathHelper(obj: object, path: string): any {
  const keys = path.split('.');
  let result = obj;
  for (const key of keys) {
    if (result[key] === undefined) {
      return undefined;
    }
    result = result[key];
  }
  return result;
}
