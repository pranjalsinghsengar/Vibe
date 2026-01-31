import React, { useEffect, useState } from 'react';
import Layout, { Container } from '../components/layout';
import { useUser } from '../config/userProvider';
import { apiurl } from '../config/config';
import { toast } from 'react-toastify';
import { FiSearch } from 'react-icons/fi';
import SearchContainer from '../components/searchContainer';
import BackHeader from '../components/backHeader';
import Pagination from '../components/pagination';
import DataNotFound from '../components/dataNotFound';
import { InfiLoader } from '../components/loader';
import { useNavigate } from 'react-router-dom';

function ApprovalCenter() {
  const { userData, token } = useUser();
  const [transactions, setTransactions] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Pagination states
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState({ totalItems: 0 });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fetch pending transactions
  const fetchPendingTransactions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiurl}/api/whatsapp/user/pending-recharges`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setTransactions(data.data || []);
        setPaginationData({ totalItems: data.data.length });
      } else {
        setError(data.msg || 'Failed to fetch pending transactions');
        toast.error(data.msg || 'Failed to fetch pending transactions');
      }
    } catch (err) {
      setError('Error fetching transactions');
      toast.error('Error fetching transactions, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Approve transaction
  const handleApproveTransaction = async (transactionId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${apiurl}/api/whatsapp/user/approve-transaction?transactionId=${transactionId}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        toast.success('Transaction approved successfully');
        await fetchPendingTransactions();
      } else {
        const data = await response.json();
        setError(data.msg || 'Failed to approve transaction');
        toast.error(data.msg || 'Failed to approve transaction');
      }
    } catch (err) {
      setError('Error approving transaction');
      toast.error('Error approving transaction, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchPendingTransactions();
    }
  }, [currentPage, itemsPerPage, token]);

  // Filter transactions based on search input
  const filterData = transactions.filter(
    (transaction) =>
      transaction?.userId?.toLowerCase().includes(searchInput.toLowerCase()) ||
      transaction?.paymentReference?.toLowerCase().includes(searchInput.toLowerCase()) ||
      transaction?.planId?.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleViewDetails = (transactionId) => {
    navigate(`/approval-center/${transactionId}`);
  };

  return (
    <Layout>
      <Container>
        {loading ? (
          <InfiLoader maintext="Fetching Pending Transactions..." />
        ) : (
          <div className="border bg-white h-full w-full px-2 py-2">
            <div className="relative flex flex-col gap-2 w-full overflow-hidden rounded-lg sm:rounded-xl px-2 h-full p-2">
              <BackHeader
                title={
                  <span className="flex flex-col md:flex-row items-center">
                    Pending Transactions
                    <span className="hidden lg:flex"> - {paginationData?.totalItems}</span>
                    <select
                      value={itemsPerPage}
                      className="text-xs rounded border border-accent px-2 mx-2 text-text-primary focus:border-light-primary focus:ring-2 focus:ring-light-primary"
                      onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </span>
                }
                rightSide={
                  <div className="flex gap-2 items-center">
                    <SearchContainer
                      value={searchInput}
                      placeholder="Search Transactions..."
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                  </div>
                }
              />
              {error && <p className="text-error text-lg mb-4">{error}</p>}
              <div className="relative overflow-y-auto h-full sm:rounded-lg">
                {filterData.length > 0 ? (
                  <table className="w-full text-sm text-left rtl:text-right text-text-secondary">
                    <thead className="text-xs text-text-primary uppercase bg-secondary sticky top-0">
                      <tr>
                        <th scope="col" className="px-6 py-3">User ID</th>
                        <th scope="col" className="px-6 py-3">Plan ID</th>
                        <th scope="col" className="px-6 py-3">Amount</th>
                        <th scope="col" className="px-6 py-3">Payment Reference</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Receipt URL</th>
                        <th scope="col" className="px-6 py-3">Created At</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterData.map((transaction, index) => (
                        <tr
                          key={transaction._id}
                          className={`${index % 2 === 0 ? 'odd:bg-white' : 'even:bg-secondary'} border-b`}
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-text-primary whitespace-nowrap"
                          >
                            {transaction.userId}
                          </th>
                          <td className="px-6 py-4">{transaction.planId}</td>
                          <td className="px-6 py-4">{transaction.amount.toLocaleString()} rs.</td>
                          <td className="px-6 py-4">{transaction.paymentReference}</td>
                          <td className="px-6 py-4 capitalize">
                            <span className={transaction.status === 'pending' ? 'text-error' : 'text-success'}>
                              {transaction.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <a
                              href={transaction.reciept_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-light-primary hover:text-primary"
                            >
                              View Receipt
                            </a>
                          </td>
                          <td className="px-6 py-4">
                            {new Date(transaction.createdAt).toLocaleDateString()}
                          </td>
                          <div>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleApproveTransaction(transaction._id)}
                                className="border border-success text-sm text-success px-4 py-1 rounded-sm hover:bg-success hover:text-white transition-colors"
                                disabled={loading}
                              >
                                Approve
                              </button>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleViewDetails(transaction._id)}
                                className="border border-blue-500 text-blue-500 hover:text-white px-4 py-1 rounded-sm hover:bg-blue-700 transition-colors"
                              >
                                Details
                              </button>
                            </td>
                          </div>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <DataNotFound.page label="Pending Transactions" />
                )}
              </div>
              <Pagination
                currentPage={currentPage}
                totalItems={paginationData?.totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </Container>
    </Layout>
  );
}

export default ApprovalCenter;