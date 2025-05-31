import type { ApiClient } from '~/plugins/client-api.sclient';

declare module '#app' {
  interface NuxtApp {
    $api: ApiClient;
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: ApiClient;
  }
}
