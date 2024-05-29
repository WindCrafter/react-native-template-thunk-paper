import * as React from "react";

interface IGlobalHelperTyped {
  ViewShotRef: React.RefObject<any>;
}

export const ViewShotRef = React.createRef<any>();

const globalHelper: IGlobalHelperTyped = {
  ViewShotRef
};

export default globalHelper;
