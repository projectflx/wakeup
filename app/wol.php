<?php
    /*
        function for sending a magic packet to a device specifying the MAC-address

    */
    function WakeOnLan($mac_address) {
        // Check if the MAC address is valid
        if(extension_loaded('sockets')) {
            if(preg_match('/^([a-fA-F0-9]{2}:){5}[a-fA-F0-9]{2}$/',$mac_address)) {
                // Remove unwanted chars and convert to binary
                $binaryMAC = pack('H12', str_replace(':','', $mac_address));

                // Build packet
                $magicPacket = str_repeat(chr(0xff), 6).str_repeat($binaryMAC, 16);

                //if (!$socket = fsockopen('udp://255.255.255.255', 40000, $errno, $errstr, 2)) {
                if (!$socket = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP)) {
                    // Opening the UDP socket was not successful
                    return 'Opening the UDP socket was not successful: Error ' . socket_last_error($socket) . '. ' . socket_strerror(socket_last_error($socket));
                }

                if($socket_options = socket_set_option($socket, SOL_SOCKET, SO_BROADCAST, 1) < 0) {
                    return 'Setting the socket options failed. ' . socket_strerror($socket_options);
                }

                if(socket_sendto($socket, $magicPacket, strlen($magicPacket), 0, '255.255.255.255', 40000) == -1) {
                    return 'Error while sending the packet.';
                }
                return 0;
            } else {
                // error code for an invalid MAC
                return 'The MAC address entered is invalid.';
            }
        } else {
            return 'Needed extension \'sockets\' is not enabled.';
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