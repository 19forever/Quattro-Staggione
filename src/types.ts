export type SeasonId = 'jaro' | 'leto' | 'podzim' | 'zima';

export interface SeasonInfo {
  id: SeasonId;
  name: string;
  icon: string;
  colorClass: string;
  bgClass: string;
  accentColor: string;
  textColor: string;
  borderColor: string;
  description: string;
  
  // 1. Priroda a plodiny
  nature: {
    title: string;
    description: string;
    items: {
      name: string;
      description: string;
      icon: string;
      fact: string;
    }[];
  };

  // 2. Typicke cinnosti a hry
  activities: {
    title: string;
    description: string;
    items: {
      name: string;
      description: string;
      icon: string;
    }[];
  };

  // 3. Tradice a svatky
  traditions: {
    title: string;
    description: string;
    items: {
      name: string;
      date?: string;
      description: string;
      icon: string;
    }[];
  };

  // 4. Co si vzit na sebe
  clothing: {
    title: string;
    description: string;
    recommended: string[]; // list of clothing item IDs that are suitable
  };
}

export interface ClothingItem {
  id: string;
  name: string;
  icon: string; // lucide icon name
  category: 'head' | 'body' | 'legs' | 'shoes' | 'accessory';
  seasons: SeasonId[];
}
