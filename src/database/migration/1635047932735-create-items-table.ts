import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createItemsTable1635047932735 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'items',
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
            name: 'name',
            type: 'varchar',
            length: '127',
            collation: 'utf8_general_ci',
            isNullable: false,
          },
          {
            name: 'des',
            type: 'varchar',
            length: '255',
            collation: 'utf8_general_ci',
            isNullable: true,
          },
          {
            name: 'price',
            type: 'float',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'picture',
            type: 'varchar',
            length: '255',
            collation: 'latin1_general_ci',
            isNullable: true,
          },
          {
            name: 'qr_code',
            type: 'varchar',
            length: '50',
            collation: 'latin1_general_ci',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'tinyint',
            unsigned: true,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('items')
  }
}
