export default interface Player {
    id: number;
    nickname: string;
    wins: number;
    loses: number;
    winStreak: number;
    lastSeen: number;
}