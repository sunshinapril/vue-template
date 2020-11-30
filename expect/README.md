## 使用指南

1. 将当前目录 /expect 拷贝到需要上传的项目的根目录下

2. 修改文件的执行权限, 在项目根目录下执行:
```
	chmod 775 ./expect/sftp.expect ./expect/ssh.expect
```

3. 在 package.json `npm run build` 中添加执行语句, 如下:
```
"build": "xxx && ./expect/sftp.expect && ./expect/ssh.expect",
```

4. 修改expect 配置, 在 sftp.expect 和 ssh.expect 中找到 ##need-config 标记,
将 remote_machine_name 修改为 需要上传的服务器名称;
将 appname 修改为在服务器上, 最终希望使用的目录名称;


如此这般, 在下次执行 `npm run build` 的时候, 就会自动打包, 上传, 解压.

5. ⚠️修改脚本注意事项：

   expect "*${remote_machine_name}*"
   send "rm -rf /opt/tigerye/frontend/${appname}\r"

   expect语句和send语句必须成对出现

   