import os
from PIL import Image
from six import BytesIO
from versatileimagefield.datastructures import SizedImage
from versatileimagefield.datastructures.sizedimage import (
    SizedImageInstance,
    MalformedSizedImageKey,
    settings,
    cache,
    VERSATILEIMAGEFIELD_CACHE_LENGTH,
)
from versatileimagefield.registry import versatileimagefield_registry
from versatileimagefield.utils import (
    post_process_image_key,
    VERSATILEIMAGEFIELD_SIZED_DIRNAME,
    QUAL,
)
from versatileimagefield.versatileimagefield import CroppedImage, \
    ThumbnailImage

VERSATILE_CROP_WEBP = 'crop_webp'
# VERSATILE_CROP_JPG = 'crop_jpg'
# VERSATILE_CROP_PNG = 'crop_png'

VERSATILE_THUMBNAIL_WEBP = 'thumbnail_webp'
# VERSATILE_THUMBNAIL_JPG = 'thumbnail_jpg'
# VERSATILE_THUMBNAIL_PNG = 'thumbnail_png'


BMP = ("BMP", "image/bmp")
DCX = ("DCX", "image/dcx")
EPS = ("eps", "image/eps")
GIF = ("GIF", "image/gif")
JPEG = ("JPEG", "image/jpeg")
PCD = ("PCD", "image/pcd")
PCX = ("PCX", "image/pcx")
PDF = ("PDF", "application/pdf")
PNG = ("PNG", "image/png")
PPM = ("PPM", "image/x-ppm")
PSD = ("PSD", "image/psd")
TIFF = ("TIFF", "image/tiff")
WEBP = ("WEBP", "image/webp")
XBM = ("XBM", "image/x-xbitmap")
XPM = ("XPM", "image/x-xpm")

FILE_EXTENSION_MAP = {
    "png": PNG,
    "jpe": JPEG,
    "jpeg": JPEG,
    "jpg": JPEG,
    "gif": GIF,
    "bmp": BMP,
    "dib": BMP,
    "dcx": DCX,
    "eps": EPS,
    "ps": EPS,
    "pcd": PCD,
    "pcx": PCX,
    "pdf": PDF,
    "pbm": PPM,
    "pgm": PPM,
    "ppm": PPM,
    "psd": PSD,
    "tif": TIFF,
    "tiff": TIFF,
    "webp": WEBP,
    "xbm": XBM,
    "xpm": XPM,
}


def get_image_metadata_from_file_ext(file_ext):
    return FILE_EXTENSION_MAP.get(file_ext, JPEG)


def get_resized_filename(filename, ext, width, height, filename_key):
    try:
        image_name, extension = filename.rsplit(".", 1)
    except ValueError:
        image_name = filename
        extension = "jpg"

    resized_template = "%(filename_key)s-%(width)dx%(height)d"
    if ext.lower() in ["jpg", "jpeg"]:
        resized_template = resized_template + "-%(quality)d"

    resized_key = resized_template % (
        {
            "filename_key": filename_key,
            "width": width,
            "height": height,
            "quality": QUAL,
        }
    )

    return "%(image_name)s-%(image_key)s.%(ext)s" % (
        {
            "image_name": image_name,
            "image_key": post_process_image_key(resized_key),
            "ext": ext,
        }
    )


def get_resized_path(path_to_image, ext, width, height, filename_key, storage):
    containing_folder, filename = os.path.split(path_to_image)

    resized_filename = get_resized_filename(filename, ext, width, height,
                                            filename_key)

    joined_path = os.path.join(
        *[VERSATILEIMAGEFIELD_SIZED_DIRNAME, containing_folder,
          resized_filename]
    ).replace(
        " ", ""
    )  # Removing spaces so this path is memcached friendly

    return joined_path


class NewSizedImage(SizedImage):
    def __getitem__(self, key):
        try:
            width, height = [int(i) for i in key.split("x")]
        except (KeyError, ValueError):
            raise MalformedSizedImageKey(
                "%s keys must be in the following format: "
                "'`width`x`height`' where both `width` and `height` are "
                "integers." % self.__class__.__name__
            )

        if not self.path_to_image and getattr(
            settings, "VERSATILEIMAGEFIELD_USE_PLACEHOLDIT", False
        ):
            resized_url = "http://placehold.it/%dx%d" % (width, height)
            resized_storage_path = resized_url
        else:
            resized_storage_path = get_resized_path(
                path_to_image=self.path_to_image,
                ext=self.ext,
                width=width,
                height=height,
                filename_key=self.get_filename_key(),
                storage=self.storage,
            )
            try:
                resized_url = self.storage.url(resized_storage_path)
            except Exception:
                resized_url = None
            if self.create_on_demand is True and not os.path.isfile(
                os.path.join(settings.MEDIA_ROOT, resized_storage_path)):
                if cache.get(resized_url) and resized_url is not None:
                    # The sized path exists in the cache so the image already
                    # exists. So we `pass` to skip directly to the return
                    # statement
                    pass
                else:
                    if resized_storage_path and not self.storage.exists(
                        resized_storage_path
                    ):
                        self.create_resized_image(
                            path_to_image=self.path_to_image,
                            save_path_on_storage=resized_storage_path,
                            width=width,
                            height=height,
                        )

                        resized_url = self.storage.url(resized_storage_path)

                    # Setting a super-long cache for a resized image (30 Days)
                    cache.set(resized_url, 1, VERSATILEIMAGEFIELD_CACHE_LENGTH)
        return SizedImageInstance(
            name=resized_storage_path, url=resized_url, storage=self.storage
        )

    def retrieve_image(self, path_to_image):
        image = self.storage.open(path_to_image, "rb")
        file_ext = path_to_image.rsplit(".")[-1]
        image_format, mime_type = get_image_metadata_from_file_ext(file_ext)

        return (Image.open(image), file_ext, image_format, mime_type)

    def create_resized_image(self, path_to_image, save_path_on_storage, width,
                             height):
        image, file_ext, image_format, mime_type = self.retrieve_image(
            path_to_image)
        image, save_kwargs = self.preprocess(image, image_format)

        imagefile = self.process_image(
            image=image,
            image_format=image_format,
            save_kwargs=save_kwargs,
            width=width,
            height=height,
        )
        self.save_image(imagefile, save_path_on_storage, file_ext, mime_type)

    def preprocess_WEBP(self, image, **kwargs):
        return (image, {"quality": settings.VERSATILEIMAGEFIELD_SETTINGS.get(
            'jpeg_resize_quality', 94), "lossless": False, "icc_profile": ""})


