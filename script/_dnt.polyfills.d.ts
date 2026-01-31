declare global {
    interface PromiseConstructor {
        withResolvers<T>(): {
            promise: Promise<T>;
            resolve: (value: T | PromiseLike<T>) => void;
            reject: (reason?: any) => void;
        };
    }
}
declare global {
    interface ArrayConstructor {
        fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | Promise<T>> | ArrayLike<T | Promise<T>>): Promise<T[]>;
        fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>) => U, thisArg?: any): Promise<Awaited<U>[]>;
    }
}
export {};
declare global {
    interface Error {
        cause?: unknown;
    }
}
export {};
import { createRequire } from "node:module";
import { type URL } from "node:url";
declare global {
    interface ImportMeta {
        url: string;
        resolve(specifier: string, parent?: string | URL | undefined): string;
        main: boolean;
        filename: string;
        dirname: string;
    }
}
type NodeRequest = ReturnType<typeof createRequire>;
type NodeModule = NonNullable<NodeRequest["main"]>;
interface ImportMetaPonyfillCommonjs {
    (require: NodeRequest, module: NodeModule): ImportMeta;
}
interface ImportMetaPonyfillEsmodule {
    (importMeta: ImportMeta): ImportMeta;
}
interface ImportMetaPonyfill extends ImportMetaPonyfillCommonjs, ImportMetaPonyfillEsmodule {
}
export declare let import_meta_ponyfill_commonjs: ImportMetaPonyfillCommonjs;
export declare let import_meta_ponyfill_esmodule: ImportMetaPonyfillEsmodule;
export declare let import_meta_ponyfill: ImportMetaPonyfill;
//# sourceMappingURL=_dnt.polyfills.d.ts.map