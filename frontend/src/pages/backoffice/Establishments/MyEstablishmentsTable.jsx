import { useTranslation } from 'react-i18next';
import PTable from '@/components/lib/PTable';
import { EstablishmentContext } from '@/contexts/api/EstablishmentContext';
import { ProfileContext } from '@/contexts/ProfileContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import style from './MyEstablishmentsTable.module.scss';
import { XMarkIcon } from '@heroicons/react/20/solid';
import Button from '@/components/lib/Button';

export default function MyEstablishmentsTable() {
  const { t } = useTranslation('establishment');
  const { profile } = useContext(ProfileContext);
  const {
    get,
    establishments,
    isEstablishmentsLoading,
    deleteEstablishment,
    isDeleteEstablishmentLoading,
  } = useContext(EstablishmentContext);
  const navigate = useNavigate();

  useEffect(() => {
    get({ 'company.id': profile.company.id });
  }, []);

  const [ isConfirmDeletionModalOpen, setIsConfirmDeletionModalOpen ] = useState(false);
  const [ establishmentToDelete, setEstablishmentToDelete ] = useState(null);

  const openDeletionConfirmationModal = (establishment) => {
    setEstablishmentToDelete(establishment);
    setIsConfirmDeletionModalOpen(true);
  };

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
    <div>
      <PTable
        template={DATA_TEMPLATE}
        data={establishments}
        loading={isEstablishmentsLoading}
        actions={[
          {
            name: t('table.actions.edit'),
            onClick: ({ id }) => navigate(`/backoffice/establishments/${id}`),
          },
          {
            name: t('table.actions.delete'),
            onClick: (establishment) => openDeletionConfirmationModal(establishment),
            // onClick: async ({ id }) => {
            //   await deleteEstablishment(id),
            //   get({ 'company.id': profile.company.id });
            // },
          },
        ]}
      />
      <Modal
        isOpen={isConfirmDeletionModalOpen}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            width: '500px',
            height: 'fit-content',
            margin: 'auto',
          },
        }}

      >
        <div
          className={style.MyEstablishmentsTableModal}
        >
          <XMarkIcon
            className={style.MyEstablishmentsTableModalClose}
            onClick={() => setIsConfirmDeletionModalOpen(false) && setEstablishmentToDelete(null)}
          />
          <h2>{t('modal.deletion.title')}</h2>
          <p>{t('modal.deletion.content', { city: establishmentToDelete?.city })}</p>
          <div
            className={style.MyEstablishmentsTableModalButtons}
          >
            <Button
              variant="danger"
              disabled={isDeleteEstablishmentLoading}
              onClick={async () => {
                await deleteEstablishment(establishmentToDelete.id);
                get({ 'company.id': profile.company.id });
                setIsConfirmDeletionModalOpen(false);
                setEstablishmentToDelete(null);
              }}>
              {t('confirm', { ns: 'base' })}
            </Button>
            <Button
              disabled={isDeleteEstablishmentLoading}
              onClick={() => setIsConfirmDeletionModalOpen(false) && setEstablishmentToDelete(null)}
            >
              {t('cancel', { ns: 'base' })}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
