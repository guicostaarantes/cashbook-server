import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateSessions1587620584683 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sessions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'fingerprint',
            type: 'uuid',
          },
          {
            name: 'expires_at',
            type: 'timestamp with time zone',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'sessions',
      new TableForeignKey({
        name: 'sessions_have_user',
        referencedTableName: 'users',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sessions');
  }
}
