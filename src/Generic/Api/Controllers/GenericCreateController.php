<?php

namespace App\Generic\Api\Controllers;

use App\Entity\User;
use App\Generic\Api\Interfaces\ApiInterface;
use App\Generic\Api\Interfaces\GenericInterface;
use App\Generic\Api\Interfaces\ProcessEntity;
use App\Generic\Api\Trait\GenericJSONResponse;
use App\Generic\Api\Trait\GenericProcessEntity;
use App\Generic\Api\Trait\GenericValidation;
use App\Generic\Api\Trait\Security as SecurityTrait;
use App\Generic\Auth\JWT;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\ParameterBag;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class GenericCreateController extends AbstractController implements GenericInterface, ProcessEntity
{
    use GenericValidation;
    use GenericProcessEntity;
    use GenericJSONResponse;
    use SecurityTrait;

    private Security $security;
    private JWT $jwt;
    protected ParameterBag $attributes;
    protected ParameterBag $query;

    public function __invoke(
        Request $request,
        SerializerInterface $serializer,
        ValidatorInterface $validator,
        ManagerRegistry $managerRegistry,
        Security $security,
        JWT $jwt,
    ): JsonResponse {
        $this->initialize($request, $serializer, $validator, $managerRegistry, $security);
        $this->checkData();
        $this->jwt = $jwt;

        return $this->setSecurityView('createAction', $jwt);
    }

    protected function initialize(
        Request $request,
        SerializerInterface $serializer,
        ValidatorInterface $validator,
        ManagerRegistry $managerRegistry,
        Security $security
    ): void {
        $this->serializer = $serializer;
        $this->validator = $validator;
        $this->security = $security;
        $this->managerRegistry = $managerRegistry;
        $this->request = $request;
        $this->attributes = $request->attributes;
        $this->query = $request->query;
    }

    private function createAction(): JsonResponse
    {
        $data = $this->request->getContent();

        if (empty($data)) {
            return $this->respondWithError('No data provided', JsonResponse::HTTP_BAD_REQUEST);
        }

        $JWTtoken = $this->jwt->decode($this->jwt->getJWTFromHeader());
        $user = $this->managerRegistry->getRepository(User::class)->find($JWTtoken['id']);

        $dto = new $this->dto(json_decode($data, true));

        $dto->setComponentsData([
            'managerRegistry' => $this->managerRegistry,
            'request' => $this->request,
            'userId' => $user->getId(),
            'edit' => false,
        ]);

        $this->beforeValidation();

        $errors = $this->validateDto($dto);

        if (!empty($errors)) {
            return $this->validationErrorResponse($errors);
        }
        $this->afterValidation();

        $this->processEntity($dto);
        $this->afterProcessEntity();

        return $this->respondWithSuccess(JsonResponse::HTTP_CREATED);
    }

    public function getEntity(): ?ApiInterface
    {
        return new $this->entity();
    }
}
