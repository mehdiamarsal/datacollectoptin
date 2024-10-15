import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from "./lead.entity";
import { CampaignService } from '../campaign/campaign.service'
import { LeadDto } from './dto/lead.dto';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
    private campaignService: CampaignService,
  ) {}

  async createLead(leadDto: LeadDto): Promise<Lead> {
    const campaign = await this.campaignService.findOne(leadDto.campaignId);
    if (!campaign) {
      throw new BadRequestException('Invalid campaign ID');
    }

    const lead = this.leadRepository.create({ ...leadDto, campaign });
    return this.leadRepository.save(lead);
  }

  async findAllLeads(): Promise<Lead[]> {
    return this.leadRepository.find({ relations: ['campaign'] });
  }

  async findLeadById(id: number): Promise<Lead> {
    return this.leadRepository.findOne({
        where: { id },
        relations: ['campaign'],
      });
  }

  async deleteLead(id: number): Promise<void> {
    await this.leadRepository.delete(id);
  }
}
