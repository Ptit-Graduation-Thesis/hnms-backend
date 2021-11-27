import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm'

export class createCustomersTable1635047823622 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customers',
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
            name: 'full_name',
            type: 'varchar',
            length: '127',
            collation: 'utf8_general_ci',
            isNullable: false,
          },
          {
            name: 'dob',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'phone_number',
            type: 'varchar',
            length: '20',
            collation: 'latin1_general_ci',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar',
            length: '255',
            collation: 'utf8_general_ci',
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
      'customers',
      new TableIndex({
        name: 'INDEX_CUSTOMERS_PHONE_NUMBER',
        columnNames: ['phone_number'],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customers')
  }
}
