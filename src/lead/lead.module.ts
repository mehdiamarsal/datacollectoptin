// lead.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';
import { Lead } from './lead.entity';
import { CampaignModule } from '../campaign/campaign.module'; // Module qui pourrait avoir une dépendance circulaire

@Module({
  imports: [
    TypeOrmModule.forFeature([Lead]),
    forwardRef(() => CampaignModule),
  ],
  providers: [LeadService],
  controllers: [LeadController],
  exports: [LeadService],
})
export class LeadModule {}
