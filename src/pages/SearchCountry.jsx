import {
  Container,
  Heading,
  Section,
  SearchForm,
  CountryList,
  Loader,
} from 'components';
import { useEffect, useState } from 'react';
import { fetchByRegion } from 'service/countryApi';

export const SearchCountry = () => {
  const [countries, setCountries] = useState([]);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!value) return;
    const getCountries = async () => {
      setIsLoading(true);
      try {
        const data = await fetchByRegion(value);
        setCountries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCountries();
  }, [value]);

  const handleSubmit = value => {
    setValue(value);
  };
  return (
    <Section>
      <Container>
        <SearchForm handleSubmit={handleSubmit} />
        <CountryList countries={countries} />
        {error && <Heading title={error} />}
        {isLoading && <Loader />}
      </Container>
    </Section>
  );
};
