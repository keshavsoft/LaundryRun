let CheckFolderFunc = async () => {
    let LocalReturnObject = { KTF: false };

    try {
        let stats = await Neutralino.filesystem.getStats('./KData');
        LocalReturnObject.KTF = true;
    } catch (error) {
        LocalReturnObject.KReason = error.message;
    };

    return await LocalReturnObject;
};

export { CheckFolderFunc }