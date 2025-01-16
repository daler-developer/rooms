class AddProfilePictureDTO {
  public file: File;

  constructor({ file }: { file: File }) {
    this.file = file;
  }
}

export default AddProfilePictureDTO;
