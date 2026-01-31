import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../config/userProvider';
import { apiurl } from '../config/config';
import { toast } from 'react-toastify';
import Layout, { Container } from '../components/layout';
import BackHeader from '../components/backHeader';
import { InfiLoader } from '../components/loader';
import DataNotFound from '../components/dataNotFound';
import { FiDownload, FiEye, FiX } from 'react-icons/fi';

function ApprovalCenterDetails() {
    const { transactionId } = useParams();
    const { token } = useUser();
    const navigate = useNavigate();
    const [transactionData, setTransactionData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchTransactionDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${apiurl}/api/whatsapp/wallet/transactiondetails/${transactionId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response?.data?.success) {
                    setTransactionData(response?.data?.data);
                } else {
                    setError(response?.data?.msg || 'Failed to fetch transaction details');
                    toast.error(response?.data?.msg || 'Failed to fetch transaction details');
                }
            } catch (err) {
                setError('Error fetching transaction details');
                toast.error('Error fetching transaction details, please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (token && transactionId) {
            fetchTransactionDetails();
        }
    }, [token, transactionId]);

    const handleDownload = (url, filename) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || 'receipt.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Destructure with optional chaining
    const Transaction = transactionData?.Transaction;
    const User = transactionData?.User;
    const User_details = transactionData?.User_details;

    return (
        <Layout>
            {loading ? (
                <InfiLoader maintext="Fetching Transaction Details..." />
            ) : (
                <div className="min-h-screen w-full py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto">
                    <div className="">
                        {/* Header */}
                        <div className="mb-8">
                            <BackHeader
                                title={
                                    <span className="flex flex-col md:flex-row items-center">
                                        Transaction Details
                                    </span>
                                }
                                backButton={true}
                                link={"/approval-center"}
                            />
                        </div>

                        {/* Cards Container */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-3xl border border-l-8 border-indigo-200 p-6 md:p-8 transition-all hover:shadow-md">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                                    <span className="h-8 w-1 bg-indigo-300 rounded-full mr-3"></span>
                                    Transaction Details
                                </h2>

                                <div className="grid lg:grid-cols-3 gap-8">
                                    {/* Transaction Info */}
                                    <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-5">
                                            <div>
                                                <span className="text-xs font-semibold text-gray-500 uppercase">Transaction ID</span>
                                                <p className="text-gray-900 font-medium mt-1">{Transaction?._id ?? 'N/A'}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs font-semibold text-gray-500 uppercase">User ID</span>
                                                <p className="text-gray-900 font-medium mt-1">{Transaction?.userId ?? 'N/A'}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs font-semibold text-gray-500 uppercase">Plan ID</span>
                                                <p className="text-gray-900 font-medium mt-1">{Transaction?.planId ?? 'N/A'}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs font-semibold text-gray-500 uppercase">Amount</span>
                                                <p className="text-gray-900 font-medium mt-1">{Transaction?.amount?.toLocaleString() ?? '0'} rs.</p>
                                            </div>
                                        </div>

                                        <div className="space-y-5">
                                            <div>
                                                <span className="text-xs font-semibold text-gray-500 uppercase">Status</span>
                                                <p className={`font-medium mt-1 capitalize ${Transaction?.status === 'pending' ? 'text-red-600' : 'text-green-600'}`}>
                                                    {Transaction?.status ?? 'N/A'}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-xs font-semibold text-gray-500 uppercase">Payment Reference</span>
                                                <p className="text-gray-900 font-medium mt-1">{Transaction?.paymentReference ?? 'N/A'}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs font-semibold text-gray-500 uppercase">Created At</span>
                                                <p className="text-gray-900 font-medium mt-1">{Transaction?.createdAt ? new Date(Transaction.createdAt).toLocaleString() : 'N/A'}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs font-semibold text-gray-500 uppercase">Configuration ID</span>
                                                <p className="text-gray-900 font-medium mt-1">{Transaction?.conf_id ?? 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Receipt Preview */}
                                    <div>
                                        <span className="text-sm font-medium text-gray-500 uppercase">Receipt Preview</span>
                                        <div className="mt-3">
                                            <div className="relative w-44 h-44 bg-gray-100 rounded-lg overflow-hidden group">
                                                <img
                                                    src={Transaction?.reciept_url ?? 'https://via.placeholder.com/150?text=Receipt+Preview'}
                                                    alt="Receipt Preview"
                                                    className="w-full h-full object-cover cursor-pointer transition-transform duration-200 group-hover:scale-105"
                                                    onClick={toggleModal}
                                                />
                                            </div>
                                            <div className="mt-4 flex flex-col sm:flex-row gap-3">
                                                <button
                                                    onClick={toggleModal}
                                                    className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
                                                >
                                                    <FiEye className="mr-2" /> View Larger
                                                </button>
                                                <button
                                                    onClick={() => handleDownload(Transaction?.reciept_url ?? '#', `receipt_${Transaction?._id ?? 'unknown'}.pdf`)}
                                                    className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
                                                >
                                                    <FiDownload className="mr-2" /> Download
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* User & Tenant Details Card */}
                            <div className="bg-white rounded-2xl border border-l-8 border-teal-200 p-6 transition-all hover:shadow-md">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                                    <span className="h-8 w-1 bg-teal-300 rounded-full mr-2"></span>
                                    User & Tenant Details
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-xs font-medium text-gray-500 uppercase">User Name</span>
                                            <p className="text-gray-900 font-medium">{User?.name ?? 'N/A'}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium text-gray-500 uppercase">Email</span>
                                            <p className="text-gray-900 font-medium">{User?.email ?? 'N/A'}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium text-gray-500 uppercase">User Type</span>
                                            <p className="text-gray-900 font-medium capitalize">{User?.userType ?? 'N/A'}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium text-gray-500 uppercase">Wallet Balance</span>
                                            <p className="text-gray-900 font-medium">{User?.walletBalance?.toLocaleString() ?? '0'} rs.</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium text-gray-500 uppercase">Address</span>
                                            <p className="text-gray-900 font-medium">
                                                {User?.address?.name ?? ''}, {User?.address?.line1 ?? ''}, {User?.address?.line2 ?? ''}, {User?.address?.city ?? ''},
                                                {User?.address?.province ?? ''}, {User?.address?.zip ?? ''}, {User?.address?.country ?? ''}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-xs font-medium text-gray-500 uppercase">Tenant Name</span>
                                            <p className="text-gray-900 font-medium">{User_details?.name ?? 'N/A'}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium text-gray-500 uppercase">Tenant ID</span>
                                            <p className="text-gray-900 font-medium">{User_details?.id ?? 'N/A'}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium text-gray-500 uppercase">Subscription Plan</span>
                                            <p className="text-gray-900 font-medium capitalize">{User_details?.subscription?.plan ?? 'N/A'}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium text-gray-500 uppercase">Subscription Period</span>
                                            <p className="text-gray-900 font-medium">
                                                {User_details?.subscription?.startDate ? new Date(User_details.subscription.startDate).toLocaleDateString() : 'N/A'} -
                                                {User_details?.subscription?.endDate ? new Date(User_details.subscription.endDate).toLocaleDateString() : 'N/A'}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-xs font-medium text-gray-500 uppercase">Billing</span>
                                            <p className="text-gray-900 font-medium">
                                                {User_details?.billing?.paymentMethod ?? 'N/A'} ({User_details?.billing?.billingCycle ?? 'N/A'})
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <span className="text-xs font-medium text-gray-500 uppercase">Preferences</span>
                                    <p className="text-gray-900 font-medium mt-1">
                                        Language: {User?.preferences?.language ?? 'N/A'} | Theme: {User?.preferences?.theme ?? 'N/A'} |
                                        Referral Code: {User_details?.preferences?.referralCode ?? 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal for Viewing Receipt */}
                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                            <div className="bg-white rounded-2xl p-6 max-w-5xl w-full max-h-[85vh] overflow-auto relative">
                                <button
                                    onClick={toggleModal}
                                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl transition-colors"
                                >
                                    <FiX />
                                </button>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Receipt Preview</h3>
                                <iframe
                                    src={Transaction?.reciept_url ?? 'https://via.placeholder.com/150?text=Receipt+Preview'}
                                    title="Receipt Preview"
                                    className="w-full h-[70vh] rounded-lg border border-gray-200"
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </Layout>
    );
}

export default ApprovalCenterDetails;