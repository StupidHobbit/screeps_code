let stateUpdate = {
    name: 'update',
    stroke: '#ffffff',
    enter_condition: function (creep) {
        return creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0;
    },
    find_targets: function(creep) {
        return [creep.room.controller];
    },
    get_creeps_limit: function(target){
        return Math.min(
            target.level * 3,
            Math.ceil(target.room.find(FIND_MY_CREEPS).length * 0.25),
        );
    },
    action: function (creep, target) {
        return creep.upgradeController(target);
    },
    exit_condition: function (creep, target) {
        return creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0;
    },
};

module.exports = stateUpdate;
