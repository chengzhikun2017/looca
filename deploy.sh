#!/usr/bin/expect -f  
  set user root  
  set host 118.31.42.82
  set password Yfz\;Zdxu4l0Uop\$sfU3Ty
  set timeout -1  
   
  spawn ssh $user@$host  
  expect "*assword:*"  
  send "$password\r"  
  interact  
  expect eof  