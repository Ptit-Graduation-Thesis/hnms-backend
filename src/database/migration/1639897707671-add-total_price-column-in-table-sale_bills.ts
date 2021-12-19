import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class addTotalPriceColumnInTableSaleBills1639897707671 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'sale_bills',
      new TableColumn({
        name: 'total_price',
        type: 'float',
        unsigned: true,
        isNullable: false,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('sale_bills', 'total_price')
  }
}
