import { useState, useCallback, MouseEvent, useEffect } from 'react';
import { convertClassName, convertClassNameList, loremData } from '@/utils';
import styles from './StockDetailPage.module.scss';
import useModal from '@/hooks/useModal';
import { Button, LineChart } from '@/components/atoms';
import { Modal, ModalStock } from '@/components/molecules';
import { useQuery } from '@tanstack/react-query';
import { Stock } from '@/types';
import { useParams } from 'react-router-dom';
import {
  getStockChartQuery,
  getStockMyAccountQuery,
} from '@/api/queries/stock';

interface StockDetailPageProps {
  className?: string;
}

const StockDetailPage = ({ className }: StockDetailPageProps): JSX.Element => {
  const { isOpen, toggle } = useModal();
  const [label, setLabel] = useState('매도');
  const [chartData, setChartData] = useState<any | undefined>();
  const { detail } = useParams<{ detail: string }>();

  const onModal = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    setLabel(e.currentTarget.value);
    toggle();
  }, []);

  const { data: myStock, status: isMyStockLoading } = useQuery(
    getStockMyAccountQuery(Number(detail)),
  );
  console.log(myStock);

  const { data: stockChart, status: isStockChartLoading } = useQuery<Stock[]>(
    getStockChartQuery(Number(detail)),
  );
  console.log(stockChart);

  useEffect(() => {
    if (isStockChartLoading === 'success' && stockChart) {
      const newChartData = {
        labels: stockChart.map((_, idx) => String(idx)),
        datasets: [
          {
            type: 'line',
            label: stockChart[0].stockName,
            backgroundColor: 'rgb(255, 255, 255)',
            data: stockChart.map((item) => item.nowPrice),
            borderColor: stockChart.map((item, idx) => {
              if (idx === 0) return 'rgb(0,0,0)';
              return item.fluctuationPrice < 0 ? 'blue' : 'red';
            }),
            borderWidth: 2,
          },
        ],
      };

      setChartData(newChartData);
    }
  }, [stockChart, isStockChartLoading]);

  return (
    <div
      className={convertClassNameList(
        convertClassName(className, styles),
        styles['stock-detail-page'],
      )}
    >
      <div className={convertClassNameList(styles['stock-detail-page__news'])}>
        {loremData}
      </div>
      <div className="flex-container">
        {isStockChartLoading === 'success' ? (
          <LineChart
            data={chartData}
            className={convertClassNameList(
              styles['stock-detail-page__line-chart'],
            )}
          />
        ) : (
          ''
        )}

        <div
          className={convertClassNameList(styles['stock-detail-page__content'])}
        >
          <div
            className={convertClassNameList(
              styles['stock-detail-page__content--prev-news'],
            )}
          >
            news
          </div>
          <div
            className="
            flex-container jc-space-between"
          >
            <Button
              className={convertClassNameList(
                'bg-blue white',
                styles['stock-detail-page__content--button'],
              )}
              label="매도"
              value="매도"
              onClick={onModal}
            />
            <Button
              className={convertClassNameList(
                'bg-red white',
                styles['stock-detail-page__content--button'],
              )}
              label="매수"
              value="매수"
              onClick={onModal}
            />
          </div>
        </div>
      </div>

      {isMyStockLoading === 'success' && isStockChartLoading === 'success' && (
        <Modal isOpen={isOpen} toggle={toggle}>
          <ModalStock
            className={className}
            label={label}
            onClick={() => console.log('구매!!!!')}
            toggle={toggle}
            price={stockChart[stockChart.length - 1].nowPrice}
            totalCount={
              label === '매도'
                ? myStock.stockCount
                : myStock.point / stockChart[stockChart.length - 1].nowPrice
            }
          />
        </Modal>
      )}
    </div>
  );
};

export default StockDetailPage;
