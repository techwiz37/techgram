// Copyright 2018-2025 the Deno authors. MIT license.
// This module is browser compatible.
export var SeekMode;
(function (SeekMode) {
    SeekMode[SeekMode["Start"] = 0] = "Start";
    SeekMode[SeekMode["Current"] = 1] = "Current";
    SeekMode[SeekMode["End"] = 2] = "End";
})(SeekMode || (SeekMode = {}));
