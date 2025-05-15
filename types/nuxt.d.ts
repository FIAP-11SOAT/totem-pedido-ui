import type { ApiClient } from '~/plugins/client-api.client';

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
