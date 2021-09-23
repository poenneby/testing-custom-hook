import * as React from "react";
import { API_BASE_URL } from "../test/server-handlers";

const fetchedCategories = [{ id: 1, name: "One category" }];

const useCategories = (id?: number) => {
  const fetchCategories = React.useCallback(async () => {
    setLoading(true);
    const url = id
      ? `${API_BASE_URL}/categories/:id`
      : `${API_BASE_URL}/categories`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { accepts: "application/json" },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      setCategories(await response.json());
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }, []);

  const [categories, setCategories] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState();

  React.useEffect(() => {
    try {
      fetchCategories();
    } catch (error) {
      console.log("ERROR", error.message);
      setErrorMessage(error);
      setLoading(false);
    }
  }, []);

  return { categories, loading, errorMessage };
};

export default useCategories;
