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
		<a href="index.php" id="logo"><img src="img/favicon.png" height="32" width="32"></a>
	</div>
	<div id="content">
		<?php
			const file_name_devicesini = 'devices.ini';

			if(file_exists(file_name_devicesini)) {
				$devices = parse_ini_file(file_name_devicesini);
				$keylist = array_keys($devices);
				
				foreach($keylist as $device) {
					echo '<div class="card">';
					echo '	<div class="wolpanel" onclick="wakeUpWithWOL(\'' . $device . '\',\'' . $devices[$device] . '\')">';
					echo '		<div class="infopanel" >';
					echo '			<b>' . $device . '</b><br />';
					echo '			' . $devices[$device] . '</div>';
					echo '		</div>';
					echo '	</div>';
				}
			} else {
				echo '<div class="card">';
				echo '	<div class="wolpanel">';
				echo '		<div class="infopanel" >';
				echo '			<b>No devices.ini found.</b>';
				echo '		</div>';
				echo '	</div>';
			}
		?>
	</div>
</body>
</html>