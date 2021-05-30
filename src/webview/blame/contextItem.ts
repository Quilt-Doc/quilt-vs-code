import BlameChunk from "./blameChunk";

export default interface ContextItem {
    _id: string;
    chunks: BlameChunk[];
}
