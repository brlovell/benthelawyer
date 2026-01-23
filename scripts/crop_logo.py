from PIL import Image
import os

def process_logo():
    logo_path = os.path.join(os.getcwd(), 'public', 'logo.png')
    try:
        img = Image.open(logo_path).convert("RGBA")
        
        datas = img.getdata()
        
        newData = []
        # Threshold for "white"
        threshold = 240
        
        for item in datas:
            # item is (R, G, B, A)
            if item[0] > threshold and item[1] > threshold and item[2] > threshold:
                newData.append((255, 255, 255, 0)) # Fully transparent
            else:
                newData.append(item)
        
        img.putdata(newData)
        
        # Now re-crop to be safe (optional, but good practice if transparency reveals more cropping opportunity)
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)
            
        img.save(logo_path, "PNG")
        print(f"Saved transparent logo to {logo_path}")

    except Exception as e:
        print(f"Error processing logo: {e}")

if __name__ == "__main__":
    process_logo()
