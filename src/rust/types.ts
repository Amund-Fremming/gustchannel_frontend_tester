export type Primitive = number | string | boolean;

export interface Payload<Primitive> {
    function_name: string,
    params: Primitive[]
}