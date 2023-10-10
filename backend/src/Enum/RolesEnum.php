<?php

declare(strict_types=1);

namespace App\Enum;

enum RolesEnum: string
{
    case ADMIN = 'ROLE_ADMIN';
    case USER = 'ROLE_USER';
}
