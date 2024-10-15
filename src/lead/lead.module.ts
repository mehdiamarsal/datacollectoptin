import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './lead.entity';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';
import { CampaignModule } from  '../campaign/campaign.module'

@Module({
  imports: [TypeOrmModule.forFeature([Lead]), CampaignModule],  // Importer CampaignModule
  providers: [LeadService],
  controllers: [LeadController],
})
export class LeadModule {}
