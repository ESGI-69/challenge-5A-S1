import BackofficeHeader from '@/components/BackofficeHeader';
import CompanyProvider from '@/contexts/api/CompanyContext';
import CompanyValidationTable from '@/pages/backoffice/CompanyValidation/CompanyValidationTable';
import CompanyRejectedTable from '@/pages/backoffice/CompanyValidation/CompanyRejectedTable';

export default function CompanyValidation() {
  return (
    <>
      <BackofficeHeader>
        <h1>Company Validation</h1>
      </BackofficeHeader>
      <CompanyProvider>
        <CompanyValidationTable />
      </CompanyProvider>
      <CompanyProvider>
        <CompanyRejectedTable />
      </CompanyProvider>
    </>
  );
}
