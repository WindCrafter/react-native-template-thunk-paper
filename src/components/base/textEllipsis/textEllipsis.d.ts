import DefaultIos from './textEllipsis.base.ios';
import * as ios from './textEllipsis.base.ios';
import DefaultAndroid from './textEllipsis.base.android';
import * as android from './textEllipsis.base.android';

declare var _test: typeof ios;
declare var _test: typeof android;

declare var _testDefault: typeof DefaultIos;
declare var _testDefault: typeof DefaultAndroid;

export * from './textEllipsis.base.ios';

const BTextEllipsis = DefaultIos;
export default BTextEllipsis;
