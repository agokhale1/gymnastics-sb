<?php
    abstract class ApiMode {
        const __default = self::Prod;

        const Dev = 0;
        const Prod = 1;
    }

    // Turn on/off debug mode
    $mode = ApiMode::Dev;

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL & ~E_NOTICE & ~E_STRICT & ~E_DEPRECATED);
?>