import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/layout';
import { FaCrown, FaEnvelope, FaUserShield, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { apiurl } from '../config/config';
import { getCookie } from '../config/webStorage';
import { useUser } from '../config/userProvider';

function MasterAdminAccount() {
  const token = getCookie("sctoken");
  const { userData } = useUser();
  const [userAccountData, setUserAccountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMasterAdminData = async () => {
      try {
        setLoading(true);
        const userResponse = await axios.get(`${apiurl}/api/whatsapp/user/masteradminuser`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserAccountData(userResponse?.data);
      } catch (err) {
        setError(err?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

      fetchMasterAdminData();

  }, []);

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
            <h1 className="text-3xl font-extrabold text-primary sm:text-4xl">Master Admin Dashboard</h1>
            <p className="mt-2 text-text-secondary text-lg">Manage your master admin account settings</p>
          </div>

          {userAccountData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Profile Card */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-accent/50 hover:shadow-lg transition-all text-left">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-primary text-2xl font-bold shadow-inner">
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
                      Master Admin
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

              {/* Tenant Info */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-accent/50 hover:shadow-lg transition-all text-left">
                <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                  <FaUserShield className="text-light-primary" /> Tenant Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-text-secondary">Organization</p>
                    <p className="text-text-primary font-medium">{userAccountData?.tanent_details?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary">Subscription Plan</p>
                    <p className="text-text-primary font-medium capitalize">
                      {userAccountData?.tanent_details?.subscription?.plan || 'N/A'} ({userAccountData?.tanent_details?.subscription?.status || 'N/A'})
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary">Valid Until</p>
                    <p className="text-text-primary font-medium">
                      {userAccountData?.tanent_details?.subscription?.endDate 
                        ? new Date(userAccountData.tanent_details.subscription.endDate).toLocaleDateString() 
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default MasterAdminAccount;