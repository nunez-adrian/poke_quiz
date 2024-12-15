export interface Pokemon {
    id: number;
    name: string;
    types: {
        slot: number;
        type: { 
            name: string;
        } 
    }[];
    sprites: {
        front_default: string;
        back_default: string;
    };
    cries: {
        latest: string;
    };
}