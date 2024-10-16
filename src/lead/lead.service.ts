import { Injectable, BadRequestException, HttpException, HttpStatus, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from "./lead.entity";
import { CampaignService } from '../campaign/campaign.service'
import { LeadDto } from './dto/lead.dto';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepository: Repository<Lead>,

    @Inject(forwardRef(() => CampaignService)) // Utiliser forwardRef ici si nécessaire
    private readonly campaignService: CampaignService,
  ) {}



  



  async findOneByEmail(email: string): Promise<Lead | null> {
    return this.leadRepository.findOne({ where: { email } });
  }

  async findOneByPhone(phone: string): Promise<Lead | null> {
    return this.leadRepository.findOne({ where: { phone } });
  }



    async createLead(leadDto: LeadDto): Promise<string> {
      try {
        // Vérifier si la campagne existe
        const campaign = await this.campaignService.findOne(leadDto.campaignId);
        if (!campaign) {
          throw new BadRequestException('Invalid campaign ID');
        }
  
        // Créer et sauvegarder le lead
        const lead = this.leadRepository.create({ ...leadDto, campaign });
        await this.leadRepository.save(lead);
  
        return 'OK'; // Retourner "OK" si le lead est bien créé
      } catch (error) {
        // En cas d'erreur, loguer l'erreur et retourner "KO"
        console.error(error);
        throw new HttpException('KO', HttpStatus.BAD_REQUEST);
      }
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
