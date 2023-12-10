import { useTranslation } from 'react-i18next';
import PTable from '@/components/lib/PTable';
import { CompanyContext } from '@/contexts/api/CompanyContext';
import { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import style from './CompaniesValidation.module.scss';
import { dateTime } from '@/utils/formater/date';
import Button from '@/components/lib/Button';

export default function CompanyValidation() {
  const { t } = useTranslation('companiesValidation');
  const {
    adminGet,
    companies,
    isCompaniesLoading,
    adminGetById,
    company,
    isCompanyLoading,
    adminValidate,
    adminReject,
  } = useContext(CompanyContext);

  useEffect(() => {
    adminGet({ 'exists[validatedAt]': false, 'exists[rejectedReason]': false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [ modalIsOpen, setIsModalOpen ] = useState(false);
  const [ rejectedModalIsOpen, setRejectedModalIsOpen ] = useState(false);
  const [ rejectedReason, setRejectedReason ] = useState('');

  const openReviewModal = async (id) => {
    adminGetById(id);
    setIsModalOpen(true);
  };

  const validateCompany = async (id) => {
    await adminValidate(id);
    adminGet({ 'exists[validatedAt]': false, 'exists[rejectedReason]': false });
    setIsModalOpen(false);
  };

  const rejectCompany = async (id) => {
    await adminReject(id, rejectedReason);
    adminGet({ 'exists[validatedAt]': false, 'exists[rejectedReason]': false });
    setRejectedModalIsOpen(false);
    setIsModalOpen(false);
  };

  const DATA_TEMPLATE = {
    properties: {
      id: {
        width: '50px',
      },
      name: {
        name: t('table.titles.name'),
        width: '200px',
      },
      email: {
        name: t('table.titles.email'),
        width: '300px',
      },
    },
  };

  return (
    <>
      <PTable
        template={DATA_TEMPLATE}
        data={companies}
        loading={isCompaniesLoading}
        actions={[
          {
            name: 'view',
            onClick: ({ id }) => openReviewModal(id),
          },
        ]}
      />
      <Modal ariaHideApp={false} isOpen={modalIsOpen}>
        {isCompanyLoading || !company ? (
          <h1>Loading...</h1>
        ) : (
          <div className={style.CompaniesValidationModal}>
            <h1 className={style.CompaniesValidationModalTitle}>{company.name}</h1>
            <div className={style.CompaniesValidationModalInfos}>
              <div className={style.CompaniesValidationModalInfosInfo}>
                <span className={style.CompaniesValidationModalInfosInfoLabel}>
                  EmailNEEDTRAD:
                </span>
                <span>
                  {company.email}
                </span>
              </div>
              <div className={style.CompaniesValidationModalInfosInfo}>
                <span className={style.CompaniesValidationModalInfosInfoLabel}>
                  Requested atNEEDTRAD:
                </span>
                <span>
                  {dateTime(company.updatedAt)}
                </span>
              </div>
            </div>
            <iframe className={style.CompaniesValidationModalViewer} src="https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf" width="100%" height="500px" />
            <div className={style.CompaniesValidationModalButtons}>
              <Button variant="danger" onClick={() => setRejectedModalIsOpen(true) && setRejectedReason('')}>RejectNEEDTRAD</Button>
              <Button variant="success" onClick={() => validateCompany(company.id)}>ApproveNEEDTRAD</Button>
            </div>
            <Modal style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
              },
              content: {
                width: '500px',
                height: 'fit-content',
                margin: 'auto',
              },
            }} ariaHideApp={false} isOpen={rejectedModalIsOpen}>
              <div className={style.CompaniesValidationRejectedModal}>
                <h1 className={style.CompaniesValidationRejectedModalTitle}>WhyNEEDTRAD</h1>
                <textarea rows={6} className={style.CompaniesValidationRejectedModalTextarea} onChange={(e) => setRejectedReason(e.target.value)} />
                <div className={style.CompaniesValidationRejectedModalButtons}>
                  <Button variant="black" onClick={() => setRejectedModalIsOpen(false)}>CancelNEEDTRAD</Button>
                  <Button variant="danger" onClick={() => rejectCompany(company.id, rejectedReason)}>RejectNEEDTRAD</Button>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </Modal>
    </>
  );
}
