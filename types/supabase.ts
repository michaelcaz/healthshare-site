export type Database = {
  auth: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
}; 