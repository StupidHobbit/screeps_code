let stateStock = {
    name: 'stock',
    stroke: '#00ff00',
    enter_condition: function (creep) {
        return creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0;
    },
    find_targets: function(creep) {
        return creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
    },
    get_creeps_limit: function(target){
        return 100;
    },
    action: function (creep, target) {
        return creep.transfer(target, RESOURCE_ENERGY);
    },
    exit_condition: function (creep) {
        return creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0;
    },
};

module.exports = stateStock;
