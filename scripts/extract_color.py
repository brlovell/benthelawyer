from PIL import Image
import os
from collections import Counter

def extract_dominant_color():
    logo_path = os.path.join(os.getcwd(), 'public', 'logo.png')
    try:
        img = Image.open(logo_path).convert("RGBA")
        
        datas = img.getdata()
        
        cleaned_data = []
        for item in datas:
            # Ignore transparent pixels (alpha < 50) and whiteish pixels
            if item[3] > 50:
                 if not (item[0] > 240 and item[1] > 240 and item[2] > 240):
                     cleaned_data.append(item[:3]) # Just RGB

        if not cleaned_data:
             print("No suitable pixels found.")
             return

        # Find most common color
        most_common = Counter(cleaned_data).most_common(1)[0][0]
        
        hex_color = '#{:02x}{:02x}{:02x}'.format(most_common[0], most_common[1], most_common[2])
        print(f"Dominant color: {hex_color}")
        
    except Exception as e:
        print(f"Error extraction color: {e}")

if __name__ == "__main__":
    extract_dominant_color()
