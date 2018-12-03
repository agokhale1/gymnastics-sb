<?php
    abstract class ApiMode {
        const DebugQueries = -1;
        const Debug = 0;
        const Dev = 1;
        const Prod = 2;
    }

    // Turn on/off debug mode
    $mode = ApiMode::Dev;

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL & ~E_NOTICE & ~E_STRICT & ~E_DEPRECATED);
?>