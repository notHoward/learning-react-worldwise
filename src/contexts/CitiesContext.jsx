import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/load":
      return { ...state, cities: action.payload, isLoading: false };
    case "cities/create":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
        isLoading: false,
      };
    case "cities/delete":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
        isLoading: false,
      };

    case "cities/setCurrentCity":
      return { ...state, currentCity: action.payload, isLoading: false };
    case "cities/error":
      return { ...state, error: action.payload, isLoading: false };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    dispatch({ type: "loading" });
    async function fetchCities() {
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({ type: "cities/load", payload: data });
      } catch (error) {
        dispatch({ type: "cities/error", payload: "Error fetching cities" });
      }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (currentCity.id === id) return;
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await response.json();
        dispatch({ type: "cities/setCurrentCity", payload: data });
      } catch (error) {
        dispatch({ type: "cities/error", payload: "Error fetching city" });
      }
    },
    [currentCity.id],
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });

      const data = await response.json();
      dispatch({ type: "cities/create", payload: data });
    } catch (error) {
      dispatch({ type: "cities/error", payload: "Error creating city" });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "cities/delete", payload: id });
    } catch (error) {
      dispatch({ type: "cities/error", payload: "Error deleting city" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
