<?php

declare(strict_types=1);

namespace App\Controller\Common;

use App\Infrastructure\Languages;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class LanguageController extends AbstractController
{
    #[Route('/api/list_languages', name: 'list_languages', methods: ['GET'])]
    public function list(): JsonResponse
    {        
        return new JsonResponse(
            Languages::getLanguagesList()
        );
    }
}
