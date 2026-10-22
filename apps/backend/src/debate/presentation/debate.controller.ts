import { Controller } from '@nestjs/common'
import { DebateService } from '../application/debate.service'

@Controller('debates')
export class DebateController {
  constructor(private readonly debateService: DebateService) {}
}
