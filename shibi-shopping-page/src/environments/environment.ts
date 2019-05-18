// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  API_KEY: '',
  API_URL: {
    //default: 'http://192.168.0.38:8080/',
    default: 'http://192.168.43.88:8080/',
    //default: 'http://192.168.0.103:8080/',
    store: 'stores',
    product: 'product',
    categories: 'category',
    shoppingCart: 'orderDetails'
  }
};
