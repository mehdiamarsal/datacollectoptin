import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  async createCampaign(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignService.createCampaign(createCampaignDto);
  }

  @Get()
  async getAllCampaigns() {
    return this.campaignService.findAll();
  }

  @Get(':id')
  async getCampaignById(@Param('id') id: number) {
    return this.campaignService.findOne(id);
  }

  @Delete(':id')
  async deleteCampaign(@Param('id') id: number) {
    return this.campaignService.deleteCampaign(id);
  }
}
