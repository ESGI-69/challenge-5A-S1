import { useTranslation } from 'react-i18next';
import PTable from '@/components/lib/PTable';
import { UserContext } from '@/contexts/api/UserContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { XMarkIcon } from '@heroicons/react/20/solid';
import Button from '@/components/lib/Button';
import style from './UsersTable.module.scss';

export default function EmployeesTable() {
  const { t } = useTranslation('user');
  const { users, get: getUsers, isUsersLoading, isDeleteUserLoading, deleteUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, []);

  const [ isConfirmDeletionModalOpen, setIsConfirmDeletionModalOpen ] = useState(false);
  const [ userToDelete, setUserToDelete ] = useState(null);

  const openDeletionConfirmationModal = (user) => {
    setUserToDelete(user);
    setIsConfirmDeletionModalOpen(true);
  };

  const DATA_TEMPLATE = {
    properties: {
      id: {
        width: '50px',
      },
      email: {
        name: 'Mail',
        width: '300px',
      },
      firstname: {
        name: 'Prénom',
        width: '150px',
      },
      lastname: {
        name: 'Nom',
        width: '150px',
      },
      phonenumber: {
        name: 'Telephone',
        width: '150px',
      },
    },
  };

  return (
    <div>
      <PTable
        template={DATA_TEMPLATE}
        data={users}
        loading={isUsersLoading}
        actions={[
          {
            name: t('table.actions.edit'),
            onClick: ({ id }) => navigate(`/backoffice/users/${id}`),
          },
          {
            name: t('table.actions.delete'),
            onClick: (establishment) => openDeletionConfirmationModal(establishment),
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
          className={style.UsersTableModal}
        >
          <XMarkIcon
            className={style.UsersTableModalClose}
            onClick={() => setIsConfirmDeletionModalOpen(false) && setUserToDelete(null)}
          />
          <h2>{t('modal.deletion.title')}</h2>
          <p>{t('modal.deletion.content')}</p>
          <div
            className={style.UsersTableModalButtons}
          >
            <Button
              variant="danger"
              disabled={isDeleteUserLoading}
              onClick={async () => {
                await deleteUser(userToDelete.id);
                setIsConfirmDeletionModalOpen(false);
                setUserToDelete(null);
                await getUsers();
              }}>
              {t('confirm', { ns: 'base' })}
            </Button>
            <Button
              disabled={isDeleteUserLoading}
              onClick={() => setIsConfirmDeletionModalOpen(false) && setUserToDelete(null)}
            >
              {t('cancel', { ns: 'base' })}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
