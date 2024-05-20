import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'TuneBytes',
  webDir: 'dist',
  plugins:{
    CapasitorHttp:{
      enabled: true
    },
  },

  server:{
    androidScheme: 'http',
    cleartext: true,
    allowNavigation:["http://54.233.215.80:3000/*"],
  },

};

export default config;
