import { readSetting } from "./action/read-setting";

import { upsertDefaultRoom } from "./action/upsert/upsert-default-room";
import { upsertColor } from "./action/upsert/upsert-color";
import { upsertShowPoint } from "./action/upsert/upsert-show-point";

import { upsertDefaultUsers } from "./action/upsert/upsert-default-custom-room/users";
import { upsertDefaultInitialPoint } from "./action/upsert/upsert-default-custom-room/initialPoint";
import { upsertDefaultReturnPoint } from "./action/upsert/upsert-default-custom-room/returnPoint";
import { upsertDefaultBonusPoint } from "./action/upsert/upsert-default-custom-room/bonusPoint";
import { upsertDefaultScoreRate } from "./action/upsert/upsert-default-custom-room/scoreRate";
import { upsertDefaultChipRate } from "./action/upsert/upsert-default-custom-room/chipRate";

export { readSetting };
export { upsertDefaultRoom, upsertColor, upsertShowPoint };
export {
  upsertDefaultUsers,
  upsertDefaultInitialPoint,
  upsertDefaultReturnPoint,
  upsertDefaultBonusPoint,
  upsertDefaultScoreRate,
  upsertDefaultChipRate,
};
