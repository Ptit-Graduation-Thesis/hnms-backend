import { Injectable } from '@nestjs/common'

import { SaleBillRepository } from '@/repository'
import dayjs from 'dayjs'
import { Between } from 'typeorm'

@Injectable()
export class StatisticService {
  constructor(private readonly saleBillRepo: SaleBillRepository) {}

  async getMonthRevenue(month: string) {
    const firstDay = new Date(dayjs(month).year(), dayjs(month).month(), 1)
    const lastDay = new Date(dayjs(month).year(), dayjs(month).month() + 1, 0)
    const daysInMonth = dayjs(month).daysInMonth()
    const arrData = new Array(daysInMonth).fill(0).map((value, index) => ({ day: `${index + 1}`, value }))

    const bills = await this.saleBillRepo.find({
      where: {
        updatedAt: Between(firstDay, lastDay),
      },
    })

    bills.forEach((bill) => {
      const index = dayjs(bill.createdAt).date() - 1
      arrData[index].value += bill.totalPrice
    })

    return arrData
  }

  async getYearRevenue(year: string) {
    const firstMonth = new Date(dayjs(year).year(), 0, 1)
    const lastMonth = new Date(dayjs(year).year() + 1, 0, 0)
    const arrData = new Array(12).fill(0).map((value, index) => ({ month: `${index + 1}`, value }))

    const bills = await this.saleBillRepo.find({
      where: {
        updatedAt: Between(firstMonth, lastMonth),
      },
    })

    bills.forEach((bill) => {
      const index = dayjs(bill.createdAt).month()
      arrData[index].value += bill.totalPrice
    })

    return arrData
  }
}
