import { Controller, Post, Get, Param, Body, Delete, UseGuards } from '@nestjs/common';
import { LeadService } from './lead.service';
import { LeadDto } from './dto/lead.dto';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/user.entity';
import { RolesGuard } from '../auth/roles.guard';

@Controller('leads')
@UseGuards(RolesGuard)
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
 // @Roles(UserRole.ASSISTANT, UserRole.ADMIN, UserRole.SUPERADMIN)  // Accessible à tous les rôles
  async createLead(@Body() leadDto: LeadDto) {
    return this.leadService.createLead(leadDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)  // Accessible uniquement aux admins
  async getAllLeads() {
    return this.leadService.findAllLeads();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)  // Accessible uniquement aux admins
  async getLeadById(@Param('id') id: number) {
    return this.leadService.findLeadById(id);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPERADMIN)  // Accessible uniquement aux admins
  async deleteLead(@Param('id') id: number) {
    return this.leadService.deleteLead(id);
  }
}
