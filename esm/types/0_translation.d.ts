import { Api } from "../2_tl.js";
export interface Translation {
    key: string;
    value: string;
    one?: string;
    zero?: string;
    two?: string;
    few?: string;
    many?: string;
}
export declare function constructTranslation(langPackString: Api.LangPackString): Translation;
//# sourceMappingURL=0_translation.d.ts.map