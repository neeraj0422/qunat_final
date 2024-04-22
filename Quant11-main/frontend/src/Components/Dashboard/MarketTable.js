import { StyledMarketTable } from '../../Styles/Pages/Dashboard';

const MarketTable = ({ tableHead, tableData }) => {
  return (
    <>
      <StyledMarketTable>
        <table>
          <thead>
            <tr className="table-header">{tableHead}</tr>
          </thead>
          <tbody>
            {tableData?.map((rowData, index) => (
              <tr key={index} className="table-content">
                {Object.keys(rowData).map((key) => (
                  <td key={key}>{rowData[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </StyledMarketTable>
    </>
  );
};

export default MarketTable;
