class AddMessageImageDTO {
  public file: File;

  constructor({ file }: { file: File }) {
    this.file = file;
  }
}

export default AddMessageImageDTO;
