import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createImportedItemsTable1638087846944 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'imported_items',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'amount',
            type: 'int',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'import_price',
            type: 'float',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'import_bill_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'branch_item_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    )

    await queryRunner.createForeignKey(
      'imported_items',
      new TableForeignKey({
        columnNames: ['import_bill_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'import_bills',
        onDelete: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'imported_items',
      new TableForeignKey({
        columnNames: ['branch_item_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'branch_items',
        onDelete: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('imported_item')
  }
}
