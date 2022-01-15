import { DashboardApi } from "../api";

const getAll = async () => {
  return (await DashboardApi.getAll()) || [];
};

const getById = async (id) => {
  return await DashboardApi.getById(id);
};

const create = (data) => {
  return DashboardApi.create(data);
};

const update = (id, data) => {
  return DashboardApi.update(id, data);
};

const remove = (id) => {
  return DashboardApi.delete(id);
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
