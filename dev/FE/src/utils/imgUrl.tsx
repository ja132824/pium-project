import { Image } from '@/components/atoms';

const imgUrl = (url: string): string => {
  return url ? import.meta.env.BASE_URL + 'img/' + url : '';
};

const bankIconUrl = (url: string): string => {
  return url ? import.meta.env.BASE_URL + 'img/bankicon/' + url : '';
};

const imageUrl: string = import.meta.env.VITE_EDUCATION_IMAGE_URL;

const eduBook = (): JSX.Element[] => {
  const data: JSX.Element[] = [];
  for (let index = 1; index <= 291; index++) {
    data.push(
      <Image src={imageUrl + String(index) + `.png`} alt={String(index)} />,
    );
  }
  return data;
};

export { imgUrl, bankIconUrl, eduBook };
