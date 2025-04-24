export class Fan {
    constructor(
      public id: number,
      public name: string,
      public favoritePlayer?: string
    ) {}
  
    static fromTelegram(user: any): Fan {
      return new Fan(user.id, user.first_name);
    }
  }
  