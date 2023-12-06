<?php

namespace App\Controller\Company;

use App\Entity\Company;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\HttpFoundation\Response;

#[AsController]
class GetLogoFileController
{

    private $kernel;

    public function __construct(KernelInterface $kernel)
    {
        $this->kernel = $kernel;
    }

    public function __invoke(Company $company): Response
    {
        $publicPath = $this->kernel->getProjectDir() . '/public/company_logo';
        $filePath = $publicPath . '/' . $company->getLogoPath();

        $file_ext = pathinfo($company->getPathKbis(), PATHINFO_EXTENSION);
        $tmp_ext = "";

        if ( $file_ext == 'svg' ) {
            $tmp_ext = 'svg+xml';
        } elseif ( $file_ext == 'jpg' || $file_ext == 'jpeg' ) {
            $tmp_ext = 'image/jpeg';
        } elseif ( $file_ext == 'png' ) {
            $tmp_ext = 'image/png';
        }
        
        return new Response(file_get_contents($filePath), 200, [
            'Content-Type' => $tmp_ext,
        ]);
    }
}