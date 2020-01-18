let stateDummy = {
    name: 'dummy',
    enter_condition: function (creep) {
        return true;
    },
    find_targets: function(creep) {
        return [true];
    },
    get_creeps_limit: function(target){
        return 1000;
    },
    action: function (creep, target) {
        creep.say('Horsing around');
    },
    exit_condition: function (creep) {
        return true;
    },
};

module.exports = stateDummy;
