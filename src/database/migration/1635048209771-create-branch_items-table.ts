import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createBranchItemsTable1635048209771 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'branch_items',
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
            name: 'branch_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'item_id',
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
      'branch_items',
      new TableForeignKey({
        columnNames: ['branch_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'branchs',
        onDelete: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'branch_items',
      new TableForeignKey({
        columnNames: ['item_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'items',
        onDelete: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('branch_items')
  }
}
