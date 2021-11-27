import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm'

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
            name: 'picture_key',
            type: 'varchar',
            length: '255',
            collation: 'latin1_general_ci',
            isNullable: false,
          },
          {
            name: 'picture_url',
            type: 'varchar',
            length: '255',
            collation: 'latin1_general_ci',
            isNullable: false,
          },
          {
            name: 'qr_code',
            type: 'varchar',
            length: '50',
            collation: 'latin1_general_ci',
            isUnique: true,
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

    await queryRunner.createIndex(
      'items',
      new TableIndex({
        name: 'ITEMS_QR_CODE',
        columnNames: ['qr_code'],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('items')
  }
}
