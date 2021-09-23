import { rest } from "msw";

export const API_BASE_URL = "http://localhost:3000/api";

const categories = [
  {
    id: 1,
    name: "Drums",
  },
  {
    id: 2,
    name: "Guitars",
  },
  {
    id: 3,
    name: "Keyboards",
  },
];

const handlers = [
  rest.get(`${API_BASE_URL}/categories`, async (req, res, ctx) => {
    return res(
      ctx.json(categories)
    );
  }),
  rest.get(`${API_BASE_URL}/categories/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.json(categories.find(c => c.id = id))
    );
  }),
];

export { handlers };
