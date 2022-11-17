enum GameStatus {
    UNKNOWN,
    CONNECTING = "Connecting to game server...",
    CONNECTED = "Connected",
    SEARCHING = "Searching for game...",
    GAME_START = "game_start",
    GAME_STOP = "game_stop",
    FAILED = "Ups! Failed connecting to server"
}

export default GameStatus;