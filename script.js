document.getElementById("rollBtn").addEventListener("click", function() {
    let weapon1 = document.getElementById("weapon1").checked;
    let weapon2 = document.getElementById("weapon2").checked;
    let crit1 = document.getElementById("crit1").checked;
    let crit2 = document.getElementById("crit2").checked;
    let hex = document.getElementById("hex").checked;
    let hexWarrior = document.getElementById("hexWarrior").checked;
    let sneakAttack = document.getElementById("sneakAttack").checked;

    function rollDice(sides, count = 1) {
        let total = 0;
        for (let i = 0; i < count; i++) {
            total += Math.floor(Math.random() * sides) + 1;
        }
        return total;
    }

    let totalDamage = 0;

    // First Weapon Damage Calculation
    if (weapon1) {
        let baseDamage = rollDice(6) + 3;  // 1d6 + 3
        let extraHex = hex ? 3 : 0;
        let extraHexWarrior = hexWarrior ? rollDice(6) : 0;

        if (crit1) {
            baseDamage *= 2;
            extraHex *= 2;
            extraHexWarrior *= 2;
        }

        totalDamage += baseDamage + extraHex + extraHexWarrior;
    }

    // Second Weapon Damage Calculation
    if (weapon2) {
        let baseDamage = rollDice(6) + 3;
        let extraHex = hex ? 3 : 0;
        let extraHexWarrior = hexWarrior ? rollDice(6) : 0;

        if (crit2) {
            baseDamage *= 2;
            extraHex *= 2;
            extraHexWarrior *= 2;
        }

        totalDamage += baseDamage + extraHex + extraHexWarrior;
    }

    // Sneak Attack Damage Calculation
    if (sneakAttack) {
        let sneakDamage = rollDice(6, 3);  // 3d6
        if (crit1 || crit2) { // Sneak Attack is also doubled on a crit
            sneakDamage *= 2;
        }
        totalDamage += sneakDamage;
    }

    document.getElementById("totalDamage").innerText = totalDamage;
});
