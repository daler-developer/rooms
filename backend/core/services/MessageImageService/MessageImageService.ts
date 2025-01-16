import { inject, injectable } from "inversify";
import { TYPES } from "../../../types";
import { MessageRepository } from "../../repositories/MessageRepository/MessageRepository";
import { CreateMessageDto } from "../../repositories/MessageRepository/dto/CreateMessageDto";
import pubsub from "../../../infrastructure/pubsub";
import { MessageImageRepository } from "../../repositories/MessageImageRepository/MessageImageRepository";

@injectable()
export class MessageImageService {
  constructor(@inject(TYPES.MessageImageRepository) private messageImageRepository: MessageImageRepository) {}

  async fetchMessageImages(messageId: number) {
    return await this.messageImageRepository.getManyByMessageId(messageId);
  }
}
