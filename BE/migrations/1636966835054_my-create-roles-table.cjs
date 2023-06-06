/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable({ schema: 'public', name: 'roles' }, {
        id: 'id',
        name: { type: 'varchar(1000)', notNull: true },
    }, {
        ifNotExists: true
    });
};

exports.down = pgm => {
    pgm.dropTable({ schema: 'public', name: 'roles' }, {
        ifExists: true,
        cascade: false
    });
};
