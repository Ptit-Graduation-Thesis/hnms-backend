import { v4 as uuid } from 'uuid'

import { ItemType } from '@/enums'

export const generateQrCode = (type: ItemType) => {
  switch (type) {
    case ItemType.PHONE:
      return `HNMS-PHONE-${uuid()}`

    case ItemType.TABLET:
      return `HNMS-TABLET-${uuid()}`

    case ItemType.LAPTOP:
      return `HNMS-LAPTOP-${uuid()}`

    default:
      return ''
  }
}
