document.getElementById("rollBtn").addEventListener("click", function() {
    let weapon1 = document.getElementById("weapon1").checked;
    let weapon2 = document.getElementById("weapon2").checked;
    let crit1 = document.getElementById("crit1").checked;
    let crit2 = document.getElementById("crit2").checked;
    let hex = document.getElementById("hex").checked;
    let hexWarrior = document.getElementById("hexWarrior").checked;
    let sneakAttack = document.getElementById("sneakAttack").checked;

    function rollDice(sides, count = 1) {
        let rolls = [];
        let total = 0;
        for (let i = 0; i < count; i++) {
            let roll = Math.floor(Math.random() * sides) + 1;
            rolls.push(roll);
            total += roll;
        }
        return { total, rolls };
    }

    let totalDamage = 0;
    let breakdown = "";

    // First Weapon Damage Calculation
    if (weapon1) {
        let baseRoll = rollDice(6);
        let baseDamage = baseRoll.total + 3;
        let extraHex = hex ? 3 : 0;
        let extraHexWarrior = hexWarrior ? rollDice(6).total : 0;

        if (crit1) {
            baseDamage *= 2;
            extraHex *= 2;
            extraHexWarrior *= 2;
        }

        totalDamage += baseDamage + extraHex + extraHexWarrior;
        breakdown += `First Weapon: ${baseRoll.rolls} + 3 ${crit1 ? "(Doubled) " : ""}+ ${extraHex} (Hex) + ${extraHexWarrior} (Hex Warrior) = ${baseDamage + extraHex + extraHexWarrior} <br>`;
        document.getElementById("weapon1Result").innerText = `Damage: ${baseDamage + extraHex + extraHexWarrior}`;
    }

    // Second Weapon Damage Calculation
    if (weapon2) {
        let baseRoll = rollDice(6);
        let baseDamage = baseRoll.total + 3;
        let extraHex = hex ? 3 : 0;
        let extraHexWarrior = hexWarrior ? rollDice(6).total : 0;

        if (crit2) {
            baseDamage *= 2;
            extraHex *= 2;
            extraHexWarrior *= 2;
        }

        totalDamage += baseDamage + extraHex + extraHexWarrior;
        breakdown += `Second Weapon: ${baseRoll.rolls} + 3 ${crit2 ? "(Doubled) " : ""}+ ${extraHex} (Hex) + ${extraHexWarrior} (Hex Warrior) = ${baseDamage + extraHex + extraHexWarrior} <br>`;
        document.getElementById("weapon2Result").innerText = `Damage: ${baseDamage + extraHex + extraHexWarrior}`;
    }

    // Sneak Attack Damage Calculation
    if (sneakAttack) {
        let sneakRoll = rollDice(6, 3);
        let sneakDamage = sneakRoll.total;
        if (crit1 || crit2) {
            sneakDamage *= 2;
        }
        totalDamage += sneakDamage;
        breakdown += `Sneak Attack: ${sneakRoll.rolls} = ${sneakDamage} <br>`;
    }

    document.getElementById("totalDamage").innerText = totalDamage;
    document.getElementById("calculationBreakdown").innerHTML = breakdown;
});
