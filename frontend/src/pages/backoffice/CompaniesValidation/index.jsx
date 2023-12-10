import BackofficeHeader from '@/components/BackofficeHeader';
import CompanyProvider from '@/contexts/api/CompanyContext';
import CompaniesValidationTable from '@/pages/backoffice/CompaniesValidation/CompaniesValidationTable';
import CompanyRejectedTable from '@/pages/backoffice/CompaniesValidation/CompaniesRejectedTable';

export default function CompaniesValidation() {
  return (
    <>
      <BackofficeHeader>
        <h1>Company Validation</h1>
      </BackofficeHeader>
      <CompanyProvider>
        <CompaniesValidationTable />
      </CompanyProvider>
      <CompanyProvider>
        <CompanyRejectedTable />
      </CompanyProvider>
    </>
  );
}
