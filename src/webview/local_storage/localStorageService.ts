"use strict";

import { Memento } from "vscode";

class LocalStorageService {
    constructor(private storage: Memento) {}

    public getValue<T>(key: string): T {
        return this.storage.get<T>(key, null!);
    }

    public setValue<T>(key: string, value: T) {
        this.storage.update(key, value);
    }
}

export default LocalStorageService;
