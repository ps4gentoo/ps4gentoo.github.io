import sys
import socket
import os
from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer
from rich.console import Console
from rich.panel import Panel
from rich.text import Text
import json
from datetime import datetime
import hashlib
import urllib.request
import re

console = Console()

# ... (بقیه توابع شما مثل get_machine_ip و create_manifest بدون تغییر باقی می‌مانند) ...
# START: Configuration for manifest generation - NO CHANGE
EXCLUDED_DIRS = {'.venv', '.git', 'noneed'}
EXCLUDED_EXTENSIONS = {
    '.bat', '.txt', '.exe', '.mp4', '.py', '.bak', '.zip',
    '.mp3', '.sh', '.h', '.c', '.o', '.ld', '.md', '.d'
}
EXCLUDED_FILES = {'.gitignore', 'COPYING', 'LICENSE', 'MAKEFILE', 'dockerfile'}
OUTPUT_FILE = 'PSFree.manifest'

def get_machine_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = '127.0.0.1'
    finally:
        s.close()
    return ip

def is_docker():
    if os.path.exists('/.dockerenv'):
        return True
    try:
        with open('/proc/1/cgroup', 'rt') as f:
            return 'docker' in f.read() or 'kubepods' in f.read()
    except Exception:
        return False

def get_host_ip():
    try:
        host_ip = socket.gethostbyname('host.docker.internal')
        return host_ip
    except socket.error:
        return 'Could not determine host IP'

def get_ipv4():
    if is_docker():
        ip = get_host_ip()
        if ip:
            print(f"Running inside Docker. Host IPv4: {ip}")
        else:
            print("Running inside Docker, but could not resolve host.docker.internal.")
    else:
        ip = get_machine_ip()
        print(f"Not in Docker. Machine IPv4: {ip}")
    return ip

def create_manifest():
    root_dir = os.path.dirname(os.path.abspath(__file__))
    manifest_path = os.path.join(root_dir, OUTPUT_FILE)
    with open(manifest_path, 'w', encoding='utf-8') as f:
        f.write("CACHE MANIFEST\n")
        f.write(f"# v1\n")
        f.write(f"# Generated on {datetime.now()}\n\n")
        f.write("CACHE:\n")
        for dirpath, dirnames, filenames in os.walk(root_dir):
            dirnames[:] = [d for d in dirnames if d not in EXCLUDED_DIRS]
            for filename in filenames:
                filepath = os.path.join(dirpath, filename)
                relpath = os.path.relpath(filepath, root_dir)
                ext = os.path.splitext(filename)[1].lower()
                if (ext in EXCLUDED_EXTENSIONS or
                    filename in EXCLUDED_FILES or
                    filename == OUTPUT_FILE):
                    continue
                f.write(f"{relpath.replace(os.sep, '/')}\n")
        f.write("\nNETWORK:\n")
        f.write("*\n")
# END: Configuration for manifest generation - NO CHANGE


