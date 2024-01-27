import { useTranslation } from 'react-i18next';
import PTable from '@/components/lib/PTable';
import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';
import { ProfileContext } from '@/contexts/ProfileContext';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyEstablishmentsTable() {
  const { t } = useTranslation('establishment');
  const { profile } = useContext(ProfileContext);
  const {
    get,
    establishments,
    isEstablishmentsLoading,
  } = useContext(EstablishmentContext);
  const navigate = useNavigate();

  useEffect(() => {
    get({ 'company.id': profile.company.id });
  }, []);

  const DATA_TEMPLATE = {
    properties: {
      id: {
        width: '50px',
      },
      email: {
        name: t('table.titles.email'),
        width: '300px',
      },
      street: {
        name: t('table.titles.street'),
        width: '300px',
      },
      zipCode: {
        name: t('table.titles.zipCode'),
        width: '100px',
      },
      city: {
        name: t('table.titles.city'),
        width: '200px',
      },
      country: {
        name: t('table.titles.country'),
        width: '200px',
      },
      type: {
        name: t('table.titles.type'),
        width: '200px',
        formatingMethod: (currentType) => currentType.name,
      },
    },
  };

  return (
    <>
      <PTable
        template={DATA_TEMPLATE}
        data={establishments}
        loading={isEstablishmentsLoading}
        actions={[
          {
            name: 'view',
            onClick: ({ id }) => navigate(`/backoffice/establishments/${id}`),
          },
        ]}
      />
    </>
  );
}
