import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createSoldItemsTable1635048503293 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sold_items',
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
            name: 'item_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'bill_id',
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
      'sold_items',
      new TableForeignKey({
        columnNames: ['item_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'items',
        onDelete: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'sold_items',
      new TableForeignKey({
        columnNames: ['bill_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'bills',
        onDelete: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sold_items')
  }
}
