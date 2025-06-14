import requests
import os

def download_audio_series():
    """
    Mengunduh seri file audio dari URL yang ditentukan dan menyimpannya secara lokal.
    """
    
    base_url = "https://www.edupac-id.com/wp-content/uploads/2023/01/longman-listening-"
# https://www.edupac-id.com/wp-content/uploads/2023/01/cliff-toefl-preparation-guide-listening-2-1-1.mp3
# https://www.edupac-id.com/wp-content/uploads/2023/01/longman-listening-16-1.mp3

    
    
    save_directory = "audio_downloads"
    if not os.path.exists(save_directory):
        os.makedirs(save_directory)
        print(f"Direktori '{save_directory}' berhasil dibuat.")

    
    for i in range(16, 21):
        

        source_filename = f"{i}-1.mp3"
        
        
        file_url = f"{base_url}{source_filename}"
        
        
        destination_filename = f"{i+20}.mp3"
        
        
        save_path = os.path.join(save_directory, destination_filename)
        
        try:
            print(f"Mengunduh {file_url}...")
            
            
            response = requests.get(file_url, stream=True)
            
            
            if response.status_code == 200:
                
                with open(save_path, 'wb') as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)
                print(f"Berhasil disimpan sebagai '{save_path}'")
            else:
                print(f"Gagal mengunduh {file_url}. Status Code: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            print(f"Terjadi kesalahan saat mencoba mengunduh {file_url}: {e}")

    print("\nProses pengunduhan selesai.")

if __name__ == "__main__":
    download_audio_series()