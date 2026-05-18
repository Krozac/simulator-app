export type item = {
    id: string;
    filename: string;
    description : string;
    description_en : string;
    dependencies : string[];
}

type entity = item

type system = item

type component = item

export type option = {
    id: string;
    type: "range" | "checkbox";
    label: string;
    min?: number;
    max?: number;
    step?   : number;
    default : number;
    locked: boolean;
}

type ecsData ={
    entities: entity[];
    systems: system[];
    components: component[];
    options : option[];
}

export type Sim = {
    id:string;
    title: string;
    link: string;
    datalink :string;
    ecsData:ecsData |null;
    description:string;
};
