const Harvest = require('state.harvest');
const Update = require('state.update');
const Stock = require('state.stock');
const Dummy = require('state.dummy');

const states = [Harvest, Update, Stock, Dummy];
const states_map = new Map();
states.forEach(state => states_map[state.name] = state);

function get_state(creep) {
    let state = creep.memory.state;
    if (state == null) {
        state = find_state(creep);
        creep.memory.state = state;
    }
    state = states_map[state];
    return state;
}

function find_state(creep) {
    for (let i = 0, state, target; i < states.length; i++) {
        state = states[i];
        if (!state.enter_condition(creep)) continue;
        target = find_target(creep, state);
        if (target == null) continue;
        target.room.memory[target.id + 'creeps_num']++;
        creep.memory.target_id = target.id;
        return state.name;
    }
}

function find_target(creep, state){
    let targets = state.find_targets(creep);
    let pos = creep.pos;
    let ranges = targets.map((target, index) => [pos.findPathTo(target).length, index]).sort();
    for (let i = 0; i < ranges.length; i++){
        let range = ranges[i];
        let target = targets[range[1]];
        let memory = target.room.memory;
        let creeps_num = memory[target.id + 'creeps_num'];
        if (creeps_num == null) {
            memory[target.id + 'creeps_num'] = creeps_num = 0;
        }
        if (creeps_num < state.get_creeps_limit(target)) return target;
    }
    return null;
}

module.exports.loop = function () {
    Game.spawns['Spawn1'].spawnCreep(
        [WORK, CARRY, MOVE],
        'creep' + Game.time,
    );

    for (let creep_name in Game.creeps) {
        let creep = Game.creeps[creep_name];
        let state = get_state(creep);
        const target = Game.getObjectById(creep.memory.target_id);
        if (state.action(creep, target) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: state.stroke}});
        }
        if (state.exit_condition(creep)){
            creep.memory.state = null;
            target.room.memory[target.id + 'creeps_num']--;
        }
    }
};
