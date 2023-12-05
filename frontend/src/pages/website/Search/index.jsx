import { useContext, useEffect } from 'react';
import styles from './Search.module.scss';
import Map from '@/components/Map';
import EstablishmentCard from '@/components/Search/EstablishmentCard';
import { CompanyContext } from '@/contexts/api/CompanyContext';
import { useLocation } from 'react-router-dom';

export default function Search() {
  const { companyEstablishments, getCompanyEstablishments } = useContext(CompanyContext);
  const location = useLocation();

  const getQueryParams = () => {
    const query = new URLSearchParams(location.search);
    const searchData = {
      name: query.get('name'),
      location: query.get('location'),
      companyId: query.get('companyId'),
    };
    return searchData;
  };

  useEffect(() => {
    const queryParams = getQueryParams();
    if (queryParams.companyId) {
      getCompanyEstablishments({ establishmentId: queryParams.companyId });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.Search}>
      <div className={styles.SearchLeft}>
        {companyEstablishments.map((companyEstablishment) => (
          <EstablishmentCard
            picturePath="https://picsum.photos/seed/1/534/300"
            name={companyEstablishment.company.name}
            adress={companyEstablishment.street}
            city={companyEstablishment.city}
            zipCode={companyEstablishment.zipCode}
            reviewsNumber={2}
            globalReview={3}
            key={companyEstablishment.id}
            id={companyEstablishment.id}
          />
        ))}
      </div>

      <div className={styles.SearchRight}>
        {companyEstablishments.length > 0 && (
          <Map
            className={styles.SearchMap}
            position={[ companyEstablishments[0].lat, companyEstablishments[0].long ]}
            markers={
              companyEstablishments.reduce((acc, { lat, long, city, street }) => {
                acc.push({
                  position: [ lat, long ],
                  popup: `${city} ${street}`,
                });
                return acc;
              }, [])
            }
            zoomLevel={13}
          />
        )}
      </div>
    </div>
  );
}
