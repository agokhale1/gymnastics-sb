// Based on code from: https://stackoverflow.com/questions/44150172/where-to-save-global-settings-in-angular-4

export interface Config {
    apiUrl: string;
}

export let config: Config;

config = {
    // apiUrl: 'http://localhost:8080/api/api.php'
    apiUrl: 'http://gymscoreboard.tk/api'
};
