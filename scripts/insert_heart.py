from pathlib import Path

p = Path(r"c:\Users\ADMIN\Desktop\project kollection\clothing_folder\women.html")
text = p.read_text(encoding='utf-8')
text = text.replace('data-product-price="1000"></button>', 'data-product-price="1000">\u2764</button>')
p.write_text(text, encoding='utf-8')
print('Inserted heart into wishlist buttons')
