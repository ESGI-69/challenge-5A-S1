<?php

namespace App\Controller\Company;

use App\Entity\Company;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;



#[AsController]
class ValidateCompanyController
{
  private $mailer;
    public function __construct(
        protected Security $security,
        MailerInterface $mailer
    ) {
        $this->mailer = $mailer;
    }

    public function __invoke(Company $company): Company
    {

        if ($company->getValidatedAt() !== null) {
            throw new BadRequestException('Company already validated');
        }

        $company->setRejectedReason(null);
        $companyUsers = $company->getUsers();

        foreach ($companyUsers as $user) {
            $user->setRoles(['ROLE_PRESTA']);
        }

        $company->setValidatedAt(new \DateTimeImmutable());
        $company->setUpdatedAt(new \DateTimeImmutable());

        $email = (new Email())
        ->from('notify@platiny.fr')
        ->to($company->getEmail())
        ->subject("Votre entreprise a été validée")
        ->text("<p style='font-size: 24px; font-weight: bold; text-align: center;'>PLATINY</p>
                <p>Votre demande concernant l'ajout de votre entreprise <strong>". $company->getName() ."</strong> a été validée. 
                Vous avez désormais accès a votre Tableau de bord personnalisé sur lequel vous pourrez ajouter vos établissement,
                gérer vos employés, vos horaires d'ouverture, etc</p>
                <p>Vous pouvez y accéder en cliquant sur le bouton ci-dessous.</p>
                <p style='text-align: center;'><a href='".$_ENV["URL_PROD"]."/backoffice' style='font-size: 20px; padding: 16px; background-color: #111111; border-radius: 8px; color: white; text-decoration: none;'>Accéder à votre espace</a></p>");
        $this->mailer->send($email);


        return $company;
    }
}