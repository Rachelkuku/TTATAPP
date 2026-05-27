from PIL import Image
import numpy as np

def remove_background(input_path, output_path, tolerance=35):
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img, dtype=float)

    # Sample background color from 4 corners (average)
    corners = [
        data[0, 0, :3],
        data[0, -1, :3],
        data[-1, 0, :3],
        data[-1, -1, :3],
    ]
    bg_color = np.mean(corners, axis=0)
    print(f"  Detected background color: R={bg_color[0]:.0f} G={bg_color[1]:.0f} B={bg_color[2]:.0f}")

    # Calculate color distance from background for each pixel
    rgb = data[:, :, :3]
    dist = np.sqrt(np.sum((rgb - bg_color) ** 2, axis=2))

    # Also remove edge gradient (progressive transparency near edges)
    alpha = np.where(dist < tolerance, 0, 255).astype(np.uint8)

    # Smooth edges: partially transparent for pixels near threshold
    transition = 10
    mask = (dist >= tolerance - transition) & (dist < tolerance)
    alpha[mask] = ((dist[mask] - (tolerance - transition)) / transition * 255).astype(np.uint8)

    result = np.array(img)
    result[:, :, 3] = alpha

    out = Image.fromarray(result.astype(np.uint8), "RGBA")
    out.save(output_path)
    print(f"  Saved: {output_path}")

print("Processing mascot.png (lavender bg)...")
remove_background(
    r"C:\Users\user\어플개발\wtc-membership-app\assets\mascot.png",
    r"C:\Users\user\어플개발\wtc-membership-app\assets\mascot_clean.png",
    tolerance=38
)

print("Processing mascot2.png (sky blue bg)...")
remove_background(
    r"C:\Users\user\어플개발\wtc-membership-app\assets\mascot2.png",
    r"C:\Users\user\어플개발\wtc-membership-app\assets\mascot2_clean.png",
    tolerance=38
)

print("Done!")
