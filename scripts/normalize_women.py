from pathlib import Path
import re

women_path = Path(r"c:\Users\ADMIN\Desktop\project kollection\clothing_folder\women.html")
text = women_path.read_text(encoding='utf-8')

# Remove any existing normalize script block (if present)
marker = 'Normalize product cards so they all match the first card structure.'
if marker in text:
    start = text.index(marker)
    script_start = text.rfind('<script', 0, start)
    if script_start != -1:
        script_end = text.find('</script>', start)
        if script_end != -1:
            text = text[:script_start] + text[script_end+9:]

# Find products grid section
m = re.search(r'(<div class="products-grid".*?>)(.*?)(</div>\s*)(?=<script|</body>)', text, flags=re.S)
if not m:
    raise SystemExit('Could not locate products-grid section')

before = text[:m.start(1)]
open_div = m.group(1)
closing_div = m.group(3)
after = text[m.end(3):]

# Collect images
base = Path(r"c:\Users\ADMIN\Desktop\project kollection")
img_dirs = [base / 'images' / 'clothing', base / 'images']
images = []
for d in img_dirs:
    if d.exists():
        for f in sorted(d.iterdir()):
            if f.is_file() and f.suffix.lower() in ['.jpg', '.jpeg', '.png', '.gif']:
                images.append(f)

cards = []
for idx, img_path in enumerate(images, start=1):
    rel = img_path.relative_to(base).as_posix()
    src = '../' + rel
    name = img_path.stem.replace('-', ' ').replace('_', ' ').strip()
    if not name:
        name = f'Product {idx}'
    title = name
    title_js = title.replace("'", "&#39;")

    card = (
        f"            <div class=\"product-card\" data-product-id=\"women-{idx}\" data-price=\"1000\">\n"
        f"                <img src=\"{src}\" class=\"img-fluid\" alt=\"{title}\">\n"
        f"                <button class=\"wishlist-btn\" data-product-id=\"women-{idx}\" data-product-name=\"{title_js}\" data-product-price=\"1000\"></button>\n"
        f"                <h3>{title}</h3>\n"
        f"                <p>KES 950-1050</p>\n"
        f"                <button onclick=\"addToCart('women-{idx}', '{title_js}', 1000)\" class=\"add-to-cart-btn\">Add to Cart</button>\n"
        f"            </div>\n\n"
    )
    cards.append(card)

new_inner = ''.join(cards)
new_text = before + open_div + '\n\n' + new_inner + closing_div + after
women_path.write_text(new_text, encoding='utf-8')
print(f'Rewrote {women_path} with {len(cards)} product cards (consistent template).')
