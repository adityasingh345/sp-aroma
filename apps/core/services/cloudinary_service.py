import cloudinary
import cloudinary.uploader

from config.settings import (
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
)

cloudinary.config(
    cloud_name=CLOUDINARY_CLOUD_NAME,
    api_key=CLOUDINARY_API_KEY,
    api_secret=CLOUDINARY_API_SECRET,
    secure=True,
)


class CloudinaryService:
    @staticmethod
    def upload_image(file, folder: str):
        result = cloudinary.uploader.upload(
            file.file,
            folder=folder,
            resource_type="image",
        )
        return {
            "public_id": result["public_id"],
            "url": result["secure_url"],
            "format": result["format"],
        }

    @staticmethod
    def delete_image(public_id: str):
        cloudinary.uploader.destroy(public_id)