class WebpCroplImage(CroppedImage, NewSizedImage):
    filename_key = VERSATILE_CROP_WEBP
    ext = "webp"

    def retrieve_image(self, path_to_image):
        image = self.storage.open(path_to_image, "rb")
        file_ext = self.ext
        image_format, mime_type = "WEBP", "image/webp"
        return (Image.open(image), file_ext, image_format, mime_type)

    def process_image(self, image, image_format, save_kwargs,
                      width, height):
        imagefile = BytesIO()
        palette = image.getpalette()
        cropped_image = self.crop_on_centerpoint(
            image,
            width,
            height,
            self.ppoi
        )
        if image_format == 'GIF':
            cropped_image.putpalette(palette)
        image, save_kwargs = self.preprocess(image, "WEBP")
        cropped_image.save(
            imagefile,
            **save_kwargs
        )

        return imagefile


class WebpThumbnailImage(ThumbnailImage, NewSizedImage):
    filename_key = VERSATILE_THUMBNAIL_WEBP
    ext = "webp"

    def retrieve_image(self, path_to_image):
        image = self.storage.open(path_to_image, "rb")
        file_ext = self.ext
        image_format, mime_type = "WEBP", "image/webp"
        return (Image.open(image), file_ext, image_format, mime_type)

    def process_image(self, image, image_format, save_kwargs,
                      width, height):
        imagefile = BytesIO()
        image.thumbnail(
            (width, height),
            Image.ANTIALIAS
        )
        image, save_kwargs = self.preprocess(image, "WEBP")
        image.save(
            imagefile,
            **save_kwargs
        )
        return imagefile


class CustomCroppedImage(CroppedImage, NewSizedImage):
    def __init__(self, path_to_image, storage, create_on_demand, ppoi=(0.5, 0.5)):
        _, ext = os.path.splitext(path_to_image or '')
        self.ext = ext[1:]
        super(CustomCroppedImage, self).__init__(path_to_image, storage, create_on_demand, ppoi=ppoi)


class CustomThumbnailImage(ThumbnailImage, NewSizedImage):
    def __init__(self, path_to_image, storage, create_on_demand,
                 ppoi=(0.5, 0.5)):
        _, ext = os.path.splitext(path_to_image or '')
        self.ext = ext[1:]
        super(CustomThumbnailImage, self).__init__(path_to_image, storage,
                                                   create_on_demand, ppoi=ppoi)


# class PngThumbnailImage(NewSizedImage):
#     filename_key = VERSATILE_CROP_PNG
#     ext = "png"
#
#     def retrieve_image(self, path_to_image):
#         image = self.storage.open(path_to_image, "rb")
#         file_ext = self.ext
#         image_format, mime_type = "PNG", "image/png"
#
#         return (Image.open(image), file_ext, image_format, mime_type)
#
#     def process_image(self, image, image_format, save_kwargs, width, height):
#         imagefile = BytesIO()
#         image.thumbnail((width, height), Image.ANTIALIAS)
#         image, save_kwargs = self.preprocess(image, "PNG")
#         image.save(imagefile, **save_kwargs)
#         return imagefile
#
#
# class JpgThumbnailImage(NewSizedImage):
#     filename_key = VERSATILE_CROP_JPG
#     ext = "jpg"
#
#     def retrieve_image(self, path_to_image):
#         image = self.storage.open(path_to_image, "rb")
#         file_ext = self.ext
#         image_format, mime_type = "JPEG", "image/jpeg"
#
#         return (Image.open(image), file_ext, image_format, mime_type)
#
#     def process_image(self, image, image_format, save_kwargs, width, height):
#         imagefile = BytesIO()
#         image.thumbnail((width, height), Image.ANTIALIAS)
#         image, save_kwargs = self.preprocess(image, "JPEG")
#         image.save(imagefile, **save_kwargs)
#         return imagefile


versatileimagefield_registry.unregister_sizer('crop')
versatileimagefield_registry.register_sizer('crop', CustomCroppedImage)

versatileimagefield_registry.unregister_sizer('thumbnail')
versatileimagefield_registry.register_sizer('thumbnail', CustomThumbnailImage)

versatileimagefield_registry.register_sizer(VERSATILE_CROP_WEBP,
                                            WebpCroplImage)
versatileimagefield_registry.register_sizer(VERSATILE_THUMBNAIL_WEBP,
                                            WebpThumbnailImage)
# versatileimagefield_registry.register_sizer(VERSATILE_CROP_JPG,
#                                             PngThumbnailImage)
# versatileimagefield_registry.register_sizer(VERSATILE_CROP_PNG,
#                                             JpgThumbnailImage)
