<?php
    /*
        function for sending a magic packet to a device specifying the MAC-address

    */
    function WakeOnLan($mac_address) {
        // Check if the MAC address is valid
        if(preg_match('/^([a-fA-F0-9]{2}:){5}[a-fA-F0-9]{2}$/',$mac_address)) {
            // Remove unwanted chars and convert to binary
            $binaryMAC = pack('H12', str_replace(':','', $mac_address));

            // Build packet
            $magicPacket = str_repeat(chr(0xff), 6).str_repeat($binaryMAC, 16);

            if (!$socket = fsockopen('udp://255.255.255.255', 40000, $errno, $errstr, 2)) {
                // Opening the UDP socket was not successful
                return 'Opening the UDP socket was not successful';
             }

             // Write packet to the stream and close it
             fputs($socket, $magicPacket);
             fclose($socket);
             return 0;
        } else {
            // error code for an invalid MAC
            return 'The MAC address entered is invalid.';
        }
    }

    // Check if the information needed to call the function is present
    if (isset($_POST['MAC'])) {
        echo WakeOnLan($_POST['MAC']);
    } else {
        // error code for the information not handed over to the function
        echo 'POST value \'MAC\' not set.';
    }
 ?>