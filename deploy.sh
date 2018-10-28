#!/usr/bin/expect -f  
set user root  
set host 118.31.42.82
set password Yfz\;Zdxu4l0Uop\$sfU3Ty
set timeout -1  
 
spawn ssh $user@$host  
expect "*assword:*"  
send "$password\r"  
interact  

# rm -r -f dist_crm_test/crm
# spawn cp -r dist_crm_test deployCache/crm_test
# spawn scp dist_crm_test/crm $user@$host:/data/wwwroot/default/crm
# expect "*password:*"
# send "$password\r"
# interact

# echo "-------deploy completed----------"
  # expect eof  











  # Yfz;Zdxu4l0Uop$sfU3Ty
  # 
  # 测试服：目前用一分钟的服务器
# 118.31.42.82
# root
# Yfz;Zdxu4l0Uop$sfU3Ty

# 目录：/data/wwwroot/default/fx
# CRM API地址：http://118.31.42.82/api/


#############################################################################

# 正式服：
# 47.244.46.33
# root
# 54aS@es&9EQc22%ws@!

# CRM网址：https://crm.looco8.com
# CRM目录：/data/wwwroot/crm.looco8.com
# CRM资源加速域名：https://looco-crm-1251098434.file.myqcloud.com/
# CRM API地址：https://crm.looco8.com/api/

# 官网网址：https://www.looco8.com
# 官网目录：/data/wwwroot/www.looco8.com
# 官网资源加速域名：https://looco-1251098434.file.myqcloud.com/

