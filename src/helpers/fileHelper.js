export const handleFileChange = (e, targetObject, targetKey) => {
    const file = e.target.files[0];


    if (file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];

        if (!validTypes.includes(file.type)) {
            alert('Invalid file type. Only JPG, PNG, and GIF are allowed.');
            return;
        }

        if (targetKey) {
            targetObject[targetKey] = file;
            targetObject[`${targetKey}Name`] = file.name;
        } else {
            targetObject.image = file;
            targetObject.imageName = file.name;
        }
    }
};
