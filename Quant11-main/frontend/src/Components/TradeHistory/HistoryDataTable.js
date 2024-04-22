import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import apiRequest from '../../api/api';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const HistoryDataTable = ({ apiEndpoints, category }) => {
  const { stockDetailId } = useParams();
  const [tradeData, setTradeData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const fetchYahooData = async (tickerSymbol) => {
    try {
      const { responseData, error } = await apiRequest('api/v1/yahoo-finance', 'POST', {
        ticker_symbol: tickerSymbol
      });
      if (error) {
        console.error(`Error fetching Yahoo data for ${tickerSymbol}:`, error);
        return null;
      }
      return responseData?.data?.price;
    } catch (error) {
      console.error(`Error fetching Yahoo data for ${tickerSymbol}:`, error);
      return null;
    }
  };

  const fetchStockListWithYahooData = async () => {
    try {
      const { responseData } = await apiRequest(apiEndpoints, 'POST', {
        strategy_id: stockDetailId,
        page: page,
        limit: perPage
      });
      if (responseData.data.length > 0) {
        const updatedStockList = await Promise.all(
          responseData?.data?.map(async (asset) => {
            if (category === 'open') {
              const yahooData = await fetchYahooData(asset.ticker_symbol);
              if (yahooData) {
                asset.price = yahooData.regularMarketPrice;
              }
            }
            return asset;
          })
        );
        setTradeData(updatedStockList);
        setTotalRows(responseData.meta.total);
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  useEffect(() => {
    if (page || perPage) {
      fetchStockListWithYahooData();
    }
  }, [page, perPage]);

  const formatTime = (timeString) => {
    if (!timeString) {
      return '-';
    }
    return moment(timeString).utc().format('DD/MM/YYYY hh:mm:ss A');
  };

  const getNetPLColor = (netPL) => {
    return netPL < 0 ? 'red-text' : 'green-text';
  };

  const renderNetPL = (row) => {
    if (category && category === 'open') {
      if (row.action === 'sell') {
        return (row.close_price - row.price) * row.lot_size;
      } else {
        return (row.price - row.open_price) * row.lot_size;
      }
    } else {
      return row.profit_loss;
    }
  };

  const columns = [
    {
      name: 'Symbol',
      selector: (row) => row.ticker_symbol || '-'
    },
    {
      name: 'Direction',
      selector: (row) => (row.action === 'buy' ? 'Buy' : 'Sell')
    },
    {
      name: 'Size',
      selector: (row) => row.lot_size
    },
    {
      name: 'Open',
      selector: (row) => (row.open_price ? parseFloat(row.open_price).toFixed(2) : '-')
    },
    {
      name: 'Open Time',
      width: '200px',
      selector: (row) => formatTime(row.open_time)
    },
    {
      name: 'Close',
      selector: (row) => (row.close_price ? parseFloat(row.close_price).toFixed(2) : '-')
    },
    {
      name: 'Close Time',
      width: '200px',
      selector: (row) => formatTime(row.close_time)
    },
    {
      name: 'Net P/L',
      selector: (row) => (
        <span className={getNetPLColor(renderNetPL(row))}>
          {renderNetPL(row) !== undefined ? parseFloat(renderNetPL(row)).toFixed(2) : '-'}
        </span>
      )
    }
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={tradeData}
        defaultSortFieldId
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangeRowsPerPage={(newPerPage) => setPerPage(newPerPage)}
        onChangePage={(newPage) => setPage(newPage)}
        noDataComponent={<div className="no-data">No data available</div>}
      />
    </>
  );
};

export default HistoryDataTable;
