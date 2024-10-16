// campaign.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { Campaign } from './campaign.entity';
import { LeadModule } from '../lead/lead.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Campaign]),
    forwardRef(() => LeadModule),
  ],
  providers: [CampaignService],
  controllers: [CampaignController],
  exports: [CampaignService],
})
export class CampaignModule {}
