export declare function setGatsbyPluginCache(plugin: {
    name: string;
    resolve: string;
}, module: string, moduleObject: any): void;
export declare function importGatsbyPlugin(plugin: {
    name: string;
    resolve: string;
    resolvedCompiledGatsbyNode?: string;
}, module: string): Promise<any>;
