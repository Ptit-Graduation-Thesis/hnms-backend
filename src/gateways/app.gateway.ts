import { JwtService } from '@nestjs/jwt'
import { Logger } from '@nestjs/common'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server } from 'socket.io'

import { MessageRepository, UserRepository } from '@/repository'
import { AuthenticateType, RoomPayload, MessagePayload, Socket } from '@/types/socket.type'
import { SocketEvent } from '@/enums'

@WebSocketGateway({ namespace: 'chat-socket', transports: ['websocket'] })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server
  private readonly logger = new Logger(AppGateway.name)

  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepository,
    private readonly messageRepo: MessageRepository,
  ) {}

  afterInit() {
    this.logger.log('Gateway init')
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`)
  }

  @SubscribeMessage(SocketEvent.AUTHENTICATE)
  async authenticate(client: Socket, payload: AuthenticateType) {
    try {
      const decoded = await this.jwtService.verifyAsync(payload.token)
      const user = await this.userRepo.findOne(decoded.id)

      if (!user) {
        client.emit(SocketEvent.UNAUTHORIZED)
        return
      }

      client.user = user
      client.emit(SocketEvent.AUTHENTICATED)
    } catch {
      client.emit(SocketEvent.UNAUTHORIZED)
      return
    }
  }

  @SubscribeMessage(SocketEvent.JOIN_ROOM)
  joinRoom(client: Socket, payload: RoomPayload) {
    client.join(`room-${payload.roomId}`)
  }

  @SubscribeMessage(SocketEvent.LEAVE_ROOM)
  leaveRoom(client: Socket, payload: RoomPayload) {
    client.leave(`room-${payload.roomId}`)
  }

  @SubscribeMessage(SocketEvent.CLIENT_SEND)
  async clientSend(client: Socket, payload: MessagePayload) {
    try {
      await this.messageRepo.insert({
        text: payload.text,
        createdAt: payload.createdAt,
        userId: payload.user._id,
        roomId: payload.roomId,
      })
    } catch {
      this.logger.error('Save message error!')
      return
    }

    client.to(`room-${payload.roomId}`).emit(SocketEvent.CLIENT_RECIEPT, payload)
  }
}
