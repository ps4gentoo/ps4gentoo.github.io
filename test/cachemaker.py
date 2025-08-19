import os
import time

WEB_EXTENSIONS = {
    ".html", ".css", ".js", ".mjs", ".jpg", ".jpeg", ".png", ".svg",
    ".ttf", ".woff", ".woff2", ".bin", ".ico", ".json", ".webp"
}

def is_web_file(file_path):
    _, ext = os.path.splitext(file_path.lower())
    return ext in WEB_EXTENSIONS

def generate_cache_manifest(directory=".", output_file="index.cache"):
    header = "CACHE MANIFEST\n# PS-Phive! For PS4 7.xx - 9.xx By Leeful, Nazky and Sinajet\n"
    timestamp = time.strftime("# %d/%m/%Y-%H:%M:%S", time.localtime()) + "\n\n"
    
    files = []
    
    for root, _, filenames in os.walk(directory):
        for filename in filenames:
            full_path = os.path.join(root, filename)
            rel_path = os.path.relpath(full_path, directory)
            rel_path = rel_path.replace("/", "\\")
            if is_web_file(rel_path):
                files.append(rel_path)
    
    files.sort()
    
    with open(output_file, "w") as f:
        f.write(header)
        f.write(timestamp)
        f.write("CACHE:\n")
        for file in files:
            f.write(file + "\n")
        f.write("\nNETWORK:\n*\n")
    
    print(f"Cache manifest '{output_file}' generated successfully with {len(files)} files!")

if __name__ == "__main__":
    generate_cache_manifest()