<?php

declare(strict_types=1);

namespace App\Enum;

enum UserAccountTypeEnum: string
{
    case ADMIN = 'admin';
    case NORMAL = 'normal';
}
