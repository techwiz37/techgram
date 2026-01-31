import { constructMessageEntity } from "./2_message_entity.js";
export function constructPollOption(option, results) {
    const result = results.find((v) => v.option.every((v, i) => option.option[i] === v));
    return {
        text: option.text.text,
        entities: option.text.entities?.map(constructMessageEntity).filter((v) => v !== null),
        voterCount: result?.voters ?? 0,
        isChosen: result?.chosen ?? false,
    };
}
