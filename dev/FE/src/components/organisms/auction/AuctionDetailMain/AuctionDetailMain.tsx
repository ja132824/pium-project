import { Image, Text } from '@/components/atoms';
import { AuctionDescription } from '@/components/molecules';
import styles from './AuctionDetailMain.module.scss';
import { convertClassName } from '@/utils';

interface AuctionDetailMainProps {
  title: string;
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  descriptionClassName?: string;
  auctionClick: () => void;
  buyItClick: () => void;
  auctionPrice: string;
  instantPrice: string;
}

const AuctionDetailMain = ({
  title,
  src,
  alt,
  className,
  imageClassName,
  descriptionClassName,
  auctionClick,
  buyItClick,
  auctionPrice,
  instantPrice,
}: AuctionDetailMainProps) => {
  return (
    <div
      className={`${styles['auction-detail-main']} ${convertClassName(
        className,
        styles,
      )}`}
    >
      <div className={styles['auction-detail-main__title']}>
        <Text text={title} />
      </div>
      <div className={styles['auction-detail-main__image']}>
        <Image src={src} alt={alt} className={imageClassName} />
      </div>
      <div className={styles['auction-detail-main__description']}>
        <AuctionDescription
          className={descriptionClassName}
          auctionPrice={auctionPrice}
          instantPrice={instantPrice}
          auctionClick={auctionClick}
          buyItClick={buyItClick}
        />
      </div>
    </div>
  );
};

export default AuctionDetailMain;
