from pathlib import Path
import re

path = Path(r"c:\Users\ADMIN\Desktop\project kollection\clothing_folder\women.html")
text = path.read_text(encoding='utf-8')

current_idx = None
out_lines = []
for line in text.splitlines(True):
    m = re.search(r'data-product-id="women-(\d+)"', line)
    if m:
        current_idx = m.group(1)

    if current_idx and 'data-product-name=' in line:
        line = re.sub(r'data-product-name="[^"]*"', f'data-product-name="Women Dress {current_idx}"', line)

    if current_idx and '<h3>' in line:
        line = re.sub(r'<h3>.*?</h3>', f'<h3>Women Dress {current_idx}</h3>', line)

    out_lines.append(line)

path.write_text(''.join(out_lines), encoding='utf-8')
print('Updated titles in women.html')
