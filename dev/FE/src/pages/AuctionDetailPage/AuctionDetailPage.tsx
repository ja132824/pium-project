import { convertClassName, convertClassNameList } from '@/utils';
import styles from './AuctionDetailPage.module.scss';
import { AuctionDetailMain, CreaterProfile } from '@/components/organisms';
import { AuctionDetailDescription } from '@/components/molecules';

interface AuctionDetailPageProps {
  className?: string;
}

const AuctionDetailPage = ({
  className,
}: AuctionDetailPageProps): JSX.Element => {
  return (
    <div
      className={convertClassNameList(
        convertClassName(className, styles),
        styles['auction-detail-page'],
      )}
    >
      <AuctionDetailMain
        className={convertClassNameList(styles['auction-detail-page__main'])}
        title="개쩌는 그림"
        src=""
        alt="a"
        imageClassName=""
        descriptionClassName=""
        auctionClick={() => {
          console.log('개쩔어');
        }}
        buyItClick={() => {
          console.log('와우 개쩔어');
        }}
        auctionPrice="1000"
        instantPrice="1000"
      />
      <AuctionDetailDescription
        className={convertClassNameList(
          styles['auction-detail-page__description'],
        )}
      />
      <CreaterProfile
        className={convertClassNameList(styles['auction-detail-page__profile'])}
      />
    </div>
  );
};

export default AuctionDetailPage;
