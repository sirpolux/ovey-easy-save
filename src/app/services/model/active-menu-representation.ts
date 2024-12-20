export interface ActiveMenuRepresentation {
    [key: string]: boolean | undefined; // Allows indexing with strings
    login?: boolean;
    dashboard?: boolean;
    signUp?: boolean;
    logout?: boolean;
    transaction?: boolean;
    client?: boolean;
    loggedIn?: boolean;
  }
  