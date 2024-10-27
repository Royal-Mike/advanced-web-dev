export default interface PhotoDetailData {
    id: string;
    urls: {
      regular: string;
    };
    alt_description: string | null;
    user: {
      name: string;
    };
    description: string | null;
}