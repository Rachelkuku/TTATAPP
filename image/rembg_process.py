from rembg import remove
from PIL import Image

paths = [
    (r"C:\Users\user\어플개발\wtc-membership-app\assets\mascot.png",
     r"C:\Users\user\어플개발\wtc-membership-app\assets\mascot_clean.png"),
    (r"C:\Users\user\어플개발\wtc-membership-app\assets\mascot2.png",
     r"C:\Users\user\어플개발\wtc-membership-app\assets\mascot2_clean.png"),
]

for inp, out in paths:
    print(f"Processing {inp.split(chr(92))[-1]}...")
    with open(inp, "rb") as f:
        result = remove(f.read())
    with open(out, "wb") as f:
        f.write(result)
    print(f"  -> saved {out.split(chr(92))[-1]}")

print("All done!")
