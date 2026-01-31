import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout';
import { FaCrown, FaWallet, FaEnvelope, FaWhatsapp, FaUserShield, FaCheckCircle, FaTimesCircle, FaArrowUp, FaUniversity, FaEdit } from 'react-icons/fa';
import { apiurl } from '../config/config';
import { getCookie } from '../config/webStorage';
import { Link } from 'react-router-dom';

function SuperAdminAccount() {
  const token = getCookie("sctoken");
  const [userAccountData, setUserAccountData] = useState(null);
  const [bankingDetails, setBankingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditingBank, setIsEditingBank] = useState(false);
  const [bankForm, setBankForm] = useState({
    BankName: '',
    accountNo: '',
    IFSCCode: '',
    accountHolderName: '',
    QRCode: ''
  });
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [message, setMessage] = useState('');

  console.log("userAccountData",userAccountData)

  useEffect(() => {
    const fetchSuperadminData = async () => {
      try {
        setLoading(true);
        const userResponse = await axios.get(`${apiurl}/api/whatsapp/user/Superadminuser`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserAccountData(userResponse?.data);

        const bankingResponse = await axios.get(`${apiurl}/api/whatsapp/user/banking_detialsbysuperadmin`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBankingDetails(bankingResponse?.data?.data);
        setBankForm({
          BankName: bankingResponse?.data?.data?.BankName || '',
          accountNo: bankingResponse?.data?.data?.accountNo || '',
          IFSCCode: bankingResponse?.data?.data?.IFSCCode || '',
          accountHolderName: bankingResponse?.data?.data?.accountHolderName || '',
          QRCode: bankingResponse?.data?.data?.QRCode || ''
        });
      } catch (err) {
        setError(err?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchSuperadminData();
  }, [token]);

  useEffect(() => {
    if (isEditingBank && bankingDetails) {
      setBankForm({
        BankName: bankingDetails?.BankName || '',
        accountNo: bankingDetails?.accountNo || '',
        IFSCCode: bankingDetails?.IFSCCode || '',
        accountHolderName: bankingDetails?.accountHolderName || '',
        QRCode: bankingDetails?.QRCode || ''
      });
      setLogoPreview(bankingDetails?.QRCode || null);
    }
  }, [isEditingBank, bankingDetails]);

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setMessage('Please select a file!');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    setLogo(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('files', file);

    try {
      const response = await axios.post(
        `${apiurl}/api/whatsapp/content/imageupload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        }
      );

      if (response?.data?.success) {
        setBankForm({ ...bankForm, QRCode: response?.data?.urls?.[0] || '' });
        setMessage('QR Code uploaded successfully!');
      } else {
        setMessage('QR Code upload failed!');
      }
    } catch (error) {
      setMessage('Error uploading QR Code');
      console.error('Upload error:', error);
    }

    setTimeout(() => setMessage(''), 3000);
  };

  const handleBankFormChange = (e) => {
    const { name, value } = e.target;
    setBankForm({ ...bankForm, [name]: value });
  };

  const handleBankUpdate = async () => {
    try {
      await axios.post(
        `${apiurl}/api/whatsapp/user/update-bank_details`,
        bankForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setBankingDetails(bankForm);
      setIsEditingBank(false);
      setMessage('Bank details updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating bank details');
      console.error('Update error:', error);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-light-primary"></div>
      </div>
    </Layout>
  );

  if (error) return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="bg-error/10 text-error p-6 rounded-xl shadow-lg max-w-md w-full mx-4">
          <p className="font-semibold text-lg">Error</p>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="min-h-screen bg-secondary py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-extrabold text-primary sm:text-4xl">Super Admin Dashboard</h1>
            <p className="mt-2 text-text-secondary text-lg">Manage your super admin account settings and banking details</p>
            {message && (
              <div className={`mt-4 p-4 rounded-xl ${message.includes('success') ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
                {message}
              </div>
            )}
          </div>

          {userAccountData && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* User Profile Card */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-light-primary hover:shadow-lg transition-all text-left">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-light-primary flex items-center justify-center text-primary text-2xl font-bold shadow-inner">
                      {userAccountData?.user?.name?.charAt(0)?.toUpperCase() || ''}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-success text-white rounded-full p-1.5 shadow">
                      <FaCrown className="text-xs" />
                    </div>
                  </div>
                  <div className='px-3'>
                    <h2 className="text-xl font-semibold text-text-primary">{userAccountData?.user?.name || 'N/A'}</h2>
                    <p className="text-text-secondary flex items-center gap-2 text-sm">
                      <FaEnvelope className="text-light-primary" /> {userAccountData?.user?.email || 'N/A'}
                    </p>
                    <span className="inline-block mt-2 bg-light-primary/20 text-light-primary py-1 rounded-full text-xs font-medium capitalize">
                      Super Admin
                    </span>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-medium text-text-secondary mb-2">Verification Status</h3>
                    <div className="flex gap-4">
                      <div className={`flex items-center gap-1 text-sm ${userAccountData?.user?.verificationDetails?.isEmailVerified ? 'text-success' : 'text-error'}`}>
                        {userAccountData?.user?.verificationDetails?.isEmailVerified ? <FaCheckCircle /> : <FaTimesCircle />}
                        Email
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${userAccountData?.user?.verificationDetails?.isPhoneVerified ? 'text-success' : 'text-error'}`}>
                        {userAccountData?.user?.verificationDetails?.isPhoneVerified ? <FaCheckCircle /> : <FaTimesCircle />}
                        Phone
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-text-secondary mb-2">Address</h3>
                    <p className="text-text-primary text-sm leading-relaxed">
                      {userAccountData?.user?.address?.line1 || ''}, {userAccountData?.user?.address?.line2 || ''}<br />
                      {userAccountData?.user?.address?.city || ''}, {userAccountData?.user?.address?.province || ''}<br />
                      {userAccountData?.user?.address?.zip || ''}, {userAccountData?.user?.address?.country || ''}
                    </p>
                  </div>
                </div>
              </div>

              {/* Wallet & Tenant Info */}
              <div className="space-y-6">

                {/* Tenant Info */}
                <div className="bg-white rounded-2xl shadow-md p-6 border border-light-primary hover:shadow-lg transition-all text-left">
                  <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                    <FaUserShield className="text-light-primary" /> Tenant Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-text-secondary">Tenant Name</p>
                      <p className="text-text-primary font-medium">{userAccountData?.user?.tenant?.tenantName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Tenant Id</p>
                      <p className="text-text-primary font-medium capitalize">
                        {userAccountData?.user?.tenant?.tenantId || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Accounts & Banking Details */}
              <div >
                {bankingDetails && (
                  <div className="bg-white rounded-2xl shadow-md p-6 border border-light-primary hover:shadow-lg transition-all text-left relative">
                    <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                      <FaUniversity className="text-light-primary" /> Banking Details
                    </h3>
                    <button
                      className="absolute top-4 right-4 text-light-primary hover:text-primary"
                      onClick={() => setIsEditingBank(!isEditingBank)}
                    >
                      <FaEdit className="text-lg" />
                    </button>
                    {isEditingBank ? (
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs text-text-secondary">Bank Name</label>
                          <input
                            type="text"
                            name="BankName"
                            value={bankForm.BankName}
                            onChange={handleBankFormChange}
                            className="w-full p-2 border border-light-primary rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-text-secondary">Account Number</label>
                          <input
                            type="text"
                            name="accountNo"
                            value={bankForm.accountNo}
                            onChange={handleBankFormChange}
                            className="w-full p-2 border border-light-primary rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-text-secondary">IFSC Code</label>
                          <input
                            type="text"
                            name="IFSCCode"
                            value={bankForm.IFSCCode}
                            onChange={handleBankFormChange}
                            className="w-full p-2 border border-light-primary rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-text-secondary">Account Holder Name</label>
                          <input
                            type="text"
                            name="accountHolderName"
                            value={bankForm.accountHolderName}
                            onChange={handleBankFormChange}
                            className="w-full p-2 border border-light-primary rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-text-secondary">QR Code</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                            className="w-full p-2 border border-light-primary rounded-lg"
                          />
                          {logoPreview && (
                            <img src={logoPreview} alt="QR Code Preview" className="mt-2 w-32 h-32 object-contain" />
                          )}
                        </div>
                        <button
                          className="bg-light-primary text-white px-4 py-2 rounded-lg hover:bg-primary transition-all"
                          onClick={handleBankUpdate}
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-text-secondary">Bank Name</p>
                          <p className="text-text-primary font-medium">{bankingDetails?.BankName || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-text-secondary">Account Number</p>
                          <p className="text-text-primary font-medium">{bankingDetails?.accountNo || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-text-secondary">IFSC Code</p>
                          <p className="text-text-primary font-medium">{bankingDetails?.IFSCCode || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-text-secondary">Account Holder Name</p>
                          <p className="text-text-primary font-medium">{bankingDetails?.accountHolderName || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-text-secondary">QR Code</p>
                          {bankingDetails?.QRCode && (
                            <img src={bankingDetails.QRCode} alt="QR Code" className="w-32 h-32 object-contain" />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default SuperAdminAccount;


















