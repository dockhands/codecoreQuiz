
exports.up = function(knex, Promise) {
    return knex.schema.table('clucks', function(t) {
        t.string('profile_pic');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('clucks', function(t) {
        t.dropColumn('profile_pic');
    });
};
