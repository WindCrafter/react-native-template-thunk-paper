"use strict";

import { timer } from "./helpers";
import { globalApp } from "./logs";

export function customLogger({ dispatch, getState }) {
  try {
    return next => action => {
      const enableLog = (globalApp.customLog && globalApp.customLog.enableLog) || false;
      if (!enableLog) return next(action);

      const logBuffer: any[] = [];
      const logEntry: any = {};

      logBuffer.push(logEntry);
      logEntry.started = timer.now();
      logEntry.startedTime = new Date();
      logEntry.prevState = getState();
      logEntry.action = action;
      logEntry.took = timer.now() - logEntry.started;
      logEntry.nextState = getState();

      if (globalApp.customLog) {
        globalApp.customLog.emitEvent({ type: "redux", logBuffer });
      }

      return next(action);
    };
  } catch (e) {
    return next => action => next(action);
  }
}
