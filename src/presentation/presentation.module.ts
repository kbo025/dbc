import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { PeopleController } from './controllers/people.controller';
import { AddressesController } from './controllers/addresses.controller';
import { AddresessService } from './services/addresess.service';
import { PeopleService } from './services/people.service';
import { AddressPrismaRepository } from 'src/infra/prisma/repositories/AddressPrisma.repository';
import { PersonPrismaRepository } from 'src/infra/prisma/repositories/PersonPrisma.repository';

@Module({
  providers: [
    AddresessService,
    PeopleService,
    AddressPrismaRepository,
    PersonPrismaRepository,
  ],
  controllers: [PeopleController, AddressesController],
  imports: [DomainModule, PrismaModule],
})
export class PresentationModule {}
