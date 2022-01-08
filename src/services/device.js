import {DeviceApi} from "../api";

const getAll = async () => {
  return await DeviceApi.getAll() || []
}

const getById = async (id) => {
  return await DeviceApi.getById(id)
}

const create = async (data) => {
  return await DeviceApi.create(data)
}

const update = async (id, data) => {
  return await DeviceApi.update(id, data)
}

const remove = (id) => {
  return DeviceApi.delete(id)
}

const getCredentialsById = async (deviceId) => {
  return await DeviceApi.getCredentialsById(deviceId)
}

const updateCredentials = async (deviceId, data) => {
  return DeviceApi.updateCredentials(deviceId, data)
}

export default {
    getAll,
    getById,
    create,
    update,
    remove,
    getCredentialsById,
    updateCredentials
};