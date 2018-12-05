// Based on code from: https://stackoverflow.com/questions/44150172/where-to-save-global-settings-in-angular-4

export interface Config {
    apiUrl: string;
}

export let config: Config;

if (process.env.NODE_ENV === 'production') {
    config = {
        apiUrl: 'http://gymscoreboard.tk/api'
    };

    console.log('Running with prod environment');
} else {
    config = {
        apiUrl: 'http://gymscoreboard.tk/api'
    };

    console.log('Running with dev environment');
}
