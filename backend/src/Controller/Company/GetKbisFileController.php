<?php

namespace App\Controller\Company;

use App\Entity\Company;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\HttpFoundation\Response;

#[AsController]
class GetKbisFileController
{

    private $kernel;

    public function __construct(KernelInterface $kernel)
    {
        $this->kernel = $kernel;
    }

    public function __invoke(Company $company): Response
    {
        $publicPath = $this->kernel->getProjectDir() . '/public/company_kbis';
        $filePath = $publicPath . '/' . $company->getPathKbis();
        
        return new Response(file_get_contents($filePath), 200, [
            'Content-Type' => 'application/pdf',
        ]);
    }
}