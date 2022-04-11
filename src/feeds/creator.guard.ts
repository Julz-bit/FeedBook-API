import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { FeedsService } from './feeds.service';

@Injectable()
export class CreatorGuard implements CanActivate {
    constructor(
        private feedsService: FeedsService
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        const { user, params } = req;
        
        if (!user || !params) {
            return false;
        }

        if (user.role === 'admin') {
            return true;
        }

        console.log(req)
    }
}