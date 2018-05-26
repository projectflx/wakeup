<?php
    /*
        function for sending a magic packet to a device specifying the MAC-address

    */
    function WakeOnLan($mac_address) {
        // Check if the MAC address is valid
        if(preg_match('/([a-fA-F0-9]{2}[:|\-]?){6}/',$mac_address)) {
            // Check the OS the webserver is run on (must be linux at the moment)
            if (strtoupper(substr(PHP_OS, 0, 3)) <> 'WIN' and strtoupper(PHP_OS) <> 'DARWIN') {
                $exec_string = 'wol ' . $mac_address;
                exec($exec_string, $output, $return);
                return $output;
            } else {
                //error code for a OS mismatch
                return -2;
            }
        } else {
            // error code for an invalid MAC
            return -1;
        }
    }

    // Check if the information needed to call the function is present
    if (isset($_POST['MAC'])) {
        echo WakeOnLan($_POST['MAC']);
    } else {
        // error code for the information not handed over to the function
        echo -3;
    }
 ?>