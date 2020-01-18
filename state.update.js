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
        return target.room.energyAvailable >= 200 ? target.level : 0;
    },
    action: function (creep, target) {
        return creep.upgradeController(target);
    },
    exit_condition: function (creep, target) {
        return creep.store.getFreeCapacity() !== 0;
    },
};

module.exports = stateUpdate;
