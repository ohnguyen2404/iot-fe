import {DeviceApi} from "../api";

const getAll = async () => {
    return await DeviceApi.getAll() || []
}

const getById = async (id) => {
    return await DeviceApi.getById(id)
}

const create = (data) => {
    return DeviceApi.create(data)
}

const update = (id, data) => {
    return DeviceApi.update(id, data)
}

const remove = (id) => {
    return DeviceApi.delete(id)
}

export default {
    getAll,
    getById,
    create,
    update,
    remove
};