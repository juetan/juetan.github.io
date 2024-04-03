
nginx_url = "http://nginx.org/download/nginx-1.18.0.tar.gz"
nginx_temp = "/temp/"
nginx_path = "/usr/local/nginx"

echo "[1]: 检查网络情况"
ping -c 1 114.114.114.114
if [ $? -ne 0 ]; then
    echo "网络不通，请检查网络"
    exit 1
fi

echo "[2]: 检查是否为root用户"
if [ $(id -u) != "0" ]; then
    echo "请使用root用户执行此脚本"
    exit 1
fi

echo "[3]: 检查是否已安装nginx"
if [ -f "$nginx_path/sbin/nginx" ]; then
    echo "nginx已安装，请先卸载"
    exit 1
fi

echo "[4]: 安装所需依赖"
apt install -y gcc gcc-c++

echo "[5]: 下载nginx"
wget $nginx_url -P $nginx_temp
if [ $? -ne 0]; then
    echo "下载nginx失败"
    exit 1
fi

echo "[6]: 解压nginx"
tar -zxvf $nginx_temp/nginx-1.20.1.tar.gz -C $nginx_temp
if [ $? -ne 0]; then
    echo "解压nginx失败"
    exit 1
fi

echo "[7]: 生成编译配置"
cd $nginx_temp/nginx-1.20.1
./configure --prefix=/usr/local/nginx
if [ $? -ne 0]; then
    echo "生成编译配置失败"
    exit 1
fi

echo "[8]: 编译nginx"
make
if [ $? -ne 0]; then
    echo "编译nginx失败"
    exit 1
fi

echo "[9]: 安装nginx"
make install
if [ $? -ne 0]; then
    echo "安装nginx失败"
    exit 1
fi

echo "安装完成，运行 /usr/local/nginx/sbin/nginx -t 测试配置"