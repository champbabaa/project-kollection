from pathlib import Path
import re

path = Path(r"c:\Users\ADMIN\Desktop\project kollection\clothing_folder\women.html")
text = path.read_text(encoding='utf-8')

text = re.sub(r"addToCart\('women-(\d+)',\s*'[^']*'", lambda m: f"addToCart('women-{m.group(1)}', 'Women Dress {m.group(1)}'", text)

path.write_text(text, encoding='utf-8')
print('Updated addToCart call titles in women.html')
