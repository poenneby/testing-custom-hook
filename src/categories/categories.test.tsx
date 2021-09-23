import { test, expect } from "@jest/globals";
import { renderHook } from "@testing-library/react-hooks";
import { rest, server } from "../test/server";
import { API_BASE_URL } from "../test/server-handlers";
import useCategories from "./categories";

const wrapper = ({ children }: any) => <div>{children}</div>;

test("should fetch all categories", async () => {
  // Given API resources are responding

  // When
  const { result, waitForNextUpdate } = renderHook<any, any>(
    () => useCategories(),
    { wrapper }
  );

  expect(result.current.loading).toBeTruthy();
  await waitForNextUpdate();

  const { categories } = result.current;

  // Then
  expect(result.current.loading).toBeFalsy();
  expect(categories).toHaveLength(3);
});

test("should fetch category by id", async () => {
  // Given API resources are responding

  // When
  const { result, waitForNextUpdate } = renderHook<any, any>(
    () => useCategories(1),
    { wrapper }
  );

  expect(result.current.loading).toBeTruthy();
  await waitForNextUpdate();

  const { categories } = result.current;

  // Then
  expect(result.current.loading).toBeFalsy();
  expect(categories).toHaveProperty("name", "Drums");
});

test("should provide error message when category fetch fails", async () => {
  // Given
  server.use(
    rest.get(`${API_BASE_URL}/categories`, async (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  // When
  const { result, waitForNextUpdate } = renderHook<any, any>(
    () => useCategories(),
    { wrapper }
  );
  expect(result.current.loading).toBeTruthy();
  await waitForNextUpdate();

  const { errorMessage } = result.current;
  expect(errorMessage).toBe("Internal Server Error");
});
