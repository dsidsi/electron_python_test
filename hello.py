# send_hello.py

import sys

def main():
    print("hello world")
    sys.stdout.flush()  # 刷新输出，确保数据立即传递给主进程

if __name__ == "__main__":
    main()
