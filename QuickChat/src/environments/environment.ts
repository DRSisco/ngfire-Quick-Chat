// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBkq_hURDn3RX1sOywFudRpgL66byWD8mY",
    authDomain: "siscodr-quick-chat.firebaseapp.com",
    databaseURL: "https://siscodr-quick-chat.firebaseio.com",
    projectId: "siscodr-quick-chat",
    storageBucket: "siscodr-quick-chat.appspot.com",
    messagingSenderId: "246622543583"
  }
};
