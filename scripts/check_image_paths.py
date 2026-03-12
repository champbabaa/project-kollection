import os

paths = [
    "images/IMG-20260204-WA0050.jpg",
    "images/IMG-20260204-WA0051.jpg",
    "images/IMG-20260204-WA0052.jpg",
    "images/IMG-20260204-WA0053.jpg",
    "images/IMG-20260204-WA0054.jpg",
    "images/IMG-20260204-WA0056.jpg",
    "images/IMG-20260204-WA0057.jpg",
    "images/IMG-20260204-A0057.jpg",
    "images/clothing/IMG-20260204-WA0001.jpg",
    "images/clothing/IMG-20260204-WA0002.jpg",
    "images/clothing/IMG-20260204-WA0003.jpg",
    "images/clothing/IMG-20260204-WA0004.jpg",
    "images/clothing/IMG-20260204-WA0005.jpg",
    "images/clothing/IMG-20260204-WA0006.jpg",
    "images/clothing/IMG-20260204-WA0007.jpg",
    "images/clothing/IMG-20260204-WA0008.jpg",
    "images/clothing/IMG-20260204-WA0009.jpg",
    "images/clothing/IMG-20260204-WA0010.jpg",
    "images/clothing/IMG-20260204-WA0011.jpg",
    "images/clothing/IMG-20260204-WA0012.jpg",
    "images/clothing/IMG-20260204-WA0013.jpg",
    "images/clothing/IMG-20260204-WA0014.jpg",
    "images/clothing/IMG-20260204-WA0023.jpg",
    "images/clothing/IMG-20260204-WA0058.jpg",
    "images/clothing/IMG-20260204-WA0059.jpg",
]

missing = [p for p in paths if not os.path.isfile(os.path.join(os.getcwd(), p))]
print('missing:', missing)
