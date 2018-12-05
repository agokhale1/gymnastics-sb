// Based on code from: https://stackoverflow.com/questions/44150172/where-to-save-global-settings-in-angular-4

export interface Config {
    apiUrl: string;
    minUsernameLength: number;
    minPasswordLength: number;
}

export let config: Config;

config = {
    // apiUrl: 'http://localhost:8080/api/api.php'
    apiUrl: 'https://gymscoreboard.tk/api',
    minUsernameLength: 3,
    minPasswordLength: 6
};
