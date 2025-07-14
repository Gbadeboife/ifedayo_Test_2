import React, { memo } from "react";

import { areEqual } from "utils/equalityChecks";

import { NoCompany } from "Components/SignIn/NoCompany";

const NoCompanyContainer = () => <NoCompany />;

const NoCompanyContainerMemo = memo(NoCompanyContainer, areEqual);

export { NoCompanyContainerMemo as NoCompany };
