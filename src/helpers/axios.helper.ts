/**
 * @author Tran Ba Phuc
 * @param errorData
 * @returns
 */
export function getErrorMessage(errorData) {
  let message = errorData.message;
  if (errorData.fieldErrors) {
    errorData.fieldErrors.forEach((fErr) => {
      message += `\nfield: ${fErr.field},  Object: ${fErr.objectName}, message: ${fErr.message}\n`;
    });
  }
  return message;
}


// Middleware function definition
export default function errorMiddleware() {
  // Returns the next middleware function
  return (next) => {
    // Returns the actual middleware function that handles the action
    return (action) => {
      /**
       * The error middleware serves to log error messages from dispatch.
       * It need not run in production.
       */

      // Only run this middleware in development mode
      if (__DEV__) {
        try {
          // Attempt to execute any code within this block (currently empty)
        } catch (e) {
          // Handle any errors thrown in the try block (currently empty)
        }

        // Destructure error from the action object
        const { error } = action;

        // If there is an error, handle it
        if (error) {
          console.log(`${action.type} caught at middleware with reason: ${JSON.stringify(error.message)}.`);

          try {
            // Attempt to parse the error message as JSON and extract the first message
            action.error.message = JSON.parse(error.message)[0].message;
          } catch (e) {
            // If parsing fails, use the original error message
            action.error.message = error.message;
          }

          // Assign the message back to the error object
          action.error.message = action.error.message;

          // Further check if the error has a response and extract a detailed message
          if (error && typeof error.response !== "undefined") {
            if (typeof error.response.data !== "undefined") {
              const message = getErrorMessage(error.response.data);
              action.error.message = message || "";
            }
          }
        }
      }

      // Pass the action to the next middleware or reducer
      return next(action);
    };
  };
};
