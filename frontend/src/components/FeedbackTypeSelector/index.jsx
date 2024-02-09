import Button from '../lib/Button';
import Modal from 'react-modal';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';
import styles from './FeedbackTypeSelector.module.scss';
import Input from '../lib/Input';
import { FeedbackTypeContext } from '@/contexts/api/FeedbackTypeContext';
import { TrashIcon } from '@heroicons/react/20/solid';
import toast from 'react-hot-toast';
import PTable from '@/components/lib/PTable';

export default function FeedbackTypeSelector() {
  const { isGetAllFeedbackTypesLoading, feedbackTypes, getAllFeedbackTypes, postFeedbackType, deleteFeedbackType, isDeleteFeedbackTypeLoading, isPostFeedbackTypeLoading } = useContext(FeedbackTypeContext);
  const { t } = useTranslation('feedbackType');
  const [ modalCreateIsOpen, setModalCreateIsOpen ] = useState(false);
  const [ modalDeleteIsOpen, setModalDeleteIsOpen ] = useState(false);
  const [ postName, setPostName ] = useState('');
  const [ deleteId, setDeleteId ] = useState('');
  const [ deleteName, setDeleteName ] = useState('');

  useEffect(() => {
    getAllFeedbackTypes();
  }, []);

  const DATA_TEMPLATE = {
    properties: {
      id: {
        width: '50px',
      },
      name: {
        name: t('feedbackType.labelName'),
        width: '120px',
      },
    },
  };

  const openModalCreate = () => {
    setModalCreateIsOpen(true);
  };

  const openModalDelete = (id, name) => {
    setDeleteId(id);
    setDeleteName(name);
    setModalDeleteIsOpen(true);
  };

  const onPostSubmit = async (e) => {
    e.preventDefault();
    if (!postName) {
      toast.error(t('feedbackType.errorName'));
    } else {
      await postFeedbackType({ name: postName });
      setModalCreateIsOpen(false);
      toast.success(t('feedbackType.successAdd'));
      setPostName('');
      getAllFeedbackTypes();
    }
  };

  const onDelete = async (id) => {
    await deleteFeedbackType(id);
    setDeleteId('');
    setDeleteName('');
    toast.success(t('feedbackType.successDelete'));
    setModalDeleteIsOpen(false);
    getAllFeedbackTypes();
  };

  return (
    <div className={styles.FeedbackTypeSelector}>
      <Button
        variant="primary"
        onClick={openModalCreate}
      >
        {t('feedbackType.buttonAdd')}
      </Button>
      <div className={styles.FeedbackTypeSelectorTable}>
        <PTable

          template={DATA_TEMPLATE}
          data={feedbackTypes}
          loading={isGetAllFeedbackTypesLoading}
          actions={[
            {
              name: <TrashIcon width="20px" height="20px" />,
              onClick: ({ id, name }) => openModalDelete(id, name),
            },
          ]}
        />
      </div>

      <Modal
        className={styles.FeedbackTypeSelectorModal}
        isOpen={modalCreateIsOpen}
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
        <h2>
          {t('feedbackType.titleAdd')}
        </h2>
        <form
          onSubmit={onPostSubmit}
          className={styles.FeedbackTypeSelectorModalForm}
        >
          <label htmlFor="name">
            {t('feedbackType.labelName')} :
          </label>
          <Input
            type="text"
            placeholder={t('feedbackType.placeHolderName')}
            value={postName}
            onChange={(newValue) => setPostName(newValue)}
          />
          <div className={styles.FeedbackTypeSelectorModalBtns}>
            <Button
              variant="primary"
              type="submit"
              disabled={isPostFeedbackTypeLoading}
            >
              {t('feedbackType.buttonAddConfirm')}
            </Button>
            <Button
              variant="danger"
              onClick={() => setModalCreateIsOpen(false)}
            >
              {t('feedbackType.buttonClose')}
            </Button>
          </div>
        </form>
      </Modal>
      <Modal
        className={styles.FeedbackTypeSelectorModal}
        isOpen={modalDeleteIsOpen}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
          },
          content: {
            width: '500px',
            height: 'fit-content',
            margin: 'auto',
          },
        }}
      >
        <p>{t('feedbackType.warningDeletion')}</p>
        <p>{t('feedbackType.warningDeletionSub')} : {deleteName}</p>
        <div className={styles.FeedbackTypeSelectorModalBtns}>
          <Button
            variant="primary"
            onClick={() => onDelete(deleteId)}
            disabled={isDeleteFeedbackTypeLoading}
          >
            {t('feedbackType.buttonAddConfirm')}
          </Button>
          <Button
            variant="danger"
            onClick={() => setModalDeleteIsOpen(false)}
          >
            {t('feedbackType.buttonClose')}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
