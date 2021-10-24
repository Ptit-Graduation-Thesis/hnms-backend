import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm'

export class createUsersTable1635047461313 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            name: 'username',
            type: 'varchar',
            length: '127',
            collation: 'latin1_general_ci',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '127',
            collation: 'latin1_general_ci',
            isNullable: false,
          },
          {
            name: 'full_name',
            type: 'varchar',
            length: '127',
            collation: 'utf8_general_ci',
            isNullable: false,
          },
          {
            name: 'phone_number',
            type: 'varchar',
            length: '20',
            collation: 'latin1_general_ci',
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
            name: 'credential_id',
            type: 'varchar',
            length: '30',
            collation: 'latin1_general_ci',
            isNullable: false,
          },
          {
            name: 'dob',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'salary',
            type: 'float',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'role_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'branch_id',
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

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'INDEX_USERS_USERNAME',
        columnNames: ['username'],
      }),
    )

    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'INDEX_USERS_CREDENTIAL_ID',
        columnNames: ['credential_id'],
      }),
    )

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        onDelete: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['branch_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'branchs',
        onDelete: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
