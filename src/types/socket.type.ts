import { Socket as DefaultSocket } from 'socket.io'

import { User } from '@/entities'

export interface Socket extends DefaultSocket {
  user: User
}

export type AuthenticateType = {
  token: string
}

export type RoomPayload = {
  roomId: number
}

export type MessagePayload = {
  roomId: number
  _id: string
  text: string
  createdAt: string
  user: {
    _id: number
  }
}
