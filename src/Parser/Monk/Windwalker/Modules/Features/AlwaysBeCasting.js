import React from 'react';

import CoreAlwaysBeCasting from 'Parser/Core/Modules/AlwaysBeCasting';

import SPELLS from 'common/SPELLS';
import { formatPercentage } from 'common/format';
import { STATISTIC_ORDER } from 'Main/StatisticBox';

class AlwaysBeCasting extends CoreAlwaysBeCasting {
    // Windwalker GCD is 1 second by default and static in almost all cases, 750 is lowest recorded GCD
  static BASE_GCD = 1000;
  static MINIMUM_GCD = 750;
  static STATIC_GCD_ABILITIES = {
    // Channeled spells
    [SPELLS.FISTS_OF_FURY_CAST.id]: 1000,
    [SPELLS.CRACKLING_JADE_LIGHTNING.id]: 1000,

    // rotational:
    [SPELLS.BLACKOUT_KICK.id]: 1000,
    [SPELLS.RISING_SUN_KICK.id]: 1000,
    [SPELLS.TIGER_PALM.id]: 1000,
    [SPELLS.SPINNING_CRANE_KICK.id]: 1000,
    [SPELLS.TOUCH_OF_DEATH.id]: 1000,

    // talents: Whirling Dragon Punch, Chi Wave and Chi burst seemingly has haste-affected GCDs
    [SPELLS.LEG_SWEEP_TALENT.id]: 1000,
    [SPELLS.RING_OF_PEACE_TALENT.id]: 1000,
    [SPELLS.RUSHING_JADE_WIND_TALENT.id]: 1000,

    // utility:
    [SPELLS.PARALYSIS.id]: 1000,
    [SPELLS.EFFUSE.id]: 1000,
    [SPELLS.TRANSCENDENCE.id]: 1000,
    [SPELLS.TRANSCENDENCE_TRANSFER.id]: 1000,
    [SPELLS.FLYING_SERPENT_KICK.id]: 1000,
  };

  suggestions(when) {
    const deadTimePercentage = this.totalTimeWasted / this.owner.fightDuration;

    when(deadTimePercentage).isGreaterThan(0.2)
      .addSuggestion((suggest, actual, recommended) => {
        return suggest(<span>Your downtime can be improved. Try to Always Be Casting (ABC), try to reduce the delay between casting spells.</span>)
          .icon('spell_mage_altertime')
          .actual(`${formatPercentage(actual)}% downtime`)
          .recommended(`<${formatPercentage(recommended)}% is recommended`)
          .regular(recommended + 0.15).major(recommended + 0.2);
      });
  }

  statisticOrder = STATISTIC_ORDER.CORE(10);
}

export default AlwaysBeCasting;
