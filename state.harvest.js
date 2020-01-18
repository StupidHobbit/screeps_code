let stateHarvest = {
    name: 'harvest',
    stroke: '#ffaa00',
    enter_condition: function (creep) {
        return creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    },
    find_targets: function(creep) {
        return creep.room.find(FIND_SOURCES);
    },
    get_creeps_limit: function(target){
        let memory = target.room.memory;
        let res = memory[target.id + 'creeps_limit'];
        if (!res){
            memory[target.id + 'creeps_limit'] = res = 8 - get_free_cells_of(target);
        }
        return res;
    },
    action: function (creep, target) {
        return creep.harvest(target);
    },
    exit_condition: function (creep, target) {
        return creep.store.getFreeCapacity() === 0;
    },
};

function get_free_cells_of(source){
    let pos = source.pos;
    let res = 0;
    source.room.lookForAtArea(LOOK_TERRAIN, pos.y - 1, pos.x - 1, pos.y + 1, pos.x + 1, true)
        .forEach(obj => res += obj.terrain === 'plain' || obj.terrain === 'swamp');
    return res;
}

module.exports = stateHarvest;
