import httpService from "./http.service";

const endpoint = "purchase/";

const purchaseService = {
  get: async () => {
    const { data } = await httpService.get(endpoint);
    return data.content;
  },
  create: async (payload) => {
    const { data } = await httpService.put(endpoint + payload._id, payload);
    return data;
  },
  delete: async (payload) => {
    const { data } = await httpService.delete(endpoint + payload);
    return data;
  },
};

export default purchaseService;
