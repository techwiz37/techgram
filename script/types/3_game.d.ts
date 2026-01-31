import { Api } from "../2_tl.js";
import { type Animation } from "./1_animation.js";
import { type Photo } from "./1_photo.js";
import type { MessageEntity } from "./2_message_entity.js";
export interface Game {
    title: string;
    description: string;
    photo: Photo;
    text?: string;
    textEntities?: MessageEntity[];
    animation?: Animation;
}
export declare function constructGame(media_: Api.messageMediaGame): Game;
//# sourceMappingURL=3_game.d.ts.map