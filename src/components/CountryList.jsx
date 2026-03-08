import { useCities } from "../contexts/CitiesContext";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message message="No countries added yet! Start adding some!" />;

  const uniqueCountries = cities.reduce((acc, cur) => {
    if (!acc.map((el) => el.country).includes(cur.country)) {
      return [...acc, { country: cur.country, emoji: cur.emoji }];
    } else {
      return acc;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
