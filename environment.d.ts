declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        DB_MONGO: "string";
      }
    }
  }
  
  export {};