import React, { memo } from "react";
import { areEqual } from "utils/equalityChecks";

const LocationContainer = () => <div>text</div>;

const LocationContainerMemo = memo(LocationContainer, areEqual);

export { LocationContainerMemo as LocationContainer };
