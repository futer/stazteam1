export async function pictureUpload(event) {
    let picture = event.target.files[0];
    const reader = new FileReader;
    reader.readAsDataURL(picture);
    return await new Promise((resolve, reject) => {
        reader.onload = () => {
            picture = reader.result.toString().split(',')[1];
            if (picture.length <= 106000) {
              resolve(picture);
            } else {
              resolve(null);
            }
          };
    });
  }

export function getPic(picture, sanitizer) {
    if (picture) {
        return sanitizer.bypassSecurityTrustUrl(`data:image/png;base64, ${picture}`);
    }
    return '../../assets/img/avatar.png';
  }