# --- START: بخش جدید و اصلاح شده برای حل مشکل MIME Type ---
class CustomHandler(SimpleHTTPRequestHandler):
    # اضافه کردن نوع جدید به لیست شناسایی سرور
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        '.mjs': 'application/javascript',
    }

    def do_POST(self):
        if self.path == '/generate_manifest':
            try:
                create_manifest()
                response = {
                    'status': 'success',
                    'message': f'{OUTPUT_FILE} created successfully.\nThe cache has been updated, Please refresh the page.'
                }
                self.send_response(200)
            except Exception as e:
                response = {
                    'status': 'error',
                    'message': f"{str(e)}\nThis option only works on local server!\nPlease make sure your server is up."
                }
                self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response).encode('utf-8'))

        elif self.path == '/update_exploit':
            # ... (بقیه کد POST شما بدون تغییر باقی می‌ماند) ...
            root_dir = os.path.abspath(os.path.dirname(__file__))
            files_to_update = [
                ("psfree/lapse.mjs", "https://raw.githubusercontent.com/Nazky/PSFree/refs/heads/main/psfree/lapse.mjs"),
                ("psfree/psfree.mjs", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/psfree.mjs"),
                ("psfree/config.mjs", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/config.mjs"),
                ("psfree/send.mjs", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/send.mjs"),
                ("psfree/kpatch/700.bin", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/kpatch/700.bin"),
                ("psfree/kpatch/750.bin", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/kpatch/750.bin"),
                ("psfree/kpatch/800.bin", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/kpatch/800.bin"),
                ("psfree/kpatch/850.bin", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/kpatch/850.bin"),
                ("psfree/kpatch/900.bin", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/kpatch/900.bin"),
                ("psfree/kpatch/903.bin", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/kpatch/903.bin"),
                ("psfree/kpatch/950.bin", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/kpatch/950.bin"),
                ("psfree/rop/ps4/700.mjs", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/rop/ps4/700.mjs"),
                ("psfree/rop/ps4/750.mjs", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/rop/ps4/750.mjs"),
                ("psfree/rop/ps4/800.mjs", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/rop/ps4/800.mjs"),
                ("psfree/rop/ps4/850.mjs", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/rop/ps4/850.mjs"),
                ("psfree/rop/ps4/900.mjs", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/rop/ps4/900.mjs"),
                ("psfree/rop/ps4/950.mjs", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/rop/ps4/950.mjs"),
                ("psfree/module/chain.mjs", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/module/chain.mjs"),
                ("psfree/module/constants.mjs", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/module/constants.mjs"),
                ("psfree/module/int64.mjs", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/module/int64.mjs"),
                ("psfree/module/mem.mjs", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/module/mem.mjs"),
                ("psfree/module/memtools.mjs", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/module/memtools.mjs"),
                ("psfree/module/offset.mjs", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/module/offset.mjs"),
                ("psfree/module/rw.mjs", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/module/rw.mjs"),
                ("psfree/module/utils.mjs", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/module/utils.mjs"),
                ("psfree/module/view.mjs", "https://github.com/Nazky/PSFree/raw/refs/heads/main/psfree/module/view.mjs")
            ]
            results = []

            def is_mjs_file(filename):
                return filename.lower().endswith('.mjs')

            for local_rel_path, url in files_to_update:
                try:
                    abs_local_path = os.path.abspath(os.path.join(root_dir, local_rel_path))
                    if not abs_local_path.startswith(root_dir):
                        raise ValueError(f"Invalid path {local_rel_path}")
                    try:
                        with urllib.request.urlopen(url) as response:
                            raw_data = response.read()
                    except Exception as download_error:
                        results.append(f"{local_rel_path}: download failed ({download_error})")
                        continue
                    new_data = raw_data
                    old_data = b""
                    if os.path.exists(abs_local_path):
                        with open(abs_local_path, 'rb') as f:
                            old_data = f.read()
                    os.makedirs(os.path.dirname(abs_local_path), exist_ok=True)
                    with open(abs_local_path, 'wb') as f:
                            f.write(new_data)
                    results.append(f"{local_rel_path}: updated")
                except Exception as e:
                    results.append(f"{local_rel_path}: error ({e})")

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'results': results}).encode('utf-8'))

        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')
# --- END: بخش جدید ---


PORT = 52721
IP = get_ipv4()

if len(sys.argv) > 1:
    try:
        PORT = int(sys.argv[1])
    except ValueError:
        console.print("[bold red]Usage:[/] python serve.py [port]", style="red")
        sys.exit(1)



console.print(Panel(Text("Simple Python HTTP Server", style="bold white on blue"),
                    subtitle="Press [bold yellow]Ctrl+C[/] to stop the server", expand=False))

console.print(
    f"[green]Server is running![/]\n"
    f"Listening on [bold magenta]http://{IP}:{PORT}[/]\n",
    style="bold",
)

try:
    # این خط هم باید تغییر کند تا از CustomHandler جدید استفاده شود
    with TCPServer(("0.0.0.0", PORT), CustomHandler) as httpd:
        httpd.serve_forever()
except KeyboardInterrupt:
    console.print("\n[bold red]Server stopped by user.[/]")
except OSError as e:
    console.print(f"[bold red]Error:[/] {e}")