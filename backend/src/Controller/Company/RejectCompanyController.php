<?php

namespace App\Controller\Company;

use App\Entity\Company;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;

#[AsController]
class RejectCompanyController
{
    private $mailer;
    public function __construct(
        protected Security $security,
        MailerInterface $mailer
    ) {
        $this->mailer = $mailer;
    }

    public function __invoke(Request $request, Company $company): Company
    {
        $rejectedReason = $request->toArray()['reason'] ?? null;

        if ($rejectedReason === null) {
            throw new BadRequestException('Rejected reason is required');
        }

        if ($company->getValidatedAt() !== null) {
            throw new BadRequestException('Company is validated');
        }

        if ($company->getRejectedReason() !== null) {
            throw new BadRequestException('Company already rejected');
        }

        $company->setRejectedReason($rejectedReason);
        $company->setUpdatedAt(new \DateTimeImmutable());

        $email = (new Email())
        ->from('notify@platiny.fr')
        ->to($company->getEmail())
        ->subject("Votre demande a été rejetée")
        ->text("<p style='font-size: 24px; font-weight: bold; text-align: center;'>PLATINY</p>
                <p>Votre demande concernant l'ajout de votre entreprise a été refusée. Pour la raison suivante :</p>
                <p><strong>".$rejectedReason."</strong></p>
                <p>Vous pouvez renvoyer une demande depuis le site.</p>
                <p style='text-align: center;'><a href='".$_ENV["URL_PROD"]."' style='font-size: 20px; padding: 16px; background-color: #111111; border-radius: 8px; color: white; text-decoration: none;'>Renvoyer une demande</a></p>");
        
        $this->mailer->send($email);

        return $company;
    }
}