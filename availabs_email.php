<?php
$from = $_POST['from'];
$message = $_POST['message'];



	$to = "am3081@gmail.com,lawsonc@albany.edu,mwolkoff@albany.edu";
	$subject = "avalabs.org Contact";
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
	$headers .= "From:".$from . "\r\n";

	if(mail($to,$subject,$message.' from:'.$from,$headers,"-f website@availabs.org")){
 		$output['mail'] = 1;
 		mail("am3081@gmail.com",$subject,$message,$headers,"-f website@availabs.org");

	}
	else{
		$output['mail'] = 0;
		$output['mail_error'] =error_get_last();
		$output['mailto'] = $to;
		$output['mailsubject'] = $subject;
		$output['mailmessage'] = $message;
		$output['headers'] = $headers;
	}
echo 'mail sent';
?>