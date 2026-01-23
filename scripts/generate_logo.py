import os
import requests
import zipfile
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont

def generate_logo():
    # Configuration
    output_path = os.path.join(os.getcwd(), 'public', 'logo.png')
    text_part1 = "ben"
    text_part2 = "thelawyer"
    color = "#2A1B30"
    font_size = 100
    
    zip_url = "https://github.com/rsms/inter/releases/download/v4.1/Inter-4.1.zip"
    
    print(f"Downloading fonts from {zip_url}...")
    try:
        response = requests.get(zip_url)
        response.raise_for_status()
        z = zipfile.ZipFile(BytesIO(response.content))
        
        # List files to find static ttf/otf
        files = z.namelist()
        # Look for SemiBold and Light
        # Prefer "extras/ttf/Inter-SemiBold.ttf" or distinct files over variable if easier
        
        font_sb_path = next((f for f in files if "SemiBold.ttf" in f or "SemiBold.otf" in f), None)
        font_light_path = next((f for f in files if "Light.ttf" in f or "Light.otf" in f), None) # or Regular if Light missing? User asked for Light.
        
        if not font_sb_path or not font_light_path:
             print("Could not find specific font files in zip.")
             # Fallback to variable?
             return

        print(f"Using fonts: {font_sb_path}, {font_light_path}")
        
        font_sb_data = BytesIO(z.read(font_sb_path))
        font_light_data = BytesIO(z.read(font_light_path))
        
        font_semibold = ImageFont.truetype(font_sb_data, font_size)
        font_light = ImageFont.truetype(font_light_data, font_size)

    except Exception as e:
        print(f"Error loading fonts: {e}")
        return

    # Create dummy image for metrics
    dummy_img = Image.new('RGBA', (1, 1))
    dummy_draw = ImageDraw.Draw(dummy_img)
    
    # Calculate metrics
    # asc/desc is better for vertical alignment
    asc1, desc1 = font_semibold.getmetrics()
    asc2, desc2 = font_light.getmetrics()
    max_asc = max(asc1, asc2)
    max_desc = max(desc1, desc2)
    line_height = max_asc + max_desc # baseline to baseline roughly? No.
    
    # Width
    w1 = dummy_draw.textlength(text_part1, font=font_semibold)
    w2 = dummy_draw.textlength(text_part2, font=font_light)
    total_width = int(w1 + w2)
    total_height = int(max_asc + max_desc) # Sufficient height
    
    # Create canvas with padding
    pad = 20
    img = Image.new('RGBA', (total_width + pad*2, total_height + pad*2), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    
    # Draw
    # Baseline position
    baseline_y = pad + max_asc
    
    draw.text((pad, baseline_y), text_part1, font=font_semibold, fill=color, anchor="ls") # Left-Baseline
    draw.text((pad + w1, baseline_y), text_part2, font=font_light, fill=color, anchor="ls")
    
    # Crop tightly
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
        print(f"Cropped to {img.size}")
    
    img.save(output_path)
    print(f"Logo saved to {output_path}")

if __name__ == "__main__":
    generate_logo()
