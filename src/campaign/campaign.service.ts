import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './campaign.entity';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
  ) {}

  async createCampaign(createCampaignDto: CreateCampaignDto): Promise<Campaign> {
    const campaign = this.campaignRepository.create(createCampaignDto);
    return this.campaignRepository.save(campaign);
  }

  async findAll(): Promise<Campaign[]> {
    return this.campaignRepository.find({ relations: ['leads'] });
  }

  async findOne(id: number): Promise<Campaign> {
    return this.campaignRepository.findOne({
        where: { id },
        relations: ['leads'],
      });

    
  }

  async deleteCampaign(id: number): Promise<void> {
    await this.campaignRepository.delete(id);
  }
}
