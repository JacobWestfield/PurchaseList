import httpService from "./http.service";

const endpoint = "group/";

const groupService = {
  get: async () => {
    const { data } = await httpService.get(endpoint);
    return data.content;
  },
  create: async (payload) => {
    if (!payload.groupName.trim()) throw new Error();
    const { data } = await httpService.put(endpoint + payload._id, payload);
    return data;
  },
};

export default groupService;
