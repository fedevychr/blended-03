import { Container, CountryInfo, Heading, Loader, Section } from 'components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCountry } from 'service/countryApi';

export const Country = () => {
  const { countryId } = useParams();
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countryId) return;
    const getCountry = async () => {
      setIsLoading(true);
      try {
        const country = await fetchCountry(countryId);
        setCountry(country);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCountry();
  }, [countryId]);
  return (
    <Section>
      <Container>
        {country && <CountryInfo country={country} />}
        {isLoading && <Loader />}
        {error && <Heading title={error} />}
      </Container>
    </Section>
  );
};
