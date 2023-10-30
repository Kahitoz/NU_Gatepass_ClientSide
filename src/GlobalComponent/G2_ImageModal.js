import { useState } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const ImageModal = ({ isOpen, isClose }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const decode = jwtDecode(Cookies.get('ACCESS_TOKEN'));
    const user_id = decode.data.user_id;

    const handleImageUploadFunc = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
            };
            reader.readAsDataURL(file);

            // Modify the file name to include the user_id before uploading.
            const fileExtension = file.name.split('.').pop(); // Get the file extension
            const fileName = `${user_id}.${fileExtension}`;

            const formData = new FormData();
            formData.append("image", file, fileName);

            // Replace 'authorization' with your actual authorization token.
            const authorization = Cookies.get('ACCESS_TOKEN');

            fetch("http://localhost:4000/gatepass/v2/student/profile/upload", {
                method: "POST",
                headers: {
                    Authorization: authorization,
                },
                body: formData,
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json(); // Assuming the API returns JSON.
                    } else {
                        throw Error("Image upload failed");
                    }
                })
                .then((data) => {
                    console.log("Image uploaded successfully:", data);
                })
                .catch((error) => {
                    console.error("Image upload failed:", error);
                });
        }
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur">
                    <div className="bg-background border border-black w-4/12 p-6 rounded-md">
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-red-200 flex rounded-xl cursor-pointer hover-bg-red-400">
                                {selectedImage ? (
                                    <img
                                        src={selectedImage}
                                        alt="Selected Image"
                                        className="w-20 h-20 bg-red-200 rounded-xl cursor-pointer hover-bg-red-400"
                                    />
                                ) : (
                                    <div className="w-20 h-20 bg-red-200 flex rounded-xl cursor-pointer hover-bg-red-400">
                                        <p className="text-center hover:text-white">
                                            Please Select an Image
                                        </p>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                id="imageInput"
                                accept="image/*"
                                name={`image`}
                                onChange={handleImageUploadFunc}
                            />
                            <p className="font-bold text-center cursor-pointer mt-3 hover:text-red-700">
                                Upload
                            </p>
                            <p
                                onClick={isClose}
                                className="font-bold mt-5 cursor-pointer hover:text-red-700"
                            >
                                Close
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageModal;
