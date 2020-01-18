let stateUpdate = {
    name: 'update',
    stroke: '#f40a5c',
    enter_condition: function (creep) {
        return creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0;
    },
    find_targets: function(creep) {
        return creep.room.find(FIND_CONSTRUCTION_SITES);
    },
    get_creeps_limit: function(target){
        return 1;
    },
    action: function (creep, target) {
        return creep.build(target);
    },
    exit_condition: function (creep, target) {
        return creep.store.getFreeCapacity() !== 0 && target.progress < target.progressTotal;
    },
};

module.exports = stateUpdate;
