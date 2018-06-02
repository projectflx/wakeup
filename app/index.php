<!DOCTYPE html>
<html lang="en">
<head>
	<!-- meta -->
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">

	<!-- favicon -->
	<link rel="icon" type="image/png" href="img/favicon.png" sizes="128x128">

	<!-- CSS -->
	<link rel="stylesheet" href="css/normalize.css">
	<link rel="stylesheet" href="css/bootstrap.css">
	<link rel="stylesheet" href="css/animate.css">
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/colors.css">

	<title>WakeUp!</title>
</head>
<body>
	<!-- JS -->
	<script src="js/jquery.js"></script>
	<script src="js/bootstrap.js"></script>
	<script src="js/bootstrap-notify.js"></script>
	<script src="js/script.js"></script>
	
	<!-- content -->
	<div id="banner">
		<a href="index.php" id="logo">
			<img src="img/logo.png">
		</a>
	</div>
	<div id="content">
		<?php

			const file_name_devicesini = 'devices.ini';

			// function for printing a device card
			function printDevice($device, $mac) {
				echo '<div class="card">';
				echo '	<div class="wolpanel" onclick="wakeUpWithWOL(\'' . $device . '\',\'' . $mac . '\')">';
				echo '		<div class="infopanel" >';
				echo '			<b>' . $device . '</b><br />';
				echo '			' . $mac . '</div>';
				echo '		</div>';
				echo '	</div>';
			}

			// function for printing a group container with devices in it
			function printDeviceGroup($array, $title) {
				$subkeylist = array_keys($array);

				echo '<div class="groupcontainer">';
				echo '<div class="grouptitle">' . $title . '</div>';

				foreach($subkeylist as $subdevice) {
					printDevice($subdevice, $array[$subdevice]);
				}

				echo '	</div>';
			}

			// function for displaying an error message
			function printErrorMessage($error_message) {
				echo '<div class="card">';
				echo '	<div class="wolpanel">';
				echo '		<div class="infopanel" >';
				echo '			<b>' . $error_message . '</b>';
				echo '		</div>';
				echo '	</div>';
			}

			if(file_exists(file_name_devicesini)) {

				$devices = parse_ini_file(file_name_devicesini, TRUE);
				$keylist = array_keys($devices);
				
				foreach($keylist as $device) {
					if(is_array($devices[$device])) {
						printDeviceGroup($devices[$device], $device);
					} else {
						printDevice($device, $devices[$device]);
					}
				}
			} else {
				printErrorMessage('No devices.ini found.');
			}
		?>
	</div>
</body>
</html>